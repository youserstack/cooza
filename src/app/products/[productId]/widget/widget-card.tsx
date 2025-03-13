"use client";

import Colors from "@/app/products/[productId]/widget/colors";
import Sizes from "@/app/products/[productId]/widget/sizes";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BsHandbag } from "react-icons/bs";
import { useCartStore } from "@/lib/stores/useCartStore";
import { toast } from "sonner";
import Quantity from "@/app/products/[productId]/widget/quantity";

export default function WidgetCard({ product }: { product: Product }) {
  const { addToCart } = useCartStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 입력정보 추출
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const submittedData = Object.fromEntries(formData.entries());
    const color = formData.get("color") as string;
    const size = formData.get("size") as string;
    const quantity = Number(formData.get("quantity") as string);
    // console.log({ submittedData });
    if (!color || !size || !quantity) {
      toast.error("옵션을 선택해주세요.");
      return;
    }

    // 카트에 추가할 아이템
    const newItem: Item = {
      mallName: product.mallName,
      productId: product.productId,
      name: product.title,
      image: product.image,
      options: { color, size, quantity },
      price: Number(product.lprice),
      total: Number(product.lprice) * quantity,
    };
    console.log({ newItem });

    // 추가
    addToCart(newItem);
  };

  return (
    <Card className="WidgetCard">
      <CardContent>
        <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
          <Colors />
          <Sizes />
          <Quantity price={Number(product.lprice)} />
          <Button type="submit" size="lg">
            <BsHandbag className="text-xl" />
            <span>장바구니 담기</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
