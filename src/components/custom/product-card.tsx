import KeepButton from "@/components/custom/keep-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { IoIosStar } from "react-icons/io";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link href={`/products/${product.productId}`} className="block h-full">
      <Card className="h-full overflow-hidden pt-0 gap-3">
        <CardHeader className="text-[13px] p-0 font-bold relative">
          <Image
            src={product.image}
            alt=""
            width={300}
            height={300}
            className="w-full max-h-none sm:max-h-[200px] md:max-h-[150px] /max-h-[200px]  object-cover"
          />
          <KeepButton product={product} className="absolute bottom-4 right-4 p-2" />
        </CardHeader>

        <CardContent className="px-4">
          <h3>{product.brand}</h3>
          <CardTitle className="font-normal truncate mt-2">{product.title}</CardTitle>
          <CardDescription></CardDescription>
        </CardContent>

        <CardFooter className="flex justify-between px-4">
          <Price price={product.lprice} />
          <Rating />
        </CardFooter>
      </Card>
    </Link>
  );
}

function Price({ price }: { price: string }) {
  return (
    <div>
      <h1 className="text-md font-bold">{price} 원</h1>
      <p className="text-xs text-zinc-700 dark:text-zinc-400">배송비 3,000원</p>
    </div>
  );
}

function Rating() {
  return (
    <div className="Rating flex items-center gap-[3px]">
      <IoIosStar className="text-red-500" />
      <span>{Math.floor(Math.random() * 5) + 1}</span>
    </div>
  );
}
