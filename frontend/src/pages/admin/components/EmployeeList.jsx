import { useState, useEffect } from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Avatar,
  Chip,
  MenuItem,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Search as SearchIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import employeeService from "../../../services/employeeService";

const EmployeeList = ({ onSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await employeeService.getAllEmployees();
      setEmployees(data);
    } catch (err) {
      console.error("Error fetching employees:", err);
      setError(err.response?.data?.message || "Failed to fetch employees");
      // Fallback to mock data for development
      setEmployees([
        {
          id: 1,
          name: "Rahul Patel",
          dept: "IT",
          designation: "Software Engineer",
          email: "rahul@dayflow.com",
          status: "Active",
          avatar: null,
        },
        {
          id: 2,
          name: "Sujal Nang",
          dept: "HR",
          designation: "HR Manager",
          email: "sujal@dayflow.com",
          status: "Active",
          avatar: null,
        },
        {
          id: 3,
          name: "Neel Shah",
          dept: "Finance",
          designation: "Financial Analyst",
          email: "neel@dayflow.com",
          status: "Active",
          avatar: null,
        },
        {
          id: 4,
          name: "Priya Sharma",
          dept: "IT",
          designation: "Senior Developer",
          email: "priya@dayflow.com",
          status: "Active",
          avatar: null,
        },
        {
          id: 5,
          name: "Amit Kumar",
          dept: "Sales",
          designation: "Sales Manager",
          email: "amit@dayflow.com",
          status: "Active",
          avatar: null,
        },
        {
          id: 6,
          name: "Sneha Gupta",
          dept: "Finance",
          designation: "Accountant",
          email: "sneha@dayflow.com",
          status: "Active",
          avatar: null,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (emp) => {
    setSelectedId(emp.id);
    onSelect(emp);
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.designation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = deptFilter === "all" || emp.dept === deptFilter;
    return matchesSearch && matchesDept;
  });

  const departments = ["all", ...new Set(employees.map((emp) => emp.dept))];

  if (loading) {
    return (
      <Paper sx={{ p: 2 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight={200}
        >
          <CircularProgress />
        </Box>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2 }}>
      {error && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {error} - Using mock data for demonstration
        </Alert>
      )}

      <Box mb={2}>
        <Typography variant="h6" gutterBottom>
          Employee Directory
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {filteredEmployees.length} employees
        </Typography>
      </Box>

      {/* Search and Filter */}
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            placeholder="Search by name, email, or designation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            select
            label="Department"
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            size="small"
          >
            {departments.map((dept) => (
              <MenuItem key={dept} value={dept}>
                {dept === "all" ? "All Departments" : dept}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      {/* Employee List */}
      <List sx={{ maxHeight: 600, overflow: "auto" }}>
        {filteredEmployees.map((emp) => (
          <ListItemButton
            key={emp.id}
            onClick={() => handleSelect(emp)}
            selected={selectedId === emp.id}
            sx={{
              mb: 1,
              borderRadius: 2,
              border: 1,
              borderColor: selectedId === emp.id ? "primary.main" : "divider",
              "&.Mui-selected": {
                bgcolor: "primary.light",
                "&:hover": {
                  bgcolor: "primary.light",
                },
              },
            }}
          >
            <Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>
              {emp.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar>
            <ListItemText
              primary={
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="body1" fontWeight="bold">
                    {emp.name}
                  </Typography>
                  <Chip label={emp.dept} size="small" color="primary" />
                </Box>
              }
              secondary={
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {emp.designation}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {emp.email}
                  </Typography>
                </Box>
              }
            />
            <Chip
              label={emp.status}
              size="small"
              color="success"
              sx={{ ml: 2 }}
            />
          </ListItemButton>
        ))}
      </List>

      {filteredEmployees.length === 0 && (
        <Box textAlign="center" py={4}>
          <PersonIcon sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
          <Typography variant="body1" color="text.secondary">
            No employees found
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default EmployeeList;
