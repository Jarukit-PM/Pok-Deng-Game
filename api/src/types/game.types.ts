export type GameState = 'WAITING_FOR_CUT' | 'WAITING_FOR_BET' | 'WAITING_FOR_DECISION' | 'DEALER_TURN' | 'ROUND_END';

export interface Card {
    rank: string;
    suit: string;
    value: number;
}

export type Winner = 'Player' | 'Dealer' | 'Tie';

export interface GameSession {
    gameId: string;
    state: GameState;
    balance: number;
    currentBet: number;
    deck: Card[];
    playerHand: Card[];
    dealerHand: Card[];
    playerScore: number | null;
    dealerScore: number | null;
    winner: Winner | null;
}

export interface GameResponse {
    game_id: string;
    state: GameState;
    balance: number;
    player_hand: Card[];
    dealer_hand_visible: Card[];
    player_score: number | null;
    dealer_score: number | null;
    winner: Winner | null;
}

export interface StartGameRequest {
    initial_balance: number;
}