import { configureStore, type ThunkAction, type UnknownAction } from "@reduxjs/toolkit";
import userReducer from "./slices/user-slice";
import productsReducer from "./slices/products-slice";
import basketReducer from "./slices/basket-slice";
import favoritesReducer from "./slices/favorites-slice";
import toastReducer from "./slices/toast-slice";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    basket: basketReducer,
    favorites: favoritesReducer,
    toast: toastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<R = void> = ThunkAction<R, RootState, unknown, UnknownAction>;

// Типизированные хуки
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
