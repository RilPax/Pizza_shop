import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user-slice";
import productsReducer from "./slices/products-slice";
import basketReducer from "./slices/basket-slice";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    basket: basketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Хук для диспатча с типами
export const useAppDispatch: () => AppDispatch = useDispatch;

// Хук для селектора с типами
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
