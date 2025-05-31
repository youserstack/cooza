import { Ordersheet } from "@/types/ordersheet";

export async function fetchData(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} FETCH-ERROR`);
  return res.json();
}

export async function createOrder(ordersheet: Ordersheet) {
  const res = await fetch("/api/orders", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ordersheet),
  });
  if (!res.ok) throw new Error("/api/orders FETCH-ERROR");
  return res.json();
}
