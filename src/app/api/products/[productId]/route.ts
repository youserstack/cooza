import db from "@/lib/configs/db";
import Product from "@/lib/model/Product";

export async function GET(req: Request, { params }: { params: Promise<{ productId: string }> }) {
  try {
    await db();

    // extract
    const { productId } = await params;

    const product = await Product.findOne({ productId });
    if (!product) return Response.json({ msg: "not found" }, { status: 404 });

    return Response.json({ product });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
