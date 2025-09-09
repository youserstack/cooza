import db from "@/lib/configs/db";
import Product from "@/lib/model/Product";

export async function GET() {
  try {
    await db();
    const allProductIds = await Product.find().select("productId");
    return Response.json({ allProductIds });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
