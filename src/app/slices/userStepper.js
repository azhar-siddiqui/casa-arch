import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   isStepperVisible: false,
   searchedProfessional: ''
};

const user = createSlice({
   name: "userStepper",
   initialState,
   reducers: {
      updateIsStepperVisible: (state, { payload }) => {
         return {
            ...state,
            isStepperVisible: payload
         }
      },
      updateSearchedProfessional: (state, { payload }) => {
         return {
            ...state,
            searchedProfessional: payload
         }
      },

   },
});

export const { updateIsStepperVisible, updateSearchedProfessional } = user.actions;
export default user.reducer;
