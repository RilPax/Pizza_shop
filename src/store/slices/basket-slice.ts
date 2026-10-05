import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TBasketItem } from "../../utils/types";
import type { AppThunk, RootState } from "../store";
import { PROMO_CODES } from "../../utils/constants";

interface BasketState {
  items: TBasketItem[];
  promoCode: string | null;
  orderSuccess: boolean;
}

const initialState: BasketState = {
  items: [],
  promoCode: null,
  orderSuccess: false,
};

const GUEST_KEY = "basket_guest";

// Корзина хранится в localStorage: у гостя своя, у пользователя — своя
const getBasketKey = (state: RootState) => {
  const user = state.user.user;
  return user ? `basket_${user.id}` : GUEST_KEY;
};

const readBasket = (key: string): TBasketItem[] => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Отбрасываем записи старого формата (до появления размеров и количества)
    return parsed.filter(
      (item): item is TBasketItem =>
        typeof item?.key === "string" && typeof item?.quantity === "number"
    );
  } catch {
    return [];
  }
};

const saveBasket = (state: RootState) => {
  localStorage.setItem(getBasketKey(state), JSON.stringify(state.basket.items));
};

const mergeItems = (target: TBasketItem[], source: TBasketItem[]) => {
  const result = target.map((item) => ({ ...item }));
  source.forEach((item) => {
    const existing = result.find((i) => i.key === item.key);
    if (existing) existing.quantity += item.quantity;
    else result.push({ ...item });
  });
  return result;
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<TBasketItem[]>) => {
      state.items = action.payload;
    },
    addItem: (state, action: PayloadAction<Omit<TBasketItem, "quantity">>) => {
      const existing = state.items.find((i) => i.key === action.payload.key);
      if (existing) existing.quantity += 1;
      else state.items.push({ ...action.payload, quantity: 1 });
    },
    changeQuantity: (
      state,
      action: PayloadAction<{ key: string; delta: number }>
    ) => {
      const item = state.items.find((i) => i.key === action.payload.key);
      if (!item) return;
      item.quantity += action.payload.delta;
      if (item.quantity <= 0) {
        state.items = state.items.filter((i) => i.key !== action.payload.key);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.key !== action.payload);
    },
    clearItems: (state) => {
      state.items = [];
      state.promoCode = null;
    },
    setPromoCode: (state, action: PayloadAction<string | null>) => {
      state.promoCode = action.payload;
    },
    setOrderSuccess: (state, action: PayloadAction<boolean>) => {
      state.orderSuccess = action.payload;
    },
  },
});

const { setItems, addItem, changeQuantity, removeItem, clearItems } =
  basketSlice.actions;

export const { setPromoCode, setOrderSuccess } = basketSlice.actions;

// Загружаем корзину текущего пользователя (или гостя).
// При входе гостевая корзина переносится в корзину пользователя.
export const loadBasket = (): AppThunk => (dispatch, getState) => {
  const state = getState();
  let items = readBasket(getBasketKey(state));

  if (state.user.user) {
    const guestItems = readBasket(GUEST_KEY);
    if (guestItems.length > 0) {
      items = mergeItems(items, guestItems);
      localStorage.removeItem(GUEST_KEY);
    }
  }

  dispatch(setItems(items));
  saveBasket(getState());
};

export const addToBasket =
  (item: Omit<TBasketItem, "quantity">): AppThunk =>
  (dispatch, getState) => {
    dispatch(addItem(item));
    saveBasket(getState());
  };

export const changeBasketQuantity =
  (key: string, delta: number): AppThunk =>
  (dispatch, getState) => {
    dispatch(changeQuantity({ key, delta }));
    saveBasket(getState());
  };

export const removeFromBasket =
  (key: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(removeItem(key));
    saveBasket(getState());
  };

export const clearBasket = (): AppThunk => (dispatch, getState) => {
  dispatch(clearItems());
  saveBasket(getState());
};

// Селекторы
export const selectBasketCount = (state: RootState) =>
  state.basket.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectBasketSubtotal = (state: RootState) =>
  state.basket.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const selectDiscountPercent = (state: RootState) =>
  state.basket.promoCode ? PROMO_CODES[state.basket.promoCode] ?? 0 : 0;

export default basketSlice.reducer;
