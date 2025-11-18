import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, login, logout } from "./authActions";

interface userState {
  isAuth: boolean;
  status: "pending" | "authenticated" | "unauthenticated";
}

const initialState: userState = {
  isAuth: false,
  status: "unauthenticated",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = "pending";
      state.isAuth = false;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.status = "authenticated";
      state.isAuth = true;
    });
    builder.addCase(login.rejected, (state) => {
      state.status = "unauthenticated";
      state.isAuth = false;
    });
    builder.addCase(checkAuth.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(checkAuth.fulfilled, (state) => {
      state.status = "authenticated";
      state.isAuth = true;
    });
    builder.addCase(checkAuth.rejected, (state) => {
      state.status = "unauthenticated";
      state.isAuth = false;
    });
    builder.addCase(logout.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuth = false;
      state.status = "unauthenticated";
    });
  },
});

export default authSlice.reducer;
