export async function addToCart({
  productId,
  quantity = 1,
}: {
  productId: string;
  quantity?: number;
}) {
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity }),
  });

  const data = await res.json();

  return data;
}
