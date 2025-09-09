import ProductList from "@/components/product-list";
import { Suspense } from "react";

// 제품리스트 페이지
export default async function Page(props: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const queryParams = await props.searchParams;
  const query = queryParams.query || "";
  const category = queryParams.category || "";
  const sort = queryParams.sort || "";
  const page = Number(queryParams.page) || 1;

  return (
    <main>
      <section>
        <Suspense fallback={<div>loading...</div>}>
          <ProductList query={query} category={category} sort={sort} page={page} />
        </Suspense>
      </section>
    </main>
  );
}
