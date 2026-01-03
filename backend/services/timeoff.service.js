import prisma from '../prisma/client.js';
import { Decimal } from '@prisma/client/runtime/library';

export const calculateDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return new Decimal(diffDays);
};

export const checkAllocationAvailability = async (
  userId,
  timeOffTypeId,
  startDate,
  endDate
) => {
  const year = new Date(startDate).getFullYear();
  const requestedDays = calculateDays(startDate, endDate);

  const allocation = await prisma.timeOffAllocation.findUnique({
    where: {
      userId_timeOffTypeId_year: {
        userId,
        timeOffTypeId,
        year,
      },
    },
  });

  if (!allocation) {
    throw new Error('Time off allocation not found for this year');
  }

  const availableDays = new Decimal(allocation.allocatedDays).sub(
    allocation.usedDays
  );

  if (requestedDays.gt(availableDays)) {
    throw new Error('Insufficient time off allocation');
  }

  return { allocation, requestedDays, availableDays };
};

export const updateAllocationUsage = async (
  userId,
  timeOffTypeId,
  days,
  operation = 'add'
) => {
  const year = new Date().getFullYear();

  const allocation = await prisma.timeOffAllocation.findUnique({
    where: {
      userId_timeOffTypeId_year: {
        userId,
        timeOffTypeId,
        year,
      },
    },
  });

  if (!allocation) {
    throw new Error('Time off allocation not found');
  }

  let newUsedDays;
  if (operation === 'add') {
    newUsedDays = new Decimal(allocation.usedDays).add(days);
  } else {
    newUsedDays = new Decimal(allocation.usedDays).sub(days);
    if (newUsedDays.lt(0)) {
      newUsedDays = new Decimal(0);
    }
  }

  await prisma.timeOffAllocation.update({
    where: { id: allocation.id },
    data: { usedDays: newUsedDays },
  });
};

export const initializeAllocations = async (userId, companyId, year) => {
  const timeOffTypes = await prisma.timeOffType.findMany({
    where: { companyId },
  });

  for (const type of timeOffTypes) {
    await prisma.timeOffAllocation.upsert({
      where: {
        userId_timeOffTypeId_year: {
          userId,
          timeOffTypeId: type.id,
          year,
        },
      },
      update: {},
      create: {
        userId,
        timeOffTypeId: type.id,
        allocatedDays: type.maxDays || new Decimal(0),
        usedDays: new Decimal(0),
        year,
      },
    });
  }
};

