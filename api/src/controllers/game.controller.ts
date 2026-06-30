import type { Request, Response, NextFunction } from 'express';
import { AppError, ERR_SESSION_NOT_FOUND } from '../errors/app-error';
import { handleAction, startGame } from '../services/game.service';
import type { ActionRequest, StartGameRequest } from '../types/game.types';
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

export function actionController(req: Request, res: Response, next: NextFunction) {
  try {
    const gameId = req.params.game_id;
    if (typeof gameId !== 'string') {
      throw ERR_SESSION_NOT_FOUND;
    }
    const body = req.body as ActionRequest;
    const session = handleAction(gameId, body);
    res.json(toGameResponse(session));
  } catch (error) {
    next(error);
  }
}
