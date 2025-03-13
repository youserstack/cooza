"use client";

import GroupCard from "@/app/cart/group-card";
import { Stepper } from "@/components/custom/stepper";
import { useCartStore } from "@/lib/stores/useCartStore";
import { extractProductIds } from "@/lib/utils/functions";
import { useQuery } from "@tanstack/react-query";

async function getFreshProducts(productIds: string[]): Promise<Product[]> {
  // create the searchParams
  const searchParams = new URLSearchParams();
  productIds.forEach((id) => searchParams.append("productIds", id));

  const res = await fetch(`/api/cart/products?${searchParams.toString()}`);
  if (!res.ok) throw new Error("카트정보데이터패칭실패");

  return res.json();
}

export default function CartPage() {
  const { groups } = useCartStore();

  // 중복 제거된 productId 목록 추출
  const productIds = extractProductIds(groups);

  const {
    data: freshProducts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getFreshProducts(productIds),
    enabled: productIds.length > 0, // productIds가 있을 때만 요청
    // onSuccess: (data) => setCartGroups(data), // zustand 스토어 업데이트
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching cart data</p>;

  // 기존 groups 에 최신가격정보를 반영하기위해서 병합
  const mergedGroups = groups.map((group) => {
    return {
      ...group,
      items: group.items.map((item) => {
        const foundItem = freshProducts.find((product) => product.productId === item.productId);
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
      <section>
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
