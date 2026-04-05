import { Router } from 'express';
import { sendContactMessage } from '../controllers/messageControllers';
import { optionalAuthenticateUser } from '../middlewares/optionalAuth.middleware';

const router = Router();

router.post('/', optionalAuthenticateUser, sendContactMessage);

export default router;
