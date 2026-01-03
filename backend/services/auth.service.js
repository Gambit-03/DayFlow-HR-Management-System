import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client.js';

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export const generateLoginId = (companyCode, firstName, lastName, joinYear, serialNumber) => {
  const nameInitials = 
    firstName.substring(0, 2).toUpperCase() + 
    lastName.substring(0, 2).toUpperCase();
  
  const serial = serialNumber.toString().padStart(4, '0');
  
  return `LOI${companyCode}${nameInitials}${joinYear}${serial}`;
};

export const generatePassword = () => {
  const length = 12;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  
  return password;
};

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

export const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

export const getNextSerialNumber = async (companyId, joinYear) => {
  const lastUser = await prisma.user.findFirst({
    where: {
      companyId,
      joinYear,
    },
    orderBy: {
      serialNumber: 'desc',
    },
  });

  return lastUser ? lastUser.serialNumber + 1 : 1;
};

