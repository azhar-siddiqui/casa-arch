import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement } = AuthSlice.actions;

export default AuthSlice.reducer;
