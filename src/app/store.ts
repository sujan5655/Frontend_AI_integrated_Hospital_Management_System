import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import patientDashboardReducer from "../features/patientDashboardSlice";
import doctorDashboardReducer from "../doctor/doctorDashboardSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    patientDashboard: patientDashboardReducer,
    doctorDashboard: doctorDashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
