import { useState } from 'react';
import Button from '../components/Button.jsx';
import LensDot from '../components/LensDot.jsx';
import { LENSES, REQUIRED_LENS_COUNT, EXAMPLE_QUESTION } from '../lib/lenses.js';

// Multi-lens conditions only: the participant chooses the two analytical
// lenses that will join their group chat. Each card carries an info button
// that previews how that lens actually talks.

export default function LensSelect({ onSubmit }) {
  const [selected, setSelected] = useState([]);
  const [infoLens, setInfoLens] = useState(null);

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < REQUIRED_LENS_COUNT
          ? [...prev, id]
          : prev
    );
  };

  return (
    <div className="study-page">
      <main className="study-column" style={{ maxWidth: 720 }}>
        <p className="eyebrow">Before you begin</p>
        <h1 className="section-title" style={{ marginBottom: 8 }}>
          Choose two lenses
        </h1>
        <p className="body-text" style={{ color: 'var(--ink-secondary)', marginBottom: 36 }}>
          Each lens looks at a question from a different angle. The two you
          choose will both respond to everything you ask, and you can invite
          one more during the conversation. Not sure what a lens sounds like?
          Tap the <strong>i</strong> on its card to see an example of how it
          might weigh in.
        </p>

        <div className="lens-grid">
          {LENSES.map((lens) => {
            const isSelected = selected.includes(lens.id);
            const isDisabled = !isSelected && selected.length >= REQUIRED_LENS_COUNT;
            return (
              <button
                key={lens.id}
                type="button"
                className={`lens-option ${isSelected ? 'selected' : ''}`}
                disabled={isDisabled}
                onClick={() => toggle(lens.id)}
              >
                <span className="lens-option-name">
                  <LensDot lens={lens} />
                  {lens.name}
                  <span
                    role="button"
                    tabIndex={0}
                    className="lens-info-btn"
                    aria-label={`Example of what ${lens.name} might say`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setInfoLens(lens);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        e.stopPropagation();
                        setInfoLens(lens);
                      }
                    }}
                  >
                    i
                  </span>
                </span>
                <span className="lens-option-question">{lens.question}</span>
              </button>
            );
          })}
        </div>

        <Button
          size="lg"
          disabled={selected.length !== REQUIRED_LENS_COUNT}
          onClick={() => onSubmit({ lensIds: selected })}
          style={{ marginTop: 36 }}
        >
          {selected.length === REQUIRED_LENS_COUNT
            ? 'Start the conversation'
            : `Select ${REQUIRED_LENS_COUNT - selected.length} more`}
        </Button>
      </main>

      {infoLens && (
        <div className="modal-overlay" onClick={() => setInfoLens(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="lens-profile-header">
              <div
                className="lens-chat-avatar lens-profile-avatar"
                style={{ background: infoLens.color }}
              />
              <h3 style={{ margin: 0 }}>{infoLens.name}</h3>
            </div>
            <p className="caption" style={{ marginBottom: 12 }}>
              {infoLens.question}
            </p>
            <p style={{ marginBottom: 16 }}>{infoLens.description}</p>
            <p className="caption" style={{ marginBottom: 8 }}>
              If someone asked “{EXAMPLE_QUESTION}” it might say:
            </p>
            <div className="example-chat">
              <span
                className="lens-chat-avatar example-avatar"
                style={{ background: infoLens.color }}
              />
              <div className="example-body">
                <span className="example-sender" style={{ color: infoLens.color }}>
                  {infoLens.name}
                </span>
                <div className="example-bubble">{infoLens.example}</div>
              </div>
            </div>
            <div className="modal-actions" style={{ marginTop: 22 }}>
              <Button
                variant="ghost"
                onClick={() => setInfoLens(null)}
              >
                Close
              </Button>
              {!selected.includes(infoLens.id) &&
                selected.length < REQUIRED_LENS_COUNT && (
                  <Button
                    onClick={() => {
                      toggle(infoLens.id);
                      setInfoLens(null);
                    }}
                  >
                    Choose {infoLens.name}
                  </Button>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
