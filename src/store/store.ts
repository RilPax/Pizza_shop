import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user-slice";
import productsSlice from "./slices/products-slice";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
    reducer: {
        user: userSlice,
        products: productsSlice
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Хук для диспатча с типами
export const useAppDispatch: () => AppDispatch = useDispatch;

// Хук для селектора с типами
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;