// src/services/api.js
import axios from 'axios';

// Replace with your actual Django deployed URL
const API_BASE_URL = 'http://localhost:8000/api'; 

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Centralized Endpoints
export const EmployeeService = {
  getAll: () => apiClient.get('/employees/'),
  getById: (id) => apiClient.get(`/employees/${id}/`),
  create: (data) => apiClient.post('/employees/', data),
  update: (id, data) => apiClient.put(`/employees/${id}/`, data),
  delete: (id) => apiClient.delete(`/employees/${id}/`),
};

export const AttendanceService = {
getByEmployee: (employeeId, params = {}) =>
    apiClient.get("/attendance/", {
        params: {
        employee: employeeId,
        ...params,
        },
    }),  mark: (data) => apiClient.post('/attendance/', data),
  update: (id, data) => apiClient.put(`/attendance/${id}/`, data),
};

export default apiClient;