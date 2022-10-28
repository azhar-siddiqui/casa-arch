import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   isStepperVisible: false
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

   },
});

export const { updateIsStepperVisible } = user.actions;
export default user.reducer;
