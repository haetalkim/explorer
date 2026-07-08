// Single-select option list (radio-style rows).

export function OptionList({ options, value, onChange }) {
  return (
    <div className="option-list">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          className={`option-row ${value === opt.id ? 'selected' : ''}`}
          onClick={() => onChange(opt.id)}
        >
          <span className="option-radio" aria-hidden="true" />
          {opt.name}
        </button>
      ))}
    </div>
  );
}
