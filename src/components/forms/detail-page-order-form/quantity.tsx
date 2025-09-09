"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils/format-currency";
import { UseFormReturn } from "react-hook-form";
import { CartSchema } from "@/lib/schemas/cart-schema";

export default function Quantity({
  price,
  form,
}: {
  price: number;
  form: UseFormReturn<CartSchema>;
}) {
  const quantity = form.watch("quantity");

  const increase = () => form.setValue("quantity", quantity + 1);
  const decrease = () => form.setValue("quantity", Math.max(1, quantity - 1));

  return (
    <fieldset>
      <h3>수량</h3>

      <div className="flex flex-wrap gap-8 justify-between items-center">
        {/* 수량 조절 */}
        <div
          className="flex items-center gap-2
          [&_button]:rounded-full
          [&_button]:size-8
          [&_input]:w-[70px]
        "
        >
          <ControlButton label="-" disabled={quantity === 1} handleClick={decrease} />
          <Input
            {...form.register("quantity")}
            type="number"
            id="quantity"
            value={quantity}
            min={1}
            onChange={(e) => form.setValue("quantity", Math.max(1, Number(e.target.value)))}
          />
          <ControlButton label="+" handleClick={increase} />
        </div>

        {/* 총액 */}
        <div>총액: {formatCurrency(price * quantity)}원</div>
      </div>
    </fieldset>
  );
}

function ControlButton({
  label,
  disabled,
  handleClick,
}: {
  label: string;
  disabled?: boolean;
  handleClick: () => void;
}) {
  return (
    <Button type="button" variant="secondary" size={"sm"} onClick={handleClick} disabled={disabled}>
      {label}
    </Button>
  );
}
