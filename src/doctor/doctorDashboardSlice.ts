import { createSlice } from "@reduxjs/toolkit";

import {
  type Appointment,
  type DoctorDashboard,
  fetchDoctorDashboard,
  fetchDoctorAppointments,
  fetchTodayAppointments,
  fetchUpcomingAppointments,
  fetchCompletedAppointments,
  updateAppointmentStatus,
} from "./doctorDashboardThunk";

interface DoctorState {
  dashboard: DoctorDashboard | null;

  appointments: Appointment[];
  todayAppointments: Appointment[];
  upcomingAppointments: Appointment[];
  completedAppointments: Appointment[];

  loading: boolean;
  appointmentsLoading: boolean;

  error: string | null;
}

const initialState: DoctorState = {
  dashboard: null,

  appointments: [],
  todayAppointments: [],
  upcomingAppointments: [],
  completedAppointments: [],

  loading: false,
  appointmentsLoading: false,

  error: null,
};

const doctorSlice = createSlice({
  name: "doctor",

  initialState,

  reducers: {
    clearDoctorData: (state) => {
      state.dashboard = null;

      state.appointments = [];
      state.todayAppointments = [];
      state.upcomingAppointments = [];
      state.completedAppointments = [];

      state.error = null;
    },
  },

  extraReducers: (builder) => {
    /* =========================
       DASHBOARD
    ========================= */

    builder
      .addCase(fetchDoctorDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchDoctorDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })

      .addCase(fetchDoctorDashboard.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to load dashboard.";
      });

    /* =========================
       ALL APPOINTMENTS
    ========================= */

    builder
      .addCase(fetchDoctorAppointments.pending, (state) => {
        state.appointmentsLoading = true;
        state.error = null;
      })

      .addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
        state.appointmentsLoading = false;
        state.appointments = action.payload;
      })

      .addCase(fetchDoctorAppointments.rejected, (state, action) => {
        state.appointmentsLoading = false;

        state.error = action.payload || "Failed to load appointments.";
      });

    /* =========================
       TODAY
    ========================= */

    builder.addCase(fetchTodayAppointments.fulfilled, (state, action) => {
      state.todayAppointments = action.payload;
    });

    /* =========================
       UPCOMING
    ========================= */

    builder.addCase(fetchUpcomingAppointments.fulfilled, (state, action) => {
      state.upcomingAppointments = action.payload;
    });

    /* =========================
       COMPLETED
    ========================= */

    builder.addCase(fetchCompletedAppointments.fulfilled, (state, action) => {
      state.completedAppointments = action.payload;
    });

    /* =========================
       UPDATE STATUS
    ========================= */

    builder.addCase(updateAppointmentStatus.fulfilled, (state, action) => {
      const updated = action.payload;

      state.appointments = state.appointments.map((appointment) =>
        appointment.id === updated.id ? updated : appointment,
      );
    });
  },
});

export const { clearDoctorData } = doctorSlice.actions;

export default doctorSlice.reducer;
