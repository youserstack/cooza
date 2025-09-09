"use client";

import { ItemImage, ItemOptions } from "@/components/custom-components";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Store } from "lucide-react";
import Link from "next/link";

export default function OrderCard({ order }: { order: OrderedType }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          <Store />
          <Link href={"#"} className="hover:underline">
            {order.paymentInfo.mallName}
          </Link>
        </CardTitle>
        <Separator className="mt-1" />
      </CardHeader>

      <CardContent>
        <ul className="flex flex-col gap-4">
          {order.productsInfo.map((item) => (
            <Item key={item.productId + item.options.color + item.options.size} item={item} />
          ))}
        </ul>
        <Separator className="mt-4" />
      </CardContent>

      <CardFooter className="flex flex-wrap justify-end gap-6 text-lg font-bold">
        <div>주문금액</div>
        <div>{order.paymentInfo.amount} 원</div>
      </CardFooter>
    </Card>
  );
}

function Item({ item }: { item: Item }) {
  return (
    <li className="flex flex-col sm:flex-row gap-4 border rounded-lg overflow-hidden p-2">
      <ItemImage src={item.image} />

      <div className="w-full flex flex-col sm:grid sm:grid-cols-4 gap-4">
        <h5 className="col-span-2 content-center p-4">{item.name}</h5>

        <ItemOptions
          color={item.options.color}
          size={item.options.size}
          quantity={item.options.quantity}
        />

        <p className="p-4 content-center">{item.total} 원</p>
      </div>
    </li>
  );
}
