const API_URL = 'http://localhost:5000';

let authToken = '';

async function testAPI() {
  try {
    console.log('🧪 Testing DayFlow Backend API\n');
    console.log('='.repeat(50));

    // Test 1: Health Check
    console.log('\n1️⃣ Testing Health Endpoint...');
    try {
      const healthRes = await fetch(`${API_URL}/health`);
      const healthData = await healthRes.json();
      if (healthData.status === 'ok') {
        console.log('✅ Health check passed');
      } else {
        console.log('❌ Health check failed:', healthData);
        return;
      }
    } catch (error) {
      console.log('❌ Health check error:', error.message);
      console.log('⚠️  Make sure server is running: npm run dev');
      return;
    }

    // Test 2: Sign In
    console.log('\n2️⃣ Testing Sign In...');
    try {
      const signInRes = await fetch(`${API_URL}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          loginId: 'admin@test.com',
          password: 'admin123',
        }),
      });
      const signInData = await signInRes.json();
      
      if (!signInData.success || !signInData.token) {
        console.log('❌ Sign in failed:', signInData.error || signInData);
        console.log('⚠️  Make sure you ran: npm run seed');
        return;
      }
      
      authToken = signInData.token;
      console.log('✅ Sign in successful');
      console.log(`   User: ${signInData.user.name} (${signInData.user.role})`);
      console.log(`   Token: ${authToken.substring(0, 20)}...`);
    } catch (error) {
      console.log('❌ Sign in error:', error.message);
      return;
    }

    // Test 3: Get Current User
    console.log('\n3️⃣ Testing Get Current User...');
    try {
      const meRes = await fetch(`${API_URL}/api/auth/me`, {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      const meData = await meRes.json();
      if (meData.success && meData.data) {
        console.log('✅ Get current user passed');
        console.log(`   Name: ${meData.data.name}`);
        console.log(`   Email: ${meData.data.email}`);
      } else {
        console.log('❌ Get current user failed:', meData.error || meData);
      }
    } catch (error) {
      console.log('❌ Get current user error:', error.message);
    }

    // Test 4: List Employees
    console.log('\n4️⃣ Testing List Employees...');
    try {
      const employeesRes = await fetch(`${API_URL}/api/employees`, {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      const employeesData = await employeesRes.json();
      if (employeesData.success) {
        console.log('✅ List employees passed');
        console.log(`   Found ${employeesData.data.length} employee(s)`);
        console.log(`   Total: ${employeesData.pagination.total}`);
      } else {
        console.log('❌ List employees failed:', employeesData.error);
      }
    } catch (error) {
      console.log('❌ List employees error:', error.message);
    }

    // Test 5: Get Time Off Types
    console.log('\n5️⃣ Testing Get Time Off Types...');
    try {
      const typesRes = await fetch(`${API_URL}/api/time-off/types`, {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      const typesData = await typesRes.json();
      if (typesData.success) {
        console.log('✅ Get time off types passed');
        console.log(`   Found ${typesData.data.length} type(s):`);
        typesData.data.forEach(type => {
          console.log(`   - ${type.name} (${type.isPaid ? 'Paid' : 'Unpaid'})`);
        });
      } else {
        console.log('❌ Get time off types failed:', typesData.error);
      }
    } catch (error) {
      console.log('❌ Get time off types error:', error.message);
    }

    // Test 6: Get Time Off Allocations
    console.log('\n6️⃣ Testing Get Time Off Allocations...');
    try {
      const allocRes = await fetch(`${API_URL}/api/time-off/allocations`, {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      const allocData = await allocRes.json();
      if (allocData.success) {
        console.log('✅ Get allocations passed');
        console.log(`   Found ${allocData.data.length} allocation(s)`);
      } else {
        console.log('❌ Get allocations failed:', allocData.error);
      }
    } catch (error) {
      console.log('❌ Get allocations error:', error.message);
    }

    // Test 7: Get Departments
    console.log('\n7️⃣ Testing Get Departments...');
    try {
      const deptRes = await fetch(`${API_URL}/api/departments`, {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      const deptData = await deptRes.json();
      if (deptData.success) {
        console.log('✅ Get departments passed');
        console.log(`   Found ${deptData.data.length} department(s)`);
      } else {
        console.log('❌ Get departments failed:', deptData.error);
      }
    } catch (error) {
      console.log('❌ Get departments error:', error.message);
    }

    // Test 8: Get Locations
    console.log('\n8️⃣ Testing Get Locations...');
    try {
      const locRes = await fetch(`${API_URL}/api/locations`, {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      const locData = await locRes.json();
      if (locData.success) {
        console.log('✅ Get locations passed');
        console.log(`   Found ${locData.data.length} location(s)`);
      } else {
        console.log('❌ Get locations failed:', locData.error);
      }
    } catch (error) {
      console.log('❌ Get locations error:', error.message);
    }

    // Test 9: Get Profile
    console.log('\n9️⃣ Testing Get Profile...');
    try {
      const profileRes = await fetch(`${API_URL}/api/profile`, {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      const profileData = await profileRes.json();
      if (profileData.success) {
        console.log('✅ Get profile passed');
        console.log(`   Company: ${profileData.data.company?.name || 'N/A'}`);
      } else {
        console.log('❌ Get profile failed:', profileData.error);
      }
    } catch (error) {
      console.log('❌ Get profile error:', error.message);
    }

    // Test 10: Check In
    console.log('\n🔟 Testing Check In...');
    try {
      const checkInRes = await fetch(`${API_URL}/api/attendance/check-in`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      const checkInData = await checkInRes.json();
      if (checkInData.success) {
        console.log('✅ Check in passed');
        console.log(`   Status: ${checkInData.data.status}`);
      } else {
        console.log('⚠️  Check in:', checkInData.error || 'Already checked in today');
      }
    } catch (error) {
      console.log('❌ Check in error:', error.message);
    }

    // Test 11: Get Attendance
    console.log('\n1️⃣1️⃣ Testing Get Attendance...');
    try {
      const attRes = await fetch(`${API_URL}/api/attendance`, {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      const attData = await attRes.json();
      if (attData.success) {
        console.log('✅ Get attendance passed');
        console.log(`   Found ${attData.data.length} record(s)`);
      } else {
        console.log('❌ Get attendance failed:', attData.error);
      }
    } catch (error) {
      console.log('❌ Get attendance error:', error.message);
    }

    // Test 12: Get Attendance Summary
    console.log('\n1️⃣2️⃣ Testing Get Attendance Summary...');
    try {
      const summaryRes = await fetch(`${API_URL}/api/attendance/summary`, {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      const summaryData = await summaryRes.json();
      if (summaryData.success) {
        console.log('✅ Get attendance summary passed');
        console.log(`   Days Present: ${summaryData.data.daysPresent}`);
        console.log(`   Leaves: ${summaryData.data.leavesCount}`);
      } else {
        console.log('❌ Get attendance summary failed:', summaryData.error);
      }
    } catch (error) {
      console.log('❌ Get attendance summary error:', error.message);
    }

    console.log('\n' + '='.repeat(50));
    console.log('🎉 Testing completed!');
    console.log('\n📝 Next steps:');
    console.log('   1. Review any errors above');
    console.log('   2. Test additional endpoints manually if needed');
    console.log('   3. Check TESTING_GUIDE.md for detailed endpoint documentation');
    console.log('');

  } catch (error) {
    console.error('❌ Fatal error:', error.message);
  }
}

// Run tests
testAPI();
