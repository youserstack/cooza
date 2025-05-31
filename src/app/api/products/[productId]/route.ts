import db from "@/lib/configs/db";
import Product from "@/lib/model/Product";

type Params = Promise<{ productId: string }>;

export async function GET(req: Request, segmentData: { params: Params }) {
  try {
    await db();

    const params = await segmentData.params;
    const { productId } = params;

    const product = await Product.findOne({ productId });
    if (!product) return Response.json({ msg: "not found" }, { status: 404 });

    return Response.json({ product });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
