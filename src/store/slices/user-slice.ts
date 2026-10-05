import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  authoriseUser,
  removeUser,
  getErrorMessage,
} from "../../utils/api";
import type { TUser, TRegisterUser, TLoginUser } from "../../utils/types";

interface UserState {
  user: TUser | null;
  loading: boolean;
  error: string | null;
  isAuth: boolean;
  isAuthChecked: boolean; // проверили ли токен при старте приложения
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  isAuth: false,
  isAuthChecked: false,
};

// Регистрация
export const registerUserThunk = createAsyncThunk<
  TUser,
  TRegisterUser,
  { rejectValue: string }
>("user/register", async (userData, { rejectWithValue }) => {
  try {
    return await registerUser(userData);
  } catch (err) {
    return rejectWithValue(getErrorMessage(err, "Не удалось зарегистрироваться"));
  }
});

// Логин
export const loginUserThunk = createAsyncThunk<
  TUser,
  TLoginUser,
  { rejectValue: string }
>("user/login", async (userData, { rejectWithValue }) => {
  try {
    return await loginUser(userData);
  } catch (err) {
    return rejectWithValue(getErrorMessage(err, "Не удалось войти"));
  }
});

// Авторизация по токену
export const authoriseUserThunk = createAsyncThunk<
  TUser | null,
  void,
  { rejectValue: string }
>("user/authorise", async (_, { rejectWithValue }) => {
  try {
    return await authoriseUser();
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

// Удаление пользователя
export const removeUserThunk = createAsyncThunk<void, void, { rejectValue: string }>(
  "user/remove",
  async (_, { rejectWithValue }) => {
    try {
      return await removeUser();
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const logoutUserThunk = createAsyncThunk<void>("user/logout", async () => {
  localStorage.removeItem("token");
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
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
        state.error = action.payload ?? "Не удалось зарегистрироваться";
        state.isAuth = false;
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
        state.error = action.payload ?? "Не удалось войти";
        state.isAuth = false;
      })

      // Логаут
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = null;
        state.isAuth = false;
      })

      // Авторизация
      .addCase(authoriseUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = Boolean(action.payload);
        state.isAuthChecked = true;
      })
      .addCase(authoriseUserThunk.rejected, (state) => {
        state.isAuth = false;
        state.isAuthChecked = true;
      })

      // Удаление пользователя
      .addCase(removeUserThunk.fulfilled, (state) => {
        state.user = null;
        state.isAuth = false;
      });
  },
});

export const { clearUserError } = userSlice.actions;

export default userSlice.reducer;
