import api from "./api";

// Leave/Time-off Management APIs
export const leaveService = {
  // Get time off types
  getTimeOffTypes: async () => {
    const response = await api.get("/time-off/types");
    return response.data;
  },

  // Get time off allocations
  getAllocations: async () => {
    const response = await api.get("/time-off/allocations");
    return response.data;
  },

  // Get all time off requests
  getTimeOffRequests: async (params) => {
    const response = await api.get("/time-off/requests", { params });
    return response.data;
  },

  // Get time off request by ID
  getTimeOffRequestById: async (id) => {
    const response = await api.get(`/time-off/requests/${id}`);
    return response.data;
  },

  // Create time off request
  createTimeOffRequest: async (requestData) => {
    const response = await api.post("/time-off/requests", requestData);
    return response.data;
  },

  // Approve time off request
  approveTimeOffRequest: async (id, comment) => {
    const response = await api.put(`/time-off/requests/${id}/approve`, {
      comment,
    });
    return response.data;
  },

  // Reject time off request
  rejectTimeOffRequest: async (id, comment) => {
    const response = await api.put(`/time-off/requests/${id}/reject`, {
      comment,
    });
    return response.data;
  },

  // Get employee time off
  getEmployeeTimeOff: async (employeeId) => {
    const response = await api.get(`/employees/${employeeId}/time-off`);
    return response.data;
  },
};

export default leaveService;
