import type { GameResponse } from '../types/game';
import { ErrorBanner } from './ErrorBanner';
import { GameControls } from './GameControls';
import { GameInfo } from './GameInfo';
import { Hand } from './Hand';
import './game.css';

type Props = {
  game: GameResponse;
  loading: boolean;
  error: string | null;
  onCut: (amount: number) => void;
  onBet: (amount: number) => void;
  onDraw: () => void;
  onStay: () => void;
  onNextRound: () => void;
  onClearError: () => void;
};

export function GameBoard({
  game,
  loading,
  error,
  onCut,
  onBet,
  onDraw,
  onStay,
  onNextRound,
  onClearError,
}: Props) {
  const hideDealerCards =
    game.dealer_hand_visible.length === 0 &&
    game.player_hand.length > 0 &&
    game.state !== 'ROUND_END';

  return (
    <div className="game-board">
      <h1>Pok Deng</h1>

      <ErrorBanner error={error} onDismiss={onClearError} />

      <GameInfo game={game} />

      <Hand
        label="Dealer"
        cards={game.dealer_hand_visible}
        score={game.dealer_score}
        hiddenCount={hideDealerCards ? 2 : 0}
      />
      <Hand
        label="Player"
        cards={game.player_hand}
        score={game.player_score}
      />

      <GameControls
        game={game}
        loading={loading}
        onCut={onCut}
        onBet={onBet}
        onDraw={onDraw}
        onStay={onStay}
        onNextRound={onNextRound}
      />
    </div>
  );
}
