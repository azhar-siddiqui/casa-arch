import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userType: '',
  userName: '',
  userId: '',
  visibleForUserLogin: false,
  redirectToSteppers: false,
  redirectToStartDesignQuestions: false,
  startDesigningQuestionsActive: false,
  selectLoginFrameActive: false
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
    updateUserName: (state, { payload }) => {
      state.userName = payload;
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
    updateRedirectToStartDesignQuestions: (state, { payload }) => {
      state.redirectToStartDesignQuestions = payload;
    },
    updateStartDesigningQuestionsActive: (state, { payload }) => {
      state.startDesigningQuestionsActive = payload;
    },
    updateSelectLoginFrameActive: (state, { payload }) => {
      state.selectLoginFrameActive = payload;
    },
  
  },
});

export const { updateIsLoggedIn, updateUserType, updateUserName, updateUserId, updateVisibleForUserLogin, updateRedirectToSteppers, updateRedirectToStartDesignQuestions, updateStartDesigningQuestionsActive, updateSelectLoginFrameActive } = user.actions;
export default user.reducer;
