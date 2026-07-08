import { LENSES, getLens } from '../lib/lenses.js';
import LensDot from '../components/LensDot.jsx';

// Documentation of the interface architectures. Researcher/portfolio-facing.

const hairline = 'var(--hairline-soft)';
const ink = 'var(--ink)';
const inkSecondary = 'var(--ink-secondary)';
const inkTertiary = 'var(--ink-tertiary)';

const effectiveness = getLens('effectiveness');
const equity = getLens('equity');

const TrafficLights = () => (
  <span style={{ display: 'inline-flex', gap: 5 }}>
    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF5F57' }} />
    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFBD2E' }} />
    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#28CA41' }} />
  </span>
);

const Frame = ({ title, dark, titleColor, headerBg, children }) => (
  <div
    style={{
      background: dark ? '#16181d' : '#fff',
      borderRadius: 12,
      border: `1px solid ${dark ? '#2a2d34' : 'var(--hairline)'}`,
      overflow: 'hidden',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div
      style={{
        padding: '9px 13px',
        borderBottom: `1px solid ${dark ? '#2a2d34' : hairline}`,
        background: headerBg || (dark ? '#1e2127' : 'var(--surface-secondary)'),
        display: 'flex',
        alignItems: 'center',
        gap: 9,
      }}
    >
      <TrafficLights />
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: titleColor || (dark ? '#fff' : inkSecondary),
        }}
      >
        {title}
      </span>
    </div>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>{children}</div>
  </div>
);

const OverlookChip = ({ children }) => (
  <div
    style={{
      marginTop: 8,
      padding: '4px 7px',
      background: '#FBF3DC',
      borderRadius: 5,
      fontSize: 8.5,
      color: '#7a6420',
      lineHeight: 1.4,
    }}
  >
    {children}
  </div>
);

const SectionHeading = ({ eyebrow, title }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'baseline',
      gap: 12,
      borderBottom: `1px solid ${hairline}`,
      paddingBottom: 14,
      marginBottom: 32,
    }}
  >
    <span
      style={{
        fontSize: 12,
        fontWeight: 600,
        color: inkTertiary,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      }}
    >
      {eyebrow}
    </span>
    <h2 className="section-title" style={{ fontSize: 22 }}>{title}</h2>
  </div>
);

export default function DesignsView() {
  return (
    <div className="study-page">
      <div style={{ padding: '64px 24px 96px', maxWidth: 980, margin: '0 auto' }}>
        <h1 className="display-title" style={{ fontSize: 36, marginBottom: 12 }}>
          Initial design artifacts
        </h1>
        <p className="body-large" style={{ marginBottom: 64, maxWidth: 640 }}>
          Visual documentation of the interface architectures and conceptual
          frameworks underpinning the Explorer simulation.
        </p>

        {/* INTERFACE ARCHITECTURE COMPARISON */}
        <section style={{ marginBottom: 72 }}>
          <SectionHeading eyebrow="Interface architecture" title="Comparison" />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {/* A. Standard Chat */}
            <div>
              <div style={{ aspectRatio: '3 / 3.4', marginBottom: 18 }}>
                <Frame title="Standard Chat">
                  <div style={{ padding: 13, flex: 1 }}>
                    <div
                      style={{
                        background: 'var(--surface-secondary)',
                        padding: 9,
                        borderRadius: 8,
                        marginBottom: 10,
                        maxWidth: '68%',
                        fontSize: 10,
                        color: inkSecondary,
                      }}
                    >
                      Should schools ban phones?
                    </div>
                    <div
                      style={{
                        background: '#26282e',
                        color: '#fff',
                        padding: 9,
                        borderRadius: 8,
                        marginLeft: 'auto',
                        maxWidth: '80%',
                        fontSize: 9.5,
                        lineHeight: 1.5,
                      }}
                    >
                      This involves multiple considerations. On one hand,
                      research shows... On the other hand...
                    </div>
                  </div>
                  <div style={{ padding: 10, borderTop: `1px solid ${hairline}` }}>
                    <div
                      style={{
                        background: 'var(--surface-secondary)',
                        borderRadius: 6,
                        padding: '7px 9px',
                        fontSize: 9.5,
                        color: inkTertiary,
                      }}
                    >
                      Ask anything...
                    </div>
                  </div>
                </Frame>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: ink, marginBottom: 6 }}>
                A. Standard Chat
              </h3>
              <p style={{ fontSize: 13, color: inkSecondary, lineHeight: 1.55 }}>
                "Oracle" pattern. Single authoritative response synthesizes
                complexity, encouraging passive consumption.
              </p>
            </div>

            {/* B. Split View */}
            <div>
              <div style={{ aspectRatio: '3 / 3.4', marginBottom: 18 }}>
                <Frame
                  title="Explorer"
                  titleColor="var(--accent)"
                  headerBg="#f0f6ff"
                >
                  <div style={{ display: 'flex', flex: 1 }}>
                    <div style={{ flex: 1, padding: 10, borderRight: `1px solid ${hairline}` }}>
                      <div
                        style={{
                          fontSize: 9,
                          fontWeight: 600,
                          color: effectiveness.color,
                          marginBottom: 6,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                        }}
                      >
                        <LensDot lens={effectiveness} size={6} /> Effectiveness
                      </div>
                      <div style={{ fontSize: 9, color: inkSecondary, lineHeight: 1.45 }}>
                        Research shows higher test scores in phone-free
                        environments...
                      </div>
                      <OverlookChip>May overlook: access barriers</OverlookChip>
                    </div>
                    <div style={{ flex: 1, padding: 10 }}>
                      <div
                        style={{
                          fontSize: 9,
                          fontWeight: 600,
                          color: equity.color,
                          marginBottom: 6,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                        }}
                      >
                        <LensDot lens={equity} size={6} /> Equity
                      </div>
                      <div style={{ fontSize: 9, color: inkSecondary, lineHeight: 1.45 }}>
                        Many low-income students rely on phones for homework
                        access...
                      </div>
                      <OverlookChip>May overlook: attention costs</OverlookChip>
                    </div>
                  </div>
                  <div
                    style={{
                      padding: 8,
                      background: '#f0f6ff',
                      borderTop: `1px solid ${hairline}`,
                      fontSize: 9,
                      color: 'var(--accent)',
                      fontWeight: 500,
                      textAlign: 'center',
                    }}
                  >
                    What's your position given these tensions?
                  </div>
                </Frame>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: ink, marginBottom: 6 }}>
                B. Split View
              </h3>
              <p style={{ fontSize: 13, color: inkSecondary, lineHeight: 1.55 }}>
                "Epistemic Multiplicity." Simultaneous conflicting perspectives
                force active comparison and evaluation.
              </p>
            </div>

            {/* C. Synthesis Mode */}
            <div>
              <div style={{ aspectRatio: '3 / 3.4', marginBottom: 18 }}>
                <Frame title="Synthesis Mode" dark>
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 14,
                    }}
                  >
                    <svg width="100%" height="100%" viewBox="0 0 100 70">
                      <line x1="22" y1="22" x2="50" y2="35" stroke="#9aa0aa" strokeWidth="0.6" strokeDasharray="2,2" />
                      <line x1="80" y1="20" x2="50" y2="35" stroke="#9aa0aa" strokeWidth="0.6" strokeDasharray="2,2" />
                      <line x1="28" y1="55" x2="50" y2="35" stroke="#9aa0aa" strokeWidth="0.6" strokeDasharray="2,2" />
                      <line x1="74" y1="56" x2="50" y2="35" stroke="#9aa0aa" strokeWidth="0.6" strokeDasharray="2,2" />
                      <circle cx="22" cy="22" r="4.5" fill={LENSES[0].color} />
                      <circle cx="80" cy="20" r="4.5" fill={LENSES[1].color} />
                      <circle cx="28" cy="55" r="4.5" fill={LENSES[2].color} />
                      <circle cx="74" cy="56" r="4.5" fill={LENSES[4].color} />
                      <circle cx="50" cy="35" r="8" fill="#fff" />
                    </svg>
                  </div>
                </Frame>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: ink, marginBottom: 6 }}>
                C. Synthesis Mode
              </h3>
              <p style={{ fontSize: 13, color: inkSecondary, lineHeight: 1.55 }}>
                "Cognitive Cartography." Users archive evidence and construct a
                visual network to support their own synthesized position.
              </p>
            </div>
          </div>
        </section>

        {/* ANALYTICAL LENS FRAMEWORK */}
        <section>
          <SectionHeading eyebrow="Framework" title="Analytical lenses" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {LENSES.map((lens) => (
              <div
                key={lens.id}
                style={{
                  border: `1px solid ${hairline}`,
                  borderRadius: 12,
                  padding: 16,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <LensDot lens={lens} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: ink }}>{lens.name}</span>
                </div>
                <p style={{ fontSize: 12, color: inkSecondary, lineHeight: 1.5, marginBottom: 8 }}>
                  {lens.question}
                </p>
                <p style={{ fontSize: 11, color: inkTertiary, lineHeight: 1.5 }}>
                  Blindspot: {lens.blindspot}.
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
