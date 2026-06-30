type Props = {
  error: string | null;
  onDismiss?: () => void;
};

export function ErrorBanner({ error, onDismiss }: Props) {
  if (!error) return null;

  return (
    <div className="error-banner">
      {error}
      {onDismiss && <button onClick={onDismiss}>x</button>}
    </div>
  );
}
