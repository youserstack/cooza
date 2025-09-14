import { getOrderList } from "@/lib/fetchers/order";
import Pagination from "@/components/pagination";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { auth } from "@/auth";

const itemsPerPage = 10;

// 주문리스트 페이지
export default async function Page(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // 사용자 인증 확인
  const session = await auth();
  const userId = session?.user.userId;

  if (!userId) redirect("/signin");

  // 쿼리파라미터 -> 현재 페이지 정보
  const queryParams = await props.searchParams;
  const page = Number(queryParams.page) || 1;

  // 쿼리 조회
  const { orders, totalItems } = await getOrderList(userId, { page: String(page) });
  // console.log({ orders, totalItems });

  return (
    <main>
      <section>
        <h1 className="text-base text-primary font-bold">주문리스트</h1>

        {/* 주문 리스트 */}
        <Suspense fallback={<div>loading...</div>}>
          <div>
            <ul className="flex flex-col gap-4"></ul>

            <Pagination totalPages={Math.ceil(totalItems / itemsPerPage)} />
          </div>
        </Suspense>
      </section>
    </main>
  );
}
