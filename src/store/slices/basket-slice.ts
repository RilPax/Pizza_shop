import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { TProduct } from "../../utils/types";

interface BasketState {
  products: TProduct[];
  sum: number;
}

const initialState: BasketState = {
  products: [],
  sum: 0,
};

export const fetchBasket = createAsyncThunk<TProduct[]>(
  "basket/fetch",
  async (__, { rejectWithValue }) => {
    try {
      const productsRaw = localStorage.getItem("basket");
      if (!productsRaw) return [];
      const products: TProduct[] = JSON.parse(productsRaw);
      return products;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<TProduct>) => {
      state.products.push(action.payload);
      localStorage.setItem("basket", JSON.stringify(state.products));
      state.sum = state.products.length;
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      state.sum = state.products.length;
      localStorage.setItem("basket", JSON.stringify(state.products));
      if (state.products.length === 0) localStorage.removeItem("basket");
    },
    clearBasket: (state) => {
      state.products = [];
      localStorage.removeItem("basket");
      state.sum = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBasket.fulfilled, (state, action) => {
      state.products = action.payload;
      state.sum = action.payload.length;
    });
  },
});

export default basketSlice.reducer;

export const { addProduct, removeProduct, clearBasket } = basketSlice.actions;
