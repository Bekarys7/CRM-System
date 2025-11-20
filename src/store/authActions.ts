import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../services/auth.service";
import type { AuthData, UserRegistration } from "../types/Auth.types";
import { AxiosError } from "axios";

export const register = createAsyncThunk(
  "auth/register",
  async (payload: UserRegistration, { rejectWithValue }) => {
    try {
      await authService.registerUser(payload);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data);
      }
      return rejectWithValue("Unknown error occurred");
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (payload: AuthData, { rejectWithValue }) => {
    try {
      await authService.login(payload);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data);
      }
      return rejectWithValue("Unknown error occurred");
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data);
      }
      return rejectWithValue("Unknown error occurred");
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/сheck",
  async (_, { rejectWithValue }) => {
    try {
      await authService.checkAuth();
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data);
      }
      return rejectWithValue("Unknown error occurred");
    }
  }
);
