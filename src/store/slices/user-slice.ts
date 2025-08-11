import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  authoriseUser,
  removeUser,
} from "../../utils/api";
import type { TUser, TRegisterUser, TLoginUser } from "../../utils/types";

interface UserState {
  user: TUser | null;
  loading: boolean;
  error: string | null;
  isAuth: boolean
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  isAuth: false
};

// Регистрация
export const registerUserThunk = createAsyncThunk<TUser, TRegisterUser>(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      return await registerUser(userData);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Логин
export const loginUserThunk = createAsyncThunk<TUser, TLoginUser>(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      return await loginUser(userData);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Авторизация по токену
export const authoriseUserThunk = createAsyncThunk<TUser | null>(
  "user/authorise",
  async (_, { rejectWithValue }) => {
    try {
      return await authoriseUser();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Удаление пользователя
export const removeUserThunk = createAsyncThunk<void>(
  "user/remove",
  async (_, { rejectWithValue }) => {
    try {
      return await removeUser();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Регистрация
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuth = false
      })

      // Логин
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuth = false;
      })

      // Авторизация
      .addCase(authoriseUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authoriseUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuth = action.payload ? true : false;
      })
      .addCase(authoriseUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuth = false;
      })

      // Удаление пользователя
      .addCase(removeUserThunk.fulfilled, (state) => {
        state.user = null;
        state.isAuth = false;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
