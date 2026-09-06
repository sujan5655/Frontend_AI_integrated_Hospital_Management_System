import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Role = "admin" | "doctor" | "patient" | "staff";

export interface User {
  user_id: number;
  email: string;
  role: Role;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  loading: false;
  isAuthenticated: boolean;
}

const accessToken = localStorage.getItem("access_token");
const refreshToken = localStorage.getItem("refresh_token");

const initialState: AuthState = {
  accessToken,
  refreshToken,
  user: null,
  loading: false,
  isAuthenticated: !!accessToken,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setCredentials: (
      state,
      action: PayloadAction<{
        access: string;
        refresh: string;
        user: User;
      }>,
    ) => {
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
      state.user = action.payload.user;
      state.isAuthenticated = true;

      localStorage.setItem("access_token", action.payload.access);
      localStorage.setItem("refresh_token", action.payload.refresh);
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
  },
});

export const { setCredentials, setUser, logout, setLoading, setAccessToken } =
  authSlice.actions;

export default authSlice.reducer;
