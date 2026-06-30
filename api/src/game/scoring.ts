import { Card, GameSession, Winner } from "../types/game.types";

export function calculateScore(hand: Card[]): number {
    return hand.reduce((acc, card) => acc + card.value, 0) % 10;
}

export function isPok(hand: Card[]): boolean {
    if (hand.length !== 2) {
        return false;
    }
    return calculateScore(hand.slice(0, 2)) === 8 || calculateScore(hand.slice(0, 2)) === 9;
}

export function determineWinner(playerScore: number, dealerScore: number): Winner {
    if (playerScore > dealerScore) {
        return 'Player';
    } else if (playerScore < dealerScore) {
        return 'Dealer';
    } else {
        return 'Tie';
    }
}

export function resolvePayout(session: GameSession, winner: Winner): void {
    if (winner === 'Player') {
        session.balance += session.currentBet * 2;
    } else if (winner === 'Tie') {
        session.balance += session.currentBet;
    }
    // If 'Dealer', player already lost their bet, so nothing to add.
}


