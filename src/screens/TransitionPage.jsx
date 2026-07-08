import Button from '../components/Button.jsx';

// Brief transition page shown when a participant arrives from Qualtrics.
// Consent was already collected in the pre-reflection survey, so this
// screen is just a one-sentence "you're about to start the tool" bridge.

export default function TransitionPage({ onBegin }) {
  return (
    <div className="study-page">
      <main className="study-column" style={{ maxWidth: 580 }}>
        <p className="eyebrow">You're almost there</p>
        <h1 className="section-title" style={{ marginBottom: 16 }}>
          Ready to start the tool?
        </h1>
        <p className="body-text" style={{ color: 'var(--ink-secondary)', marginBottom: 12 }}>
          The conversation session takes about 10–15 minutes. You'll be
          exploring one question about AI and education with an AI tool.
        </p>
        <p className="body-text" style={{ color: 'var(--ink-secondary)', marginBottom: 36 }}>
          When you're finished, you'll be directed back to complete a short
          closing questionnaire.
        </p>
        <Button size="lg" onClick={onBegin}>
          Begin
        </Button>
      </main>
    </div>
  );
}
