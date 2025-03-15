import { auth } from "@/app/api/auth/[...nextauth]/auth";
import CartIcon from "@/components/custom/cart-icon";
import CustomCommand from "@/components/custom/custom-command";
import Logo from "@/components/custom/logo";
import { ModeToggle } from "@/components/custom/mode-toggle";
import Nav from "@/components/custom/nav";
import UserAvatar from "@/components/custom/user-avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function Header() {
  const session = await auth();
  // console.log({ session });

  return (
    <header className="Header">
      <section className="relative overflow-visible flex items-center justify-between gap-4 p-2">
        <Logo />
        <SearchBar />
        <ModeToggle />
      </section>

      <section className="flex justify-between items-center gap-4 p-2">
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

function SearchBar() {
  return (
    <div className="SearchBar relative flex justify-center items-center z-[100]">
      <div className="h-[40px] /ring">
        <CustomCommand />
      </div>
    </div>
  );
}
