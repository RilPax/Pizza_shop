import { useAppSelector, useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router";
import { useState } from "react";
import styles from "./offer.module.css";
import { clearBasket, setOrderSuccess } from "../../store/slices/basket-slice";

export const Offer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const basket = useAppSelector((state) => state.basket.products);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const totalPrice = basket.reduce((sum, item) => sum + item.price, 0);

  if (basket.length === 0) {
    return <p className={styles.message}>Ваша корзина пуста</p>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      address,
      phone,
      items: basket,
      totalPrice,
    });

    dispatch(clearBasket());
    dispatch(setOrderSuccess(true));
    navigate('/success');
  };

  return (
    <div className={styles.offer}>
      <h2 className={styles.title}>Оформление заказа</h2>

      <ul className={styles.list}>
        {basket.map((item, index) => (
          <li key={item.id} className={styles.item}>
            <span className={styles.index}>{index + 1}.</span>
            <span className={styles.name}>{item.title}</span>
            <span className={styles.price}>{item.price} ₽</span>
          </li>
        ))}
      </ul>

      <div className={styles.total}>Итого: {totalPrice} ₽</div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Адрес доставки"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button type="submit" className={styles.submit}>
          Подтвердить заказ
        </button>
      </form>
    </div>
  );
};
