import type { TProduct } from "../../utils/types";
import styles from "./product-card.module.css";
import pizzaIcon from "../../assets/pizza-svgrepo-com.svg";

interface ProductCardProps {
  product: TProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article className={styles.card}>
      <span className={styles.title}>{product.title}</span>
      <img src={pizzaIcon} alt={product.title} className={styles.image} />
      <div className={styles.info}>
        <span className={styles.price}>{product.price}</span>
        <button className={styles.button}>Подробнее</button>
      </div>
    </article>
  );
};
