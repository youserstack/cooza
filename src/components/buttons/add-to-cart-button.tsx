"use client";

import { addToCart } from "@/lib/cart";
// import { useCartStore } from "@/lib/stores/useCartStore";
import { ShoppingBasket } from "lucide-react";

export default function AddToCartButton({ product }: { product: ProductType }) {
  // const { addToCart } = useCartStore();

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    // addToCart({ product, option: { color: "black", size: "md", quantity: 1 } });

    try {
      const data = await addToCart({ productId: product.id, quantity: 1 });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={handleClick} className="p-1 bg-black/20 hover:bg-black/10 rounded-full">
      <ShoppingBasket size={16} />
    </button>
  );
}
