import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface TokenState {
  user: string | null;
  token: string | null;
}

// Define the initial state using that type
const initialState: TokenState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default authSlice.reducer;
