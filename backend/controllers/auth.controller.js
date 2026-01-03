import prisma from '../prisma/client.js';
import {
  generateLoginId,
  generatePassword,
  hashPassword,
  comparePassword,
  generateToken,
  getNextSerialNumber,
} from '../services/auth.service.js';
import { UnauthorizedError, BadRequestError, NotFoundError } from '../utils/errors.js';

export const signIn = async (req, res, next) => {
  try {
    const { loginId, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { loginId: loginId },
          { email: loginId },
        ],
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });

    if (!user) {
      return next(new UnauthorizedError('Invalid login credentials'));
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return next(new UnauthorizedError('Invalid login credentials'));
    }

    const token = generateToken(user.id);

    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      success: true,
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};

export const signUp = async (req, res, next) => {
  try {
    const { companyName, name, email, phone, role = 'USER' } = req.body;

    const requestingUser = req.user;
    
    if (!requestingUser || (requestingUser.role !== 'ADMIN' && requestingUser.role !== 'HR')) {
      return next(new UnauthorizedError('Only Admin or HR can create users'));
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { loginId: email },
        ],
      },
    });

    if (existingUser) {
      return next(new BadRequestError('User with this email already exists'));
    }

    let company = await prisma.company.findFirst({
      where: { name: companyName },
    });

    if (!company) {
      const companyCode = companyName
        .split(' ')
        .map(word => word.substring(0, 2).toUpperCase())
        .join('')
        .substring(0, 2);

      company = await prisma.company.create({
        data: {
          name: companyName,
          code: companyCode,
        },
      });
    }

    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || firstName;
    const joinYear = new Date().getFullYear();
    const serialNumber = await getNextSerialNumber(company.id, joinYear);

    const loginId = generateLoginId(
      company.code,
      firstName,
      lastName,
      joinYear,
      serialNumber
    );

    const generatedPassword = generatePassword();
    const hashedPassword = await hashPassword(generatedPassword);

    const user = await prisma.user.create({
      data: {
        loginId,
        email,
        name,
        phone: phone || null,
        password: hashedPassword,
        role,
        companyId: company.id,
        joinYear,
        serialNumber,
        isFirstLogin: true,
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      success: true,
      user: userWithoutPassword,
      loginId,
      generatedPassword,
      message: 'User created successfully. Please share the login ID and generated password with the user.',
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    const isPasswordValid = await comparePassword(currentPassword, user.password);

    if (!isPasswordValid) {
      return next(new UnauthorizedError('Current password is incorrect'));
    }

    const hashedNewPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedNewPassword,
        isFirstLogin: false,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        loginId: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        companyId: true,
        isFirstLogin: true,
        joinYear: true,
        serialNumber: true,
        createdAt: true,
        updatedAt: true,
        company: {
          select: {
            id: true,
            name: true,
            code: true,
            logoUrl: true,
          },
        },
      },
    });

    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

