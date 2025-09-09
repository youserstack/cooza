export async function getCartItems() {
  const res = await fetch("/api/cart");
  return res.json();
}
