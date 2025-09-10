import { auth } from "@/auth";
import Logo from "@/components/logo";
import Nav from "@/components/nav";
import SearchBar from "@/components/search-bar";
import UserAvatar from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { Bell, Ellipsis, Menu, Settings } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeMenuSub from "@/components/theme-menu-sub";
import NotificationCount from "@/components/notification-count";
import SideMenu from "@/components/side-menu";

export default async function Header() {
  const session = await auth();

  return (
    <header>
      {/* 1번 줄 */}
      <section>
        <Logo />

        {/* 네비게이션 메뉴 -> 데스크탑 메뉴 */}
        <div className="hidden md:block ml-4">
          <Nav />
        </div>

        {/* 알림 메뉴 */}
        <div className="ml-auto">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="relative block p-1 rounded-full hover:bg-muted">
              <Bell className="size-[20px]" />
              <NotificationCount />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>메뉴1</DropdownMenuItem>
              <DropdownMenuItem>메뉴1</DropdownMenuItem>
              <DropdownMenuItem>메뉴1</DropdownMenuItem>
              <DropdownMenuItem>메뉴1</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* 인증 메뉴 */}
        <div className="ml-2">
          {/* 비회원 메뉴 */}
          {!session && (
            <Button size={"sm"} variant={"ghost"} asChild>
              <Link href={"/signin"}>로그인</Link>
            </Button>
          )}

          {/* 회원 메뉴 */}
          {session && <UserAvatar session={session} src="https://github.com/shadcn.png" />}
        </div>

        {/* 옵션기능(...) 메뉴 -> 데스크탑 메뉴 */}
        {/* <div className="block md:hidden ml-2">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="block p-1 rounded-full relative hover:bg-muted">
              <Menu size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <ThemeMenuSub />
              <DropdownMenuItem>메뉴1</DropdownMenuItem>
              <DropdownMenuItem>메뉴1</DropdownMenuItem>
              <DropdownMenuItem>메뉴1</DropdownMenuItem>
              <DropdownMenuItem>메뉴1</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}

        <div className="ml-2">
          <SideMenu />
        </div>
      </section>

      {/* <section>
        <SearchBar />
      </section> */}
    </header>
  );
}
