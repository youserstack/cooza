"use client";

import { ItemImage, ItemOptions } from "@/components/custom/custom-components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/stores/useCartStore";
import { useOrdersheetStore } from "@/lib/stores/useOrdersheetStore";
import { Equal, Plus, Store, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function GroupCard({ group }: { group: Group }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          <Store />
          <Link href={"#"} className="hover:underline">
            {group.mallName}
          </Link>
        </CardTitle>
        <Separator className="mt-1" />
      </CardHeader>

      <CardContent>
        <ul className="flex flex-col gap-4">
          {group.items.map((item) => (
            <Item key={item.productId + item.options.color + item.options.size} item={item} />
          ))}
        </ul>
        <Separator className="mt-4" />
      </CardContent>

      <CardFooter className="flex flex-wrap justify-center gap-6">
        <div className="flex flex-wrap gap-4 justify-center text-md">
          <div>
            <div>상품금액</div>
            <div>{group.groupTotal} 원</div>
          </div>

          <Plus className="shrink-0" />

          <div>
            <div>총 배송비</div>
            <div>3,000 원</div>
          </div>

          <Equal className="shrink-0" />

          <div className="font-semibold text-green-600">
            <div>주문금액</div>
            <div>{group.groupTotal} 원</div>
          </div>
        </div>

        <NextStepButton group={group} />
      </CardFooter>
    </Card>
  );
}

function Item({ item }: { item: Item }) {
  const { removeCartItem } = useCartStore();

  const handleRemoveItem = (removedItem: Item) => () => removeCartItem(removedItem);

  return (
    <li className="flex flex-col sm:flex-row gap-4 border rounded-lg overflow-hidden relative p-2">
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

      <div className="absolute top-1 right-1">
        <Button
          variant="ghost"
          className="rounded-full"
          size="icon"
          onClick={handleRemoveItem(item)}
        >
          <X />
        </Button>
      </div>
    </li>
  );
}

function NextStepButton({ group }: { group: Group }) {
  const route = useRouter();
  const { setProductsInfo, setPaymentInfo } = useOrdersheetStore();

  const handleClick = () => {
    setProductsInfo(group.items);
    setPaymentInfo({ mallName: group.mallName, amount: group.groupTotal });

    route.push("/ordersheet");
  };

  return (
    <Button size={"lg"} className="w-full sm:w-[250px] font-semibold" onClick={handleClick}>
      주문하기
    </Button>
  );
}
