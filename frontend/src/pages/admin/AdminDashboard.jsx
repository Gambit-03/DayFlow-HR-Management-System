import { useState } from "react";
import AdminLayout from "./layout/AdminLayout";
import EmployeeList from "./components/EmployeeList";
import AttendanceTable from "./components/AttendanceTable";
import LeaveApproval from "./components/LeaveApproval";
import { Tabs, Tab, Box } from "@mui/material";

const AdminDashboard = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [tab, setTab] = useState(0);

  return (
    <AdminLayout>
      <EmployeeList onSelect={setSelectedEmployee} />

      {selectedEmployee && (
        <>
          <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mt: 2 }}>
            <Tab label="Attendance" />
            <Tab label="Leave Approvals" />
          </Tabs>

          <Box sx={{ mt: 2 }}>
            {tab === 0 && <AttendanceTable employee={selectedEmployee} />}
            {tab === 1 && <LeaveApproval employee={selectedEmployee} />}
          </Box>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
