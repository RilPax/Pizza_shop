import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { logoutUserThunk } from "../../store/slices/user-slice";
import { selectBasketCount } from "../../store/slices/basket-slice";
import { Icon } from "../../components";
import page from "../shared/page.module.css";
import styles from "./profile.module.css";

export const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const basketCount = useAppSelector(selectBasketCount);
  const favoritesCount = useAppSelector((state) => state.favorites.ids.length);

  const handleLogout = async () => {
    await dispatch(logoutUserThunk());
    navigate("/");
  };

  return (
    <div className={`container ${page.page}`}>
      <h1 className={page.title}>Профиль</h1>

      <div className={styles.grid}>
        <section className={`${page.card} ${styles.user}`}>
          <span className={styles.avatar}>{user?.name?.[0]?.toUpperCase()}</span>
          <div>
            <p className={styles.name}>{user?.name}</p>
            <p className={styles.mail}>{user?.mail}</p>
          </div>
          <button type="button" className={`btn btn-ghost ${styles.logout}`} onClick={handleLogout}>
            <Icon name="logOut" size={18} />
            Выйти
          </button>
        </section>

        <Link to="/basket" className={`${page.card} ${styles.tile}`}>
          <span className={styles.tileIcon}><Icon name="cart" size={24} /></span>
          <span className={styles.tileValue}>{basketCount}</span>
          <span className={styles.tileLabel}>в корзине</span>
        </Link>

        <Link to="/menu?fav=1" className={`${page.card} ${styles.tile}`}>
          <span className={styles.tileIcon}><Icon name="heart" size={24} /></span>
          <span className={styles.tileValue}>{favoritesCount}</span>
          <span className={styles.tileLabel}>в избранном</span>
        </Link>

        <section className={`${page.card} ${styles.promo}`}>
          <Icon name="tag" size={24} />
          <p>
            Ваш промокод на первый заказ: <strong>PIZZA10</strong> — скидка 10%
          </p>
        </section>
      </div>
    </div>
  );
};
