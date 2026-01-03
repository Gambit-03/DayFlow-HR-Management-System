import React from "react";
import DashboardCards from "../components/DashboardCards";
import RecentActivities from "../components/RecentActivities";
import "../EmployeeDashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Employee Dashboard</h2>

      
      <DashboardCards />

    
      <RecentActivities />
    </div>
  );
};

export default Dashboard;
