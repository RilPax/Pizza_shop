import type { TCategory } from "./types";

export const CATEGORIES: { id: TCategory; title: string; emoji: string }[] = [
  { id: "pizza", title: "Пицца", emoji: "🍕" },
  { id: "combo", title: "Комбо", emoji: "🍱" },
  { id: "snacks", title: "Закуски", emoji: "🍟" },
  { id: "drinks", title: "Напитки", emoji: "🥤" },
  { id: "desserts", title: "Десерты", emoji: "🍰" },
  { id: "sauces", title: "Соусы", emoji: "🥫" },
];

export const POPULAR_TITLES: Record<TCategory, string> = {
  pizza: "Популярная пицца",
  combo: "Выгодные комбо",
  snacks: "Хиты среди закусок",
  drinks: "Освежающие напитки",
  desserts: "Сладкое к пицце",
  sauces: "Соусы к бортикам",
};

// Промокоды: код -> скидка в процентах
export const PROMO_CODES: Record<string, number> = {
  PIZZA10: 10,
};

export const DEFAULT_PIZZA_SIZE = 30;
export const DELIVERY_FREE_FROM = 100_000;
export const DELIVERY_PRICE = 15_000;

export const CONTACTS = {
  phone: "+998 71 200-00-00",
  phoneHref: "tel:+998712000000",
  address: "Ташкент, ул. Амира Темура, 15",
  hours: "Ежедневно 10:00 — 02:00",
  mail: "hello@pizzashop.uz",
};
