import { useState } from 'react';
import { ErrorBanner } from './ErrorBanner';
import './game.css';

type Props = {
  loading: boolean;
  error: string | null;
  onStart: (initialBalance: number) => void;
  onClearError: () => void;
};

export function StartScreen({ loading, error, onStart, onClearError }: Props) {
  const [chips, setChips] = useState('1000');

  function handleStart(e: React.FormEvent) {
    e.preventDefault();
    onStart(Number(chips));
  }

  return (
    <div className="start-screen">
      <h1>Pok Deng</h1>
      <p>Enter starting chips</p>

      <ErrorBanner error={error} onDismiss={onClearError} />

      <form onSubmit={handleStart}>
        <label>
          Chips:{' '}
          <input
            type="number"
            value={chips}
            onChange={(e) => setChips(e.target.value)}
            disabled={loading}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Start Game'}
        </button>
      </form>
    </div>
  );
}
