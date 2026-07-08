import { useMemo, useState } from 'react';
import StudyInfo from './screens/StudyInfo.jsx';
import TransitionPage from './screens/TransitionPage.jsx';
import SessionSetup from './screens/SessionSetup.jsx';
import LensSelect from './screens/LensSelect.jsx';
import InitialTake from './screens/InitialTake.jsx';
import Session from './screens/Session.jsx';
import Completion from './screens/Completion.jsx';
import ResearcherSetup from './screens/ResearcherSetup.jsx';
import DesignsView from './screens/DesignsView.jsx';
import CaseStudyView from './screens/CaseStudyView.jsx';
import {
  getAssignment,
  getQualtricsCondFromUrl,
  clearAssignment,
  generateParticipantId,
} from './lib/assignment.js';
import { resolveRuntime } from './lib/config.js';
import { TOPIC } from './lib/study.js';

// Participant flow — two entry paths:
//
// A) Via Qualtrics (study participants):
//    Pre-reflection survey → redirect with ?pid=R_xxx&cond=standard|explorer
//    → TransitionPage → SessionSetup (platform only) → InitialTake
//    → (LensSelect if explorer) → Session → Completion → post-reflection survey
//
// B) Direct / researcher:
//    No ?pid in URL → full StudyInfo consent screen → SessionSetup → InitialTake
//    → (LensSelect if multilens) → Session → Completion
//
// The ?setup=1 URL parameter opens the researcher configuration screen.

export default function App() {
  const params = new URLSearchParams(window.location.search);

  // Read Qualtrics handoff values from the landing URL.
  const urlPid = params.get('pid') || null;
  const urlQualtricsCondRaw = getQualtricsCondFromUrl(); // 'standard' | 'explorer' | null

  const fromQualtrics = Boolean(urlPid);

  const [tab, setTab] = useState('study');
  // If arriving from Qualtrics start at 'transition'; otherwise full consent.
  const [step, setStep] = useState(fromQualtrics ? 'transition' : 'info');
  const [setupMode, setSetupMode] = useState(params.get('setup') === '1');

  const [participantId, setParticipantId] = useState(
    urlPid || generateParticipantId()
  );
  // Condition is already known from the URL when arriving from Qualtrics.
  const [condition, setCondition] = useState(
    fromQualtrics ? getAssignment() : null
  );
  // Preserve the raw Qualtrics cond value for the post-survey redirect URL.
  const [qualtricsCondRaw] = useState(urlQualtricsCondRaw);
  const [platform, setPlatform] = useState(null);
  const [lensIds, setLensIds] = useState(null);
  const [initialTake, setInitialTake] = useState('');
  const [record, setRecord] = useState(null);
  const [sessionKey, setSessionKey] = useState(0);

  const runtime = useMemo(() => resolveRuntime(), [setupMode, sessionKey]);

  const isGroup = condition && condition !== 'oracle';

  const handleSessionComplete = (sessionData) => {
    setRecord({
      participantId,
      timestamp: new Date().toISOString(),
      topic: TOPIC.id,
      condition,
      qualtricsCondRaw,
      provider: runtime.provider,
      platformSkin: platform,
      chosenLensIds: lensIds,
      initialTake,
      session: sessionData,
    });
    setStep('complete');
  };

  const restart = () => {
    clearAssignment();
    setStep('info');
    setParticipantId(generateParticipantId());
    setCondition(null);
    setPlatform(null);
    setLensIds(null);
    setInitialTake('');
    setRecord(null);
    setSessionKey((k) => k + 1);
  };

  if (setupMode) {
    return (
      <ResearcherSetup
        onDone={() => {
          const url = new URL(window.location.href);
          url.searchParams.delete('setup');
          window.history.replaceState({}, '', url);
          setSetupMode(false);
        }}
      />
    );
  }

  const inSession = tab === 'study' && step === 'session';

  return (
    <div>
      {!inSession && (
        <header className="global-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="Explorer"
              style={{ height: 26, cursor: 'pointer' }}
              onClick={() => setTab('study')}
            />
            <span style={{ width: 1, height: 18, background: 'var(--hairline)' }} />
            <span className="caption">Jiin Hur 2026</span>
          </div>
          <nav>
            {[
              { id: 'study', label: 'Study' },
              { id: 'designs', label: 'Designs' },
              { id: 'casestudy', label: 'Case Study' },
            ].map((t) => (
              <button
                key={t.id}
                className={`nav-tab ${tab === t.id ? 'active' : ''}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </header>
      )}

      {tab === 'designs' && <DesignsView />}
      {tab === 'casestudy' && <CaseStudyView />}

      {tab === 'study' && (
        <>
          {/* Path B: direct / researcher access — full consent screen */}
          {step === 'info' && (
            <StudyInfo
              onConsent={() => {
                const assigned = getAssignment();
                setCondition(assigned);
                setStep('setup');
              }}
            />
          )}

          {/* Path A: arriving from Qualtrics — brief transition only */}
          {step === 'transition' && (
            <TransitionPage onBegin={() => setStep('setup')} />
          )}

          {step === 'setup' && (
            <SessionSetup
              onSubmit={({ platform: p }) => {
                setPlatform(p);
                setStep('take');
              }}
            />
          )}

          {step === 'take' && (
            <InitialTake
              defaultValue={initialTake}
              onSubmit={({ initialTake: t }) => {
                setInitialTake(t);
                // Condition already set (from URL or consent step).
                // For the direct path, condition may still be null if
                // StudyInfo didn't run getAssignment yet — shouldn't happen
                // but guard here.
                const cond = condition || getAssignment();
                setCondition(cond);
                setStep(cond !== 'oracle' ? 'lenses' : 'session');
              }}
            />
          )}

          {step === 'lenses' && (
            <LensSelect
              onSubmit={({ lensIds: ids }) => {
                setLensIds(ids);
                setStep('session');
              }}
            />
          )}

          {step === 'session' && (
            <Session
              key={sessionKey}
              condition={condition}
              lensIds={lensIds}
              runtime={runtime}
              participantId={participantId}
              platform={platform}
              initialTake={initialTake}
              onComplete={handleSessionComplete}
              onBackToSelect={
                isGroup
                  ? () => {
                      setLensIds(null);
                      setSessionKey((k) => k + 1);
                      setStep('lenses');
                    }
                  : undefined
              }
            />
          )}

          {step === 'complete' && (
            <Completion record={record} onRestart={restart} />
          )}
        </>
      )}
    </div>
  );
}
