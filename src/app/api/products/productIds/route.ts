import db from "@/lib/configs/db";
import Product from "@/lib/model/Product";

export async function GET(req: Request) {
  try {
    await db();
    const productIds = await Product.find().select("productId");
    return Response.json({ productIds });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
