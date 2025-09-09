import db from "@/lib/configs/db";
import Product from "@/lib/model/Product";

export async function GET(req: Request, segmentData: { params: Promise<{ id: string }> }) {
  try {
    await db();

    const params = await segmentData.params;
    const { id } = params;

    const product = await Product.findOne({ productId: id });
    if (!product) return Response.json({ msg: "not found" }, { status: 404 });

    return Response.json({ product });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
