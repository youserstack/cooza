"use client";

import Quantity from "@/components/forms/detail-page-order-form/quantity";
import { CartSchema, cartSchema } from "@/lib/schemas/cart-schema";
import { useCartStore } from "@/lib/stores/useCartStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { BsHandbag } from "react-icons/bs";
import { Check, CreditCard } from "lucide-react";
import { useForm } from "react-hook-form";
import { COLORS } from "@/data/product-order-options";
import { cn } from "@/lib/utils";
import { SIZES } from "@/data/product-order-options";
import Link from "next/link";

export default function DetailPageOrderForm({ product }: { product: ProductType }) {
  const { addToCart } = useCartStore();

  const form = useForm<CartSchema>({
    resolver: zodResolver(cartSchema),
    defaultValues: { color: "", size: "", quantity: 1 },
  });

  const onSubmit = (values: CartSchema) => {
    const item = { product, option: { ...values } };
    console.log({ item });

    addToCart(item);
  };

  return (
    <form
      className="space-y-8 text-sm font-semibold [&_>_*]:border/ [&_fieldset_>_h3]:mb-2"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      {/* 색상 */}
      <fieldset>
        <h3>색상</h3>
        <ul className="flex items-center gap-2 flex-wrap">
          {COLORS.map(({ name, className }) => (
            <li key={name} className="relative">
              <input
                {...form.register("color")}
                type="radio"
                id={name}
                value={name}
                className="peer sr-only"
              />

              {/* 칼라 원모양 */}
              <label
                htmlFor={name}
                className={cn(
                  " size-6 rounded-full flex items-center justify-center cursor-pointer",
                  className
                )}
              />

              {/* 브이표시 */}
              <div
                className={cn(
                  "absolute inset-0",
                  "hidden peer-checked:flex items-center justify-center pointer-events-none",
                  { "text-black": name === "white" }
                )}
              >
                <Check />
              </div>
            </li>
          ))}
        </ul>
      </fieldset>

      {/* 사이즈 */}
      <fieldset>
        {/* 사이즈 안내 */}
        <div className="flex items-center justify-between">
          <h3>사이즈</h3>
          <Button variant={"link"} asChild>
            <Link href="#">사이즈 안내</Link>
          </Button>
        </div>

        {/* 사이즈 리스트 */}
        <ul className="flex gap-2 flex-wrap">
          {SIZES.map((size) => (
            <li key={size.name} className="flex relative">
              <input
                {...form.register("size")}
                type="radio"
                id={size.name}
                value={size.name}
                disabled={!size.inStock}
                className="hidden peer"
              />

              <Button
                asChild
                variant="secondary"
                size={"sm"}
                className="uppercase font-medium cursor-pointer
            peer-checked:ring-2 peer-checked:ring-foreground
            peer-disabled:opacity-30 peer-disabled:cursor-not-allowed"
              >
                <label htmlFor={size.name}>
                  <div>{size.name}</div>
                </label>
              </Button>
            </li>
          ))}
        </ul>
      </fieldset>

      {/* 수량 */}
      <Quantity price={Number(product.lprice)} form={form} />

      {/* 장바구니/바로주문하기 버튼 */}
      <div className="flex items-center justify-end gap-4">
        <Button type="submit" size="sm">
          <BsHandbag />
          장바구니 담기
        </Button>
        <Button type="submit" size="sm">
          <CreditCard />
          바로 주문하기
        </Button>
      </div>
    </form>
  );
}
