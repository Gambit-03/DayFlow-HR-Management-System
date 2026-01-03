import express from 'express';
import {
  listDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from '../controllers/departments.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authenticateToken, listDepartments);
router.post('/', authenticateToken, createDepartment);
router.put('/:id', authenticateToken, updateDepartment);
router.delete('/:id', authenticateToken, deleteDepartment);

export default router;

