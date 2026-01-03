import { useState } from "react";
import AdminLayout from "./layout/AdminLayout";
import EmployeeList from "./components/EmployeeList";
import EmployeeManagement from "./components/EmployeeManagement";
import AttendanceTable from "./components/AttendanceTable";
import LeaveApproval from "./components/LeaveApproval";
import PayrollManagement from "./components/PayrollManagement";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import { Tabs, Tab, Box, Paper, Typography, Button } from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  EventAvailable as AttendanceIcon,
  CalendarToday as LeaveIcon,
  Payment as PayrollIcon,
  BarChart as AnalyticsIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";

const AdminDashboard = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [mainTab, setMainTab] = useState(0);
  const [employeeTab, setEmployeeTab] = useState(0);

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    setMainTab(1); // Switch to employee management tab
  };

  return (
    <AdminLayout>
      {/* Main Navigation Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={mainTab}
          onChange={(e, v) => setMainTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab
            icon={<DashboardIcon />}
            iconPosition="start"
            label="Analytics Dashboard"
          />
          <Tab
            icon={<PeopleIcon />}
            iconPosition="start"
            label="Employee Management"
          />
          <Tab
            icon={<AttendanceIcon />}
            iconPosition="start"
            label="Attendance"
          />
          <Tab
            icon={<LeaveIcon />}
            iconPosition="start"
            label="Leave Management"
          />
          <Tab icon={<PayrollIcon />} iconPosition="start" label="Payroll" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      <Box>
        {/* Analytics Dashboard */}
        {mainTab === 0 && <AnalyticsDashboard />}

        {/* Employee Management */}
        {mainTab === 1 && (
          <Box>
            {!selectedEmployee ? (
              <Box>
                <Typography variant="h5" gutterBottom>
                  Employee Management
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  Select an employee to view and manage their profile
                </Typography>
                <EmployeeList onSelect={handleEmployeeSelect} />
              </Box>
            ) : (
              <Box>
                <Button
                  startIcon={<ArrowBackIcon />}
                  onClick={() => setSelectedEmployee(null)}
                  sx={{ mb: 2 }}
                  variant="outlined"
                >
                  Back to Employee List
                </Button>
                <EmployeeManagement employee={selectedEmployee} />
              </Box>
            )}
          </Box>
        )}

        {/* Attendance Management */}
        {mainTab === 2 && (
          <Box>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Select an employee to view their attendance records
            </Typography>
            <EmployeeList onSelect={setSelectedEmployee} />

            {selectedEmployee && (
              <Box sx={{ mt: 3 }}>
                <Button
                  startIcon={<ArrowBackIcon />}
                  onClick={() => setSelectedEmployee(null)}
                  sx={{ mb: 2 }}
                  variant="outlined"
                >
                  Back to Employee List
                </Button>
                <AttendanceTable employee={selectedEmployee} />
              </Box>
            )}
          </Box>
        )}

        {/* Leave Management */}
        {mainTab === 3 && (
          <Box>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Select an employee to manage their leave requests
            </Typography>
            <EmployeeList onSelect={setSelectedEmployee} />

            {selectedEmployee && (
              <Box sx={{ mt: 3 }}>
                <Button
                  startIcon={<ArrowBackIcon />}
                  onClick={() => setSelectedEmployee(null)}
                  sx={{ mb: 2 }}
                  variant="outlined"
                >
                  Back to Employee List
                </Button>
                <LeaveApproval employee={selectedEmployee} />
              </Box>
            )}
          </Box>
        )}

        {/* Payroll Management */}
        {mainTab === 4 && (
          <Box>
            <PayrollManagement />
          </Box>
        )}
      </Box>
    </AdminLayout>
  );
};

export default AdminDashboard;
