import { BreadcrumbWithSeparator } from "@/components/breadcrumb-with-separator";
import DetailPageOrderForm from "@/components/forms/detail-page-order-form/detail-page-order-form";
import { getAllProductIds, getProduct } from "@/lib/fetchers/product";
import { formatCurrency } from "@/lib/utils/format-currency";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// export const revalidate = 30; // 재검증시간설정 : n초동안캐시

export async function generateStaticParams() {
  const { allProductIds } = await getAllProductIds();
  console.log({ allProductIds });

  return allProductIds.map((v: { productId: string }) => ({ id: v.productId }));
}

// 제품상세 페이지
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  // 패스 파라미터 -> 제품 아이디 -> 조회
  const pathParams = await params;
  const { product } = await getProduct(pathParams.id);
  // console.log({ product });

  return (
    <main>
      <section>
        <BreadcrumbWithSeparator category={product.category1} />

        <div className="mt-8 block md:flex border rounded-lg overflow-hidden">
          {/* 좌측 -> 제품 이미지 */}
          <div className="flex-1/2">
            <div className="aspect-square mx-auto relative">
              <Image src={product.image} fill alt={""} />
            </div>
          </div>

          {/* 우측 -> 제품정보 */}
          <div className="flex-1/2 md:p-4">
            {/* 상단 */}
            <div>
              {/* 스토어 링크 */}
              <Link href="#" className="text-[13px]">
                {product.mallName}
              </Link>

              {/* 제목 */}
              <h1 className="text-xl font-semibold ">{product.title}</h1>

              {/* 가격/리뷰 */}
              <div className="flex items-center gap-4 mt-4">
                {/* 가격 */}
                <span className="text-lg font-semibold">
                  <span>{formatCurrency(Number(product.lprice))}</span>
                  <span className="ml-[2px]">원</span>
                </span>

                {/* 리뷰 */}
                <Button asChild variant={"link"}>
                  <Link href={"#"} className="flex items-center gap-2 text-[12px] ">
                    <span className="flex items-center gap-1">
                      <Star className="text-amber-500 fill-amber-500 mb-[2px]" size={13} />
                      <span className=" mt-[2px]/">4.3</span>
                    </span>
                    <span>리뷰 300개</span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* 하단 */}
            <div className="mt-10">
              <DetailPageOrderForm product={product} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
