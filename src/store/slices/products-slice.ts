import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts, getErrorMessage } from "../../utils/api";
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

export const fetchProductsThunk = createAsyncThunk<
  TProduct[],
  void,
  { rejectValue: string }
>(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchProducts();
    } catch (err) {
      return rejectWithValue(getErrorMessage(err, "Не удалось загрузить меню"));
    }
  },
  {
    // Не грузим меню повторно, если оно уже есть или грузится
    condition: (_, { getState }) => {
      const { products } = (getState() as { products: ProductsState });
      return !products.loading && products.products.length === 0;
    },
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
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
        state.error = action.payload ?? "Не удалось загрузить меню";
      });
  },
});

export default productsSlice.reducer;
