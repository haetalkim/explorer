// A lens's identity mark: a small solid color dot. Replaces icons.

export default function LensDot({ lens, size = 10 }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: '50%',
        background: lens.color,
        flexShrink: 0,
      }}
    />
  );
}
