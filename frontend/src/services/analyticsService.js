import api from "./api";

// Analytics & Reports APIs
export const analyticsService = {
  // Get dashboard analytics
  getDashboardAnalytics: async (params) => {
    const response = await api.get("/analytics/dashboard", { params });
    return response.data;
  },

  // Get attendance analytics
  getAttendanceAnalytics: async (params) => {
    const response = await api.get("/analytics/attendance", { params });
    return response.data;
  },

  // Get leave analytics
  getLeaveAnalytics: async (params) => {
    const response = await api.get("/analytics/leave", { params });
    return response.data;
  },

  // Get payroll analytics
  getPayrollAnalytics: async (params) => {
    const response = await api.get("/analytics/payroll", { params });
    return response.data;
  },

  // Get department statistics
  getDepartmentStats: async () => {
    const response = await api.get("/analytics/departments");
    return response.data;
  },

  // Export report
  exportReport: async (reportType, params) => {
    const response = await api.get(`/analytics/export/${reportType}`, {
      params,
      responseType: "blob",
    });
    return response.data;
  },
};

export default analyticsService;
