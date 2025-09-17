import { auth } from "@/auth";
import prisma from "@/lib/configs/prisma";
import { Cart } from "@prisma/client";
import { ShoppingBasket } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AddToCartButton({ product }: { product: ProductType }) {
  const addToCart = async (formData: FormData) => {
    "use server";

    // 인증정보, 현재경로(레퍼러) 가져옴
    const session = await auth();
    const referer = (await headers()).get("referer") ?? "/";

    // 미인증 -> 리다이렉트
    if (!session || !session.user?.id) {
      const queryParams = new URLSearchParams({ callbackUrl: referer });
      const redirectUrl = `/signin?${queryParams.toString()}`;
      // console.log({ redirectUrl });

      redirect(redirectUrl);
    }

    // const cart = await prisma.cart.create({
    //   data: {
    //     userId: session.user.id,
    //     items: { create: { productId: product.id, quantity: 1 } },
    //   },
    //   include: { items: true }, // 생성 후 items도 같이 반환
    // });

    // console.log({ cart });

    // redirect("/");
  };

  return (
    <form action={addToCart}>
      <input type="text" name="some" defaultValue="something" className="hidden" />
      <button type="submit" className="p-1 bg-black/20 hover:bg-black/10 rounded-full">
        <ShoppingBasket size={16} />
      </button>
    </form>
  );
}
