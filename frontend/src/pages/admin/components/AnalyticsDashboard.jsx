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
  TrendingUp,
  People,
  EventAvailable,
  CalendarToday,
  Payment,
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

const AnalyticsDashboard = () => {
  const [timePeriod, setTimePeriod] = useState("month");

  // Mock data for charts
  const attendanceData = [
    { month: "Jan", present: 420, absent: 30, halfDay: 20, leave: 30 },
    { month: "Feb", present: 400, absent: 35, halfDay: 25, leave: 40 },
    { month: "Mar", present: 440, absent: 20, halfDay: 15, leave: 25 },
    { month: "Apr", present: 430, absent: 25, halfDay: 20, leave: 25 },
    { month: "May", present: 445, absent: 18, halfDay: 17, leave: 20 },
    { month: "Jun", present: 450, absent: 15, halfDay: 15, leave: 20 },
  ];

  const departmentWiseAttendance = [
    { dept: "IT", attendance: 95 },
    { dept: "HR", attendance: 92 },
    { dept: "Finance", attendance: 97 },
    { dept: "Sales", attendance: 88 },
    { dept: "Operations", attendance: 90 },
  ];

  const leaveTypeData = [
    { name: "Sick Leave", value: 30, color: "#FF6B6B" },
    { name: "Paid Leave", value: 45, color: "#4ECDC4" },
    { name: "Unpaid Leave", value: 15, color: "#FFE66D" },
    { name: "Casual Leave", value: 25, color: "#95E1D3" },
  ];

  const payrollTrend = [
    { month: "Jan", amount: 2500000 },
    { month: "Feb", amount: 2550000 },
    { month: "Mar", amount: 2600000 },
    { month: "Apr", amount: 2650000 },
    { month: "May", amount: 2700000 },
    { month: "Jun", amount: 2750000 },
  ];

  const leaveApprovalStats = {
    approved: 85,
    rejected: 10,
    pending: 15,
  };

  const departmentStats = [
    { dept: "IT", employees: 45, avgSalary: 75000 },
    { dept: "HR", employees: 12, avgSalary: 65000 },
    { dept: "Finance", employees: 18, avgSalary: 80000 },
    { dept: "Sales", employees: 30, avgSalary: 70000 },
    { dept: "Operations", employees: 25, avgSalary: 60000 },
  ];

  return (
    <Box>
      {/* Header with Period Selector */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Analytics & Reports</Typography>
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
                    Total Employees
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    130
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    +5 from last month
                  </Typography>
                </Box>
                <People sx={{ fontSize: 50, opacity: 0.3 }} />
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
                    Avg Attendance
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    94.5%
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    +2.3% from last month
                  </Typography>
                </Box>
                <EventAvailable sx={{ fontSize: 50, opacity: 0.3 }} />
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
                    Pending Leaves
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    15
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Requires attention
                  </Typography>
                </Box>
                <HourglassEmpty sx={{ fontSize: 50, opacity: 0.3 }} />
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
                    Total Payroll
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    ₹2.75M
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    This month
                  </Typography>
                </Box>
                <Payment sx={{ fontSize: 50, opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Attendance Trends */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Attendance Trends (Last 6 Months)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" fill="#4CAF50" name="Present" />
                <Bar dataKey="absent" fill="#f44336" name="Absent" />
                <Bar dataKey="halfDay" fill="#FF9800" name="Half Day" />
                <Bar dataKey="leave" fill="#2196F3" name="Leave" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Leave Type Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leaveTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
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
      </Grid>

      {/* Department-wise Analysis */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Department-wise Attendance %
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentWiseAttendance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="dept" type="category" />
                <Tooltip />
                <Bar dataKey="attendance" fill="#3f51b5" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Payroll Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={payrollTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value) => `₹${(value / 1000000).toFixed(2)}M`}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#4CAF50"
                  strokeWidth={3}
                  name="Payroll Amount"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Leave Approval Stats & Department Stats */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Leave Approval Status
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <CheckCircle sx={{ color: "success.main", mr: 2 }} />
                <Box flexGrow={1}>
                  <Typography variant="body2">Approved</Typography>
                  <Typography variant="h5" color="success.main">
                    {leaveApprovalStats.approved}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" alignItems="center" mb={2}>
                <HourglassEmpty sx={{ color: "warning.main", mr: 2 }} />
                <Box flexGrow={1}>
                  <Typography variant="body2">Pending</Typography>
                  <Typography variant="h5" color="warning.main">
                    {leaveApprovalStats.pending}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" alignItems="center">
                <Cancel sx={{ color: "error.main", mr: 2 }} />
                <Box flexGrow={1}>
                  <Typography variant="body2">Rejected</Typography>
                  <Typography variant="h5" color="error.main">
                    {leaveApprovalStats.rejected}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Department Statistics
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {departmentStats.map((dept) => (
                <Grid item xs={12} sm={6} key={dept.dept}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" color="primary" gutterBottom>
                        {dept.dept}
                      </Typography>
                      <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant="body2" color="text.secondary">
                          Employees:
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          {dept.employees}
                        </Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                          Avg Salary:
                        </Typography>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="success.main"
                        >
                          ₹{dept.avgSalary.toLocaleString()}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsDashboard;
