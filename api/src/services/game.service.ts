import { v4 as uuidv4 } from 'uuid';
import { ERR_INVALID_AMOUNT, ERR_SESSION_NOT_FOUND } from '../errors/app-error';
import { saveSession, getSession} from '../store/game.store';
import type { ActionRequest, GameSession } from '../types/game.types';
import { shuffleDeck, createDeck } from '../game/deck';

export function startGame(initialBalance: number): GameSession {
    if (!Number.isInteger(initialBalance) || initialBalance <= 0) {
        throw ERR_INVALID_AMOUNT;
    }

    const session: GameSession = {
        gameId: uuidv4(),
        state: 'WAITING_FOR_CUT',
        balance: initialBalance,
        currentBet: 0,
        deck: shuffleDeck(createDeck()),   
        playerHand: [],
        dealerHand: [],
        playerScore: null,
        dealerScore: null,
        winner: null,
    };

    saveSession(session);
    return session;
}

export function handleAction(gameId: string, body: ActionRequest){
    const session = getSession(gameId);
    if (!session) {
        throw ERR_SESSION_NOT_FOUND;
    }

    switch (body.action) {
        case 'cut':
            // TODO: Implement cut logic
            break;
        case 'bet':
            // TODO: Implement bet logic
            break;
        case 'draw':
            // TODO: Implement draw logic
            break;
        case 'stay':
            // TODO: Implement stay logic
            break;
        case 'next_round':
            // TODO: Implement next round logic
            break;
    }
    saveSession(session);
    return session;
}