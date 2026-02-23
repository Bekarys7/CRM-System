import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../services/user.service";
import { AxiosError } from "axios";

export const getUserData = createAsyncThunk(
  "users/getUserData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await UserService.getUserData();
      console.log(response);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data);
      }
      return rejectWithValue("Unknown error occurred");
    }
  },
);
