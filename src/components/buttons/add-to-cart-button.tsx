import { auth } from "@/auth";
import { ShoppingBasket } from "lucide-react";
import { redirect } from "next/navigation";

export default async function AddToCartButton({ product }: { product: ProductType }) {
  // const handleClick = async (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   // addToCart({ product, option: { color: "black", size: "md", quantity: 1 } });

  //   try {
  //     const data = await addToCart({ productId: product.id, quantity: 1 });
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const addToCart = async (formData: FormData) => {
    "use server";

    const session = await auth();

    const cart = {
      userId: session?.user?.id,
    };

    console.log({ cart });

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
