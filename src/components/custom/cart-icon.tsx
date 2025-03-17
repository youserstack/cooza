"use client";

import { useCartStore } from "@/lib/stores/useCartStore";
import { BsHandbag } from "react-icons/bs";
import Link from "next/link";
// import { ShoppingBasket, ShoppingCart } from "lucide-react";

export default function CartIcon() {
  const { groups } = useCartStore();

  return (
    <Link href={"/cart"} className="relative">
      {/* <ShoppingCart className="text-xl  hover:text-amber-300 /hover:stroke-[0.3] transition-all duration-300" /> */}
      {/* <ShoppingBasket className="text-xl  hover:text-amber-300 /hover:stroke-[0.3] transition-all duration-300" /> */}
      <BsHandbag
        className="text-xl  
        hover:text-muted-foreground
        /hover:text-amber-300 hover:stroke-[0.3] 
        transition duration-300"
      />
      <span
        className="
        absolute top-[-7px] right-[-7px]  /top-[-30%] /right-[-30%]
        size-4 text-xs bg-red-500 rounded-full
        flex items-center justify-center
        "
      >
        {/* 모든 아이템수를 계산 */}
        {groups.reduce((a, v) => {
          return (a += v.items.length);
        }, 0)}
      </span>
    </Link>
  );
}
