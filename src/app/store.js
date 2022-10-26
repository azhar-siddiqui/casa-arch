import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { getInTouchApi } from "./services/getInTouchServices";
import { userServicesApi } from "./services/userServices";
import userReducer from './slices/user'

export const store = configureStore({
  reducer: {
    user: userReducer,
    [getInTouchApi.reducerPath]: getInTouchApi.reducer,
    [userServicesApi.reducerPath]: userServicesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(getInTouchApi.middleware),
});

setupListeners(store.dispatch);
