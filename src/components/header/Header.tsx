import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import styles from "./Header.module.css";
import { logoutUserThunk } from "../../store/slices/user-slice";

export const Header = () => {
  const dispatch = useAppDispatch();
  const { user, isAuth } = useAppSelector((state) => state.user);
  const basketCount = useAppSelector((state) => state.basket.products.length);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.link}>Магазин</Link>
      <nav className={styles.nav}>
        <Link to="/basket" className={styles.basketLink}>
          Корзина
          {basketCount > 0 && isAuth && (
            <span className={styles.basketCount}>{basketCount}</span>
          )}
        </Link>
        {isAuth ? (
          <>
            <Link to="/profile" className={styles.link}>{user?.name}</Link>
            <button
              className={styles.button}
              onClick={() => dispatch(logoutUserThunk())}
            >
              Выйти
            </button>
          </>
        ) : (
          <Link to="/login" className={styles.link}>Войти</Link>
        )}
      </nav>
    </header>
  );
};
