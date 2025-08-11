import { removeProductAndSave } from "../../store/slices/basket-slice";
import { useAppDispatch } from "../../store/store";
import type { TProduct } from "../../utils/types";
import styles from "./basket-item.module.css";

interface BasketItemProps {
  product: TProduct;
  index: number;
}

export const BasketItem = ({ product, index }: BasketItemProps) => {
  const dispatch = useAppDispatch();

  return (
    <li className={styles.item}>
      <div className={styles.itemInfo}>
        <span className={styles.itemNumber}>{index + 1}</span>
        <span className={styles.itemTitle}>{product.title}</span>
      </div>
      <span className={styles.price}>{product.price}</span>
      <button
        className={styles.removeButton}
        onClick={() => dispatch(removeProductAndSave(product.id))}
      >
        Удалить
      </button>
    </li>
  );
};
