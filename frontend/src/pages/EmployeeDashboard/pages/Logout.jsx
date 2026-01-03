import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box } from "@mui/material";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // later you can also clear token / localStorage here
    // localStorage.removeItem("token");

    navigate("/signup");
  }, [navigate]);

  return (
    <Box sx={{ padding: 3, textAlign: "center" }}>
      <Typography variant="h6">
        Logging out...
      </Typography>
    </Box>
  );
};

export default Logout;
