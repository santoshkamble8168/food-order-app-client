import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Theme = "dark" | "light" | "system";
const themes: Theme[] = ["light", "dark", "system"];

interface ThemeState {
  theme: Theme;
}

const initialState: ThemeState = {
  theme: (localStorage.getItem("vite-ui-theme") as Theme) || themes[2],
};

const applyTheme = (theme: Theme) => {
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");

  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    root.classList.add(systemTheme);
  } else {
    root.classList.add(theme);
  }
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      localStorage.setItem("vite-ui-theme", action.payload);
      applyTheme(action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;

export { applyTheme, themes };
