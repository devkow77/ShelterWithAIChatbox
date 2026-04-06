import { Router } from 'express';
import { updatePassword } from '../controllers/userControllers';
import { authenticateUser } from '../middlewares/auth.middleware';

const router = Router();

router.patch('/password', authenticateUser, updatePassword);

export default router;
