import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { clearBasket, setOrderSuccess } from "../../store/slices/basket-slice";
import { useBasketTotals } from "../../hooks/useBasketTotals";
import { Icon, OrderSummary } from "../../components";
import { formatPrice } from "../../utils/format";
import page from "../shared/page.module.css";
import styles from "./offer.module.css";

const PAYMENT_METHODS = ["Наличные", "Карта курьеру", "Click", "Payme"];

export const Offer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const items = useAppSelector((state) => state.basket.items);
  const { total } = useBasketTotals();

  const [form, setForm] = useState({
    name: user?.name ?? "",
    phone: "+998 ",
    address: "",
    flat: "",
    comment: "",
    payment: PAYMENT_METHODS[0],
  });

  const update = (field: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  if (items.length === 0) {
    return (
      <div className={`container ${page.page}`}>
        <div className={page.message}>
          <span className={page.messageEmoji} aria-hidden="true">🛒</span>
          <h1 className={page.messageTitle}>Нечего оформлять</h1>
          <p className={page.messageText}>Ваша корзина пуста — добавьте что-нибудь из меню.</p>
          <Link to="/menu" className="btn btn-primary">Перейти в меню</Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const orderNumber = Math.floor(100000 + Math.random() * 900000);

    // Бэкенда для заказов нет — просто логируем
    console.log({ orderNumber, ...form, items, total });

    dispatch(clearBasket());
    dispatch(setOrderSuccess(true));
    navigate("/success", { state: { orderNumber, total } });
  };

  return (
    <div className={`container ${page.page}`}>
      <Link to="/basket" className={page.back}>
        <Icon name="arrowLeft" size={18} />
        Вернуться в корзину
      </Link>
      <h1 className={page.title}>Оформление заказа</h1>

      <form className={page.layout} onSubmit={handleSubmit}>
        <div className={styles.sections}>
          <section className={page.card}>
            <h2 className={page.cardTitle}>Контакты</h2>
            <div className={styles.row}>
              <label className={styles.label}>
                Имя
                <input className="field" value={form.name} onChange={(e) => update("name")(e.target.value)} required autoComplete="name" />
              </label>
              <label className={styles.label}>
                Телефон
                <input
                  className="field"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone")(e.target.value)}
                  pattern="\+?[\d\s\-\(\)]{9,}"
                  title="Например: +998 90 123-45-67"
                  required
                  autoComplete="tel"
                />
              </label>
            </div>
          </section>

          <section className={page.card}>
            <h2 className={page.cardTitle}>Доставка</h2>
            <div className={styles.row}>
              <label className={`${styles.label} ${styles.wide}`}>
                Адрес
                <input
                  className="field"
                  value={form.address}
                  onChange={(e) => update("address")(e.target.value)}
                  placeholder="Улица, дом"
                  required
                  autoComplete="street-address"
                />
              </label>
              <label className={styles.label}>
                Кв. / подъезд
                <input className="field" value={form.flat} onChange={(e) => update("flat")(e.target.value)} placeholder="Необязательно" />
              </label>
            </div>
            <label className={styles.label}>
              Комментарий курьеру
              <textarea
                className={`field ${styles.textarea}`}
                value={form.comment}
                onChange={(e) => update("comment")(e.target.value)}
                placeholder="Код домофона, ориентир и т. п."
                rows={3}
              />
            </label>
          </section>

          <section className={page.card}>
            <h2 className={page.cardTitle}>Оплата</h2>
            <div className={styles.payments} role="radiogroup" aria-label="Способ оплаты">
              {PAYMENT_METHODS.map((method) => (
                <label
                  key={method}
                  className={`${styles.payment} ${form.payment === method ? styles.paymentActive : ""}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={form.payment === method}
                    onChange={() => update("payment")(method)}
                    className="sr-only"
                  />
                  {method}
                </label>
              ))}
            </div>
          </section>
        </div>

        <OrderSummary editablePromo={false}>
          <button type="submit" className="btn btn-primary btn-lg btn-block">
            Подтвердить · {formatPrice(total)}
          </button>
        </OrderSummary>
      </form>
    </div>
  );
};
