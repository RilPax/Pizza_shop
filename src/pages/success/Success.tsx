import { Link, useLocation } from "react-router-dom";
import { formatPrice } from "../../utils/format";
import { Icon } from "../../components";
import page from "../shared/page.module.css";
import styles from "./success.module.css";

interface SuccessState {
  orderNumber?: number;
  total?: number;
}

export const Success = () => {
  const { state } = useLocation() as { state: SuccessState | null };

  return (
    <div className={`container ${page.page}`}>
      <div className={page.message}>
        <span className={styles.check}>
          <Icon name="check" size={40} />
        </span>
        <h1 className={page.messageTitle}>Спасибо за заказ!</h1>
        {state?.orderNumber && (
          <p className={styles.order}>
            Заказ <strong>№{state.orderNumber}</strong>
            {state.total ? ` на ${formatPrice(state.total)}` : ""}
          </p>
        )}
        <p className={page.messageText}>
          Мы уже начали готовить вашу пиццу. Курьер будет у вас примерно через 30 минут 🍕
        </p>
        <Link to="/" className="btn btn-primary">
          На главную
        </Link>
      </div>
    </div>
  );
};
