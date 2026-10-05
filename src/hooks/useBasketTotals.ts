import { useAppSelector } from "../store/store";
import {
  selectBasketCount,
  selectBasketSubtotal,
  selectDiscountPercent,
} from "../store/slices/basket-slice";
import { DELIVERY_FREE_FROM, DELIVERY_PRICE } from "../utils/constants";

export const useBasketTotals = () => {
  const count = useAppSelector(selectBasketCount);
  const subtotal = useAppSelector(selectBasketSubtotal);
  const discountPercent = useAppSelector(selectDiscountPercent);

  const discount = Math.round((subtotal * discountPercent) / 100);
  const delivery = subtotal === 0 || subtotal >= DELIVERY_FREE_FROM ? 0 : DELIVERY_PRICE;
  const total = subtotal - discount + delivery;
  const leftForFreeDelivery = Math.max(0, DELIVERY_FREE_FROM - subtotal);

  return { count, subtotal, discountPercent, discount, delivery, total, leftForFreeDelivery };
};
