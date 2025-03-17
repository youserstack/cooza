import { auth } from "@/app/api/auth/[...nextauth]/auth";
import OrderCard from "@/app/orders/order-card";
import { ClientPagination } from "@/components/custom/client-pagination";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface Data {
  orders: Order[];
  totalItems: number;
}

export default async function OrdersPage(props: Props) {
  // extract userId and searchParams
  const session = await auth();
  const userId = session?.user.userId;
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;

  const url = `${process.env.BASE_URL}/api/orders?page=${page}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${userId}` } });
  const { orders, totalItems }: Data = await res.json();
  const totalPages = Math.ceil(totalItems / orders.length);

  console.log({ orders, totalItems });

  return (
    <main>
      <section className="min-h-screen space-y-6">
        <h1 className="text-base text-primary font-bold">주문리스트</h1>

        <ul className="flex flex-col gap-4">
          {orders.map((order) => (
            // <li key={order.orderId}>{order.orderId}</li>
            <OrderCard key={order.orderId} order={order} />
          ))}
        </ul>

        <ClientPagination page={page} totalPages={totalPages} />
      </section>
    </main>
  );
}
