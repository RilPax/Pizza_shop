import { useAppSelector } from "../../store/store";
import styles from "./basket.module.css";
import { BasketItem } from '../../components/index';

export const Basket = () => {
  const basket = useAppSelector((state) => state.basket.products);

  const totalPrice = basket.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className={styles.basket}>
      <h2 className={styles.title}>Корзина</h2>

      {basket.length === 0 ? (
        <p className={styles.empty}>Ваша корзина пуста.</p>
      ) : (
        <>
          <ul className={styles.list}>
            {basket.map((item, index) => (
              <BasketItem key={item.id} product={item} index={index} />
            ))}
          </ul>
          <div className={styles.total}>Итого: {totalPrice}</div>
          <button className={styles.checkoutButton}>Оформить заказ</button>
        </>
      )}
    </div>
  );
};
