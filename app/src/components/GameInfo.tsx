import type { GameResponse } from '../types/game';

type Props = {
  game: GameResponse;
};

export function GameInfo({ game }: Props) {
  let status = '';

  if (game.state === 'WAITING_FOR_CUT') status = 'Cut the deck';
  else if (game.state === 'WAITING_FOR_BET') status = 'Place your bet';
  else if (game.state === 'WAITING_FOR_DECISION') status = 'Your turn';
  else if (game.state === 'DEALER_TURN') status = "Dealer's turn";
  else if (game.state === 'ROUND_END') status = 'Round over';

  return (
    <div className="game-info">
      <p>Balance: <b>{game.balance}</b></p>
      <p>Status: {status}</p>
      {game.state === 'ROUND_END' && game.winner && (
        <p>Winner: {game.winner}</p>
      )}
    </div>
  );
}
