import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userType: '',
  userId: '',
  visibleForUserLogin: false,
  redirectToSteppers: false
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
    updateVisibleForUserLogin: (state, { payload }) => {
      state.visibleForUserLogin = payload;
    },
    updateRedirectToSteppers: (state, { payload }) => {
      state.redirectToSteppers = payload;
    },
  },
});

export const { updateIsLoggedIn, updateUserType, updateUserId, updateVisibleForUserLogin, updateRedirectToSteppers } = user.actions;
export default user.reducer;
