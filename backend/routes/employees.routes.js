import express from 'express';
import {
  listEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  getEmployeeAttendance,
  getEmployeeTimeOff,
} from '../controllers/employees.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authenticateToken, listEmployees);
router.get('/:id', authenticateToken, getEmployee);
router.post('/', authenticateToken, createEmployee);
router.put('/:id', authenticateToken, updateEmployee);
router.get('/:id/attendance', authenticateToken, getEmployeeAttendance);
router.get('/:id/time-off', authenticateToken, getEmployeeTimeOff);

export default router;

