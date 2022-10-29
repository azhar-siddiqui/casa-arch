import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userType: "",
  userId: "",
};

export const professionalauthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateIsLoggedIn: (state, { payload }) => {
      state.isLoggedIn = payload;
    },
    updateUserType: (state, { payload }) => {
      state.userType = payload;
    },
    updateUserId: (state, { payload }) => {
      state.userId = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateIsLoggedIn, updateUserType, updateUserId } =
  professionalauthSlice.actions;

export default professionalauthSlice.reducer;
