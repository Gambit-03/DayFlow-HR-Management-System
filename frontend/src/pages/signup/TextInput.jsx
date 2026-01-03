import React from "react";
import { TextField } from "@mui/material";

const TextInput = ({ label, name, value, onChange }) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      name={name}
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      className="mb-3"
    />
  );
};

export default TextInput;
