import { Link } from "react-router-dom";
import styles from "./not-found.module.css";

export const NotFound = () => {
  return (
    <div className={styles.notfound}>
      <h1 className={styles.code}>404</h1>
      <h2 className={styles.title}>Страница не найдена</h2>
      <p className={styles.text}>
        Возможно, вы перешли по неверной ссылке или страница была удалена.
      </p>
      <Link to="/" className={styles.button}>
        На главную
      </Link>
    </div>
  );
};
