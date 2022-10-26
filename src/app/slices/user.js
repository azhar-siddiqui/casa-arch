import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userType: '',
  userId: ''
};

const user = createSlice({
  name: "user",
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

export const { updateIsLoggedIn, updateUserType, updateUserId } = user.actions;
export default user.reducer;
