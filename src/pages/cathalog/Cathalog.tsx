import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import type { TProduct } from "../../utils/types";
import { fetchProductsThunk } from "../../store/slices/products-slice";
import { ProductCard } from "../../components/product-card/ProductCard";

import styles from './catalog.module.css'

export const Catalog = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products); // список из стора
  const loading = useAppSelector((state) => state.products.loading);
  const [sortedProducts, setSortedProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  useEffect(() => {
    setSortedProducts(products);
  }, [products]);

  const sortByPriceAsc = () => {
    setSortedProducts([...products].sort((a, b) => a.price - b.price));
  };

  const sortByPriceDesc = () => {
    setSortedProducts([...products].sort((a, b) => b.price - a.price));
  };

  if (loading) return <p>Загрузка...</p>;

  return (
    <div className={styles.catalog}>
      {/* Панель сортировки */}
      <div className={styles.sort_panel}>
        <button className={styles.sort_button} onClick={sortByPriceAsc}>Цена ↑</button>
        <button className={styles.sort_button} onClick={sortByPriceDesc}>Цена ↓</button>
      </div>

      {/* Список товаров */}
      <ul className={styles.products_grid}>
        {sortedProducts.map(product => <ProductCard key={product.id} product={product} />)}
      </ul>
    </div>
  );
};
