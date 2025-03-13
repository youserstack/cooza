import { auth } from "@/app/api/auth/[...nextauth]/auth";
import db from "@/lib/configs/db";
import Order from "@/lib/model/Order";
import { Ordersheet } from "@/types/ordersheet";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    await db();

    // extract the data
    const ordersheet: Ordersheet = await req.json();

    const order = { ...ordersheet, orderId: uuidv4() };
    const newOrder = await Order.create(order);
    console.log({ newOrder });

    redirect("/orders");
    //   return Response.json({ order: newOrder });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function GET(req: Request) {
  // 아직 auth.js 가 베타버전이라서 인증정보를 가지고오지 못하나?
  // const session = await auth();
  // const userId = session?.user?.userId;
  // console.log({ userId });

  try {
    await db();

    const userId = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!userId) return Response.json({ error: "unauthorized" }, { status: 401 });
    // console.log({ userId });

    // extract
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
