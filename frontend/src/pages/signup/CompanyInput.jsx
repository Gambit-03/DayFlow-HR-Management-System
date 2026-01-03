import React from "react";
import { TextField } from "@mui/material";

const CompanyInput = ({ value, onChange }) => {
  return (
    <div className="mb-3">
      <TextField
        label="Company Name"
        variant="outlined"
        fullWidth
        name="company"
        value={value}
        onChange={(e) => onChange("company", e.target.value)}
      />
    </div>
  );
};

export default CompanyInput;
