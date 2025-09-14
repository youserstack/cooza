import AddToCartButton from "@/components/buttons/add-to-cart-button";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: ProductType }) {
  return (
    <Link href={`/products/${product.id}`} className="block">
      {/* 제품이미지 */}
      <div className="relative rounded-lg overflow-hidden">
        <Image src={product.image} alt="" width={300} height={300} />

        {/* 카트버튼 */}
        <div
          className="absolute right-1 bottom-1 
          flex items-center justify-center 
          overflow-hidden"
        >
          <AddToCartButton product={product} />
        </div>
      </div>

      {/* 설명부분 */}
      <div className="p-2">
        <h3 className="text-[11px] font-semibold">{product.maker}</h3>
        <h1 className="text-[12px] truncate">{product.name}</h1>
        <div className="flex gap-1 items-end">
          <p className="text-[13px] font-semibold">{product.price} 원</p>
          <p className="text-[10px] mb-[2px]">배송비 3,000원</p>
        </div>
      </div>
    </Link>
  );
}
