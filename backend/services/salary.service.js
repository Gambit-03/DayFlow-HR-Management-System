import prisma from '../prisma/client.js';
import { Decimal } from '@prisma/client/runtime/library';

export const calculateSalaryComponents = async (salaryId, monthWage) => {
  const salary = await prisma.salary.findUnique({
    where: { id: salaryId },
    include: { components: true },
  });

  if (!salary) {
    throw new Error('Salary not found');
  }

  const components = [];
  let totalComponentAmount = new Decimal(0);

  for (const component of salary.components) {
    let amount = new Decimal(0);

    switch (component.computationType) {
      case 'PERCENTAGE_OF_WAGE':
        amount = new Decimal(monthWage).mul(component.value).div(100);
        break;
      case 'PERCENTAGE_OF_BASIC':
        const basicComponent = salary.components.find(c => c.name === 'Basic');
        if (basicComponent) {
          const basicAmount = new Decimal(monthWage)
            .mul(basicComponent.value)
            .div(100);
          amount = basicAmount.mul(component.value).div(100);
        }
        break;
      case 'FIXED_AMOUNT':
        amount = component.value;
        break;
    }

    await prisma.salaryComponent.update({
      where: { id: component.id },
      data: { amount },
    });

    components.push({ ...component, amount: amount.toNumber() });
    totalComponentAmount = totalComponentAmount.add(amount);
  }

  const fixedAllowanceComponent = salary.components.find(
    c => c.name === 'Fixed Allowance'
  );

  if (fixedAllowanceComponent) {
    const fixedAllowance = new Decimal(monthWage).sub(totalComponentAmount);
    await prisma.salaryComponent.update({
      where: { id: fixedAllowanceComponent.id },
      data: { amount: fixedAllowance },
    });
  }

  return components;
};

export const calculatePF = (basicSalary, pfRate) => {
  return new Decimal(basicSalary).mul(pfRate).div(100);
};

export const getBasicSalary = (components) => {
  const basic = components.find(c => c.name === 'Basic');
  return basic ? basic.amount : new Decimal(0);
};

