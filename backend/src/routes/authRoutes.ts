import { Router } from 'express';
import {
  registerAccount,
  loginToAccount,
  authInfo,
  logout,
  generateTwoFactorQR,
} from '../controllers/authControllers';
import { authenticateUser } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', registerAccount);
router.post('/login', loginToAccount);
router.get('/info', authenticateUser, authInfo);
router.post('/logout', authenticateUser, logout);
router.get('/2fa/setup', authenticateUser, generateTwoFactorQR);

export default router;
