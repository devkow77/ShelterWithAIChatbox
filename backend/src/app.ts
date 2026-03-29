import express from 'express';
import authRoutes from './routes/authRoutes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express();

const __dirname = path.resolve();

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

const backendRoot = path.resolve();
const frontendDistPath = path.join(backendRoot, '..', 'frontend', 'dist');

app.use(express.static(frontendDistPath));

app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ message: 'API route not found' });
  }
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

export default app;
