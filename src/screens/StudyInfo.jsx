import { useState } from 'react';
import Button from '../components/Button.jsx';
import { STUDY_TITLE, STUDY_INSTITUTION, PI_NAME, PI_EMAIL } from '../lib/study.js';

// Participant-facing study information and consent. Replaces the former
// promotional landing page. Deliberately does not reveal the condition
// comparison or the hypothesis.

export default function StudyInfo({ onConsent }) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="study-page">
      <main className="study-column">
        <p className="eyebrow">Research study</p>
        <h1 className="display-title" style={{ marginBottom: 20 }}>
          {STUDY_TITLE}
        </h1>
        <p className="body-large">
          A study on how graduate students explore contested educational
          questions in conversation with AI tools.
        </p>

        <hr className="hairline-divider" />

        <div className="study-section" style={{ marginTop: 0 }}>
          <h3>What participation involves</h3>
          <ul>
            <li>A brief setup step (under a minute).</li>
            <li>An open-ended conversation with an AI tool about one educational topic (10–15 minutes).</li>
            <li>Short questionnaires before and after the conversation, provided separately by the researcher.</li>
          </ul>
        </div>

        <div className="study-section">
          <h3>The interface</h3>
          <p>
            The conversation takes place in an interface that resembles
            familiar AI chat products. The tool you interact with is operated
            by the research team for this study.
          </p>
        </div>

        <div className="study-section">
          <h3>Your data</h3>
          <p>
            Your responses and conversation transcript are recorded under an
            anonymous participant code. No personally identifying information
            is collected. Participation is voluntary and you may stop at any
            time.
          </p>
        </div>

        <div className="study-section">
          <h3>Researcher</h3>
          <p>
            {PI_NAME}, {STUDY_INSTITUTION}. Questions about this study can be
            directed to {PI_EMAIL}.
          </p>
        </div>

        <hr className="hairline-divider" />

        <label className="checkbox-row" style={{ marginBottom: 32 }}>
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span>
            I have read the information above, I am 18 or older, and I agree
            to participate in this study.
          </span>
        </label>

        <Button size="lg" disabled={!agreed} onClick={onConsent}>
          Begin
        </Button>
      </main>
    </div>
  );
}
