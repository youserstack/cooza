import ProductCard from "@/components/product-card";
import { getProductList } from "@/lib/fetchers/product";
import Pagination from "@/components/pagination";

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
  const { products, totalItems } = await getProductList({
    category,
    page: String(page),
    query,
    sort,
  });

  return (
    <div>
      <ul className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {products.map((product: ProductType) => (
          <li key={product.productId}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>

      <Pagination totalPages={Math.ceil(totalItems / itemsPerPage)} />
    </div>
  );
}
