import db from "@/lib/configs/db";
import Product from "@/lib/model/Product";

export async function POST(req: Request) {
  try {
    await db();

    // extract
    const { productIds } = await req.json();
    if (!productIds || !Array.isArray(productIds)) {
      return Response.json({ error: "Invalid request" }, { status: 400 });
    }
    console.log({ productIds });

    const products = await Product.find({ productId: { $in: productIds } }).lean();
    console.log({ products });

    return Response.json(products); // 그룹화 없이 products만 반환
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
