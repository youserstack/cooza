import prisma from "@/lib/configs/prisma";

// 단일 책임의 원칙에 따라 작성!

export async function getProductList({
  query,
  category,
  sort,
  page,
}: {
  query?: string;
  category?: string;
  sort?: string;
  page?: string | number;
}) {
  const take = 10; // 한 페이지당 상품 수
  const skip = page ? (Number(page) - 1) * take : 0;

  // where 조건 구성
  const where: any = {};

  if (query) {
    // 이름 또는 설명에 검색어 포함
    where.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
    ];
  }

  if (category) {
    where.category = category;
  }

  // orderBy 구성
  let orderBy: any = {};
  switch (sort) {
    case "price_asc":
      orderBy = { price: "asc" };
      break;
    case "price_desc":
      orderBy = { price: "desc" };
      break;
    case "newest":
      orderBy = { createdAt: "desc" };
      break;
    default:
      orderBy = { createdAt: "desc" };
  }

  return prisma.product.findMany({
    where,
    orderBy,
    skip,
    take,
  });
}

export async function getProductItem({ id }: { id: string }) {
  // id는 @id 필드여야 함
  return prisma.product.findUnique({
    where: { id }, // 고유 식별자로 조회
  });
}

// 서버사이드 정적 렌더링 경로에 사용
export async function getAllProductIds() {
  const products = await prisma.product.findMany({
    select: { id: true }, // id만 선택
  });

  return products.map((product) => product.id);
}

// 페이지네이션에 사용
export async function getProductCount({ query, category }: { query?: string; category?: string }) {
  const where: any = {};

  if (query) {
    where.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
    ];
  }

  if (category) {
    where.category = category;
  }

  return prisma.product.count({ where });
}
