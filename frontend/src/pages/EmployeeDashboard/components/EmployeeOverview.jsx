import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  MenuItem,
  TextField,
  Divider,
} from "@mui/material";
import {
  EventAvailable,
  WbSunny,
  CalendarToday,
  CheckCircle,
  Cancel,
  HourglassEmpty,
} from "@mui/icons-material";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const EmployeeOverview = () => {
  const [timePeriod, setTimePeriod] = useState("month");

  // Mock data for employee's personal stats
  const attendanceData = [
    { month: "Jan", present: 20, absent: 2, halfDay: 0, leave: 1 },
    { month: "Feb", present: 19, absent: 1, halfDay: 1, leave: 2 },
    { month: "Mar", present: 22, absent: 0, halfDay: 0, leave: 1 },
    { month: "Apr", present: 21, absent: 1, halfDay: 1, leave: 1 },
    { month: "May", present: 22, absent: 0, halfDay: 1, leave: 0 },
    { month: "Jun", present: 20, absent: 1, halfDay: 0, leave: 2 },
  ];

  const leaveTypeData = [
    { name: "Sick Leave", value: 2, color: "#FF6B6B" },
    { name: "Paid Leave", value: 5, color: "#4ECDC4" },
    { name: "Casual Leave", value: 2, color: "#95E1D3" },
    { name: "Available", value: 11, color: "#E8E8E8" },
  ];

  const workHoursTrend = [
    { month: "Jan", hours: 176 },
    { month: "Feb", hours: 168 },
    { month: "Mar", hours: 184 },
    { month: "Apr", hours: 180 },
    { month: "May", hours: 176 },
    { month: "Jun", hours: 172 },
  ];

  const todayFullDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Box>
      {/* Header with Period Selector */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography variant="h4">My Dashboard</Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            {todayFullDate}
          </Typography>
        </Box>
        <TextField
          select
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
          sx={{ minWidth: 150 }}
          size="small"
        >
          <MenuItem value="week">This Week</MenuItem>
          <MenuItem value="month">This Month</MenuItem>
          <MenuItem value="quarter">This Quarter</MenuItem>
          <MenuItem value="year">This Year</MenuItem>
        </TextField>
      </Box>

      {/* Key Metrics Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: "primary.main", color: "white" }}>
            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Present Days
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    20
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    This month
                  </Typography>
                </Box>
                <EventAvailable sx={{ fontSize: 50, opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: "success.main", color: "white" }}>
            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Attendance Rate
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    95%
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Excellent performance
                  </Typography>
                </Box>
                <CheckCircle sx={{ fontSize: 50, opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: "warning.main", color: "white" }}>
            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Leave Balance
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    11
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Days remaining
                  </Typography>
                </Box>
                <CalendarToday sx={{ fontSize: 50, opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: "info.main", color: "white" }}>
            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Work Hours
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    172h
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    This month
                  </Typography>
                </Box>
                <WbSunny sx={{ fontSize: 50, opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3}>
        {/* Attendance Trend */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              My Attendance Trend
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Monthly attendance breakdown
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" fill="#4CAF50" name="Present" />
                <Bar dataKey="absent" fill="#FF5252" name="Absent" />
                <Bar dataKey="halfDay" fill="#FFC107" name="Half Day" />
                <Bar dataKey="leave" fill="#2196F3" name="Leave" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Leave Balance */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Leave Balance
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Current year breakdown
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leaveTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {leaveTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Work Hours Trend */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Work Hours Trend
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Monthly work hours over time
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={workHoursTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="#8884d8"
                  strokeWidth={2}
                  name="Hours Worked"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Performance Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Box textAlign="center">
                  <Typography variant="h5" color="success.main">
                    95%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Overall Attendance
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box textAlign="center">
                  <Typography variant="h5" color="primary.main">
                    176h
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avg Monthly Hours
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box textAlign="center">
                  <Typography variant="h5" color="warning.main">
                    9
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Leaves Taken
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box textAlign="center">
                  <Typography variant="h5" color="info.main">
                    0
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pending Requests
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeOverview;
