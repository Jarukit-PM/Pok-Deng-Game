import { ERR_INVALID_AMOUNT, ERR_INVALID_STATE } from "../errors/app-error";
import { Card } from "../types/game.types";

const SUITS = ['Spades', 'Hearts', 'Diamonds', 'Clubs'] as const;
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] as const;

export type Rank = (typeof RANKS)[number];

export function createDeck(): Card[] {
    return SUITS.flatMap(suit => RANKS.map(rank => ({ suit, rank, value: getCardValue(rank) })));
}

export function getCardValue(rank: Rank): number {
    if (rank === 'A') return 1;
    if (rank === '10' || rank === 'J' || rank === 'Q' || rank === 'K') return 0;
    return parseInt(rank, 10);
}

export function shuffleDeck(deck: Card[]): Card[] {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

export function cutDeck(deck: Card[], amount: number): Card[] {
    if (!Number.isInteger(amount) || amount < 1 || amount >= deck.length) {
        throw ERR_INVALID_AMOUNT;
    }
    return deck.slice(amount).concat(deck.slice(0, amount));
}

export function drawCard(deck: Card[]): Card {
    if (deck.length === 0) {
        throw ERR_INVALID_STATE;
    }
    return deck.shift()!;
}


