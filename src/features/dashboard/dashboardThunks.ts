import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getAdminDashboard,
  getDoctorDashboard,
  getPatientDashboard,
  getStaffDashboard,
} from "../../services/api";

export const fetchAdminDashboard = createAsyncThunk(
  "dashboard/admin",
  async (_, { rejectWithValue }) => {
    try {
      return await getAdminDashboard();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to load admin dashboard",
      );
    }
  },
);

export const fetchDoctorDashboard = createAsyncThunk(
  "dashboard/doctor",
  async (_, { rejectWithValue }) => {
    try {
      return await getDoctorDashboard();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to load doctor dashboard",
      );
    }
  },
);

export const fetchPatientDashboard = createAsyncThunk(
  "dashboard/patient",
  async (_, { rejectWithValue }) => {
    try {
      return await getPatientDashboard();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to load patient dashboard",
      );
    }
  },
);

export const fetchStaffDashboard = createAsyncThunk(
  "dashboard/staff",
  async (_, { rejectWithValue }) => {
    try {
      return await getStaffDashboard();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to load staff dashboard",
      );
    }
  },
);
