import api from "./api";

// Employee Management APIs
export const employeeService = {
  // Get all employees
  getAllEmployees: async () => {
    const response = await api.get("/employees");
    return response.data;
  },

  // Get employee by ID
  getEmployeeById: async (id) => {
    const response = await api.get(`/employees/${id}`);
    return response.data;
  },

  // Create new employee
  createEmployee: async (employeeData) => {
    const response = await api.post("/employees", employeeData);
    return response.data;
  },

  // Update employee
  updateEmployee: async (id, employeeData) => {
    const response = await api.put(`/employees/${id}`, employeeData);
    return response.data;
  },

  // Delete employee
  deleteEmployee: async (id) => {
    const response = await api.delete(`/employees/${id}`);
    return response.data;
  },

  // Get employee attendance
  getEmployeeAttendance: async (id, params) => {
    const response = await api.get(`/employees/${id}/attendance`, { params });
    return response.data;
  },

  // Get employee time off
  getEmployeeTimeOff: async (id) => {
    const response = await api.get(`/employees/${id}/time-off`);
    return response.data;
  },
};

export default employeeService;
