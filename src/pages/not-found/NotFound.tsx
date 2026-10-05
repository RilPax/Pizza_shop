import { Link } from "react-router-dom";
import { Logo } from "../../components";
import styles from "./not-found.module.css";

export const NotFound = () => {
  return (
    <div className={styles.page}>
      <Logo />
      <div className={styles.content}>
        <p className={styles.code} aria-hidden="true">
          4<span>🍕</span>4
        </p>
        <h1 className={styles.title}>Страница не найдена</h1>
        <p className={styles.text}>
          Кажется, этот кусочек уже кто-то съел. Возможно, ссылка неверная или страница была удалена.
        </p>
        <Link to="/" className="btn btn-primary btn-lg">
          На главную
        </Link>
      </div>
    </div>
  );
};
