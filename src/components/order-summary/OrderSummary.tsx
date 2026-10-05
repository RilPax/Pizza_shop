import { useState, type FormEvent, type ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setPromoCode } from "../../store/slices/basket-slice";
import { useBasketTotals } from "../../hooks/useBasketTotals";
import { PROMO_CODES } from "../../utils/constants";
import { formatPrice, pluralize } from "../../utils/format";
import { Icon } from "../icon/Icon";
import styles from "./order-summary.module.css";

interface OrderSummaryProps {
  children?: ReactNode; // кнопка действия внизу карточки
  editablePromo?: boolean;
}

export const OrderSummary = ({ children, editablePromo = true }: OrderSummaryProps) => {
  const dispatch = useAppDispatch();
  const promoCode = useAppSelector((state) => state.basket.promoCode);
  const { count, subtotal, discountPercent, discount, delivery, total, leftForFreeDelivery } =
    useBasketTotals();

  const [code, setCode] = useState("");
  const [promoError, setPromoError] = useState("");

  const applyPromo = (e: FormEvent) => {
    e.preventDefault();
    const normalized = code.trim().toUpperCase();
    if (!PROMO_CODES[normalized]) {
      setPromoError("Такого промокода нет");
      return;
    }
    dispatch(setPromoCode(normalized));
    setPromoError("");
    setCode("");
  };

  return (
    <div className={styles.summary}>
      <h2 className={styles.title}>Ваш заказ</h2>

      <dl className={styles.rows}>
        <div className={styles.row}>
          <dt>
            {count} {pluralize(count, ["товар", "товара", "товаров"])}
          </dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        {discount > 0 && (
          <div className={`${styles.row} ${styles.discount}`}>
            <dt>Скидка {discountPercent}% ({promoCode})</dt>
            <dd>−{formatPrice(discount)}</dd>
          </div>
        )}
        <div className={styles.row}>
          <dt>Доставка</dt>
          <dd>{delivery === 0 ? "Бесплатно" : formatPrice(delivery)}</dd>
        </div>
      </dl>

      {leftForFreeDelivery > 0 && (
        <p className={styles.hint}>
          <Icon name="truck" size={16} />
          Добавьте ещё на {formatPrice(leftForFreeDelivery)} — доставка будет бесплатной
        </p>
      )}

      {editablePromo &&
        (promoCode ? (
          <div className={styles.applied}>
            <Icon name="tag" size={16} />
            <span>
              Промокод <strong>{promoCode}</strong> применён
            </span>
            <button
              type="button"
              className={styles.removePromo}
              onClick={() => dispatch(setPromoCode(null))}
              aria-label="Убрать промокод"
            >
              <Icon name="close" size={16} />
            </button>
          </div>
        ) : (
          <form className={styles.promo} onSubmit={applyPromo}>
            <input
              className="field"
              placeholder="Промокод"
              aria-label="Промокод"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setPromoError("");
              }}
            />
            <button type="submit" className="btn btn-ghost" disabled={!code.trim()}>
              Применить
            </button>
          </form>
        ))}
      {promoError && <p className={styles.error}>{promoError}</p>}

      <div className={styles.total}>
        <span>Итого</span>
        <strong>{formatPrice(total)}</strong>
      </div>

      {children}
    </div>
  );
};
