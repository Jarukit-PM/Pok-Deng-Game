import express from 'express';
import { errorHandler } from './controllers/game.controller';
import gameRoutes from './routes/game.routes';

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => {
    res.status(200).json({ message: 'OK' });
});

app.use('/game', gameRoutes);

app.use(errorHandler);

export default app;