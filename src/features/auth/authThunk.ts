import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  logout,
  setAccessToken,
  setLoading,
  setUser,
  type User,
} from "./authSlice";

const API_URL = "http://127.0.0.1:8000/api";

interface MeResponse {
  user_id: number;
  email: string;
  role: User["role"];
}

interface RefreshResponse {
  access: string;
}

interface LoginResponse {
  access: string;
  refresh: string;
}

/*
 * LOGIN
 */
export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: {
      email: string;
      password: string;
    },
    { dispatch, rejectWithValue },
  ) => {
    try {
      dispatch(setLoading(true));

      // Login
      const loginResponse = await axios.post<LoginResponse>(
        `${API_URL}/auth/login/`,
        credentials,
      );

      const { access, refresh } = loginResponse.data;

      // Save tokens
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      // Save access token in Redux
      dispatch(setAccessToken(access));

      // Get current user
      const meResponse = await axios.get<MeResponse>(`${API_URL}/auth/me/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      // Save user in Redux
      dispatch(
        setUser({
          user_id: meResponse.data.user_id,
          email: meResponse.data.email,
          role: meResponse.data.role,
        }),
      );

      return meResponse.data;
    } catch (error) {
      console.error("Login failed:", error);

      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.detail ||
            error.response?.data?.message ||
            "Login failed",
        );
      }

      return rejectWithValue("Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  },
);

/*
 * RESTORE AUTH
 */
export const restoreAuth = createAsyncThunk(
  "auth/restoreAuth",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      let accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      if (!accessToken || !refreshToken) {
        dispatch(logout());
        return;
      }

      /*
       * Check whether access token is expired.
       */
      try {
        const payload = JSON.parse(
          atob(accessToken.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")),
        );

        const currentTime = Date.now() / 1000;

        if (payload.exp <= currentTime) {
          /*
           * Access token expired.
           * Get a new one using refresh token.
           */

          const refreshResponse = await axios.post<RefreshResponse>(
            `${API_URL}/auth/refresh/`,
            {
              refresh: refreshToken,
            },
          );

          accessToken = refreshResponse.data.access;

          // Save new token
          localStorage.setItem("access_token", accessToken);

          // Update Redux
          dispatch(setAccessToken(accessToken));
        }
      } catch (error) {
        console.error("Token refresh failed:", error);

        dispatch(logout());
        return;
      }

      /*
       * Get current logged-in user.
       */
      const response = await axios.get<MeResponse>(`${API_URL}/auth/me/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      dispatch(
        setUser({
          user_id: response.data.user_id,
          email: response.data.email,
          role: response.data.role,
        }),
      );
    } catch (error) {
      console.error("Authentication restore failed:", error);

      dispatch(logout());
    } finally {
      dispatch(setLoading(false));
    }
  },
);
