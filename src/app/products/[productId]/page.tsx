import ProductImageCard from "@/app/products/[productId]/product-image-card";
import { BreadcrumbWithSeparator } from "@/components/custom/breadcrumb-with-separator";
import { fetchData } from "@/lib/fetchers";
import ProductInfoCard from "@/app/products/[productId]/product-info-card";
import WidgetCard from "@/app/products/[productId]/widget/widget-card";

interface Props {
  params: Promise<{ productId: string }>;
}

interface Data {
  product: Product;
}

export default async function ProductDetailPage(props: Props) {
  // extract the params
  const params = await props.params;
  const productId = params.productId;
  console.log({ params });

  // fetch the data
  const url = `${process.env.BASE_URL}/api/products/${productId}`;
  const { product }: Data = await fetchData(url);
  console.log({ product });

  return (
    <main className="ProductDetailPage">
      <section>
        <BreadcrumbWithSeparator category={product.category1} />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <ProductImageCard src={product.image} />

          <div className="flex flex-col gap-4 sm:gap-6">
            <ProductInfoCard product={product} />
            <WidgetCard product={product} />
          </div>
        </div>
      </section>
    </main>
  );
}
