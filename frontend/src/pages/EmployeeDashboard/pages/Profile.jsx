import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  Tabs,
  Tab,
  Divider,
  TextField,
  Button,
} from "@mui/material";

/* -------- Mock Employee Data -------- */
const mockEmployee = {
  name: "Anshu Yadav",
  position: "Software Engineer",
  email: "anshu.yadav@dayflow.com",
  mobile: "+91 98765 43210",
  company: "DayFlow Pvt Ltd",
  manager: "Rahul Sharma",
  department: "Engineering",
  location: "Bengaluru, India",
  address: "123, MG Road, Bengaluru, Karnataka, India",
  image: "https://i.pravatar.cc/150?img=47",
  resume: "Anshu_Yadav_Resume.pdf",

  privateInfo: {
    gender: "Female",
    nationality: "Indian",
    maritalStatus: "Single",
    emergencyContact: "+91 91234 56789",
    medical: "AB+",
  },

  salaryInfo: {
    salary: "₹8,00,000 / year",
    payrollId: "PAY2026-0098",
    bankName: "State Bank of India",
    accountNumber: "XXXXXX1234",
    taxId: "PANABCDE1234",
  },

  security: {
    empCode: "EMP1023",
    accountStatus: "Active",
    lastLogin: "02 Jan 2026, 10:30 AM",
  },
};

const Profile = () => {
  const [tab, setTab] = useState(0);
  const [editable, setEditable] = useState(false);
  const [employee, setEmployee] = useState(mockEmployee);

  /* -------- Handle Field Change -------- */
  const handleChange = (field, value) => {
    setEmployee({ ...employee, [field]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) =>
        setEmployee({ ...employee, image: ev.target.result });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = () => {
    setEditable(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setEmployee(mockEmployee); // reset to initial mock data
    setEditable(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Employee Profile
      </Typography>

      <Grid container spacing={2}>
        {/* ===== LEFT CARD (Profile Summary) ===== */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box textAlign="center" mb={2}>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="profile-pic-upload"
                  type="file"
                  onChange={handleImageChange}
                  disabled={!editable}
                />
                <label htmlFor="profile-pic-upload">
                  <Avatar
                    src={employee.image}
                    sx={{
                      width: 120,
                      height: 120,
                      margin: "auto",
                      cursor: editable ? "pointer" : "default",
                    }}
                  />
                </label>
              </Box>

              <Typography variant="h6">{employee.name}</Typography>
              <Typography color="text.secondary">{employee.position}</Typography>

              <Divider sx={{ my: 2 }} />

              {/* Email is READ-ONLY */}
              <ProfileField label="Email" value={employee.email} />

              {/* Mobile is EDITABLE */}
              <ProfileField
                label="Mobile"
                value={employee.mobile}
                editable={editable}
                onChange={(val) => handleChange("mobile", val)}
              />

              <ProfileField label="Company" value={employee.company} />
              <ProfileField label="Manager" value={employee.manager} />
              <ProfileField label="Department" value={employee.department} />
              <ProfileField label="Location" value={employee.location} />

              {/* Address is EDITABLE */}
              <ProfileField
                label="Address"
                value={employee.address}
                editable={editable}
                onChange={(val) => handleChange("address", val)}
              />

              {/* Save / Cancel Buttons */}
              {editable && (
                <Box
                  mt={2}
                  textAlign="center"
                  display="flex"
                  justifyContent="center"
                  gap={1}
                >
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Box>
              )}

              {/* Edit Button */}
              {!editable && (
                <Box mt={2} textAlign="center">
                  <Button variant="outlined" onClick={() => setEditable(true)}>
                    Edit Profile
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* ===== RIGHT CARD (Tabbed Details) ===== */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: "100%" }}>
            <Tabs
              value={tab}
              onChange={(e, newValue) => setTab(newValue)}
              variant="scrollable"
            >
              <Tab label="Resume" />
              <Tab label="Private Info" />
              <Tab label="Salary Info" />
              <Tab label="Security" />
            </Tabs>

            <CardContent>
              {tab === 0 && (
                <Box>
                  <Typography variant="subtitle1">Resume</Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography>{employee.resume}</Typography>
                </Box>
              )}

              {tab === 1 && (
                <Box>
                  <Typography variant="subtitle1">Private Information</Typography>
                  <Divider sx={{ mb: 2 }} />
                  {Object.entries(employee.privateInfo).map(([key, value]) => (
                    <ProfileField key={key} label={formatLabel(key)} value={value} />
                  ))}
                </Box>
              )}

              {tab === 2 && (
                <Box>
                  <Typography variant="subtitle1">Salary & Payroll</Typography>
                  <Divider sx={{ mb: 2 }} />
                  {Object.entries(employee.salaryInfo).map(([key, value]) => (
                    <ProfileField key={key} label={formatLabel(key)} value={value} />
                  ))}
                </Box>
              )}

              {tab === 3 && (
                <Box>
                  <Typography variant="subtitle1">Security</Typography>
                  <Divider sx={{ mb: 2 }} />
                  {Object.entries(employee.security).map(([key, value]) => (
                    <ProfileField key={key} label={formatLabel(key)} value={value} />
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

/* -------- Reusable Profile Field -------- */
const ProfileField = ({ label, value, editable = false, onChange }) => {
  return (
    <Box mb={1}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      {editable ? (
        <TextField
          fullWidth
          size="small"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <Typography variant="body2">{value}</Typography>
      )}
    </Box>
  );
};

/* -------- Format Labels -------- */
const formatLabel = (text) =>
  text.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

export default Profile;
