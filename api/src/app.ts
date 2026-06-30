import express from 'express';
import cors from 'cors';
import { errorHandler } from './controllers/game.controller';
import gameRoutes from './routes/game.routes';

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.get('/health', (_req, res) => {
    res.status(200).json({ message: 'OK' });
});

app.use('/game', gameRoutes);

app.use(errorHandler);

export default app;