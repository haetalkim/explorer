import { useState } from 'react';
import Button from '../components/Button.jsx';
import { TOPIC } from '../lib/study.js';

// Captures the participant's starting position before the chat. It becomes
// their opening message, so the conversation starts from their actual stance
// — and it doubles as an in-app baseline alongside the Qualtrics pre-survey.

export default function InitialTake({ defaultValue = '', onSubmit }) {
  const [take, setTake] = useState(defaultValue);

  return (
    <div className="study-page">
      <main className="study-column" style={{ maxWidth: 640 }}>
        <p className="eyebrow">Before you begin</p>
        <h1 className="section-title" style={{ marginBottom: 8 }}>
          What’s your take right now?
        </h1>
        <p
          className="body-text"
          style={{ color: 'var(--ink-secondary)', marginBottom: 12 }}
        >
          The question you’ll be exploring:
        </p>
        <p className="body-text" style={{ fontWeight: 600, marginBottom: 24 }}>
          “{TOPIC.prompt}”
        </p>
        <p
          className="body-text"
          style={{ color: 'var(--ink-secondary)', marginBottom: 16 }}
        >
          In a sentence or two, where do you currently stand? Your first
          instinct is fine. The same question and your answer will open
          whatever conversation tool you are assigned to next.
        </p>
        <textarea
          className="text-area"
          rows={4}
          value={take}
          onChange={(e) => setTake(e.target.value)}
          placeholder="Right now I lean toward…"
          style={{ width: '100%', marginBottom: 24 }}
        />
        <Button
          size="lg"
          disabled={take.trim().length < 10}
          onClick={() => onSubmit({ initialTake: take.trim() })}
        >
          Continue
        </Button>
      </main>
    </div>
  );
}
