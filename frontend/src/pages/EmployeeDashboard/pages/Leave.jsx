import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";


const leaveHistory = [
  {
    id: 1,
    name: "Anshu Chauhan",
    startDate: "2025-12-10",
    endDate: "2025-12-12",
    type: "Paid Leave",
    status: "Approved",
  },
  {
    id: 2,
    name: "Anshu Chauhan",
    startDate: "2026-01-03",
    endDate: "2026-01-04",
    type: "Sick Leave",
    status: "Pending",
  },
];

const Leave = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Leave Management
      </Typography>

      
      <Box
        display="flex"
        justifyContent="space-around"
        flexWrap="wrap"
        gap={2}
        mb={3}
      >
        <Card sx={{ minWidth: 180, textAlign: "center" }}>
          <CardContent>
            <Typography variant="subtitle2">Paid Leave Available</Typography>
            <Typography variant="h6">10 Days</Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 180, textAlign: "center" }}>
          <CardContent>
            <Typography variant="subtitle2">Sick Leave Available</Typography>
            <Typography variant="h6">5 Days</Typography>
          </CardContent>
        </Card>

        <Button
          variant="contained"
          sx={{ height: 56 }}
          onClick={handleOpen}
        >
          Apply New Leave
        </Button>
      </Box>

     
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Employee Name</b></TableCell>
              <TableCell><b>Start Date</b></TableCell>
              <TableCell><b>End Date</b></TableCell>
              <TableCell><b>Leave Type</b></TableCell>
              <TableCell><b>Status</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {leaveHistory.map((leave) => (
              <TableRow key={leave.id}>
                <TableCell>{leave.name}</TableCell>
                <TableCell>{leave.startDate}</TableCell>
                <TableCell>{leave.endDate}</TableCell>
                <TableCell>{leave.type}</TableCell>
                <TableCell>{leave.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ===== Apply Leave Dialog ===== */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Apply for Leave</DialogTitle>

        <DialogContent dividers>
          <TextField
            label="Employee Name"
            fullWidth
            margin="normal"
            defaultValue="Anshu Chauhan"
          />

          <TextField
            select
            label="Leave Type"
            fullWidth
            margin="normal"
          >
            <MenuItem value="Paid Leave">Paid Leave</MenuItem>
            <MenuItem value="Sick Leave">Sick Leave</MenuItem>
          </TextField>

          <TextField
            label="Start Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="End Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            type="file"
            fullWidth
            margin="normal"
            helperText="Upload medical certificate (for sick leave)"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Discard</Button>
          <Button variant="contained">Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Leave;
