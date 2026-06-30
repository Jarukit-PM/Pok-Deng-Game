import { v4 as uuidv4 } from 'uuid';
import { ERR_INVALID_AMOUNT } from '../errors/app-error';
import { saveSession } from '../store/game.store';
import type { GameSession } from '../types/game.types';

export function startGame(initialBalance: number): GameSession {
    if (!Number.isInteger(initialBalance) || initialBalance <= 0) {
        throw ERR_INVALID_AMOUNT;
    }

    const session: GameSession = {
        gameId: uuidv4(),
        state: 'WAITING_FOR_CUT',
        balance: initialBalance,
        currentBet: 0,
        deck: [],   
        playerHand: [],
        dealerHand: [],
        playerScore: null,
        dealerScore: null,
        winner: null,
    };

    saveSession(session);
    return session;
}