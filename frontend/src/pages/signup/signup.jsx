import React, { useState } from "react";
import "./Signup.css";
import CompanyInput from "./CompanyInput";
import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import { Button, Alert } from "@mui/material";

const Signup = () => {
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.company.trim()) newErrors.company = "Company Name is required";
    if (!formData.name.trim()) newErrors.name = "Full Name is required";

    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone must be 10 digits";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email address";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg("");

    if (validate()) {
      setSuccessMsg("Signup successful!");
      console.log(formData);
      setFormData({
        company: "",
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="signup-container d-flex justify-content-center align-items-center">
      <form className="signup-form p-4 shadow" onSubmit={handleSubmit}>
        <h2 className="mb-4 text-center">Signup</h2>

        {successMsg && <Alert severity="success">{successMsg}</Alert>}

        <CompanyInput
          value={formData.company}
          onChange={handleChange}
        />
        {errors.company && <Alert severity="error">{errors.company}</Alert>}

        <TextInput
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <Alert severity="error">{errors.name}</Alert>}

        <TextInput
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <Alert severity="error">{errors.phone}</Alert>}

        <TextInput
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <Alert severity="error">{errors.email}</Alert>}

        <PasswordInput
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <Alert severity="error">{errors.password}</Alert>}

        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <Alert severity="error">{errors.confirmPassword}</Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="mt-3"
        >
          Sign Up
        </Button>

        <p className="mt-3 text-center">
          Already have an account? <a href="#">Sign In</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
