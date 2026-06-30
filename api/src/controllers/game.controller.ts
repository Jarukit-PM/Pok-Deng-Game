import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/app-error';
import { startGame } from '../services/game.service';
import type { StartGameRequest } from '../types/game.types';
import { toGameResponse } from '../utils/response.mapper';

export function startGameController(req: Request, res: Response, next: NextFunction) {
  try {
    const { initial_balance } = req.body as StartGameRequest;
    const session = startGame(initial_balance);
    res.status(201).json(toGameResponse(session));
  } catch (error) {
    next(error);
  }
}

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      error: error.code,
      message: error.message,
    });
    return;
  }

  console.error(error);
  res.status(500).json({
    error: 'ERR_INTERNAL',
    message: 'Internal server error',
  });
}
