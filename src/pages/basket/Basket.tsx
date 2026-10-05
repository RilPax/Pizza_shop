import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { clearBasket } from "../../store/slices/basket-slice";
import { BasketItem, Icon, OrderSummary } from "../../components";
import page from "../shared/page.module.css";
import styles from "./basket.module.css";

export const Basket = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const items = useAppSelector((state) => state.basket.items);
  const isAuth = useAppSelector((state) => state.user.isAuth);

  if (items.length === 0) {
    return (
      <div className={`container ${page.page}`}>
        <div className={page.message}>
          <span className={page.messageEmoji} aria-hidden="true">🛒</span>
          <h1 className={page.messageTitle}>Корзина пуста</h1>
          <p className={page.messageText}>
            Самое время это исправить — загляните в меню и выберите что-нибудь вкусное.
          </p>
          <Link to="/menu" className="btn btn-primary">
            Перейти в меню
            <Icon name="arrowRight" size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`container ${page.page}`}>
      <Link to="/menu" className={page.back}>
        <Icon name="arrowLeft" size={18} />
        Продолжить покупки
      </Link>
      <h1 className={page.title}>Корзина</h1>

      <div className={page.layout}>
        <section className={page.card}>
          <div className={styles.head}>
            <h2 className={page.cardTitle}>Товары</h2>
            <button type="button" className={styles.clear} onClick={() => dispatch(clearBasket())}>
              Очистить корзину
            </button>
          </div>
          <ul>
            {items.map((item) => (
              <BasketItem key={item.key} item={item} />
            ))}
          </ul>
        </section>

        <OrderSummary>
          <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => navigate("/offer")}>
            Оформить заказ
            <Icon name="arrowRight" size={20} />
          </button>
          {!isAuth && (
            <p className={styles.note}>Для оформления заказа нужно войти в аккаунт</p>
          )}
        </OrderSummary>
      </div>
    </div>
  );
};
