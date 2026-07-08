// Flat, Apple-style buttons: filled pill for primary actions,
// quiet text/outline styles for everything else. No gradients, no glows.

export default function Button({
  children,
  onClick,
  disabled,
  variant = 'primary',
  size = 'md',
  style,
  type = 'button',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} btn-${size}`}
      style={style}
    >
      {children}
    </button>
  );
}
