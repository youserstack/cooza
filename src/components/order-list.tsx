import { ClientPagination } from "@/components/client-pagination";
import OrderCard from "@/app/orders/order-card";
import { auth } from "@/auth";

export default async function OrderList({ page }: { page: number }) {
  const session = await auth();
  const userId = session?.user.userId;

  const url = `${process.env.BASE_URL}/api/orders?page=${page}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${userId}` } });
  const { orders, totalItems } = await res.json();
  const totalPages = Math.ceil(totalItems / orders.length);
  console.log({ orders, totalItems });

  return (
    <div>
      <ul className="flex flex-col gap-4">
        {orders.map((order: Order) => (
          <OrderCard key={order.orderId} order={order} />
        ))}
      </ul>

      <ClientPagination page={page} totalPages={totalPages} />
    </div>
  );
}
