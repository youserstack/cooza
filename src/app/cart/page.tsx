"use client";

import GroupCard from "@/app/cart/group-card";
import { Stepper } from "@/components/stepper";
import { fetchData } from "@/lib/fetchers";
import { useCartStore } from "@/lib/stores/useCartStore";
import { extractProductIds } from "@/lib/utils/functions";
import { useQuery } from "@tanstack/react-query";

export default function CartPage() {
  const { groups } = useCartStore();

  // 중복 제거된 productId 목록 추출
  const productIds = extractProductIds(groups);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart"],
    queryFn: () => {
      const searchParams = new URLSearchParams();
      productIds.forEach((id) => searchParams.append("productIds", id));
      const url = `/api/cart/products?${searchParams.toString()}`;
      return fetchData(url);
    },
    enabled: productIds.length > 0, // productIds가 있을 때만 요청
  });

  if (isLoading || isError) {
    return (
      <main>
        <section className="min-h-screen flex items-center justify-center">
          {isLoading && <p>로딩중...</p>}
          {isError && <p>에러발생</p>}
        </section>
      </main>
    );
  }

  // 기존 groups 에 최신가격정보를 반영하기위해서 병합
  const mergedGroups = groups.map((group) => {
    return {
      ...group,
      items: group.items.map((item) => {
        const foundItem = data.freshProducts?.find(
          (product: Product) => product.productId === item.productId
        );
        return {
          ...item,
          price: Number(foundItem?.lprice) || 0, // 가격변동이 있을수있기때문에 최신정보로
        };
      }),
    };
  });
  console.log({ mergedGroups });

  return (
    <main>
      <section className="min-h-screen">
        <Stepper currentStep="cart" />

        <ul className="flex flex-col gap-4 mt-8">
          {mergedGroups?.map((group) => (
            <GroupCard key={group.mallName} group={group} />
          ))}
        </ul>
      </section>
    </main>
  );
}
