import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/auth.service";
import type { AuthData, Token, UserRegistration } from "../types/Auth.types";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../api/axios";

export const register = createAsyncThunk(
  "auth/register",
  async (payload: UserRegistration, { rejectWithValue }) => {
    try {
      const response = await AuthService.registerNewUser(payload);
      console.log(response);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data);
      }
      return rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (payload: AuthData, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(payload);
      console.log(response);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data);
      }
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthService.logout();
      console.log(response);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data);
      }
      return rejectWithValue(error);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/сheck",
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      console.log(`it is refresh token ${refreshToken}`);
      const response = await axios.post<Token>(`${BASE_URL}/auth/refresh`, {
        refreshToken: refreshToken,
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data);
      }
      return rejectWithValue(error);
    }
  }
);
