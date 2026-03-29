import { Router } from 'express';
import { registerAccount } from '../controllers/authControllers';

const router = Router();

router.post('/register', registerAccount);

export default router;
