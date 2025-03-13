import { Card, CardContent } from "@/components/ui/card";
import { IoIosStar } from "react-icons/io";

export default function ProductInfoCard({ product }: { product: Product }) {
  return (
    <Card className="ProductInfoCard">
      <CardContent className="flex flex-col gap-4">
        <a href="#" className="hover:underline">
          {product.mallName}
        </a>

        <h1 className="text-2xl sm:text-xl font-semibold ">{product.title}</h1>

        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <IoIosStar className="text-red-500" />
            <span>4.3</span>
          </div>

          <p className="text-2xl font-bold">{product.lprice} 원</p>
        </div>
      </CardContent>
    </Card>
  );
}
