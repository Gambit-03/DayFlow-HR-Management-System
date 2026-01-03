import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Chip,
  TextField,
  MenuItem,
  Grid,
  TableContainer,
  Card,
  CardContent,
} from "@mui/material";
import {
  CheckCircle,
  Cancel,
  Schedule,
  EventBusy,
  CalendarToday,
} from "@mui/icons-material";

const AttendanceTable = ({ employee }) => {
  const [viewType, setViewType] = useState("weekly");
  const [selectedMonth, setSelectedMonth] = useState("2026-01");

  // Mock attendance data
  const attendanceData = [
    {
      date: "2026-01-01",
      day: "Wed",
      status: "Present",
      checkIn: "09:15 AM",
      checkOut: "06:30 PM",
    },
    {
      date: "2026-01-02",
      day: "Thu",
      status: "Present",
      checkIn: "09:00 AM",
      checkOut: "06:15 PM",
    },
    {
      date: "2026-01-03",
      day: "Fri",
      status: "Present",
      checkIn: "09:10 AM",
      checkOut: "06:20 PM",
    },
    {
      date: "2026-01-04",
      day: "Sat",
      status: "Weekend",
      checkIn: "-",
      checkOut: "-",
    },
    {
      date: "2026-01-05",
      day: "Sun",
      status: "Weekend",
      checkIn: "-",
      checkOut: "-",
    },
    {
      date: "2026-01-06",
      day: "Mon",
      status: "Absent",
      checkIn: "-",
      checkOut: "-",
    },
    {
      date: "2026-01-07",
      day: "Tue",
      status: "Present",
      checkIn: "09:05 AM",
      checkOut: "06:10 PM",
    },
    {
      date: "2026-01-08",
      day: "Wed",
      status: "Half-day",
      checkIn: "09:00 AM",
      checkOut: "01:30 PM",
    },
    {
      date: "2026-01-09",
      day: "Thu",
      status: "Leave",
      checkIn: "-",
      checkOut: "-",
    },
    {
      date: "2026-01-10",
      day: "Fri",
      status: "Present",
      checkIn: "09:20 AM",
      checkOut: "06:25 PM",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Present":
        return "success";
      case "Absent":
        return "error";
      case "Half-day":
        return "warning";
      case "Leave":
        return "info";
      case "Weekend":
        return "default";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Present":
        return <CheckCircle fontSize="small" />;
      case "Absent":
        return <Cancel fontSize="small" />;
      case "Half-day":
        return <Schedule fontSize="small" />;
      case "Leave":
        return <EventBusy fontSize="small" />;
      default:
        return null;
    }
  };

  // Calculate stats
  const presentDays = attendanceData.filter(
    (d) => d.status === "Present"
  ).length;
  const absentDays = attendanceData.filter((d) => d.status === "Absent").length;
  const halfDays = attendanceData.filter((d) => d.status === "Half-day").length;
  const leaveDays = attendanceData.filter((d) => d.status === "Leave").length;
  const totalWorkingDays = attendanceData.filter(
    (d) => d.status !== "Weekend"
  ).length;
  const attendancePercentage =
    totalWorkingDays > 0
      ? (((presentDays + halfDays * 0.5) / totalWorkingDays) * 100).toFixed(1)
      : 0;

  return (
    <Box>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5">
          Attendance Records - {employee?.name || "All Employees"}
        </Typography>
        <Box display="flex" gap={2}>
          <TextField
            select
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
            size="small"
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </TextField>
          <TextField
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            size="small"
          />
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ bgcolor: "success.light" }}>
            <CardContent sx={{ textAlign: "center", py: 2 }}>
              <CheckCircle sx={{ fontSize: 32, color: "success.dark" }} />
              <Typography variant="h5" sx={{ mt: 1 }}>
                {presentDays}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Present
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ bgcolor: "error.light" }}>
            <CardContent sx={{ textAlign: "center", py: 2 }}>
              <Cancel sx={{ fontSize: 32, color: "error.dark" }} />
              <Typography variant="h5" sx={{ mt: 1 }}>
                {absentDays}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Absent
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ bgcolor: "warning.light" }}>
            <CardContent sx={{ textAlign: "center", py: 2 }}>
              <Schedule sx={{ fontSize: 32, color: "warning.dark" }} />
              <Typography variant="h5" sx={{ mt: 1 }}>
                {halfDays}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Half-day
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ bgcolor: "info.light" }}>
            <CardContent sx={{ textAlign: "center", py: 2 }}>
              <EventBusy sx={{ fontSize: 32, color: "info.dark" }} />
              <Typography variant="h5" sx={{ mt: 1 }}>
                {leaveDays}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Leave
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ bgcolor: "primary.light" }}>
            <CardContent sx={{ textAlign: "center", py: 2 }}>
              <CalendarToday sx={{ fontSize: 32, color: "primary.dark" }} />
              <Typography variant="h5" sx={{ mt: 1 }}>
                {attendancePercentage}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Attendance %
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Attendance Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "primary.main" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Date
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Day
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "bold" }}
                align="center"
              >
                Status
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Check In
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Check Out
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Working Hours
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceData.map((row, i) => {
              const workingHours =
                row.checkIn !== "-" && row.checkOut !== "-" ? "9h 15m" : "-";

              return (
                <TableRow
                  key={i}
                  hover
                  sx={{
                    bgcolor: row.status === "Weekend" ? "grey.100" : "inherit",
                  }}
                >
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.day}</TableCell>
                  <TableCell align="center">
                    <Chip
                      icon={getStatusIcon(row.status)}
                      label={row.status}
                      color={getStatusColor(row.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{row.checkIn}</TableCell>
                  <TableCell>{row.checkOut}</TableCell>
                  <TableCell>
                    {workingHours !== "-" && (
                      <Typography
                        variant="body2"
                        color={
                          workingHours >= "9h" ? "success.main" : "warning.main"
                        }
                      >
                        {workingHours}
                      </Typography>
                    )}
                    {workingHours === "-" && (
                      <Typography variant="body2">-</Typography>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AttendanceTable;
