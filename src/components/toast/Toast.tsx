import { useAppSelector } from "../../store/store";
import { Icon } from "../icon/Icon";
import styles from "./toast.module.css";

export const Toast = () => {
  const { id, message } = useAppSelector((state) => state.toast);

  return (
    <div className={styles.region} role="status" aria-live="polite">
      {message && (
        <div key={id} className={styles.toast}>
          <span className={styles.icon}>
            <Icon name="check" size={16} />
          </span>
          {message}
        </div>
      )}
    </div>
  );
};
