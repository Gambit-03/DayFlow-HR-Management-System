import { body, validationResult } from 'express-validator';
import { BadRequestError } from '../utils/errors.js';

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg).join(', ');
    return next(new BadRequestError(errorMessages));
  }
  next();
};

export const validateSignIn = [
  body('loginId')
    .notEmpty()
    .withMessage('Login ID or email is required')
    .trim(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  handleValidationErrors,
];

export const validateSignUp = [
  body('companyName')
    .notEmpty()
    .withMessage('Company name is required')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Company name must be at least 2 characters'),
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  body('phone')
    .optional()
    .trim()
    .isMobilePhone('any')
    .withMessage('Invalid phone number format'),
  body('role')
    .optional()
    .isIn(['ADMIN', 'HR', 'USER'])
    .withMessage('Role must be ADMIN, HR, or USER'),
  handleValidationErrors,
];

export const validateChangePassword = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .notEmpty()
    .withMessage('New password is required')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters'),
  handleValidationErrors,
];

