import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

// ---------- Mock Attendance Data ----------
const attendanceData = [
  {
    date: "2026-01-01",
    checkIn: "09:10 AM",
    checkOut: "06:00 PM",
    workHours: "8h 50m",
    extraHours: "50m",
  },
  {
    date: "2026-01-02",
    checkIn: "09:00 AM",
    checkOut: "05:30 PM",
    workHours: "8h 30m",
    extraHours: "30m",
  },
  {
    date: "2026-01-03",
    checkIn: "—",
    checkOut: "—",
    workHours: "Leave",
    extraHours: "—",
  },
];

const Attendance = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthYear = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const todayFullDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  return (
    <Box sx={{ padding: 2 }}>
     
      <Typography variant="h5" align="center" gutterBottom>
        Attendance
      </Typography>

    
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
        mb={2}
      >
        <IconButton onClick={handlePrevMonth}>
          <ArrowBackIos fontSize="small" />
        </IconButton>

        <Typography variant="h6">{monthYear}</Typography>

        <IconButton onClick={handleNextMonth}>
          <ArrowForwardIos fontSize="small" />
        </IconButton>
      </Box>

     
      <Box
        display="flex"
        justifyContent="space-around"
        flexWrap="wrap"
        mb={2}
        gap={2}
      >
        <Paper sx={{ padding: 2, minWidth: 150, textAlign: "center" }}>
          <Typography variant="subtitle2">Present Days</Typography>
          <Typography variant="h6">20</Typography>
        </Paper>

        <Paper sx={{ padding: 2, minWidth: 150, textAlign: "center" }}>
          <Typography variant="subtitle2">Leaves</Typography>
          <Typography variant="h6">2</Typography>
        </Paper>

        <Paper sx={{ padding: 2, minWidth: 150, textAlign: "center" }}>
          <Typography variant="subtitle2">Working Days</Typography>
          <Typography variant="h6">22</Typography>
        </Paper>
      </Box>

    
      <Typography align="center" mb={2} color="text.secondary">
        Today: {todayFullDate}
      </Typography>

      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Date</b></TableCell>
              <TableCell><b>Check In</b></TableCell>
              <TableCell><b>Check Out</b></TableCell>
              <TableCell><b>Work Hours</b></TableCell>
              <TableCell><b>Extra Hours</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {attendanceData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.checkIn}</TableCell>
                <TableCell>{row.checkOut}</TableCell>
                <TableCell>{row.workHours}</TableCell>
                <TableCell>{row.extraHours}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Attendance;
