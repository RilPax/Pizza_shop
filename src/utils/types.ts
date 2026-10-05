export interface TUser {
  id: string;
  name: string;
  mail: string;
  password: string;
}

export type TCategory =
  | "pizza"
  | "combo"
  | "snacks"
  | "drinks"
  | "desserts"
  | "sauces";

export interface TProductSize {
  size: number; // диаметр в см
  price: number;
}

export interface TProduct {
  id: string;
  title: string;
  description: string;
  price: number; // минимальная цена (для пиццы — за 25 см)
  category: TCategory;
  image: string;
  popular?: boolean;
  badge?: string;
  sizes?: TProductSize[];
}

export interface TBasketItem {
  key: string; // id товара + размер
  productId: string;
  title: string;
  image: string;
  size?: number;
  price: number;
  quantity: number;
}

export interface TLoginUser {
  mail: string;
  password: string;
}

export interface TRegisterUser {
  name: string;
  mail: string;
  password: string;
}
