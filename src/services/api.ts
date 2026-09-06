const API_URL = "http://localhost:8000/api";

import axios from "axios";
import type { AdminDashboardData, PendingDoctor } from "../types/admin";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;

export const loginUser = async (email: string, password: string) => {
  const response = await api.post("auth/login/", {
    email,
    password,
  });

  return response.data;
};

export const sendAIMessage = async (message: string) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("You are not logged in.");
  }

  const response = await fetch(`${API_URL}/ai/chat/`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      message,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || data.error || "AI request failed");
  }

  return data;
};

export const getPatientDashboard = async () => {
  const response = await api.get("patient/dashboard/");

  return response.data;
};

export const getDoctorDashboard = async () => {
  const response = await api.get("doctor/dashboard/");

  return response.data;
};

export const getStaffDashboard = async () => {
  const response = await api.get("staff/dashboard/");

  return response.data;
};

export const getAdminDashboard = async (): Promise<AdminDashboardData> => {
  const response = await api.get<AdminDashboardData>("admin/dashboard/");

  return response.data;
};

export const getPendingDoctors = async (): Promise<PendingDoctor[]> => {
  const response = await api.get<PendingDoctor[]>("admin/doctors/pending/");

  return response.data;
};

export const approveDoctor = async (userId: number) => {
  const response = await api.post(`admin/doctors/${userId}/approve/`);

  return response.data;
};

export const rejectDoctor = async (userId: number) => {
  const response = await api.post(`admin/doctors/${userId}/reject/`);

  return response.data;
};
