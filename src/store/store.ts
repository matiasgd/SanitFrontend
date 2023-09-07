import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userReducer from "./user";

const isDevelopment = import.meta.env.VITE_ENVIRONMENT === "development";

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    isDevelopment
      ? getDefaultMiddleware().concat(logger)
      : getDefaultMiddleware(),
  reducer: {
    user: userReducer,
  },
  devTools: isDevelopment,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
