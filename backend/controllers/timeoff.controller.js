import prisma from '../prisma/client.js';
import {
  calculateDays,
  checkAllocationAvailability,
  updateAllocationUsage,
} from '../services/timeoff.service.js';
import {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} from '../utils/errors.js';

export const getTimeOffTypes = async (req, res, next) => {
  try {
    const timeOffTypes = await prisma.timeOffType.findMany({
      where: { companyId: req.user.companyId },
      orderBy: { name: 'asc' },
    });

    res.status(200).json({
      success: true,
      data: timeOffTypes,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllocations = async (req, res, next) => {
  try {
    const { year } = req.query;
    const currentYear = year ? parseInt(year) : new Date().getFullYear();
    const userId = req.user.id;

    const allocations = await prisma.timeOffAllocation.findMany({
      where: {
        userId,
        year: currentYear,
      },
      include: {
        timeOffType: true,
      },
    });

    const formattedAllocations = allocations.map(allocation => ({
      ...allocation,
      availableDays: allocation.allocatedDays.toNumber() - allocation.usedDays.toNumber(),
    }));

    res.status(200).json({
      success: true,
      data: formattedAllocations,
    });
  } catch (error) {
    next(error);
  }
};

export const getTimeOffRequests = async (req, res, next) => {
  try {
    const where = {};

    if (req.user.role === 'USER') {
      where.userId = req.user.id;
    } else {
      where.user = {
        companyId: req.user.companyId,
      };
    }

    if (req.query.status) {
      where.status = req.query.status;
    }

    const requests = await prisma.timeOffRequest.findMany({
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
        timeOffType: true,
        approvedByUser: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (error) {
    next(error);
  }
};

export const createTimeOffRequest = async (req, res, next) => {
  try {
    const { timeOffTypeId, startDate, endDate, reason, attachmentUrl } = req.body;
    const userId = req.user.id;

    const timeOffType = await prisma.timeOffType.findUnique({
      where: { id: parseInt(timeOffTypeId) },
    });

    if (!timeOffType) {
      return next(new NotFoundError('Time off type not found'));
    }

    if (timeOffType.companyId !== req.user.companyId) {
      return next(new ForbiddenError('Access denied'));
    }

    const allocationCheck = await checkAllocationAvailability(
      userId,
      parseInt(timeOffTypeId),
      startDate,
      endDate
    );

    const allocation = calculateDays(startDate, endDate);

    const request = await prisma.timeOffRequest.create({
      data: {
        userId,
        timeOffTypeId: parseInt(timeOffTypeId),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        allocation,
        reason: reason || null,
        attachmentUrl: attachmentUrl || null,
        status: 'PENDING',
      },
      include: {
        timeOffType: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      data: request,
      message: 'Time off request created successfully',
    });
  } catch (error) {
    if (error.message.includes('allocation')) {
      return next(new BadRequestError(error.message));
    }
    next(error);
  }
};

export const approveTimeOffRequest = async (req, res, next) => {
  try {
    if (req.user.role !== 'ADMIN' && req.user.role !== 'HR') {
      return next(new ForbiddenError('Only Admin or HR can approve requests'));
    }

    const { id } = req.params;
    const requestId = parseInt(id);

    const request = await prisma.timeOffRequest.findUnique({
      where: { id: requestId },
      include: {
        user: {
          select: {
            companyId: true,
          },
        },
      },
    });

    if (!request) {
      return next(new NotFoundError('Time off request not found'));
    }

    if (request.user.companyId !== req.user.companyId) {
      return next(new ForbiddenError('Access denied'));
    }

    if (request.status !== 'PENDING') {
      return next(new BadRequestError('Request has already been processed'));
    }

    await updateAllocationUsage(
      request.userId,
      request.timeOffTypeId,
      request.allocation,
      'add'
    );

    const updatedRequest = await prisma.timeOffRequest.update({
      where: { id: requestId },
      data: {
        status: 'APPROVED',
        approvedBy: req.user.id,
        approvedAt: new Date(),
      },
      include: {
        timeOffType: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        approvedByUser: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: updatedRequest,
      message: 'Time off request approved',
    });
  } catch (error) {
    next(error);
  }
};

export const rejectTimeOffRequest = async (req, res, next) => {
  try {
    if (req.user.role !== 'ADMIN' && req.user.role !== 'HR') {
      return next(new ForbiddenError('Only Admin or HR can reject requests'));
    }

    const { id } = req.params;
    const requestId = parseInt(id);

    const request = await prisma.timeOffRequest.findUnique({
      where: { id: requestId },
      include: {
        user: {
          select: {
            companyId: true,
          },
        },
      },
    });

    if (!request) {
      return next(new NotFoundError('Time off request not found'));
    }

    if (request.user.companyId !== req.user.companyId) {
      return next(new ForbiddenError('Access denied'));
    }

    if (request.status !== 'PENDING') {
      return next(new BadRequestError('Request has already been processed'));
    }

    const updatedRequest = await prisma.timeOffRequest.update({
      where: { id: requestId },
      data: {
        status: 'REJECTED',
        approvedBy: req.user.id,
        approvedAt: new Date(),
      },
      include: {
        timeOffType: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        approvedByUser: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: updatedRequest,
      message: 'Time off request rejected',
    });
  } catch (error) {
    next(error);
  }
};

export const getTimeOffRequestById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const requestId = parseInt(id);

    const request = await prisma.timeOffRequest.findUnique({
      where: { id: requestId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            companyId: true,
          },
        },
        timeOffType: true,
        approvedByUser: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!request) {
      return next(new NotFoundError('Time off request not found'));
    }

    if (
      req.user.role !== 'ADMIN' &&
      req.user.role !== 'HR' &&
      req.user.id !== request.userId
    ) {
      return next(new ForbiddenError('Access denied'));
    }

    res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error) {
    next(error);
  }
};

