import { auth } from "@/app/api/auth/[...nextauth]/auth";
import CartIcon from "@/components/custom/cart-icon";
import Logo from "@/components/custom/logo";
import Nav from "@/components/custom/nav";
import UserAvatar from "@/components/custom/user-avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Header() {
  const session = await auth();
  // console.log({ session });

  return (
    <header className="Header">
      <section className="max-w-screen-lg mx-auto flex justify-between items-center gap-4 p-2">
        <Logo />
        <Nav />
        <div className="flex gap-6 items-center">
          <CartIcon />

          {session ? (
            <UserAvatar session={session} src="https://github.com/shadcn.png" />
          ) : (
            <SigninButton />
          )}
        </div>
      </section>
    </header>
  );
}

function SigninButton() {
  return (
    <Button size={"sm"} asChild>
      <Link href={"/signin"}>로그인</Link>
    </Button>
  );
}
