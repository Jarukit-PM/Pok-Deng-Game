import type { GameResponse, GameSession } from '../types/game.types';

export function toGameResponse(session: GameSession): GameResponse {
  const isRoundEnd = session.state === 'ROUND_END';

  return {
    game_id: session.gameId,
    state: session.state,
    balance: session.balance,
    player_hand: session.playerHand,
    dealer_hand_visible: isRoundEnd ? session.dealerHand : [],
    player_score: session.playerScore,
    dealer_score: isRoundEnd ? session.dealerScore : null,
    winner: session.winner,
  };
}
