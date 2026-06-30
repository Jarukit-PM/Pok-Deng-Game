import { Router } from 'express';
import { startGameController } from '../controllers/game.controller';

const router = Router();

router.post('/start', startGameController);

export default router;