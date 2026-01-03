import { Decimal } from '@prisma/client/runtime/library';

export const calculateWorkHours = (checkIn, checkOut, breakTime = 0) => {
  if (!checkIn || !checkOut) {
    return null;
  }

  const checkInTime = new Date(checkIn);
  const checkOutTime = new Date(checkOut);
  const diffMs = checkOutTime - checkInTime;
  const diffHours = diffMs / (1000 * 60 * 60);
  const workHours = Math.max(0, diffHours - (breakTime || 0));

  return new Decimal(workHours.toFixed(2));
};

export const calculateExtraHours = (workHours, standardHours = 8) => {
  if (!workHours) {
    return new Decimal(0);
  }

  const extra = workHours.toNumber() - standardHours;
  return new Decimal(Math.max(0, extra).toFixed(2));
};

export const formatTime = (date) => {
  if (!date) return null;
  const d = new Date(date);
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

export const formatDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

