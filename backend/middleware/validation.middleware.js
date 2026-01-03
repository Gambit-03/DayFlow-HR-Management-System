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

export const validateEmployee = [
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

export const validateTimeOffRequest = [
  body('timeOffTypeId')
    .notEmpty()
    .withMessage('Time off type is required')
    .isInt()
    .withMessage('Time off type must be a valid ID'),
  body('startDate')
    .notEmpty()
    .withMessage('Start date is required')
    .isISO8601()
    .withMessage('Invalid start date format'),
  body('endDate')
    .notEmpty()
    .withMessage('End date is required')
    .isISO8601()
    .withMessage('Invalid end date format'),
  body('reason')
    .optional()
    .trim(),
  handleValidationErrors,
];

export const validateDepartment = [
  body('name')
    .notEmpty()
    .withMessage('Department name is required')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Department name must be at least 2 characters'),
  body('description')
    .optional()
    .trim(),
  handleValidationErrors,
];

export const validateLocation = [
  body('name')
    .notEmpty()
    .withMessage('Location name is required')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Location name must be at least 2 characters'),
  body('address')
    .optional()
    .trim(),
  body('city')
    .optional()
    .trim(),
  body('state')
    .optional()
    .trim(),
  body('country')
    .optional()
    .trim(),
  handleValidationErrors,
];

export const validateSalary = [
  body('userId')
    .notEmpty()
    .withMessage('User ID is required')
    .isInt()
    .withMessage('User ID must be a valid integer'),
  body('monthWage')
    .notEmpty()
    .withMessage('Month wage is required')
    .isFloat({ min: 0 })
    .withMessage('Month wage must be a positive number'),
  body('yearlyWage')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Yearly wage must be a positive number'),
  body('workingDaysPerWeek')
    .optional()
    .isFloat({ min: 1, max: 7 })
    .withMessage('Working days per week must be between 1 and 7'),
  body('breakTime')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Break time must be a positive number'),
  handleValidationErrors,
];

