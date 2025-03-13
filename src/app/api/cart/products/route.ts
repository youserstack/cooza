import db from "@/lib/configs/db";
import Product from "@/lib/model/Product";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await db();

    // extract the searchParams
    const searchParams = request.nextUrl.searchParams;
    const productIds = searchParams.getAll("productIds");
    if (!productIds || productIds.length === 0) {
      return Response.json({ error: "productIds가 필요합니다." }, { status: 400 });
    }

    const products = await Product.find({ productId: { $in: productIds } }).lean();
    console.log({ "cart's fresh products": products.map((v) => v.title) });

    return Response.json(products);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
