import express from 'express';
import {
  checkIn,
  checkOut,
  getAttendance,
  getAttendanceSummary,
  getAttendanceById,
} from '../controllers/attendance.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/check-in', authenticateToken, checkIn);
router.post('/check-out', authenticateToken, checkOut);
router.get('/', authenticateToken, getAttendance);
router.get('/summary', authenticateToken, getAttendanceSummary);
router.get('/:id', authenticateToken, getAttendanceById);

export default router;

