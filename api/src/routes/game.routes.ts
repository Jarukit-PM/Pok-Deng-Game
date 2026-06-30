import { Router } from 'express';
import { actionController, startGameController } from '../controllers/game.controller';

const router = Router();


router.post('/start', startGameController);
router.post('/:game_id/action', actionController);

export default router;