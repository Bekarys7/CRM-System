import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface todoState {}

const initialState: todoState = {};

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {},
});

export const todoActions = todoSlice.actions;

export default todoSlice.reducer;
