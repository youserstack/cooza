import ProductCard from "@/components/product-card";
import { fetchData } from "@/lib/fetchers";
import { ClientPagination } from "@/components/client-pagination";

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
  const params = new URLSearchParams({ query, category, sort, page: page.toString() });
  const url = `${process.env.BASE_URL}/api/products?${params.toString()}`;
  const { products, totalItems } = await fetchData(url);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  // console.log({ products });

  return (
    <div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-center">
        {products.map((product: Product) => (
          <li key={product.productId}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>

      <ClientPagination page={page} totalPages={totalPages} />
    </div>
  );
}
