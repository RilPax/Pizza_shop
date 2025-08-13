import { Link } from "react-router-dom";
import styles from "./success.module.css";

export const Success = () => {

  return (
    <div className={styles.success}>
      <h2 className={styles.title}>Спасибо за заказ!</h2>
      <p className={styles.text}>
        Мы уже начали готовить вашу пиццу. Скоро курьер будет у вас 🍕
      </p>
      <Link to="/" className={styles.button}>
        На главную
      </Link>
    </div>
  );
};
