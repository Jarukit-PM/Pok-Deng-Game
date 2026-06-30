import { useCallback, useState } from 'react';
import { sendAction, startGame } from '../api/gameApi';
import type { ApiErrorResponse, GameResponse } from '../types/game';

function getErrorMessage(err: unknown): string {
  if (err && typeof err === 'object' && 'message' in err) {
    return (err as ApiErrorResponse).message;
  }
  return 'Something went wrong';
}

export function useGame() {
  const [game, setGame] = useState<GameResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async (action: () => Promise<GameResponse>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await action();
      setGame(response);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  const start = useCallback(
    (initialBalance: number) => run(() => startGame(initialBalance)),
    [run],
  );

  const cut = useCallback(
    (amount: number) => {
      if (!game) return;
      return run(() => sendAction(game.game_id, { action: 'cut', amount }));
    },
    [game, run],
  );

  const bet = useCallback(
    (amount: number) => {
      if (!game) return;
      return run(() => sendAction(game.game_id, { action: 'bet', amount }));
    },
    [game, run],
  );

  const draw = useCallback(() => {
    if (!game) return;
    return run(() => sendAction(game.game_id, { action: 'draw' }));
  }, [game, run]);

  const stay = useCallback(() => {
    if (!game) return;
    return run(() => sendAction(game.game_id, { action: 'stay' }));
  }, [game, run]);

  const nextRound = useCallback(() => {
    if (!game) return;
    return run(() => sendAction(game.game_id, { action: 'next_round' }));
  }, [game, run]);

  const clearError = useCallback(() => setError(null), []);

  return {
    game,
    loading,
    error,
    start,
    cut,
    bet,
    draw,
    stay,
    nextRound,
    clearError,
  };
}
