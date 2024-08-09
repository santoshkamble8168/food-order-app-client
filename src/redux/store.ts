import { configureStore } from "@reduxjs/toolkit";
import citySlice from "./reducers/citySlice";
import cartSlice from "./reducers/cartSlice";

export const store = configureStore({
  reducer: {
    city: citySlice,
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
