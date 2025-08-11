import type { TProduct } from "../../utils/types";

interface ProductCardProps {
    product: TProduct
}

export const ProductCard = ({product}: ProductCardProps) => {
  return (
    <article>
        <span>{product.title}</span>
      <img src="" alt="" />
      <div>
        <span>{product.price}</span>
        <button></button>
      </div>
    </article>
  );
};
