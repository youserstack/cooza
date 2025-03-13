"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/stores/useCartStore";

interface Props {
  product: Product;
  className?: string;
}

export default function CartButton({ product, className }: Props) {
  const { addToCart } = useCartStore();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    // const newItem: Item = {
    // };
    // addToCart(newItem);
  };

  return (
    <Button className="CartButton" onClick={handleClick}>
      장바구니 담기
    </Button>
  );
}
