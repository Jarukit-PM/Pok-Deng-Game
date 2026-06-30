export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const ERR_SESSION_NOT_FOUND = new AppError(
  'ERR_SESSION_NOT_FOUND',
  'Game session not found',
  404,
);

export const ERR_INVALID_STATE = new AppError(
  'ERR_INVALID_STATE',
  'Action is not allowed in the current game state',
  400,
);

export const ERR_INSUFFICIENT_FUNDS = new AppError(
  'ERR_INSUFFICIENT_FUNDS',
  'Bet amount exceeds current balance',
  400,
);

export const ERR_INVALID_AMOUNT = new AppError(
  'ERR_INVALID_AMOUNT',
  'Invalid amount for this action',
  400,
);