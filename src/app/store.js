import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { getInTouchApi } from "./services/getInTouchServices";
import { userServicesApi } from "./services/userServices";
import userReducer from './slices/user'
import userStepperReducer from './slices/userStepper'
import professionalAuthReducer from "./slices/professionalauthSlice";
import { professionalOauthApi } from "./services/professionalOauthApiServices";
import { professionalServicesApi } from "./services/professionalServices";
import { checkPointsApi } from "./services/CheckPoints";
import { proQuestionApi } from "./services/proQuestion";

export const store = configureStore({
  reducer: {
    user: userReducer,
    userStepper: userStepperReducer,
    professional: professionalAuthReducer,
    professionalAuth: professionalAuthReducer,
    [getInTouchApi.reducerPath]: getInTouchApi.reducer,
    [userServicesApi.reducerPath]: userServicesApi.reducer,
    [professionalOauthApi.reducerPath]: professionalOauthApi.reducer,
    [professionalServicesApi.reducerPath]: professionalServicesApi.reducer,
    [checkPointsApi.reducerPath]: checkPointsApi.reducer,
    [proQuestionApi.reducerPath]: proQuestionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      getInTouchApi.middleware,
      professionalOauthApi.middleware,
      professionalServicesApi.middleware,
      checkPointsApi.middleware,
      proQuestionApi.middleware
    ),
  // getDefaultMiddleware().concat(professionalOauthApi.middleware),
});

setupListeners(store.dispatch);
