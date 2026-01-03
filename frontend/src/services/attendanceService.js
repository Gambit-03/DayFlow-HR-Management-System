import api from "./api";

// Attendance Management APIs
export const attendanceService = {
  // Check in
  checkIn: async () => {
    const response = await api.post("/attendance/check-in");
    return response.data;
  },

  // Check out
  checkOut: async () => {
    const response = await api.post("/attendance/check-out");
    return response.data;
  },

  // Get attendance records
  getAttendance: async (params) => {
    const response = await api.get("/attendance", { params });
    return response.data;
  },

  // Get attendance summary
  getAttendanceSummary: async (params) => {
    const response = await api.get("/attendance/summary", { params });
    return response.data;
  },

  // Get attendance by ID
  getAttendanceById: async (id) => {
    const response = await api.get(`/attendance/${id}`);
    return response.data;
  },

  // Get employee attendance (for admin)
  getEmployeeAttendance: async (employeeId, params) => {
    const response = await api.get(`/employees/${employeeId}/attendance`, {
      params,
    });
    return response.data;
  },
};

export default attendanceService;
