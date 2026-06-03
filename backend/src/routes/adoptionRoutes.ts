import { Router } from 'express';
import {
  getAdoptions,
  getAdoptionById,
} from '../controllers/adoptionController';

const router = Router();

router.get('/', getAdoptions);
router.get('/:id', getAdoptionById);

export default router;
