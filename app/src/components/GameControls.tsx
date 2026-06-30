import { useState } from 'react';
import type { GameResponse } from '../types/game';

type Props = {
  game: GameResponse;
  loading: boolean;
  onCut: (amount: number) => void;
  onBet: (amount: number) => void;
  onDraw: () => void;
  onStay: () => void;
  onNextRound: () => void;
};

export function GameControls({ game, loading, onCut, onBet, onDraw, onStay, onNextRound }: Props) {
  const [cutAmount, setCutAmount] = useState('10');
  const [betAmount, setBetAmount] = useState('100');

  if (game.state === 'DEALER_TURN') {
    return <p>Dealer is playing...</p>;
  }

  if (game.state === 'WAITING_FOR_CUT') {
    return (
      <div>
        <label>
          Cut at:{' '}
          <input
            type="number"
            value={cutAmount}
            onChange={(e) => setCutAmount(e.target.value)}
            disabled={loading}
          />
        </label>
        <button disabled={loading} onClick={() => onCut(Number(cutAmount))}>
          Cut
        </button>
      </div>
    );
  }

  if (game.state === 'WAITING_FOR_BET') {
    return (
      <div>
        <label>
          Bet:{' '}
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            disabled={loading}
          />
        </label>
        <button disabled={loading} onClick={() => onBet(Number(betAmount))}>
          Bet
        </button>
      </div>
    );
  }

  if (game.state === 'WAITING_FOR_DECISION') {
    return (
      <div>
        <button disabled={loading} onClick={onDraw}>Draw</button>
        <button disabled={loading} onClick={onStay}>Stay</button>
      </div>
    );
  }

  if (game.state === 'ROUND_END') {
    return (
      <button disabled={loading} onClick={onNextRound}>
        Play Next Round
      </button>
    );
  }

  return null;
}
