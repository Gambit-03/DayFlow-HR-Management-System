import { useState } from "react";
import EmployeeLayout from "./layout/EmployeeLayout";
import EmployeeOverview from "./components/EmployeeOverview";
import Attendance from "./pages/Attendance";
import Leave from "./pages/Leave";
import Profile from "./pages/Profile";
import { Tabs, Tab, Box, Paper, Button } from "@mui/material";
import {
  Dashboard as DashboardIcon,
  EventAvailable as AttendanceIcon,
  CalendarToday as LeaveIcon,
  Person as ProfileIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const [mainTab, setMainTab] = useState(0);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here
    navigate("/signin");
  };

  return (
    <EmployeeLayout>
      {/* Main Navigation Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tabs
            value={mainTab}
            onChange={(e, v) => setMainTab(v)}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab
              icon={<DashboardIcon />}
              iconPosition="start"
              label="Dashboard"
            />
            <Tab
              icon={<AttendanceIcon />}
              iconPosition="start"
              label="Attendance"
            />
            <Tab icon={<LeaveIcon />} iconPosition="start" label="Leave" />
            <Tab icon={<ProfileIcon />} iconPosition="start" label="Profile" />
          </Tabs>
          <Button
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ mr: 2 }}
            variant="outlined"
            color="error"
          >
            Logout
          </Button>
        </Box>
      </Paper>

      {/* Tab Content */}
      <Box>
        {/* Dashboard Overview */}
        {mainTab === 0 && <EmployeeOverview />}

        {/* Attendance */}
        {mainTab === 1 && <Attendance />}

        {/* Leave Management */}
        {mainTab === 2 && <Leave />}

        {/* Profile */}
        {mainTab === 3 && <Profile />}
      </Box>
    </EmployeeLayout>
  );
};

export default EmployeeDashboard;
