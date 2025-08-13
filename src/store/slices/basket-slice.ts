import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { TProduct } from "../../utils/types";
import type { RootState } from "../store";

interface BasketState {
  products: TProduct[];
  sum: number;
  orderSuccess: boolean
}

const initialState: BasketState = {
  products: [],
  sum: 0,
  orderSuccess: false
};

// Вспомогательная функция для безопасного ключа
const getBasketKey = (state: RootState) => {
  const user = state.user.user; // предполагаем, что в auth хранится user
  return user ? `basket_${user.id}` : null;
};

export const fetchBasket = createAsyncThunk<
  TProduct[],
  void,
  { state: RootState }
>("basket/fetch", async (_, { getState, rejectWithValue }) => {
  try {
    const key = getBasketKey(getState());
    if (!key) return [];

    const productsRaw = localStorage.getItem(key);
    if (!productsRaw) return [];

    const products: TProduct[] = JSON.parse(productsRaw);
    return products;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const addProductAndSave = createAsyncThunk<
  void,
  TProduct,
  { state: RootState }
>("basket/addProductAndSave", async (product, { dispatch, getState }) => {
  const state = getState();
  const user = state.user.user;
  if (!user) return;

  const newProducts = [...state.basket.products, product];
  dispatch(setProducts(newProducts));

  const key = `basket_${user.id}`;
  localStorage.setItem(key, JSON.stringify(newProducts));
});

export const removeProductAndSave = createAsyncThunk<
  void,
  string,
  { state: RootState }
>("basket/removeProductAndSave", async (productId, { dispatch, getState }) => {
  const state = getState();
  const user = state.user.user;
  if (!user) return;

  const newProducts = state.basket.products.filter(
    (product) => product.id !== productId
  );
  dispatch(setProducts(newProducts));

  const key = `basket_${user.id}`;
  localStorage.setItem(key, JSON.stringify(newProducts));
});

export const clearBasket = createAsyncThunk<
  TProduct[],
  void,
  { state: RootState }
>(
  'basket/clear',
  async (__, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const isAuth = state.user.isAuth; // если user внутри state.user

      if (!isAuth) {
        return rejectWithValue("Пользователь не найден");
      }

      localStorage.removeItem(`basket_${state.user.user!.id}`);
      return [];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<TProduct[]>) => {
      state.products = action.payload;
      state.sum = action.payload.length;
    },
    setOrderSuccess: (state, action: PayloadAction<boolean>) => {
      state.orderSuccess = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBasket.fulfilled, (state, action) => {
          state.products = action.payload;
          state.sum = action.payload.length;
        })
      .addCase(clearBasket.fulfilled, (state, action) => {
        state.products = action.payload
        state.sum = 0
      })
  },
});

export const { setProducts, setOrderSuccess } = basketSlice.actions;

export default basketSlice.reducer;
