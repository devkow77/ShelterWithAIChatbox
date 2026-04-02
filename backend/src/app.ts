import express from 'express';
import authRoutes from './routes/authRoutes';
import animalRoutes from './routes/animalRoutes';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://shelter-with-ai-chatbox.vercel.app'
        : 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/animals', animalRoutes);

export default app;
