import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "../../utils/api";
import type { TProduct } from "../../utils/types";

interface ProductsState {
  products: TProduct[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProductsThunk = createAsyncThunk<TProduct[]>(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchProducts();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    sortByPriceAsc(state) {
      state.products.sort((a, b) => a.price - b.price);
    },
    sortByPriceDesc(state) {
      state.products.sort((a, b) => b.price - a.price);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productsSlice.reducer;

export const { sortByPriceAsc, sortByPriceDesc } = productsSlice.actions