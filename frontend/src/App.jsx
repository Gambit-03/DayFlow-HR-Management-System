import Signin from "./pages/signin/signin";
import Signup from "./pages/signup/signup";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
};

export default App;
