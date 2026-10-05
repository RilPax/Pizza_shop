import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchProductsThunk } from "../../store/slices/products-slice";
import styles from "./products-state.module.css";

interface SkeletonGridProps {
  count?: number;
  className?: string;
}

// Заглушки карточек, пока меню грузится
export const SkeletonGrid = ({ count = 4, className = "" }: SkeletonGridProps) => (
  <div className={className} aria-busy="true" aria-label="Загрузка меню">
    {Array.from({ length: count }, (_, i) => (
      <div key={i} className={styles.skeleton}>
        <div className={styles.skeletonMedia} />
        <div className={styles.skeletonBody}>
          <div className={styles.line} style={{ width: "60%" }} />
          <div className={styles.line} style={{ width: "90%" }} />
          <div className={styles.line} style={{ width: "40%" }} />
        </div>
      </div>
    ))}
  </div>
);

export const ProductsError = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.products.error);

  return (
    <div className={styles.error}>
      <span className={styles.errorEmoji} aria-hidden="true">🍕💨</span>
      <p className={styles.errorTitle}>{error}</p>
      <p className={styles.errorText}>
        Проверьте, что mock-сервер запущен командой <code>npm run server</code>.
      </p>
      <button type="button" className="btn btn-primary" onClick={() => dispatch(fetchProductsThunk())}>
        Попробовать снова
      </button>
    </div>
  );
};
