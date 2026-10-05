import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppThunk } from "../store";

interface ToastState {
  id: number;
  message: string | null;
}

const initialState: ToastState = { id: 0, message: null };

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    show: (state, action: PayloadAction<string>) => {
      state.id += 1;
      state.message = action.payload;
    },
    hide: (state, action: PayloadAction<number>) => {
      // Прячем только если за это время не показали новый тост
      if (state.id === action.payload) state.message = null;
    },
  },
});

export const { hide: hideToast } = toastSlice.actions;

export const showToast =
  (message: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(toastSlice.actions.show(message));
    const { id } = getState().toast;
    setTimeout(() => dispatch(hideToast(id)), 2600);
  };

export default toastSlice.reducer;
