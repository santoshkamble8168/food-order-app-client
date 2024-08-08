import { configureStore } from "@reduxjs/toolkit";
import citySlice from "./reducers/citySlice";

export const store = configureStore({
  reducer: {
    city: citySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
