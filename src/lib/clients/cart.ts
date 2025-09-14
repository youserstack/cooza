import prisma from "@/lib/configs/prisma";

export async function getCart(userId: string) {
  return prisma.cart.findFirst({
    where: { userId },
    include: { items: { include: { product: true } } },
  });
}

// ★ product 정보까지 join
