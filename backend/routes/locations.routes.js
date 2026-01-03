import express from 'express';
import {
  listLocations,
  createLocation,
  updateLocation,
  deleteLocation,
} from '../controllers/locations.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authenticateToken, listLocations);
router.post('/', authenticateToken, createLocation);
router.put('/:id', authenticateToken, updateLocation);
router.delete('/:id', authenticateToken, deleteLocation);

export default router;

