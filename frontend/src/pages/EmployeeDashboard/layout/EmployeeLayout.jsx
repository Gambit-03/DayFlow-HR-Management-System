import { Box } from "@mui/material";

const EmployeeLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f7fa" }}>
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            overflowY: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default EmployeeLayout;
