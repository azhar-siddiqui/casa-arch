import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userType: "",
  userId: "",
  visibleForPremiumButtonLogin: false,
  visibleForSubscriptionModal: false,
  openSubscriptionAfterLogin: false
};

export const professionalAuthSlice = createSlice({
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
    updateVisibleForPremiumButtonLogin: (state, { payload }) => {
      state.visibleForPremiumButtonLogin = payload;
    },
    updateVisibleForSubscriptionModal: (state, { payload }) => {
      state.visibleForSubscriptionModal = payload;
    },
    updateOpenSubscriptionAfterLogin: (state, { payload }) => {
      state.openSubscriptionAfterLogin = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateIsLoggedIn, updateUserType, updateUserId, updateVisibleForPremiumButtonLogin, updateVisibleForSubscriptionModal, updateOpenSubscriptionAfterLogin } =
professionalAuthSlice.actions;

export default professionalAuthSlice.reducer;
