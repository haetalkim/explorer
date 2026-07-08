import { useState } from 'react';
import Button from '../components/Button.jsx';
import { OptionList } from '../components/SurveyControls.jsx';
import { PLATFORMS } from '../lib/study.js';

// Platform question only. The participant code now arrives silently from
// the Qualtrics URL (?pid=...) so there is nothing to enter here.

export default function SessionSetup({ onSubmit }) {
  const [platform, setPlatform] = useState(null);

  return (
    <div className="study-page">
      <main className="study-column">
        <p className="eyebrow">Before you begin</p>
        <h1 className="section-title" style={{ marginBottom: 40 }}>
          One quick question
        </h1>

        <div className="field">
          <span className="field-label">
            Which AI assistant do you use most often?
          </span>
          <p className="field-hint">
            Your answer helps us tailor the session environment.
          </p>
          <OptionList options={PLATFORMS} value={platform} onChange={setPlatform} />
        </div>

        <Button
          size="lg"
          disabled={!platform}
          onClick={() => onSubmit({ platform })}
        >
          Continue
        </Button>
      </main>
    </div>
  );
}
