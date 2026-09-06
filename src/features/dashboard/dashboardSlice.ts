import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DashboardState {
  data: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  data: null,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState,

  reducers: {
    dashboardStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    dashboardSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
    },

    dashboardFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearDashboard: (state) => {
      state.data = null;
    },
  },
});

export const {
  dashboardStart,
  dashboardSuccess,
  dashboardFailure,
  clearDashboard,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
