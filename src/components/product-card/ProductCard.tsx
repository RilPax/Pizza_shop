import type { TProduct } from "../../utils/types";
import styles from "./product-card.module.css";
import pizzaIcon from "../../assets/pizza-svgrepo-com.svg";
import { useState } from "react";
import { Modal } from "../index";
import { useAppDispatch } from "../../store/store";
import { addProductAndSave } from "../../store/slices/basket-slice";

interface ProductCardProps {
  product: TProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const dispatch = useAppDispatch();

  const moveToBasket = () => {
    dispatch(addProductAndSave(product));
    setModalOpen(false);
  };

  return (
    <>
      <article className={styles.card}>
        <span className={styles.title}>{product.title}</span>
        <img src={pizzaIcon} alt={product.title} className={styles.image} />
        <div className={styles.info}>
          <span className={styles.price}>{product.price}</span>
          <button onClick={() => setModalOpen(true)} className={styles.button}>
            Подробнее
          </button>
        </div>
      </article>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2>{product.title}</h2>
        <img src={pizzaIcon} alt={product.title} />
        <p>Цена: {product.price} ₽</p>
        <p>
          Описание: {product.description || "Вкусная пицца с сыром и томатами"}
        </p>
        <button onClick={() => moveToBasket()}>Добавить в корзину</button>
      </Modal>
    </>
  );
};
