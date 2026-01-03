import prisma from '../prisma/client.js';
import { NotFoundError, ForbiddenError } from '../utils/errors.js';

export const listLocations = async (req, res, next) => {
  try {
    const locations = await prisma.location.findMany({
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
      data: locations,
    });
  } catch (error) {
    next(error);
  }
};

export const createLocation = async (req, res, next) => {
  try {
    if (req.user.role !== 'ADMIN' && req.user.role !== 'HR') {
      return next(new ForbiddenError('Only Admin or HR can create locations'));
    }

    const { name, address, city, state, country } = req.body;

    const location = await prisma.location.create({
      data: {
        name,
        address: address || null,
        city: city || null,
        state: state || null,
        country: country || null,
        companyId: req.user.companyId,
      },
    });

    res.status(201).json({
      success: true,
      data: location,
    });
  } catch (error) {
    next(error);
  }
};

export const updateLocation = async (req, res, next) => {
  try {
    if (req.user.role !== 'ADMIN' && req.user.role !== 'HR') {
      return next(new ForbiddenError('Only Admin or HR can update locations'));
    }

    const { id } = req.params;
    const locationId = parseInt(id);

    const location = await prisma.location.findUnique({
      where: { id: locationId },
    });

    if (!location || location.companyId !== req.user.companyId) {
      return next(new NotFoundError('Location not found'));
    }

    const updatedLocation = await prisma.location.update({
      where: { id: locationId },
      data: {
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
      },
    });

    res.status(200).json({
      success: true,
      data: updatedLocation,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteLocation = async (req, res, next) => {
  try {
    if (req.user.role !== 'ADMIN') {
      return next(new ForbiddenError('Only Admin can delete locations'));
    }

    const { id } = req.params;
    const locationId = parseInt(id);

    const location = await prisma.location.findUnique({
      where: { id: locationId },
    });

    if (!location || location.companyId !== req.user.companyId) {
      return next(new NotFoundError('Location not found'));
    }

    await prisma.location.delete({
      where: { id: locationId },
    });

    res.status(200).json({
      success: true,
      message: 'Location deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

