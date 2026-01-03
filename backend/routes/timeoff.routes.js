import express from 'express';
import {
  getTimeOffTypes,
  getAllocations,
  getTimeOffRequests,
  createTimeOffRequest,
  approveTimeOffRequest,
  rejectTimeOffRequest,
  getTimeOffRequestById,
} from '../controllers/timeoff.controller.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/types', authenticateToken, getTimeOffTypes);
router.get('/allocations', authenticateToken, getAllocations);
router.get('/requests', authenticateToken, getTimeOffRequests);
router.post('/requests', authenticateToken, createTimeOffRequest);
router.put('/requests/:id/approve', authenticateToken, authorizeRoles('ADMIN', 'HR'), approveTimeOffRequest);
router.put('/requests/:id/reject', authenticateToken, authorizeRoles('ADMIN', 'HR'), rejectTimeOffRequest);
router.get('/requests/:id', authenticateToken, getTimeOffRequestById);

export default router;

