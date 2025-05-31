import OrderList from "@/components/order-list";
import { Suspense } from "react";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function OrdersPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;

  return (
    <main>
      <section className="min-h-screen space-y-6">
        <h1 className="text-base text-primary font-bold">주문리스트</h1>
        <Suspense fallback={<div>loading...</div>}>
          <OrderList page={page} />
        </Suspense>
      </section>
    </main>
  );
}
