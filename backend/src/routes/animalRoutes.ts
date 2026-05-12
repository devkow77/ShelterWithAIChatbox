import { Router } from 'express';
import {
  deleteUniqueAnimal,
  getAnimals,
  getUniqueAnimal,
  updateUniqueAnimal,
} from '../controllers/animalControllers';

const router = Router();

router.get('/', getAnimals);
router.get('/:id', getUniqueAnimal);
router.patch('/:id', updateUniqueAnimal);
router.delete('/:id', deleteUniqueAnimal);

export default router;
