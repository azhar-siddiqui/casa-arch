import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { getInTouchApi } from "./services/getInTouchServices";
import { userServicesApi } from "./services/userServices";
import userReducer from './slices/user'
import { professionalOauthApi } from "./services/professionalOauthApiServices";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [getInTouchApi.reducerPath]: getInTouchApi.reducer,
    [userServicesApi.reducerPath]: userServicesApi.reducer,
    [professionalOauthApi.reducerPath]: professionalOauthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      getInTouchApi.middleware,
      professionalOauthApi.middleware
    ),
  // getDefaultMiddleware().concat(professionalOauthApi.middleware),
});

setupListeners(store.dispatch);
