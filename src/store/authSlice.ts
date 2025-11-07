import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, login, logout } from "./authActions";
import type { RootState } from "../store/store";

interface userState {
  isAuth: boolean;
  isLoading: boolean;
  token: string | null;
}

const initialState: userState = {
  isAuth: false,
  isLoading: false,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.isAuth = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.token = action.payload.accessToken;
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false;
      state.isAuth = false;
      state.token = null;
    });
    builder.addCase(checkAuth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      if (action.payload?.accessToken) {
        state.token = action.payload.accessToken;
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      }
    });
    builder.addCase(checkAuth.rejected, (state) => {
      state.isLoading = false;
      state.isAuth = false;
      state.token = null;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuth = false;
      state.isLoading = false;
      state.token = null;
      localStorage.removeItem("refreshToken");
    });
  },
});

// Other code such as selectors can use the imported `RootState` type

export default authSlice.reducer;

export const selectAccessToken = (state: RootState) => state.auth.token;
