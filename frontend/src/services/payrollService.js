import api from "./api";

// Payroll/Salary Management APIs
export const payrollService = {
  // Get all payroll records
  getAllPayroll: async (params) => {
    const response = await api.get("/payroll", { params });
    return response.data;
  },

  // Get payroll by employee ID
  getPayrollByEmployeeId: async (employeeId) => {
    const response = await api.get(`/payroll/employee/${employeeId}`);
    return response.data;
  },

  // Update salary structure
  updateSalary: async (employeeId, salaryData) => {
    const response = await api.put(
      `/payroll/employee/${employeeId}`,
      salaryData
    );
    return response.data;
  },

  // Generate salary slip
  generateSalarySlip: async (employeeId, month, year) => {
    const response = await api.get(`/payroll/salary-slip/${employeeId}`, {
      params: { month, year },
      responseType: "blob",
    });
    return response.data;
  },

  // Process payroll
  processPayroll: async (month, year) => {
    const response = await api.post("/payroll/process", { month, year });
    return response.data;
  },

  // Get payroll summary
  getPayrollSummary: async (params) => {
    const response = await api.get("/payroll/summary", { params });
    return response.data;
  },
};

export default payrollService;
