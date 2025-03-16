import { auth } from "@/app/api/auth/[...nextauth]/auth";
import CartIcon from "@/components/custom/cart-icon";
import CustomCommand from "@/components/custom/custom-command";
import Logo from "@/components/custom/logo";
import { ModeToggle } from "@/components/custom/mode-toggle";
import Nav from "@/components/custom/nav";
import SearchBar from "@/components/custom/search-bar";
import UserAvatar from "@/components/custom/user-avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="Header">
      <section>
        <Logo />
        <SearchBar />

        <div className="flex items-center gap-4">
          <ModeToggle className="hidden md:flex transition duration-300" />

          {/* mobile */}
          <UserMenu className="flex md:hidden" />
          <HamburgerMenu className="block md:hidden" />
        </div>
      </section>

      {/* desktop */}
      <section className="hidden md:flex">
        <Nav />
        <UserMenu className="hidden md:flex" />
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

async function UserMenu({ className }: { className?: string }) {
  const session = await auth();
  // console.log({ session });

  return (
    <div className={cn("UserMenu gap-4 items-center", className)}>
      <CartIcon />

      {session ? (
        <UserAvatar session={session} src="https://github.com/shadcn.png" />
      ) : (
        <SigninButton />
      )}
    </div>
  );
}

function HamburgerMenu({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "hover:text-muted-foreground cursor-pointer transition-all duration-300",
        className
      )}
    >
      <Menu size={20} />
    </div>
  );
}
