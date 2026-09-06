import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface PatientDashboardData {
  patient?: any;
  appointments?: any[];
  medical_reports?: any[];
  [key: string]: any;
}

interface PatientDashboardState {
  data: PatientDashboardData | null;
  loading: boolean;
  error: string | null;
}

const initialState: PatientDashboardState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchPatientDashboard = createAsyncThunk(
  "patientDashboard/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.get(
        "http://127.0.0.1:8000/api/patient/dashboard/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail ||
          error.response?.data?.error ||
          "Failed to load patient dashboard.",
      );
    }
  },
);

const patientDashboardSlice = createSlice({
  name: "patientDashboard",
  initialState,
  reducers: {
    clearPatientDashboard: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPatientDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearPatientDashboard } = patientDashboardSlice.actions;

export default patientDashboardSlice.reducer;
