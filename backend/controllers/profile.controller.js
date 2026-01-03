import prisma from '../prisma/client.js';
import {
  calculateSalaryComponents,
  calculatePF,
  getBasicSalary,
} from '../services/salary.service.js';
import { NotFoundError, ForbiddenError, BadRequestError } from '../utils/errors.js';
import { Decimal } from '@prisma/client/runtime/library';

export const getProfile = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            code: true,
            logoUrl: true,
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
        salary: {
          include: {
            components: true,
          },
        },
        bankDetail: true,
      },
    });

    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    const { password, ...userWithoutPassword } = user;

    res.status(200).json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const updateData = {};
    const allowedFields = [
      'name',
      'phone',
      'profilePictureUrl',
      'jobPosition',
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

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
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

    const { password, ...userWithoutPassword } = updatedUser;

    res.status(200).json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};

export const getSalary = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const targetUserId = userId ? parseInt(userId) : req.user.id;

    if (
      req.user.role !== 'ADMIN' &&
      req.user.id !== targetUserId
    ) {
      return next(new ForbiddenError('Access denied'));
    }

    const salary = await prisma.salary.findUnique({
      where: { userId: targetUserId },
      include: {
        components: {
          orderBy: { name: 'asc' },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!salary) {
      return next(new NotFoundError('Salary information not found'));
    }

    const basicSalary = getBasicSalary(salary.components);
    const employeePF = calculatePF(basicSalary, salary.pfRate);
    const employerPF = calculatePF(basicSalary, salary.pfRate);

    res.status(200).json({
      success: true,
      data: {
        ...salary,
        employeePF: employeePF.toNumber(),
        employerPF: employerPF.toNumber(),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateSalary = async (req, res, next) => {
  try {
    if (req.user.role !== 'ADMIN') {
      return next(new ForbiddenError('Only Admin can update salary'));
    }

    const { userId, monthWage, yearlyWage, workingDaysPerWeek, breakTime, pfRate, professionalTax, components } = req.body;
    const targetUserId = parseInt(userId);

    const user = await prisma.user.findUnique({
      where: { id: targetUserId },
    });

    if (!user || user.companyId !== req.user.companyId) {
      return next(new NotFoundError('User not found'));
    }

    let salary = await prisma.salary.findUnique({
      where: { userId: targetUserId },
      include: { components: true },
    });

    const salaryData = {
      monthWage: monthWage ? new Decimal(monthWage) : undefined,
      yearlyWage: yearlyWage ? new Decimal(yearlyWage) : undefined,
      workingDaysPerWeek: workingDaysPerWeek ? new Decimal(workingDaysPerWeek) : undefined,
      breakTime: breakTime ? new Decimal(breakTime) : undefined,
      pfRate: pfRate ? new Decimal(pfRate) : undefined,
      professionalTax: professionalTax ? new Decimal(professionalTax) : undefined,
    };

    Object.keys(salaryData).forEach(key => {
      if (salaryData[key] === undefined) {
        delete salaryData[key];
      }
    });

    if (salary) {
      salary = await prisma.salary.update({
        where: { userId: targetUserId },
        data: salaryData,
        include: { components: true },
      });
    } else {
      salary = await prisma.salary.create({
        data: {
          userId: targetUserId,
          monthWage: new Decimal(monthWage),
          yearlyWage: new Decimal(yearlyWage || monthWage * 12),
          workingDaysPerWeek: new Decimal(workingDaysPerWeek || 5),
          breakTime: new Decimal(breakTime || 0),
          pfRate: new Decimal(pfRate || 12),
          professionalTax: new Decimal(professionalTax || 200),
        },
        include: { components: true },
      });
    }

    if (components && Array.isArray(components)) {
      for (const component of components) {
        if (component.id) {
          await prisma.salaryComponent.update({
            where: { id: component.id },
            data: {
              name: component.name,
              computationType: component.computationType,
              value: new Decimal(component.value),
            },
          });
        } else {
          await prisma.salaryComponent.create({
            data: {
              salaryId: salary.id,
              name: component.name,
              computationType: component.computationType,
              value: new Decimal(component.value),
              amount: new Decimal(0),
            },
          });
        }
      }
    }

    await calculateSalaryComponents(salary.id, salary.monthWage);

    const updatedSalary = await prisma.salary.findUnique({
      where: { id: salary.id },
      include: {
        components: {
          orderBy: { name: 'asc' },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: updatedSalary,
    });
  } catch (error) {
    next(error);
  }
};

export const getSkills = async (req, res, next) => {
  try {
    const userSkills = await prisma.userSkill.findMany({
      where: { userId: req.user.id },
      include: {
        skill: true,
      },
    });

    res.status(200).json({
      success: true,
      data: userSkills,
    });
  } catch (error) {
    next(error);
  }
};

export const addSkill = async (req, res, next) => {
  try {
    const { skillId } = req.body;

    const skill = await prisma.skill.findUnique({
      where: { id: parseInt(skillId) },
    });

    if (!skill || skill.companyId !== req.user.companyId) {
      return next(new NotFoundError('Skill not found'));
    }

    const existingUserSkill = await prisma.userSkill.findUnique({
      where: {
        userId_skillId: {
          userId: req.user.id,
          skillId: parseInt(skillId),
        },
      },
    });

    if (existingUserSkill) {
      return next(new BadRequestError('Skill already added'));
    }

    const userSkill = await prisma.userSkill.create({
      data: {
        userId: req.user.id,
        skillId: parseInt(skillId),
      },
      include: {
        skill: true,
      },
    });

    res.status(201).json({
      success: true,
      data: userSkill,
    });
  } catch (error) {
    next(error);
  }
};

export const removeSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userSkillId = parseInt(id);

    const userSkill = await prisma.userSkill.findUnique({
      where: { id: userSkillId },
    });

    if (!userSkill || userSkill.userId !== req.user.id) {
      return next(new NotFoundError('Skill not found'));
    }

    await prisma.userSkill.delete({
      where: { id: userSkillId },
    });

    res.status(200).json({
      success: true,
      message: 'Skill removed successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getCertifications = async (req, res, next) => {
  try {
    const certifications = await prisma.certification.findMany({
      where: { userId: req.user.id },
      orderBy: { issueDate: 'desc' },
    });

    res.status(200).json({
      success: true,
      data: certifications,
    });
  } catch (error) {
    next(error);
  }
};

export const addCertification = async (req, res, next) => {
  try {
    const {
      name,
      issuingOrganization,
      issueDate,
      expiryDate,
      certificateUrl,
    } = req.body;

    const certification = await prisma.certification.create({
      data: {
        userId: req.user.id,
        name,
        issuingOrganization: issuingOrganization || null,
        issueDate: issueDate ? new Date(issueDate) : null,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        certificateUrl: certificateUrl || null,
      },
    });

    res.status(201).json({
      success: true,
      data: certification,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCertification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const certificationId = parseInt(id);

    const certification = await prisma.certification.findUnique({
      where: { id: certificationId },
    });

    if (!certification || certification.userId !== req.user.id) {
      return next(new NotFoundError('Certification not found'));
    }

    const updateData = {};
    const allowedFields = [
      'name',
      'issuingOrganization',
      'issueDate',
      'expiryDate',
      'certificateUrl',
    ];

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        if ((field === 'issueDate' || field === 'expiryDate') && req.body[field]) {
          updateData[field] = new Date(req.body[field]);
        } else {
          updateData[field] = req.body[field];
        }
      }
    }

    const updatedCertification = await prisma.certification.update({
      where: { id: certificationId },
      data: updateData,
    });

    res.status(200).json({
      success: true,
      data: updatedCertification,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCertification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const certificationId = parseInt(id);

    const certification = await prisma.certification.findUnique({
      where: { id: certificationId },
    });

    if (!certification || certification.userId !== req.user.id) {
      return next(new NotFoundError('Certification not found'));
    }

    await prisma.certification.delete({
      where: { id: certificationId },
    });

    res.status(200).json({
      success: true,
      message: 'Certification deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

