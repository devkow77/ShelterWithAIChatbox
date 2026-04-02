import { Router } from 'express';
import { getAnimals } from '../controllers/animalControllers';

const router = Router();

router.get('/', getAnimals);

export default router;
