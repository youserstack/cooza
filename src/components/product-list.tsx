import ProductCard from "@/components/product-card";
import Pagination from "@/components/pagination";
import { getProductCount, getProductList } from "@/lib/clients/product";

// 페이지당 아이템의 수 -> 카드아이템(ProductCard)의 수
const itemsPerPage = 10;

export default async function ProductList({
  query,
  category,
  sort,
  page,
}: {
  query: string;
  category: string;
  sort: string;
  page: number;
}) {
  // 파라미터 -> 조회
  const [products, totalItems] = await Promise.all([
    getProductList({ query, category, sort, page }),
    getProductCount({ query, category }),
  ]);
  // console.log({ products, totalItems });

  return (
    <div>
      <ul className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {products.map((product: ProductType) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>

      <Pagination totalPages={Math.ceil(totalItems / itemsPerPage)} />
    </div>
  );
}
