import type { TProduct } from "../../utils/types";

interface BasketCardProps {
  card: TProduct;
  handleDelete: (id: string) => void;
  index: number;
}

export const BasketCard = ({ card, handleDelete, index }: BasketCardProps) => {
  return (
    <div>
      <div>{index}</div>
      <div>
        <span>{card.title}</span>
        <span>{card.price}</span>
      </div>
      <button type="button" onClick={() => handleDelete(card.id)}></button>
    </div>
  );
};
