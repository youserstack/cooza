import ProductCard from "@/components/custom/product-card";
import { fetchData } from "@/lib/fetchers";
import { ClientPagination } from "@/components/custom/client-pagination";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface Data {
  products: Product[];
  totalItems: number;
}

export default async function ProductsPage(props: Props) {
  // extract the search params
  const searchParams = await props.searchParams;
  const query = searchParams.query || "";
  const category = searchParams.category || "";
  const sort = searchParams.sort || "";
  const page = Number(searchParams.page) || 1;

  // fetch the data
  const url = `http://localhost:3000/api/products?query=${query}&category=${category}&sort=${sort}&page=${page}`;
  const { products, totalItems }: Data = await fetchData(url);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  // console.log({ products });

  return (
    <main className="ProductsPage">
      <section className="flex flex-col items-center justify-center gap-10">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-center">
          {products.map((product) => (
            <li key={product.productId}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>

        <ClientPagination page={page} totalPages={totalPages} />
      </section>
    </main>
  );
}
