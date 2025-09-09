"use client";

import { useCartStore } from "@/lib/stores/useCartStore";
import { ShoppingBasket } from "lucide-react";

export default function AddToCartButton({ product }: { product: ProductType }) {
  const { addToCart } = useCartStore();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ product, option: { color: "black", size: "md", quantity: 1 } });
  };

  return (
    <button onClick={handleClick} className="p-1 bg-black/20 hover:bg-black/10 rounded-full">
      <ShoppingBasket size={16} />
    </button>
  );
}
