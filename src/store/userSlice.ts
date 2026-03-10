import { createSlice } from "@reduxjs/toolkit";
import type { Profile } from "../types/Auth.types";
import { getUserData } from "./userActions";
interface UserState {
  data: Profile | null;
  isLoading: boolean;
}

const initialState: UserState = {
  data: null,
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUserData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserData.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default userSlice.reducer;
