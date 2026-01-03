import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  Chip,
  InputAdornment,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  Send as SendIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

const PayrollManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDept, setFilterDept] = useState("all");
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Mock payroll data
  const [payrollData] = useState([
    {
      id: 1,
      empId: "EMP001",
      name: "Rahul Patel",
      dept: "IT",
      designation: "Software Engineer",
      basicSalary: 50000,
      hra: 20000,
      specialAllowance: 10000,
      pf: 5000,
      tax: 2000,
      grossSalary: 80000,
      netSalary: 73000,
      status: "Paid",
      paymentDate: "2026-01-01",
    },
    {
      id: 2,
      empId: "EMP002",
      name: "Sujal Nang",
      dept: "HR",
      designation: "HR Manager",
      basicSalary: 60000,
      hra: 24000,
      specialAllowance: 12000,
      pf: 6000,
      tax: 3000,
      grossSalary: 96000,
      netSalary: 87000,
      status: "Pending",
      paymentDate: null,
    },
    {
      id: 3,
      empId: "EMP003",
      name: "Neel Shah",
      dept: "Finance",
      designation: "Financial Analyst",
      basicSalary: 55000,
      hra: 22000,
      specialAllowance: 11000,
      pf: 5500,
      tax: 2500,
      grossSalary: 88000,
      netSalary: 80000,
      status: "Paid",
      paymentDate: "2026-01-01",
    },
  ]);

  const [editFormData, setEditFormData] = useState({
    basicSalary: 0,
    hra: 0,
    specialAllowance: 0,
    pf: 0,
    tax: 0,
  });

  const handleViewPayroll = (employee) => {
    setSelectedEmployee(employee);
    setViewDialogOpen(true);
  };

  const handleEditPayroll = (employee) => {
    setSelectedEmployee(employee);
    setEditFormData({
      basicSalary: employee.basicSalary,
      hra: employee.hra,
      specialAllowance: employee.specialAllowance,
      pf: employee.pf,
      tax: employee.tax,
    });
    setEditDialogOpen(true);
  };

  const handleSavePayroll = () => {
    // TODO: API call to update payroll
    console.log("Updating payroll:", selectedEmployee.id, editFormData);
    setEditDialogOpen(false);
  };

  const calculateGross = () => {
    return (
      parseFloat(editFormData.basicSalary || 0) +
      parseFloat(editFormData.hra || 0) +
      parseFloat(editFormData.specialAllowance || 0)
    );
  };

  const calculateNet = () => {
    return (
      calculateGross() -
      parseFloat(editFormData.pf || 0) -
      parseFloat(editFormData.tax || 0)
    );
  };

  const filteredData = payrollData.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.empId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = filterDept === "all" || emp.dept === filterDept;
    return matchesSearch && matchesDept;
  });

  const totalGrossSalary = filteredData.reduce(
    (sum, emp) => sum + emp.grossSalary,
    0
  );
  const totalNetSalary = filteredData.reduce(
    (sum, emp) => sum + emp.netSalary,
    0
  );

  return (
    <Box>
      {/* Summary Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Employees
              </Typography>
              <Typography variant="h4">{payrollData.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Gross Payroll
              </Typography>
              <Typography variant="h4" color="primary">
                ₹{totalGrossSalary.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Net Payroll
              </Typography>
              <Typography variant="h4" color="success.main">
                ₹{totalNetSalary.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pending Payments
              </Typography>
              <Typography variant="h4" color="warning.main">
                {payrollData.filter((e) => e.status === "Pending").length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters and Search */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search by name or employee ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              select
              label="Department"
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
            >
              <MenuItem value="all">All Departments</MenuItem>
              <MenuItem value="IT">IT</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<DownloadIcon />}
              sx={{ height: 56 }}
            >
              Export Report
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Payroll Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "primary.main" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Emp ID
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Department
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Designation
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "bold" }}
                align="right"
              >
                Gross Salary
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "bold" }}
                align="right"
              >
                Net Salary
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "bold" }}
                align="center"
              >
                Status
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "bold" }}
                align="center"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((employee) => (
              <TableRow key={employee.id} hover>
                <TableCell>{employee.empId}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.dept}</TableCell>
                <TableCell>{employee.designation}</TableCell>
                <TableCell align="right">
                  ₹{employee.grossSalary.toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  ₹{employee.netSalary.toLocaleString()}
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={employee.status}
                    color={employee.status === "Paid" ? "success" : "warning"}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleViewPayroll(employee)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="secondary"
                    onClick={() => handleEditPayroll(employee)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" color="success">
                    <SendIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View Payroll Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Payroll Details - {selectedEmployee?.name}</DialogTitle>
        <DialogContent>
          {selectedEmployee && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Employee ID
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedEmployee.empId}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Department
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedEmployee.dept} - {selectedEmployee.designation}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="h6" color="primary" gutterBottom>
                    Earnings
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">Basic Salary</Typography>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <Typography variant="body1">
                    ₹{selectedEmployee.basicSalary.toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">HRA</Typography>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <Typography variant="body1">
                    ₹{selectedEmployee.hra.toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">Special Allowance</Typography>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <Typography variant="body1">
                    ₹{selectedEmployee.specialAllowance.toLocaleString()}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="h6" color="error" gutterBottom>
                    Deductions
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">Provident Fund</Typography>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <Typography variant="body1">
                    ₹{selectedEmployee.pf.toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">Professional Tax</Typography>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <Typography variant="body1">
                    ₹{selectedEmployee.tax.toLocaleString()}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" color="primary">
                    Gross Salary
                  </Typography>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <Typography variant="h6" color="primary">
                    ₹{selectedEmployee.grossSalary.toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" color="success.main">
                    Net Salary
                  </Typography>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <Typography variant="h6" color="success.main">
                    ₹{selectedEmployee.netSalary.toLocaleString()}
                  </Typography>
                </Grid>

                {selectedEmployee.paymentDate && (
                  <>
                    <Grid item xs={12}>
                      <Divider sx={{ my: 1 }} />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Payment Date
                      </Typography>
                    </Grid>
                    <Grid item xs={6} textAlign="right">
                      <Typography variant="body1">
                        {selectedEmployee.paymentDate}
                      </Typography>
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
          <Button variant="contained" startIcon={<DownloadIcon />}>
            Download Salary Slip
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Payroll Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Payroll - {selectedEmployee?.name}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" color="primary" gutterBottom>
                  Earnings
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Basic Salary"
                  type="number"
                  value={editFormData.basicSalary}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      basicSalary: e.target.value,
                    })
                  }
                  InputProps={{ startAdornment: "₹" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="HRA"
                  type="number"
                  value={editFormData.hra}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, hra: e.target.value })
                  }
                  InputProps={{ startAdornment: "₹" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Special Allowance"
                  type="number"
                  value={editFormData.specialAllowance}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      specialAllowance: e.target.value,
                    })
                  }
                  InputProps={{ startAdornment: "₹" }}
                />
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
                <Typography variant="h6" color="error" gutterBottom>
                  Deductions
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Provident Fund"
                  type="number"
                  value={editFormData.pf}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, pf: e.target.value })
                  }
                  InputProps={{ startAdornment: "₹" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Professional Tax"
                  type="number"
                  value={editFormData.tax}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, tax: e.target.value })
                  }
                  InputProps={{ startAdornment: "₹" }}
                />
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" color="text.secondary">
                  Gross Salary
                </Typography>
                <Typography variant="h6" color="primary">
                  ₹{calculateGross().toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" color="text.secondary">
                  Net Salary
                </Typography>
                <Typography variant="h6" color="success.main">
                  ₹{calculateNet().toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSavePayroll}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PayrollManagement;
