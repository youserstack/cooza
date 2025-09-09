"use client";

import { Stepper } from "@/components/stepper";
// import { useCartQuery } from "@/lib/hooks/use-cart-query";
import { useCartStore } from "@/lib/stores/useCartStore";
import { formatCurrency } from "@/lib/utils/format-currency";
import { X } from "lucide-react";

// 장바구니 페이지
export default function Page() {
  const { cartList, removeFromCart } = useCartStore();
  console.log({ cartList });

  // const { data, isLoading, isError } = useCartQuery();
  // console.log({ data });

  // if (isLoading || isError) {
  //   return (
  //     <main>
  //       <section className="min-h-screen flex items-center justify-center">
  //         {isLoading && <p>로딩중...</p>}
  //         {isError && <p>에러발생</p>}
  //       </section>
  //     </main>
  //   );
  // }

  return (
    <main>
      <section className="min-h-screen">
        <Stepper currentStep="cart" />

        <ul className="ml-auto max-w-2xl flex flex-col gap-4 mt-8 ">
          {cartList.map((item) => (
            <li key={item.id} className="border rounded-lg p-2 flex gap-4">
              <div>
                <h1 className="truncate/">{item.product.title}</h1>
                <p>브랜드: {item.product.brand}</p>
                <p>유형: {item.product.productType}</p>
                <p>가격: {formatCurrency(item.product.lprice)}원</p>
              </div>

              <div className="">
                <button onClick={() => removeFromCart(item.id)}>
                  <X />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
