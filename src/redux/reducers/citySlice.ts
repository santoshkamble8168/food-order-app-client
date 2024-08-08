import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type City = {
  name: string;
};

const selectedCity = localStorage.getItem("city") || "";

const initialState: City = {
  name: selectedCity,
};

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      localStorage.setItem("city", action.payload);
    },
  },
});

export const { setCity } = citySlice.actions;
export default citySlice.reducer;
