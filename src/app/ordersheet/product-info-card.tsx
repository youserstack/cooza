import { ItemImage } from "@/components/custom/custom-components";
import ResponsiveSeparator from "@/components/custom/responsive-separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useOrdersheetStore } from "@/lib/stores/useOrdersheetStore";
import { Package } from "lucide-react";

export default function ProductInfoCard() {
  const { productsInfo: items } = useOrdersheetStore();

  return (
    <Card className="ProductInfoCard">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package />
          <span>주문상품</span>
        </CardTitle>
        <Separator className="mt-1" />
      </CardHeader>

      <CardContent>
        <ul className="flex flex-col gap-4">
          {items.map((item) => (
            <li
              key={item.productId + item.options.color + item.options.size}
              className="flex flex-col sm:flex-row items-center gap-4 border rounded-lg overflow-hidden p-4"
            >
              <ItemImage src={item.image} />
              <h5 className="flex-8 text-center">{item.name}</h5>
              <ResponsiveSeparator />
              <p className="flex-2 text-center min-w-fit">{item.total} 원</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
