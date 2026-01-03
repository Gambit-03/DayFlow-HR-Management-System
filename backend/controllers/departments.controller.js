import prisma from '../prisma/client.js';
import { NotFoundError, ForbiddenError } from '../utils/errors.js';

export const listDepartments = async (req, res, next) => {
  try {
    const departments = await prisma.department.findMany({
      where: { companyId: req.user.companyId },
      include: {
        _count: {
          select: { employees: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    res.status(200).json({
      success: true,
      data: departments,
    });
  } catch (error) {
    next(error);
  }
};

export const createDepartment = async (req, res, next) => {
  try {
    if (req.user.role !== 'ADMIN' && req.user.role !== 'HR') {
      return next(new ForbiddenError('Only Admin or HR can create departments'));
    }

    const { name, description } = req.body;

    const department = await prisma.department.create({
      data: {
        name,
        description: description || null,
        companyId: req.user.companyId,
      },
    });

    res.status(201).json({
      success: true,
      data: department,
    });
  } catch (error) {
    next(error);
  }
};

export const updateDepartment = async (req, res, next) => {
  try {
    if (req.user.role !== 'ADMIN' && req.user.role !== 'HR') {
      return next(new ForbiddenError('Only Admin or HR can update departments'));
    }

    const { id } = req.params;
    const departmentId = parseInt(id);

    const department = await prisma.department.findUnique({
      where: { id: departmentId },
    });

    if (!department || department.companyId !== req.user.companyId) {
      return next(new NotFoundError('Department not found'));
    }

    const updatedDepartment = await prisma.department.update({
      where: { id: departmentId },
      data: {
        name: req.body.name,
        description: req.body.description,
      },
    });

    res.status(200).json({
      success: true,
      data: updatedDepartment,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDepartment = async (req, res, next) => {
  try {
    if (req.user.role !== 'ADMIN') {
      return next(new ForbiddenError('Only Admin can delete departments'));
    }

    const { id } = req.params;
    const departmentId = parseInt(id);

    const department = await prisma.department.findUnique({
      where: { id: departmentId },
    });

    if (!department || department.companyId !== req.user.companyId) {
      return next(new NotFoundError('Department not found'));
    }

    await prisma.department.delete({
      where: { id: departmentId },
    });

    res.status(200).json({
      success: true,
      message: 'Department deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

