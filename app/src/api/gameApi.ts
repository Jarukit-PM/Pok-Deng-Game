import type { ActionRequest, ApiErrorResponse, GameResponse } from '../types/game';
import { API_URL } from './config';

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();
  if (!response.ok) {
    throw data as ApiErrorResponse;
  }
  return data as T;
}

export async function startGame(initialBalance: number): Promise<GameResponse> {
  const response = await fetch(`${API_URL}/game/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ initial_balance: initialBalance }),
  });
  return handleResponse<GameResponse>(response);
}

export async function sendAction(gameId: string, body: ActionRequest): Promise<GameResponse> {
  const response = await fetch(`${API_URL}/game/${gameId}/action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return handleResponse<GameResponse>(response);
}
