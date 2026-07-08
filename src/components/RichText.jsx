// Renders the markdown subset the assistants produce:
// **bold**, bold-only heading lines, and "- " bullets.

function InlineBold({ text }) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      part
    )
  );
}

export default function RichText({ text }) {
  if (!text) return null;
  return text.split('\n').map((line, i) => {
    const t = line.trim();
    if (!t) return <div key={i} className="rt-gap" />;
    if (t.startsWith('**') && t.endsWith('**') && !t.slice(2, -2).includes('**')) {
      return (
        <p key={i} className="rt-heading">
          {t.slice(2, -2)}
        </p>
      );
    }
    if (t.startsWith('- ') || t.startsWith('• ') || t.startsWith('* ')) {
      return (
        <div key={i} className="rt-bullet">
          <span className="rt-bullet-dot">•</span>
          <span>
            <InlineBold text={t.slice(2)} />
          </span>
        </div>
      );
    }
    return (
      <p key={i} className="rt-para">
        <InlineBold text={t} />
      </p>
    );
  });
}
