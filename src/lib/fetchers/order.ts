export async function getOrderList(userId: string, filters?: { page: string }) {
  const res = await fetch(`${process.env.BASE_URL}/api/orders`, {
    headers: { Authorization: `Bearer ${userId}` },
  });
  return res.json();
}

export async function createOrder(ordersheet: any) {
  const res = await fetch("/api/orders", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ordersheet),
  });
  return res.json();
}
