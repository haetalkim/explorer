import Button from '../components/Button.jsx';
import { STUDY_INSTITUTION, PI_NAME } from '../lib/study.js';

const CASE_STUDY_URL =
  'https://docs.google.com/document/d/1MW-bfsLBKqMJBKCQn7bXTyjPAIjctHJxF8S72oDWjY8/edit?tab=t.0';

export default function CaseStudyView() {
  return (
    <div className="study-page">
      <div style={{ padding: '64px 24px 96px', maxWidth: 720, margin: '0 auto' }}>
        <p className="eyebrow">Case study</p>
        <h1 className="display-title" style={{ fontSize: 40, marginBottom: 20 }}>
          Designing AI interfaces for epistemic openness
        </h1>
        <p className="caption" style={{ fontSize: 15, marginBottom: 28 }}>
          {PI_NAME} · {STUDY_INSTITUTION}
        </p>
        <Button onClick={() => window.open(CASE_STUDY_URL, '_blank', 'noopener,noreferrer')}>
          Read the full case study
        </Button>

        <hr className="hairline-divider" />

        <div className="study-section" style={{ marginTop: 0 }}>
          <h3 style={{ fontSize: 19 }}>Abstract</h3>
          <p style={{ marginBottom: 16 }}>
            The proliferation of LLM-powered tools in education raises a
            critical question: do our interfaces encourage critical thinking
            or passive acceptance? Current chat-based AI interfaces create
            what Kuniavsky (2024) terms an "Oracle" pattern — positioning AI
            as singular truth rather than one perspective among many.
          </p>
          <p>
            This design case study examines a prototype, Explorer, that
            operationalizes epistemic flexibility. By presenting users with
            multiple analytical perspectives in conversation rather than
            collapsing complexity into singular outputs, Explorer aims to
            mitigate verification drift and encourage active synthesis.
          </p>
        </div>

        <div className="study-section">
          <h3 style={{ fontSize: 19 }}>Key ideas</h3>
          <ul>
            <li>
              <strong>Verification drift.</strong> Users progressively reduce
              critical evaluation when faced with authoritative, single-stream
              AI responses.
            </li>
            <li>
              <strong>Interface architecture.</strong> Changes in
              conversational design — a group of named perspectives versus a
              single stream — may alter the user's epistemic stance toward the
              information.
            </li>
            <li>
              <strong>Cognitive forcing.</strong> Asking users to save and
              synthesize conflicting viewpoints is designed to prevent
              premature cognitive closure.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
