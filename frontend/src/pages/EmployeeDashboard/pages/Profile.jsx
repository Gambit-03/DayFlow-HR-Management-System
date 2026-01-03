import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

/* -------- Mock Employee Data -------- */
const employeeProfile = {
  name: "Anshu Chauhan",
  empCode: "EMP1023",
  company: "DayFlow Pvt Ltd",
  position: "Software Engineer",
  department: "Engineering",
  manager: "Rahul Sharma",
  email: "anshu.chauhan@dayflow.com",
  phone: "+91 98765 43210",
  location: "Bengaluru, India",
  salary: "₹8,00,000 / year",
  gender: "Female",
  nationality: "Indian",
  maritalStatus: "Single",
  address: "Bangalore, Karnataka, India",
  bankName: "State Bank of India",
  accountNumber: "XXXXXX1234",
  emergencyContact: "+91 91234 56789",
  medical: "AB+",
};

const Profile = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Employee Profile
      </Typography>

      
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <ProfileItem label="Employee Name" value={employeeProfile.name} />
            <ProfileItem label="Employee Code" value={employeeProfile.empCode} />
            <ProfileItem label="Company Name" value={employeeProfile.company} />
            <ProfileItem label="Job Position" value={employeeProfile.position} />
            <ProfileItem label="Department" value={employeeProfile.department} />
            <ProfileItem label="Manager" value={employeeProfile.manager} />
            <ProfileItem label="Email" value={employeeProfile.email} />
            <ProfileItem label="Mobile Number" value={employeeProfile.phone} />
            <ProfileItem label="Location" value={employeeProfile.location} />
            <ProfileItem label="Salary" value={employeeProfile.salary} />
            <ProfileItem label="Gender" value={employeeProfile.gender} />
            <ProfileItem label="Nationality" value={employeeProfile.nationality} />
            <ProfileItem label="Marital Status" value={employeeProfile.maritalStatus} />
            <ProfileItem label="Address" value={employeeProfile.address} />
            <ProfileItem label="Bank Name" value={employeeProfile.bankName} />
            <ProfileItem label="Account Number" value={employeeProfile.accountNumber} />
            <ProfileItem label="Emergency Contact" value={employeeProfile.emergencyContact} />
            <ProfileItem label="Medical Info" value={employeeProfile.medical} />
          </Grid>

          {/* Resume Button */}
          <Box mt={3} textAlign="center">
            <Button variant="contained" onClick={() => setOpen(true)}>
              View Resume
            </Button>
          </Box>
        </CardContent>
      </Card>

      
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Employee Resume</DialogTitle>
        <DialogContent dividers>
          <Typography>
            📄 Resume Preview Placeholder
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            (Later this can show PDF using iframe or download link)
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};


const ProfileItem = ({ label, value }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Typography variant="subtitle2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body1">{value}</Typography>
  </Grid>
);

export default Profile;
