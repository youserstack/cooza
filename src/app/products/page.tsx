import ProductList from "@/components/product-list";
import { Suspense } from "react";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ProductsPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const query = (searchParams.query as string) || "";
  const category = (searchParams.category as string) || "";
  const sort = (searchParams.sort as string) || "";
  const page = Number(searchParams.page) || 1;

  return (
    <main className="ProductsPage min-h-screen">
      <section className="flex flex-col items-center justify-center gap-10">
        <Suspense fallback={<div>loading...</div>}>
          <ProductList query={query} category={category} sort={sort} page={page} />
        </Suspense>
      </section>
    </main>
  );
}
