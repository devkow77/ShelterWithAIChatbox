import { Router } from 'express';
import {
  createUser,
  deleteUniqueUser,
  getUniqueUser,
  getUsers,
  getWorkers,
  updatePassword,
  updateUniqueUser,
} from '../controllers/userControllers';
import {
  authenticateUser,
  authorizeRoles,
} from '../middlewares/auth.middleware';
import { Role } from '../generated/prisma/enums';

const router = Router();

router.get(
  '/',
  authenticateUser,
  authorizeRoles(Role.PRACOWNIK, Role.ADMINISTRATOR),
  getUsers,
);
router.get(
  '/workers',
  authenticateUser,
  authorizeRoles(Role.ADMINISTRATOR),
  getWorkers,
);
router.get('/:id', authenticateUser, getUniqueUser);
router.post(
  '/',
  authenticateUser,
  authorizeRoles(Role.ADMINISTRATOR),
  createUser,
);
router.patch('/:id', authenticateUser, updateUniqueUser);
router.patch('/password', authenticateUser, updatePassword);
router.delete(
  '/:id',
  authenticateUser,
  authorizeRoles(Role.ADMINISTRATOR),
  deleteUniqueUser,
);

export default router;
