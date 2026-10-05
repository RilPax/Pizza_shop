import { createSlice } from "@reduxjs/toolkit";
import type { AppThunk } from "../store";

const STORAGE_KEY = "favorites";

const readFavorites = (): string[] => {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { ids: readFavorites() },
  reducers: {
    toggle: (state, action: { payload: string }) => {
      state.ids = state.ids.includes(action.payload)
        ? state.ids.filter((id) => id !== action.payload)
        : [...state.ids, action.payload];
    },
  },
});

export const toggleFavorite =
  (id: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(favoritesSlice.actions.toggle(id));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getState().favorites.ids));
  };

export default favoritesSlice.reducer;
