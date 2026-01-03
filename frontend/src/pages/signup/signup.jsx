import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error", // error | success | warning | info
  });

  const showSnackbar = (message, severity = "error") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const validateForm = () => {
    if (
      !company ||
      !name ||
      !phone ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      showSnackbar("All fields are required", "error");
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      showSnackbar("Phone must be 10 digits", "error");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showSnackbar("Invalid email address", "error");
      return false;
    }

    if (password.length < 8) {
      showSnackbar("Password must be at least 8 characters", "error");
      return false;
    }

    if (password !== confirmPassword) {
      showSnackbar("Passwords do not match", "error");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");

    if (validate()) {
      try {
        const res = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            companyName: formData.company,
            fullName: formData.name,
            phone: formData.phone,
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setErrors({ general: data.message || "Signup failed" });
          return;
        }

        setSuccessMsg("Signup successful!");
        setFormData({
          company: "",
          name: "",
          phone: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setErrors({});
      } catch (error) {
        setErrors({ general: "Server error. Try again later." });
      }
    }
  };

  return (
    <div className="signup-container d-flex justify-content-center align-items-center">
      <form className="signup-form p-4 shadow" onSubmit={handleSubmit}>
        <h2 className="mb-4 text-center">Signup</h2>

        {successMsg && <Alert severity="success">{successMsg}</Alert>}
        {errors.general && <Alert severity="error">{errors.general}</Alert>}

        <CompanyInput value={formData.company} onChange={handleChange} />
        {errors.company && <Alert severity="error">{errors.company}</Alert>}

        <TextInput
          label="Full Name"
          variant="outlined"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ width: "300px" }}
        />
        <TextField
          id="phone"
          label="Phone"
          variant="outlined"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          sx={{ width: "300px" }}
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ width: "300px" }}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ width: "300px" }}
        />
        <TextField
          id="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ width: "300px" }}
        />
        <p>
          Already have an account? <Link to="/">Sign In</Link>
        </p>
        <Button type="submit" variant="contained" sx={{ width: "300px" }}>
          Sign Up
        </Button>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={snackbar.severity} variant="filled">
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default Signup;
