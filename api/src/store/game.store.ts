import { GameSession } from '../types/game.types';

const sessions = new Map<string, GameSession>();

export function saveSession(session: GameSession) {
  sessions.set(session.gameId, session);
}

export function getSession(gameId: string) {
  return sessions.get(gameId);
}