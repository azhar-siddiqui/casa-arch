import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { getInTouchApi } from "./services/getInTouchServices";

export const store = configureStore({
  reducer: {
    [getInTouchApi.reducerPath]: getInTouchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(getInTouchApi.middleware),
});

setupListeners(store.dispatch);
