import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  type PendingDoctor,
  type AdminDashboardData,
  type AdminState,
} from "../types/admin";
import {
  approveDoctor,
  getAdminDashboard,
  getPendingDoctors,
  rejectDoctor,
} from "../services/api";

const initialState: AdminState = {
  dashboard: null,
  pendingDoctors: [],
  loading: false,
  error: null,
  actionLoading: false,
};
export const fetchAdminDashboard = createAsyncThunk<AdminDashboardData>(
  "admin/fetchDashboard",
  async (_, thunkAPI) => {
    try {
      return await getAdminDashboard();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.detail || "Failed to load admin dashboard.",
      ) as never;
    }
  },
);
export const fetchPendingDoctors = createAsyncThunk<PendingDoctor[]>(
  "admin/fetchPendingDoctors",
  async (_, thunkAPI) => {
    try {
      return await getPendingDoctors();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.detail || "Failed to load pending doctors.",
      ) as never;
    }
  },
);
export const approveDoctorAction = createAsyncThunk<number, number>(
  "admin/approveDoctor",
  async (userId, thunkAPI) => {
    try {
      await approveDoctor(userId);

      return userId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.detail || "Failed to approve doctor.",
      ) as never;
    }
  },
);

export const rejectDoctorAction = createAsyncThunk<number, number>(
  "admin/rejectDoctor",
  async (userId, thunkAPI) => {
    try {
      await rejectDoctor(userId);

      return userId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.detail || "Failed to reject doctor.",
      ) as never;
    }
  },
);

const adminSlice = createSlice({
  name: "admin",

  initialState,

  reducers: {
    clearAdminError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // Dashboard
    builder
      .addCase(fetchAdminDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })

      .addCase(fetchAdminDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to load dashboard.";
      });

    // Pending doctors
    builder
      .addCase(fetchPendingDoctors.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchPendingDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingDoctors = action.payload;
      })

      .addCase(fetchPendingDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to load doctors.";
      });

    // Approve doctor
    builder
      .addCase(approveDoctorAction.pending, (state) => {
        state.actionLoading = true;
      })

      .addCase(approveDoctorAction.fulfilled, (state, action) => {
        state.actionLoading = false;

        state.pendingDoctors = state.pendingDoctors.filter(
          (doctor) => doctor.user_id !== action.payload,
        );
      })

      .addCase(approveDoctorAction.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = (action.payload as string) || "Failed to approve doctor.";
      });

    // Reject doctor
    builder
      .addCase(rejectDoctorAction.pending, (state) => {
        state.actionLoading = true;
      })

      .addCase(rejectDoctorAction.fulfilled, (state, action) => {
        state.actionLoading = false;

        state.pendingDoctors = state.pendingDoctors.filter(
          (doctor) => doctor.user_id !== action.payload,
        );
      })

      .addCase(rejectDoctorAction.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = (action.payload as string) || "Failed to reject doctor.";
      });
  },
});

export const { clearAdminError } = adminSlice.actions;

export default adminSlice.reducer;
