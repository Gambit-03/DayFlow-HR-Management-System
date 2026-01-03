import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./signin.css";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error", // error | success | warning | info
  });
  const validateForm = () => {
    if (!email || !password) {
      showSnackbar("All fields are required", "error");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showSnackbar("Invalid email address", "error");
      return false;
    }

    return true;
  };
  const showSnackbar = (message, severity = "error") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Backend error message
        showSnackbar(data.message || "Login failed", "error");
        return;
      }

      showSnackbar("Login successful!", "success");
      // redirect or store token here
    } catch (error) {
      showSnackbar("Server error. Try again later.", "error");
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          height: "100vh",
          flexDirection: "column",
          gap: "20px",
        }}
        autoComplete="off"
      >
        <h1>Sign In</h1>
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
          id="passsword"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ width: "300px" }}
        />
        <p>
          Not registered? <Link to="/signup">Sign Up</Link>
        </p>
        <Button type="submit" variant="contained" sx={{ width: "300px" }}>
          Sign In
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

export default Signin;
