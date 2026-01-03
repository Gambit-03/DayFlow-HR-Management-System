import Signin from "./pages/signin/signin";
import Signup from "./pages/signup/signup";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/EmployeeDashboard/pages/Dashboard";
import Profile from "./pages/EmployeeDashboard/pages/Profile";
import Leave from "./pages/EmployeeDashboard/pages/Leave";
import Attendance from "./pages/EmployeeDashboard/pages/Attendance";
import Logout from "./pages/EmployeeDashboard/pages/Logout";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/employee" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </>
  );
};

export default App;
