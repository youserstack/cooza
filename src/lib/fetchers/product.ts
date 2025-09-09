// 제품 조회
export async function getProduct(productId: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/products/${productId}`);
  return res.json();
}

// 제품 리스트 조회
export async function getProductList({
  query,
  category,
  sort,
  page,
}: {
  query: string;
  category: string;
  sort: string;
  page: string;
}) {
  const params = new URLSearchParams({ query, category, sort, page });
  const res = await fetch(`${process.env.BASE_URL}/api/products?${params.toString()}`);
  return res.json();
}

// 전체 제품 아이디 리스트 조회
export async function getAllProductIds() {
  const res = await fetch(`${process.env.BASE_URL}/api/all-product-ids`);
  return res.json();
}
