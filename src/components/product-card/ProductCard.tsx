import { useState } from "react";
import type { TProduct } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { addToBasket } from "../../store/slices/basket-slice";
import { toggleFavorite } from "../../store/slices/favorites-slice";
import { showToast } from "../../store/slices/toast-slice";
import { DEFAULT_PIZZA_SIZE } from "../../utils/constants";
import { formatPrice } from "../../utils/format";
import { Icon } from "../icon/Icon";
import styles from "./product-card.module.css";

interface ProductCardProps {
  product: TProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) => state.favorites.ids.includes(product.id));

  const sizes = product.sizes ?? [];
  const [size, setSize] = useState<number | undefined>(
    sizes.find((s) => s.size === DEFAULT_PIZZA_SIZE)?.size ?? sizes[0]?.size
  );
  const price = sizes.find((s) => s.size === size)?.price ?? product.price;

  const handleAdd = () => {
    dispatch(
      addToBasket({
        key: size ? `${product.id}-${size}` : product.id,
        productId: product.id,
        title: product.title,
        image: product.image,
        size,
        price,
      })
    );
    dispatch(showToast(`${product.title}${size ? `, ${size} см` : ""} — в корзине`));
  };

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <img src={product.image} alt={product.title} className={styles.image} loading="lazy" />
        {product.badge && <span className={styles.badge}>{product.badge}</span>}
        <button
          type="button"
          className={`${styles.favorite} ${isFavorite ? styles.favoriteActive : ""}`}
          onClick={() => dispatch(toggleFavorite(product.id))}
          aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
          aria-pressed={isFavorite}
        >
          <Icon name="heart" size={18} filled={isFavorite} />
        </button>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.description}>{product.description}</p>

        {sizes.length > 0 && (
          <div className={styles.sizes} role="radiogroup" aria-label="Размер">
            {sizes.map((s) => (
              <button
                key={s.size}
                type="button"
                role="radio"
                aria-checked={s.size === size}
                className={`${styles.size} ${s.size === size ? styles.sizeActive : ""}`}
                onClick={() => setSize(s.size)}
              >
                {s.size} см
              </button>
            ))}
          </div>
        )}

        <div className={styles.footer}>
          <span className={styles.price}>{formatPrice(price)}</span>
          <button
            type="button"
            className={styles.add}
            onClick={handleAdd}
            aria-label={`Добавить «${product.title}» в корзину`}
          >
            <Icon name="cart" size={20} />
          </button>
        </div>
      </div>
    </article>
  );
};
