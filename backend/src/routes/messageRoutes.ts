import { Router } from 'express';
import { sendContactMessage } from '../controllers/messageControllers';

const router = Router();

router.post('/', sendContactMessage);

export default router;
