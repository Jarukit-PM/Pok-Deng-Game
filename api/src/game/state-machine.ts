import { ERR_INSUFFICIENT_FUNDS, ERR_INVALID_AMOUNT, ERR_INVALID_STATE } from "../errors/app-error";
import { GameSession } from "../types/game.types";
import { createDeck, cutDeck, drawCard, shuffleDeck } from "./deck";
import { calculateScore, determineWinner, isPok, resolvePayout } from "./scoring";


export function handleCut(session: GameSession, amount: number): GameSession {
    if (session.state !== 'WAITING_FOR_CUT') {
        throw ERR_INVALID_STATE;
    }
    session.deck = cutDeck(session.deck, amount);
    session.state = 'WAITING_FOR_BET';
    return session;
}

export function handleBet(session: GameSession, amount: number): GameSession {
    if (session.state !== 'WAITING_FOR_BET') {
        throw ERR_INVALID_STATE;
    }
    if (!Number.isInteger(amount) || amount <= 0) {
        throw ERR_INVALID_AMOUNT;
    }
    if (amount > session.balance) {
        throw ERR_INSUFFICIENT_FUNDS;
    }
    session.currentBet = amount;
    session.balance -= amount;
    session.playerHand = [drawCard(session.deck), drawCard(session.deck)];
    session.dealerHand = [drawCard(session.deck), drawCard(session.deck)];
    session.playerScore = calculateScore(session.playerHand);
    session.dealerScore = calculateScore(session.dealerHand);
    if (isPok(session.playerHand) || isPok(session.dealerHand)) {
        return resolveRound(session);
    } else {
        session.state = 'WAITING_FOR_DECISION';
    }
    return session;
}

export function handleDraw(session: GameSession): GameSession {
    if (session.state !== 'WAITING_FOR_DECISION') {
        throw ERR_INVALID_STATE;
    }
    session.playerHand.push(drawCard(session.deck));
    session.playerScore = calculateScore(session.playerHand);
    return handleDealerTurn(session);
}

export function handleStay(session: GameSession): GameSession {
    if (session.state !== 'WAITING_FOR_DECISION') {
        throw ERR_INVALID_STATE;
    }
    return handleDealerTurn(session);
}

export function handleDealerTurn(session: GameSession): GameSession {
    session.state = 'DEALER_TURN';
    if (session.dealerScore! < 4) {
        session.dealerHand.push(drawCard(session.deck));
        session.dealerScore = calculateScore(session.dealerHand);
    }
    return resolveRound(session);
}
export function resolveRound(session: GameSession): GameSession {
    session.state = 'ROUND_END';
    session.winner = determineWinner(session.playerScore!, session.dealerScore!);
    resolvePayout(session, session.winner);
    return session;
}

export function handleNextRound(session: GameSession): GameSession {
    if (session.state !== 'ROUND_END') {
        throw ERR_INVALID_STATE;
    }
    session.state = 'WAITING_FOR_CUT';
    session.deck = shuffleDeck(createDeck());
    session.currentBet = 0;
    session.playerHand = [];
    session.dealerHand = [];
    session.playerScore = null;
    session.dealerScore = null;
    session.winner = null;
    return session;
}