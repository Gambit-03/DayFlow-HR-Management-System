import prisma from '../prisma/client.js';
import {
  calculateWorkHours,
  calculateExtraHours,
  formatTime,
  formatDate,
} from '../services/attendance.service.js';
import { BadRequestError, NotFoundError, ForbiddenError } from '../utils/errors.js';

export const checkIn = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingAttendance = await prisma.attendance.findUnique({
      where: {
        userId_date: {
          userId,
          date: today,
        },
      },
    });

    if (existingAttendance && existingAttendance.checkIn) {
      return next(new BadRequestError('Already checked in today'));
    }

    const checkInTime = new Date();

    let attendance;
    if (existingAttendance) {
      attendance = await prisma.attendance.update({
        where: { id: existingAttendance.id },
        data: {
          checkIn: checkInTime,
          status: 'PRESENT',
        },
      });
    } else {
      attendance = await prisma.attendance.create({
        data: {
          userId,
          date: today,
          checkIn: checkInTime,
          status: 'PRESENT',
        },
      });
    }

    res.status(200).json({
      success: true,
      data: attendance,
      message: 'Checked in successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const checkOut = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await prisma.attendance.findUnique({
      where: {
        userId_date: {
          userId,
          date: today,
        },
      },
    });

    if (!attendance) {
      return next(new BadRequestError('No check-in found for today'));
    }

    if (attendance.checkOut) {
      return next(new BadRequestError('Already checked out today'));
    }

    const checkOutTime = new Date();
    const breakTime = req.body.breakTime
      ? parseFloat(req.body.breakTime)
      : attendance.breakTime
        ? attendance.breakTime.toNumber()
        : 0;

    const workHours = calculateWorkHours(
      attendance.checkIn,
      checkOutTime,
      breakTime
    );
    const extraHours = calculateExtraHours(workHours, 8);

    const updatedAttendance = await prisma.attendance.update({
      where: { id: attendance.id },
      data: {
        checkOut: checkOutTime,
        workHours,
        extraHours,
        breakTime: breakTime,
      },
    });

    res.status(200).json({
      success: true,
      data: updatedAttendance,
      message: 'Checked out successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getAttendance = async (req, res, next) => {
  try {
    const { month, year, userId: queryUserId } = req.query;
    const userId = queryUserId ? parseInt(queryUserId) : req.user.id;

    if (
      req.user.role !== 'ADMIN' &&
      req.user.role !== 'HR' &&
      req.user.id !== userId
    ) {
      return next(new ForbiddenError('Access denied'));
    }

    const startDate = month && year
      ? new Date(parseInt(year), parseInt(month) - 1, 1)
      : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endDate = month && year
      ? new Date(parseInt(year), parseInt(month), 0)
      : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

    const where = {
      userId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    };

    if (req.user.role === 'ADMIN' || req.user.role === 'HR') {
      if (req.query.date) {
        const queryDate = new Date(req.query.date);
        queryDate.setHours(0, 0, 0, 0);
        where.date = queryDate;
        delete where.date.gte;
        delete where.date.lte;
      }
    }

    const attendances = await prisma.attendance.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            profilePictureUrl: true,
          },
        },
      },
      orderBy: { date: 'desc' },
    });

    res.status(200).json({
      success: true,
      data: attendances,
    });
  } catch (error) {
    next(error);
  }
};

export const getAttendanceSummary = async (req, res, next) => {
  try {
    const { month, year } = req.query;
    const userId = req.user.id;

    const startDate = month && year
      ? new Date(parseInt(year), parseInt(month) - 1, 1)
      : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endDate = month && year
      ? new Date(parseInt(year), parseInt(month), 0)
      : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

    const attendances = await prisma.attendance.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const daysPresent = attendances.filter(a => a.status === 'PRESENT').length;
    const leavesCount = attendances.filter(a => a.status === 'ON_LEAVE').length;
    const totalWorkingDays = new Date(endDate - startDate).getDate() + 1;

    res.status(200).json({
      success: true,
      data: {
        daysPresent,
        leavesCount,
        totalWorkingDays,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAttendanceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const attendanceId = parseInt(id);

    const attendance = await prisma.attendance.findUnique({
      where: { id: attendanceId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!attendance) {
      return next(new NotFoundError('Attendance record not found'));
    }

    if (
      req.user.role !== 'ADMIN' &&
      req.user.role !== 'HR' &&
      req.user.id !== attendance.userId
    ) {
      return next(new ForbiddenError('Access denied'));
    }

    res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
};

