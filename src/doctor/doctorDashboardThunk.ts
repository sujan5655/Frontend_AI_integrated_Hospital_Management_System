import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

/* =========================
   TYPES
========================= */

export interface DoctorDashboard {
  total_appointments: number;
  today_appointments: number;
  upcoming_appointments: number;
  completed_appointments: number;
  pending_appointments: number;
}

export interface Appointment {
  id: number;
  patient_name?: string;
  doctor_name?: string;
  date?: string;
  time?: string;
  status?: string;
  reason?: string;
}

/* =========================
   DOCTOR DASHBOARD
========================= */

export const fetchDoctorDashboard = createAsyncThunk<
  DoctorDashboard,
  void,
  { rejectValue: string }
>("doctor/fetchDashboard", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/doctor/dashboard/");
    console.log(response, "API Response");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.detail || "Failed to load doctor dashboard.",
    );
  }
});

/* =========================
   ALL APPOINTMENTS
========================= */

export const fetchDoctorAppointments = createAsyncThunk<
  Appointment[],
  void,
  { rejectValue: string }
>("doctor/fetchAppointments", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/doctor/appointments/");

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.detail || "Failed to load appointments.",
    );
  }
});

/* =========================
   TODAY APPOINTMENTS
========================= */

export const fetchTodayAppointments = createAsyncThunk<
  Appointment[],
  void,
  { rejectValue: string }
>("doctor/fetchTodayAppointments", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/doctor/appointments/today/");

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.detail || "Failed to load today's appointments.",
    );
  }
});

/* =========================
   UPCOMING APPOINTMENTS
========================= */

export const fetchUpcomingAppointments = createAsyncThunk<
  Appointment[],
  void,
  { rejectValue: string }
>("doctor/fetchUpcomingAppointments", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/doctor/appointments/upcoming/");

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.detail || "Failed to load upcoming appointments.",
    );
  }
});

/* =========================
   COMPLETED APPOINTMENTS
========================= */

export const fetchCompletedAppointments = createAsyncThunk<
  Appointment[],
  void,
  { rejectValue: string }
>("doctor/fetchCompletedAppointments", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/doctor/appointments/completed/");

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.detail || "Failed to load completed appointments.",
    );
  }
});

/* =========================
   UPDATE APPOINTMENT STATUS
========================= */

export interface UpdateAppointmentStatusPayload {
  appointmentId: number;
  status: string;
}

export const updateAppointmentStatus = createAsyncThunk<
  Appointment,
  UpdateAppointmentStatusPayload,
  { rejectValue: string }
>(
  "doctor/updateAppointmentStatus",
  async ({ appointmentId, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/appointments/${appointmentId}/status/`,
        {
          status,
        },
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to update appointment status.",
      );
    }
  },
);
