import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create company
  const company = await prisma.company.upsert({
    where: { name: 'Test Company' },
    update: {},
    create: {
      name: 'Test Company',
      code: 'TC',
    },
  });

  console.log('✅ Company created:', company.name);

  // Hash password
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@test.com' },
    update: {},
    create: {
      loginId: 'LOITCADMIN20250001',
      email: 'admin@test.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
      companyId: company.id,
      joinYear: 2025,
      serialNumber: 1,
      isFirstLogin: false,
    },
  });

  console.log('✅ Admin user created:', admin.email);
  console.log('📝 Login credentials:');
  console.log('   Email/LoginId: admin@test.com');
  console.log('   Password: admin123');

  // Create default time off types
  const timeOffTypes = [
    { name: 'Paid time off', isPaid: true, maxDays: 24 },
    { name: 'Sick Leave', isPaid: true, maxDays: 7 },
    { name: 'Unpaid Leaves', isPaid: false, maxDays: null },
  ];

  for (const type of timeOffTypes) {
    const existing = await prisma.timeOffType.findFirst({
      where: {
        name: type.name,
        companyId: company.id,
      },
    });

    if (!existing) {
      await prisma.timeOffType.create({
        data: {
          name: type.name,
          companyId: company.id,
          isPaid: type.isPaid,
          maxDays: type.maxDays,
        },
      });
    }
  }

  console.log('✅ Time off types created');

  console.log('\n🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

