"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Quantity({ price }: { price: number }) {
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div className="Quantity">
      <label htmlFor="quantity" className="text-sm font-medium">
        수량
      </label>

      <div className="mt-4 flex flex-wrap gap-8 justify-between items-center">
        <div className="flex items-center gap-2">
          <Button
            className="rounded-full size-10"
            type="button"
            variant="secondary"
            onClick={decrease}
          >
            -
          </Button>

          <Input
            className="w-[70px]"
            type="number"
            name="quantity"
            id="quantity"
            value={quantity}
            min={1}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          />

          <Button
            className="rounded-full size-10"
            type="button"
            variant="secondary"
            onClick={increase}
          >
            +
          </Button>
        </div>

        <div>
          총액: <span className="font-bold">{(price * quantity).toLocaleString()}원</span>
        </div>
      </div>
    </div>
  );
}
