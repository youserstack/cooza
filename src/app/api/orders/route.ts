import db from "@/lib/configs/db";
import Order from "@/lib/model/Order";
import { v4 as uuidv4 } from "uuid";

// 주문 리스트 조회
export async function GET(req: Request) {
  try {
    await db();

    const url = new URL(req.url);
    const sort = url.searchParams.get("sort") || "sim";
    const page = Number(url.searchParams.get("page")) || 1;
    const itemsPerPage = 10;

    const totalItems = await Order.countDocuments();
    const orders = await Order.find({ userId })
      .sort(sort)
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .exec();

    return Response.json({ orders, totalItems });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

// 주문 요청
export async function POST(req: Request) {
  try {
    await db();

    const ordersheet = await req.json();

    const order = { ...ordersheet, orderId: uuidv4() };
    const newOrder = await Order.create(order);
    console.log({ newOrder });

    return Response.json({ order: newOrder });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
