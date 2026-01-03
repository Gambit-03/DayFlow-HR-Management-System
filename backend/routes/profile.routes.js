import express from 'express';
import {
  getProfile,
  updateProfile,
  getSalary,
  updateSalary,
  getSkills,
  addSkill,
  removeSkill,
  getCertifications,
  addCertification,
  updateCertification,
  deleteCertification,
} from '../controllers/profile.controller.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authenticateToken, getProfile);
router.put('/', authenticateToken, updateProfile);
router.get('/salary', authenticateToken, getSalary);
router.put('/salary', authenticateToken, authorizeRoles('ADMIN'), updateSalary);
router.get('/skills', authenticateToken, getSkills);
router.post('/skills', authenticateToken, addSkill);
router.delete('/skills/:id', authenticateToken, removeSkill);
router.get('/certifications', authenticateToken, getCertifications);
router.post('/certifications', authenticateToken, addCertification);
router.put('/certifications/:id', authenticateToken, updateCertification);
router.delete('/certifications/:id', authenticateToken, deleteCertification);

export default router;

