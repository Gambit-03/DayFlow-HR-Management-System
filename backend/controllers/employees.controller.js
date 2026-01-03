import prisma from '../prisma/client.js';
import { NotFoundError, BadRequestError, ForbiddenError } from '../utils/errors.js';

export const listEmployees = async (req, res, next) => {
  try {
    const { search, departmentId, locationId, role, page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {
      companyId: req.user.companyId,
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { loginId: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (departmentId) {
      where.departmentId = parseInt(departmentId);
    }

    if (locationId) {
      where.locationId = parseInt(locationId);
    }

    if (role) {
      where.role = role;
    }

    const [employees, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: parseInt(limit),
        select: {
          id: true,
          loginId: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          profilePictureUrl: true,
          jobPosition: true,
          department: {
            select: {
              id: true,
              name: true,
            },
          },
          location: {
            select: {
              id: true,
              name: true,
            },
          },
          manager: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: { name: 'asc' },
      }),
      prisma.user.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      data: employees,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);

    const employee = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
        department: true,
        location: true,
        manager: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        skills: {
          include: {
            skill: true,
          },
        },
        certifications: true,
      },
    });

    if (!employee) {
      return next(new NotFoundError('Employee not found'));
    }

    if (employee.companyId !== req.user.companyId) {
      return next(new ForbiddenError('Access denied'));
    }

    if (req.user.role === 'USER' && req.user.id !== userId) {
      return next(new ForbiddenError('You can only view your own profile'));
    }

    const { password, ...employeeWithoutPassword } = employee;

    res.status(200).json({
      success: true,
      data: employeeWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};

export const createEmployee = async (req, res, next) => {
  try {
    if (req.user.role !== 'ADMIN' && req.user.role !== 'HR') {
      return next(new ForbiddenError('Only Admin or HR can create employees'));
    }

    const {
      companyName,
      name,
      email,
      phone,
      role = 'USER',
      jobPosition,
      departmentId,
      locationId,
      managerId,
      dateOfJoining,
    } = req.body;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { loginId: email }],
        companyId: req.user.companyId,
      },
    });

    if (existingUser) {
      return next(new BadRequestError('User with this email already exists'));
    }

    let company = await prisma.company.findFirst({
      where: { id: req.user.companyId },
    });

    if (companyName && companyName !== company.name) {
      company = await prisma.company.findFirst({
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
    }

    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || firstName;
    const joinYear = dateOfJoining
      ? new Date(dateOfJoining).getFullYear()
      : new Date().getFullYear();

    const {
      getNextSerialNumber,
      generateLoginId,
      generatePassword,
      hashPassword,
    } = await import('../services/auth.service.js');
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

    const employee = await prisma.user.create({
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
        jobPosition: jobPosition || null,
        departmentId: departmentId ? parseInt(departmentId) : null,
        locationId: locationId ? parseInt(locationId) : null,
        managerId: managerId ? parseInt(managerId) : null,
        dateOfJoining: dateOfJoining ? new Date(dateOfJoining) : new Date(),
      },
      include: {
        department: true,
        location: true,
        manager: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const { password, ...employeeWithoutPassword } = employee;

    res.status(201).json({
      success: true,
      data: employeeWithoutPassword,
      loginId,
      generatedPassword,
      message: 'Employee created successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);

    const employee = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!employee) {
      return next(new NotFoundError('Employee not found'));
    }

    if (employee.companyId !== req.user.companyId) {
      return next(new ForbiddenError('Access denied'));
    }

    if (
      req.user.role !== 'ADMIN' &&
      req.user.role !== 'HR' &&
      req.user.id !== userId
    ) {
      return next(
        new ForbiddenError('You can only update your own profile or be Admin/HR')
      );
    }

    const updateData = {};
    const allowedFields = [
      'name',
      'phone',
      'jobPosition',
      'departmentId',
      'locationId',
      'managerId',
      'profilePictureUrl',
      'dateOfBirth',
      'residingAddress',
      'nationality',
      'personalEmail',
      'gender',
      'maritalStatus',
      'about',
      'whatILoveAboutJob',
      'interestsAndHobbies',
      'empCode',
    ];

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        if (field === 'dateOfBirth' && req.body[field]) {
          updateData[field] = new Date(req.body[field]);
        } else {
          updateData[field] = req.body[field];
        }
      }
    }

    const updatedEmployee = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      include: {
        department: true,
        location: true,
        manager: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const { password, ...employeeWithoutPassword } = updatedEmployee;

    res.status(200).json({
      success: true,
      data: employeeWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};

export const getEmployeeAttendance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);

    if (
      req.user.role !== 'ADMIN' &&
      req.user.role !== 'HR' &&
      req.user.id !== userId
    ) {
      return next(new ForbiddenError('Access denied'));
    }

    const { month, year } = req.query;
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

export const getEmployeeTimeOff = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);

    if (
      req.user.role !== 'ADMIN' &&
      req.user.role !== 'HR' &&
      req.user.id !== userId
    ) {
      return next(new ForbiddenError('Access denied'));
    }

    const timeOffRequests = await prisma.timeOffRequest.findMany({
      where: { userId },
      include: {
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
      data: timeOffRequests,
    });
  } catch (error) {
    next(error);
  }
};

