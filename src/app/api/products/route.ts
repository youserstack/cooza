import db from "@/lib/configs/db";
import Product from "@/lib/model/Product";

export async function GET(req: Request) {
  try {
    await db();

    // extract the searchParams
    const url = new URL(req.url);
    const query = url.searchParams.get("query") || "";
    const category = url.searchParams.get("category") || "";
    const sort = url.searchParams.get("sort") || "sim";
    const page = Number(url.searchParams.get("page")) || 1;
    const itemsPerPage = 10;

    // set the filter
    const filter: any = {};
    if (query) {
      filter.title = { $regex: query, $options: "i" }; // 대소문자 구분 없이 제목 검색
    }
    if (category) {
      filter.category1 = { $regex: category, $options: "i" }; // 대소문자 구분 없이 제목 검색
    }
    // if (exclude) {
    //   const excludeConditions = exclude.split(":").map((word) => new RegExp(word, "i"));
    //   filter.title = { $not: { $in: excludeConditions } }; // 제외 조건
    // }
    // console.log({ query });

    const totalItems = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort(sort)
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .exec();
    // console.log({ totalItems });

    return Response.json({ products, totalItems });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
