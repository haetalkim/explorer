import { useEffect, useMemo, useRef, useState } from 'react';
import Button from '../components/Button.jsx';
import RichText from '../components/RichText.jsx';
import LensDot from '../components/LensDot.jsx';
import { Icons } from '../components/Icons.jsx';
import { chat } from '../lib/api.js';
import { TOPIC } from '../lib/study.js';
import { getSkin, SkinSidebar } from '../skins/skins.jsx';
import {
  LENSES,
  MAX_ACTIVE_LENSES,
  EXAMPLE_QUESTION,
  getLens,
  lensSystemPrompt,
  oracleSystemPrompt,
  demoLensReply,
  demoOracleReply,
} from '../lib/lenses.js';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const HISTORY_LIMIT = 16;

// One-time walkthrough of the group-chat features, shown as a spotlight
// over the real controls when the session opens.
const TOUR_STEPS = [
  {
    key: 'help',
    title: 'If you get stuck',
    text: 'This reopens the guide anytime. You can also click any profile picture or name in the chat to learn what that lens cares about.',
  },
  {
    key: 'invite',
    title: 'Invite a third voice',
    text: 'Feel like a perspective is missing? Bring one more lens into the conversation whenever you want.',
  },
  {
    key: 'composer',
    title: 'Talk to everyone — or just one',
    text: 'Type here to address the whole chat. To answer one lens directly, hover over its message and click the reply arrow that appears next to it.',
  },
];

let idCounter = 0;
const nextId = () => `m${++idCounter}`;

// The chat session. Three variants:
//  - oracle:    single assistant, standard chat
//  - multilens: a group chat — the participant's two chosen lenses join the
//               conversation as named participants and reply in turn; a
//               third lens can be invited mid-conversation
//  - synthesis: multilens + save-and-synthesize panel (beta)
// The visual skin replicates the platform the participant uses most
// (ChatGPT, Claude, Gemini), so the session reads as their everyday tool.
export default function Session({
  condition,
  lensIds,
  runtime,
  participantId,
  platform,
  initialTake,
  onComplete,
  onBackToSelect,
}) {
  const skin = getSkin(platform);

  const [messages, setMessages] = useState([]);
  const [activeLensIds, setActiveLensIds] = useState(lensIds || []);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(null); // null | 'assistant' | lensId
  const [replyTo, setReplyTo] = useState(null); // { lensId, excerpt }
  const [profileLens, setProfileLens] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [archived, setArchived] = useState([]);
  const [synthesisText, setSynthesisText] = useState('');
  const [showInviteLens, setShowInviteLens] = useState(false);
  const [showInvitePrompt, setShowInvitePrompt] = useState(false);
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const [showBackConfirm, setShowBackConfirm] = useState(false);
  // The "want another perspective?" nudge fires once, after the third turn.
  const invitePromptedRef = useRef(false);
  const [tourStep, setTourStep] = useState(-1); // -1 not started, >= length done
  const [tourRect, setTourRect] = useState(null);
  const tourTargets = useRef({});

  const threadEndRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const seededRef = useRef(false);
  const demoTurnRef = useRef(0);
  // Synchronous mirror of the thread, so reply builders can read history
  // immediately after append() without waiting for a re-render.
  const transcriptRef = useRef([]);

  const isGroup = condition !== 'oracle';
  const isSynthesis = condition === 'synthesis';
  const activeLenses = useMemo(() => activeLensIds.map(getLens), [activeLensIds]);

  const append = (msg) => {
    const withId = { id: nextId(), ...msg };
    transcriptRef.current = [...transcriptRef.current, withId];
    setMessages((prev) => [...prev, withId]);
    return withId;
  };

  // ---- Reply generation -------------------------------------------------

  const oracleReply = async () => {
    setTyping('assistant');
    try {
      let text;
      if (runtime.provider === 'demo') {
        await sleep(1100);
        text = demoOracleReply(demoTurnRef.current++);
      } else {
        const history = transcriptRef.current
          .filter((m) => m.role === 'user' || m.role === 'assistant')
          .slice(-HISTORY_LIMIT)
          .map((m) => ({ role: m.role, content: m.text }));
        text = await chat({
          ...runtime,
          system: oracleSystemPrompt(TOPIC.prompt),
          messages: history,
        });
      }
      append({ role: 'assistant', text });
    } catch (err) {
      append({ role: 'note', text: `Connection error: ${err.message}` });
    } finally {
      setTyping(null);
    }
  };

  // A quoted reply carries its context into the prompt so the lens knows
  // exactly which of its (or another lens's) points is being addressed.
  const userTurnContent = (m) =>
    m.replyTo
      ? `(Replying to ${getLens(m.replyTo.lensId).name}'s message: "${m.replyTo.excerpt}")\n${m.text}`
      : m.text;

  // Builds the conversation from one lens's point of view: its own past
  // messages become assistant turns; the user and the other lenses become
  // labeled user turns.
  const historyForLens = (lens) => {
    const turns = [];
    for (const m of transcriptRef.current) {
      if (m.role === 'user') {
        turns.push({ role: 'user', content: userTurnContent(m) });
      } else if (m.role === 'lens') {
        if (m.lensId === lens.id) {
          turns.push({ role: 'assistant', content: m.text });
        } else {
          turns.push({
            role: 'user',
            content: `${getLens(m.lensId).name}: ${m.text}`,
          });
        }
      }
    }
    // Merge consecutive same-role turns (Anthropic requires alternation).
    const merged = [];
    for (const t of turns.slice(-HISTORY_LIMIT)) {
      const last = merged[merged.length - 1];
      if (last && last.role === t.role) {
        last.content += `\n\n${t.content}`;
      } else {
        merged.push({ ...t });
      }
    }
    if (merged[0]?.role === 'assistant') merged.shift();
    return merged;
  };

  const generateLensText = async (lens, lenses, askQuestion) => {
    if (runtime.provider === 'demo') {
      await sleep(900 + Math.random() * 700);
      // If the user just quoted this lens back at it, acknowledge the
      // pushback instead of dispensing the next canned talking point.
      const lastUser = [...transcriptRef.current]
        .reverse()
        .find((m) => m.role === 'user');
      return demoLensReply(lens.id, lastUser?.replyTo?.lensId === lens.id);
    }
    return chat({
      ...runtime,
      system: lensSystemPrompt(
        lens,
        TOPIC.prompt,
        lenses.filter((l) => l.id !== lens.id),
        askQuestion
      ),
      messages: historyForLens(lens),
    });
  };

  const lensReply = async (lens, lenses, askQuestion = Math.random() < 0.35) => {
    setTyping(lens.id);
    try {
      const text = await generateLensText(lens, lenses, askQuestion);
      append({ role: 'lens', lensId: lens.id, text });
    } catch (err) {
      append({ role: 'note', text: `Connection error: ${err.message}` });
    } finally {
      setTyping(null);
    }
  };

  // Lenses reply one after another, like people typing in a group chat.
  // Later repliers see earlier replies in this round and can react to them.
  // At most one lens per round turns the question back on the user, so the
  // discussion breathes without every reply ending in a quiz.
  const groupReplies = async (lenses) => {
    const questionIndex =
      Math.random() < 0.55 ? Math.floor(Math.random() * lenses.length) : -1;
    for (let i = 0; i < lenses.length; i++) {
      await lensReply(lenses[i], lenses, i === questionIndex);
    }
  };

  // ---- Seed -------------------------------------------------------------

  useEffect(() => {
    if (seededRef.current) return;
    seededRef.current = true;

    const seed = async () => {
      if (isGroup) {
        const names = activeLenses.map((l) => l.name);
        append({
          role: 'note',
          text: `${names.join(' and ')} joined the chat`,
        });
      }
      append({ role: 'note', text: TOPIC.prompt });
      // The participant's initial take opens the conversation, so replies
      // engage with their actual starting position from the first turn.
      append({ role: 'user', text: initialTake?.trim() || TOPIC.prompt });
      if (isGroup) {
        await groupReplies(activeLenses);
      } else {
        await oracleReply();
      }
    };
    seed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    threadEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  // ---- Feature tour -------------------------------------------------------

  useEffect(() => {
    if (!isGroup) return;
    const t = setTimeout(() => setTourStep(0), 700);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (tourStep < 0 || tourStep >= TOUR_STEPS.length) {
      setTourRect(null);
      return;
    }
    const el = tourTargets.current[TOUR_STEPS[tourStep].key];
    if (!el) {
      // Target not rendered (e.g. invite chip when 3 lenses active): skip it.
      setTourStep((s) => s + 1);
      return;
    }
    const r = el.getBoundingClientRect();
    setTourRect({ top: r.top, left: r.left, width: r.width, height: r.height });
  }, [tourStep]);

  const tourActive = isGroup && tourStep >= 0 && tourStep < TOUR_STEPS.length;

  // ---- Actions ----------------------------------------------------------

  const handleSend = async () => {
    const text = input.trim();
    if (!text || typing) return;
    setInput('');
    const quoted = replyTo;
    setReplyTo(null);
    append({
      role: 'user',
      text,
      ...(quoted ? { replyTo: quoted } : {}),
    });

    if (!isGroup) {
      await oracleReply();
    } else if (quoted) {
      // A quoted reply goes to the lens whose message was quoted.
      await lensReply(getLens(quoted.lensId), activeLenses);
    } else {
      await groupReplies(activeLenses);
    }

    // After the third turn, nudge once toward inviting a third perspective.
    if (
      isGroup &&
      !invitePromptedRef.current &&
      activeLensIds.length < MAX_ACTIVE_LENSES &&
      transcriptRef.current.filter((m) => m.role === 'user').length >= 3
    ) {
      invitePromptedRef.current = true;
      setShowInvitePrompt(true);
    }
  };

  const startReply = (msg) => {
    setReplyTo({
      lensId: msg.lensId,
      excerpt: msg.text.length > 110 ? `${msg.text.slice(0, 110)}…` : msg.text,
    });
  };

  const inviteLens = async (lens) => {
    if (activeLensIds.length >= MAX_ACTIVE_LENSES) return;
    setShowInviteLens(false);
    const updated = [...activeLensIds, lens.id];
    setActiveLensIds(updated);
    append({ role: 'note', text: `${lens.name} joined the chat` });
    await lensReply(lens, updated.map(getLens));
  };

  const toggleArchive = (msg) => {
    setArchived((prev) =>
      prev.some((a) => a.id === msg.id)
        ? prev.filter((a) => a.id !== msg.id)
        : [...prev, { id: msg.id, lensId: msg.lensId, text: msg.text }]
    );
  };

  const endSession = () => {
    const endedAt = Date.now();
    onComplete({
      startedAt: new Date(startTimeRef.current).toISOString(),
      endedAt: new Date(endedAt).toISOString(),
      durationSec: Math.round((endedAt - startTimeRef.current) / 1000),
      userMessageCount: messages.filter((m) => m.role === 'user').length - 1, // excludes seed
      activeLensIds: isGroup ? activeLensIds : null,
      archived: isSynthesis
        ? archived.map((a) => ({ lens: a.lensId, text: a.text }))
        : null,
      synthesisText: isSynthesis ? synthesisText.trim() : null,
      transcript: messages.map(({ role, lensId, text, replyTo: r }) => ({
        role,
        ...(lensId ? { lens: lensId } : {}),
        ...(r ? { replyTo: { lens: r.lensId, excerpt: r.excerpt } } : {}),
        text,
      })),
    });
  };

  // ---- Render -----------------------------------------------------------

  const archivedIds = new Set(archived.map((a) => a.id));

  // Deliberately blank: a plain colored circle, no initial or glyph.
  const LensAvatar = ({ lens }) => (
    <button
      type="button"
      className="lens-chat-avatar"
      style={{ background: lens.color }}
      onClick={() => setProfileLens(lens)}
      aria-label={`About ${lens.name}`}
    />
  );

  return (
    <div className={`session-root skin-${skin.id}`}>
      <SkinSidebar skin={skin} chatTitle={TOPIC.shortTitle} />

      <div className="chat-main">
        <header className="session-header">
          <div className="session-title">
            {isGroup && onBackToSelect && (
              <button
                type="button"
                className="back-link"
                onClick={() => {
                  // Only warn once the conversation has actually started.
                  if (transcriptRef.current.some((m) => m.role === 'user')) {
                    setShowBackConfirm(true);
                  } else {
                    onBackToSelect();
                  }
                }}
              >
                &#8249; Lenses
              </button>
            )}
            {skin.headerLeft}
            {isSynthesis && <span className="beta-tag">Beta</span>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {isGroup && (
              <button
                type="button"
                className="help-btn"
                ref={(el) => (tourTargets.current.help = el)}
                onClick={() => setShowHelp(true)}
                aria-label="How this chat works"
              >
                ?
              </button>
            )}
            <span className="caption">{participantId}</span>
            <Button variant="ghost" size="sm" onClick={() => setShowEndConfirm(true)}>
              End session
            </Button>
          </div>
        </header>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: 0 }}>
          <div className="session-thread">
            <div className="thread-column">
              {messages.map((msg) => {
                if (msg.role === 'note') {
                  return (
                    <div key={msg.id} className="thread-note">
                      {msg.text}
                    </div>
                  );
                }
                if (msg.role === 'user') {
                  const quotedLens = msg.replyTo ? getLens(msg.replyTo.lensId) : null;
                  return (
                    <div key={msg.id} className="msg-user">
                      <div className="bubble">
                        {quotedLens && (
                          <div className="reply-quote">
                            <span className="reply-quote-name">
                              Reply to{' '}
                              <span style={{ color: quotedLens.color }}>
                                {quotedLens.name}
                              </span>
                            </span>
                            <span className="reply-quote-text">
                              {msg.replyTo.excerpt}
                            </span>
                          </div>
                        )}
                        {msg.text}
                      </div>
                    </div>
                  );
                }
                if (msg.role === 'assistant') {
                  return (
                    <div key={msg.id} className="msg-assistant">
                      {skin.assistantAvatar}
                      <div className="content">
                        <RichText text={msg.text} />
                      </div>
                    </div>
                  );
                }
                // Lens message: a named participant in the group chat.
                const lens = getLens(msg.lensId);
                const isArchived = archivedIds.has(msg.id);
                return (
                  <div key={msg.id} className="msg-lens">
                    <LensAvatar lens={lens} />
                    <div className="body">
                      <button
                        type="button"
                        className="sender"
                        style={{ color: lens.color }}
                        onClick={() => setProfileLens(lens)}
                      >
                        {lens.name}
                      </button>
                      <div className="bubble-row">
                        <div
                          className={`bubble ${isSynthesis ? 'archivable' : ''} ${isArchived ? 'archived' : ''}`}
                          onClick={isSynthesis ? () => toggleArchive(msg) : undefined}
                        >
                          {msg.text}
                        </div>
                        <button
                          type="button"
                          className="msg-action"
                          onClick={() => startReply(msg)}
                          aria-label={`Reply to ${lens.name}`}
                          title="Reply to this message"
                        >
                          <Icons.Reply size={14} />
                        </button>
                      </div>
                      {isSynthesis && (
                        <div className="archive-hint">
                          <Icons.Bookmark size={11} />
                          {isArchived ? 'Saved to your notes' : 'Click to save'}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {typing === 'assistant' && (
                <div className="msg-assistant">
                  {skin.assistantAvatar}
                  <div className="typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}
              {typing && typing !== 'assistant' && (
                <div className="msg-lens">
                  <LensAvatar lens={getLens(typing)} />
                  <div className="body">
                    <div className="sender" style={{ color: getLens(typing).color }}>
                      {getLens(typing).name}
                    </div>
                    <div className="typing">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
              )}

              <div ref={threadEndRef} />
            </div>
          </div>

          <div className="composer-wrap">
            <div className="composer-column">
              {isGroup && activeLensIds.length < MAX_ACTIVE_LENSES && (
                <div className="mention-row">
                  <button
                    type="button"
                    className="mention-chip"
                    ref={(el) => (tourTargets.current.invite = el)}
                    onClick={() => setShowInviteLens(true)}
                  >
                    <Icons.Plus size={12} /> Invite lens
                  </button>
                </div>
              )}

              {replyTo && (
                <div className="replying-bar">
                  <span className="replying-bar-text">
                    <Icons.Reply size={12} />
                    Replying to{' '}
                    <strong style={{ color: getLens(replyTo.lensId).color }}>
                      {getLens(replyTo.lensId).name}
                    </strong>
                    <span className="replying-bar-excerpt">{replyTo.excerpt}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setReplyTo(null)}
                    aria-label="Cancel reply"
                    className="replying-bar-cancel"
                  >
                    <Icons.X size={13} />
                  </button>
                </div>
              )}

              <div
                className="composer"
                ref={(el) => (tourTargets.current.composer = el)}
              >
                {skin.composerPlus && (
                  <button type="button" className="composer-plus" aria-label="Attach">
                    <Icons.Plus size={17} />
                  </button>
                )}
                <textarea
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder={
                    replyTo
                      ? `Reply to ${getLens(replyTo.lensId)?.name}`
                      : skin.placeholder
                  }
                />
                {skin.composerModelLabel && (
                  <span className="composer-model-label">
                    {skin.composerModelLabel}
                  </span>
                )}
                <button
                  type="button"
                  className="send-btn"
                  onClick={handleSend}
                  disabled={!input.trim() || !!typing}
                  aria-label="Send"
                >
                  {skin.sendShape === 'plain' ? (
                    <Icons.Send size={18} />
                  ) : (
                    <Icons.ArrowUp size={16} />
                  )}
                </button>
              </div>

              {skin.disclaimer && (
                <div className="chat-disclaimer">{skin.disclaimer}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isSynthesis && (
        <aside className="synthesis-panel">
          <div className="synthesis-panel-header">
            <span>Your notes</span>
            <span className="caption">{archived.length} saved</span>
          </div>
          <div className="synthesis-panel-body">
            {archived.length === 0 ? (
              <p className="caption">
                Click a lens message to save it here, then write your own
                synthesis below.
              </p>
            ) : (
              archived.map((a) => {
                const lens = getLens(a.lensId);
                return (
                  <div key={a.id} className="archived-item">
                    <div className="archived-sender" style={{ color: lens.color }}>
                      {lens.name}
                      <button
                        type="button"
                        onClick={() =>
                          setArchived((prev) => prev.filter((x) => x.id !== a.id))
                        }
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'var(--ink-tertiary)',
                          display: 'flex',
                        }}
                        aria-label="Remove"
                      >
                        <Icons.X size={12} />
                      </button>
                    </div>
                    <p>{a.text}</p>
                  </div>
                );
              })
            )}
          </div>
          <div className="synthesis-panel-footer">
            <textarea
              className="text-area"
              style={{ minHeight: 90, fontSize: 13 }}
              value={synthesisText}
              onChange={(e) => setSynthesisText(e.target.value)}
              placeholder="Your synthesis: how do these perspectives connect or conflict, and where do you land?"
            />
          </div>
        </aside>
      )}

      {tourActive && tourRect && (
        <div className="tour-layer">
          <div
            className="tour-spotlight"
            style={{
              top: tourRect.top - 6,
              left: tourRect.left - 6,
              width: tourRect.width + 12,
              height: tourRect.height + 12,
            }}
          />
          <div
            className="tour-card"
            style={
              tourRect.top > window.innerHeight / 2
                ? {
                    bottom: window.innerHeight - tourRect.top + 18,
                    left: Math.max(
                      16,
                      Math.min(tourRect.left, window.innerWidth - 336)
                    ),
                  }
                : {
                    top: tourRect.top + tourRect.height + 18,
                    left: Math.max(
                      16,
                      Math.min(tourRect.left, window.innerWidth - 336)
                    ),
                  }
            }
          >
            <h4>{TOUR_STEPS[tourStep].title}</h4>
            <p>{TOUR_STEPS[tourStep].text}</p>
            <div className="tour-card-actions">
              <span className="caption">
                {tourStep + 1} of {TOUR_STEPS.length}
              </span>
              <div style={{ display: 'flex', gap: 8 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTourStep(TOUR_STEPS.length)}
                >
                  Skip
                </Button>
                <Button size="sm" onClick={() => setTourStep((s) => s + 1)}>
                  {tourStep === TOUR_STEPS.length - 1 ? 'Got it' : 'Next'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {profileLens && (
        <div className="modal-overlay" onClick={() => setProfileLens(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="lens-profile-header">
              <div
                className="lens-chat-avatar lens-profile-avatar"
                style={{ background: profileLens.color }}
              />
              <h3 style={{ margin: 0 }}>{profileLens.name}</h3>
            </div>
            <p className="caption" style={{ marginBottom: 12 }}>
              {profileLens.question}
            </p>
            <p style={{ marginBottom: 16 }}>{profileLens.description}</p>
            <p className="caption" style={{ marginBottom: 8 }}>
              If someone asked “{EXAMPLE_QUESTION}” it might say:
            </p>
            <div className="example-chat">
              <span
                className="lens-chat-avatar example-avatar"
                style={{ background: profileLens.color }}
              />
              <div className="example-body">
                <span className="example-sender" style={{ color: profileLens.color }}>
                  {profileLens.name}
                </span>
                <div className="example-bubble">{profileLens.example}</div>
              </div>
            </div>
            <p className="caption" style={{ marginBottom: 0 }}>
              What it may miss: {profileLens.blindspot}.
            </p>
            <div className="modal-actions" style={{ marginTop: 22 }}>
              <Button variant="ghost" onClick={() => setProfileLens(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {showHelp && (
        <div className="modal-overlay" onClick={() => setShowHelp(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>How this chat works</h3>
            <p style={{ marginBottom: 14 }}>
              You are in a group chat with several perspectives, called
              lenses. Each one responds to your messages from its own angle,
              and they may disagree with each other.
            </p>
            <p style={{ marginBottom: 14 }}>
              If you are unsure what a lens stands for, click its profile
              picture or name to read a short description. You can reply to a
              specific message with the arrow that appears next to it, or just
              type below to address everyone. Use "Invite lens" to bring in
              another perspective.
            </p>
            <div className="option-list" style={{ marginBottom: 8 }}>
              {activeLenses.map((lens) => (
                <button
                  key={lens.id}
                  type="button"
                  className="option-row"
                  onClick={() => {
                    setShowHelp(false);
                    setProfileLens(lens);
                  }}
                >
                  <LensDot lens={lens} />
                  {lens.name}
                </button>
              ))}
            </div>
            <div className="modal-actions">
              <Button variant="ghost" onClick={() => setShowHelp(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {showInviteLens && (
        <div className="modal-overlay" onClick={() => setShowInviteLens(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Invite a lens</h3>
            <p>Bring one more perspective into the chat.</p>
            <div className="option-list">
              {LENSES.filter((l) => !activeLensIds.includes(l.id)).map((lens) => (
                <button
                  key={lens.id}
                  type="button"
                  className="option-row"
                  onClick={() => inviteLens(lens)}
                >
                  <LensDot lens={lens} />
                  <span>
                    {lens.name}
                    <span className="caption" style={{ display: 'block' }}>
                      {lens.question}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showInvitePrompt && (
        <div className="modal-overlay" onClick={() => setShowInvitePrompt(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Want another perspective?</h3>
            <p>
              You can bring one more lens into this chat. It will see the
              conversation so far and join in.
            </p>
            <div className="modal-actions">
              <Button variant="ghost" onClick={() => setShowInvitePrompt(false)}>
                Not now
              </Button>
              <Button
                onClick={() => {
                  setShowInvitePrompt(false);
                  setShowInviteLens(true);
                }}
              >
                Invite a lens
              </Button>
            </div>
          </div>
        </div>
      )}

      {showBackConfirm && (
        <div className="modal-overlay" onClick={() => setShowBackConfirm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Choose different lenses?</h3>
            <p>
              Going back lets you pick again, but this conversation will not be
              saved.
            </p>
            <div className="modal-actions">
              <Button variant="ghost" onClick={() => setShowBackConfirm(false)}>
                Stay here
              </Button>
              <Button onClick={onBackToSelect}>Pick again</Button>
            </div>
          </div>
        </div>
      )}

      {showEndConfirm && (
        <div className="modal-overlay" onClick={() => setShowEndConfirm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>End this session?</h3>
            <p>
              You will not be able to return to this conversation afterward.
            </p>
            <div className="modal-actions">
              <Button variant="ghost" onClick={() => setShowEndConfirm(false)}>
                Keep talking
              </Button>
              <Button onClick={endSession}>End session</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
