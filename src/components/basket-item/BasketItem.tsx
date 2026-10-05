import { changeBasketQuantity, removeFromBasket } from "../../store/slices/basket-slice";
import { useAppDispatch } from "../../store/store";
import type { TBasketItem } from "../../utils/types";
import { formatPrice } from "../../utils/format";
import { Icon } from "../icon/Icon";
import styles from "./basket-item.module.css";

interface BasketItemProps {
  item: TBasketItem;
}

export const BasketItem = ({ item }: BasketItemProps) => {
  const dispatch = useAppDispatch();

  return (
    <li className={styles.item}>
      <img src={item.image} alt="" className={styles.image} />

      <div className={styles.info}>
        <span className={styles.title}>{item.title}</span>
        <span className={styles.meta}>
          {item.size ? `${item.size} см · ` : ""}
          {formatPrice(item.price)}
        </span>
      </div>

      <div className={styles.quantity}>
        <button
          type="button"
          onClick={() => dispatch(changeBasketQuantity(item.key, -1))}
          aria-label="Уменьшить количество"
        >
          <Icon name="minus" size={16} />
        </button>
        <span aria-live="polite">{item.quantity}</span>
        <button
          type="button"
          onClick={() => dispatch(changeBasketQuantity(item.key, 1))}
          aria-label="Увеличить количество"
        >
          <Icon name="plus" size={16} />
        </button>
      </div>

      <span className={styles.price}>{formatPrice(item.price * item.quantity)}</span>

      <button
        type="button"
        className={styles.remove}
        onClick={() => dispatch(removeFromBasket(item.key))}
        aria-label={`Удалить «${item.title}»`}
      >
        <Icon name="trash" size={18} />
      </button>
    </li>
  );
};
