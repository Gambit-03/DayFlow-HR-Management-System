import express from 'express';
import {
  signIn,
  signUp,
  changePassword,
  getCurrentUser,
} from '../controllers/auth.controller.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';
import {
  validateSignIn,
  validateSignUp,
  validateChangePassword,
} from '../middleware/validation.middleware.js';

const router = express.Router();

router.post('/signin', validateSignIn, signIn);

router.post(
  '/signup',
  authenticateToken,
  authorizeRoles('ADMIN', 'HR'),
  validateSignUp,
  signUp
);

router.post(
  '/change-password',
  authenticateToken,
  validateChangePassword,
  changePassword
);

router.get('/me', authenticateToken, getCurrentUser);

export default router;

