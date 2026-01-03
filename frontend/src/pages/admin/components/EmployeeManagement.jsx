import { useState } from "react";
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Grid,
  TextField,
  Button,
  Typography,
  Avatar,
  Divider,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

const EmployeeManagement = ({ employee }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Details
    firstName: employee?.name?.split(" ")[0] || "",
    lastName: employee?.name?.split(" ")[1] || "",
    email: employee?.email || "employee@example.com",
    phone: employee?.phone || "+91 1234567890",
    dateOfBirth: employee?.dob || "1990-01-01",
    address: employee?.address || "123 Main St, City, State, 400001",
    emergencyContact: employee?.emergencyContact || "+91 9876543210",
    bloodGroup: employee?.bloodGroup || "O+",

    // Job Details
    employeeId: employee?.id || "EMP001",
    department: employee?.dept || "IT",
    designation: employee?.designation || "Software Engineer",
    joiningDate: employee?.joiningDate || "2023-01-15",
    employmentType: employee?.employmentType || "Full-time",
    reportingManager: employee?.manager || "John Doe",
    workLocation: employee?.location || "Mumbai Office",

    // Salary Structure
    basicSalary: employee?.basicSalary || "50000",
    hra: employee?.hra || "20000",
    specialAllowance: employee?.specialAllowance || "10000",
    providentFund: employee?.pf || "5000",
    professionalTax: employee?.tax || "2000",
    grossSalary: employee?.gross || "80000",
    netSalary: employee?.net || "73000",
  });

  const [documents] = useState([
    { id: 1, name: "Aadhar Card", uploadDate: "2023-01-10", size: "2.3 MB" },
    { id: 2, name: "PAN Card", uploadDate: "2023-01-10", size: "1.8 MB" },
    {
      id: 3,
      name: "Degree Certificate",
      uploadDate: "2023-01-12",
      size: "3.5 MB",
    },
    {
      id: 4,
      name: "Experience Letter",
      uploadDate: "2023-01-12",
      size: "1.2 MB",
    },
  ]);

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSave = () => {
    // TODO: API call to save employee data
    console.log("Saving employee data:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data
  };

  const renderPersonalDetails = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} display="flex" justifyContent="center" mb={2}>
        <Box position="relative">
          <Avatar sx={{ width: 120, height: 120 }} src={employee?.avatar}>
            {formData.firstName?.[0]}
            {formData.lastName?.[0]}
          </Avatar>
          {isEditing && (
            <IconButton
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                bgcolor: "primary.main",
                color: "white",
                "&:hover": { bgcolor: "primary.dark" },
              }}
              size="small"
            >
              <UploadIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="First Name"
          value={formData.firstName}
          onChange={handleChange("firstName")}
          disabled={!isEditing}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Last Name"
          value={formData.lastName}
          onChange={handleChange("lastName")}
          disabled={!isEditing}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Email"
          value={formData.email}
          onChange={handleChange("email")}
          disabled={!isEditing}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Phone"
          value={formData.phone}
          onChange={handleChange("phone")}
          disabled={!isEditing}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Date of Birth"
          type="date"
          value={formData.dateOfBirth}
          onChange={handleChange("dateOfBirth")}
          disabled={!isEditing}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Blood Group"
          value={formData.bloodGroup}
          onChange={handleChange("bloodGroup")}
          disabled={!isEditing}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Address"
          value={formData.address}
          onChange={handleChange("address")}
          disabled={!isEditing}
          multiline
          rows={2}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Emergency Contact"
          value={formData.emergencyContact}
          onChange={handleChange("emergencyContact")}
          disabled={!isEditing}
        />
      </Grid>
    </Grid>
  );

  const renderJobDetails = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Employee ID"
          value={formData.employeeId}
          disabled
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Department"
          value={formData.department}
          onChange={handleChange("department")}
          disabled={!isEditing}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Designation"
          value={formData.designation}
          onChange={handleChange("designation")}
          disabled={!isEditing}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Joining Date"
          type="date"
          value={formData.joiningDate}
          onChange={handleChange("joiningDate")}
          disabled={!isEditing}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Employment Type"
          value={formData.employmentType}
          onChange={handleChange("employmentType")}
          disabled={!isEditing}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Reporting Manager"
          value={formData.reportingManager}
          onChange={handleChange("reportingManager")}
          disabled={!isEditing}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Work Location"
          value={formData.workLocation}
          onChange={handleChange("workLocation")}
          disabled={!isEditing}
        />
      </Grid>
    </Grid>
  );

  const renderSalaryStructure = () => (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom color="primary">
            Earnings
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Basic Salary"
            value={formData.basicSalary}
            onChange={handleChange("basicSalary")}
            disabled={!isEditing}
            InputProps={{ startAdornment: "₹" }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="HRA"
            value={formData.hra}
            onChange={handleChange("hra")}
            disabled={!isEditing}
            InputProps={{ startAdornment: "₹" }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Special Allowance"
            value={formData.specialAllowance}
            onChange={handleChange("specialAllowance")}
            disabled={!isEditing}
            InputProps={{ startAdornment: "₹" }}
          />
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom color="error">
            Deductions
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Provident Fund"
            value={formData.providentFund}
            onChange={handleChange("providentFund")}
            disabled={!isEditing}
            InputProps={{ startAdornment: "₹" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Professional Tax"
            value={formData.professionalTax}
            onChange={handleChange("professionalTax")}
            disabled={!isEditing}
            InputProps={{ startAdornment: "₹" }}
          />
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Gross Salary
              </Typography>
              <Typography variant="h5" color="primary">
                ₹ {formData.grossSalary}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Net Salary
              </Typography>
              <Typography variant="h5" color="success.main">
                ₹ {formData.netSalary}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const renderDocuments = () => (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h6">Employee Documents</Typography>
        <Button
          variant="contained"
          startIcon={<UploadIcon />}
          onClick={() => setUploadDialogOpen(true)}
        >
          Upload Document
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Document Name</TableCell>
            <TableCell>Upload Date</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell>{doc.name}</TableCell>
              <TableCell>{doc.uploadDate}</TableCell>
              <TableCell>{doc.size}</TableCell>
              <TableCell>
                <Chip label="Verified" color="success" size="small" />
              </TableCell>
              <TableCell align="right">
                <IconButton size="small" color="primary">
                  <DownloadIcon />
                </IconButton>
                <IconButton size="small" color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Upload Dialog */}
      <Dialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
      >
        <DialogTitle>Upload Document</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField fullWidth label="Document Name" margin="normal" />
            <Button
              variant="outlined"
              fullWidth
              component="label"
              sx={{ mt: 2, height: 100 }}
            >
              <UploadIcon sx={{ mr: 1 }} />
              Choose File
              <input type="file" hidden />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => setUploadDialogOpen(false)}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );

  return (
    <Paper sx={{ p: 3 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5">
          Employee Profile - {employee?.name}
        </Typography>
        <Box>
          {!isEditing ? (
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                sx={{ mr: 1 }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </>
          )}
        </Box>
      </Box>

      <Tabs
        value={activeTab}
        onChange={(e, v) => setActiveTab(v)}
        sx={{ mb: 3 }}
      >
        <Tab label="Personal Details" />
        <Tab label="Job Details" />
        <Tab label="Salary Structure" />
        <Tab label="Documents" />
      </Tabs>

      <Box>
        {activeTab === 0 && renderPersonalDetails()}
        {activeTab === 1 && renderJobDetails()}
        {activeTab === 2 && renderSalaryStructure()}
        {activeTab === 3 && renderDocuments()}
      </Box>
    </Paper>
  );
};

export default EmployeeManagement;
