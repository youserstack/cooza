import SignOutButton from "@/components/sign-out-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Session } from "next-auth";
import Link from "next/link";
import NotificationCount from "@/components/notification-count";

export default function UserAvatar({
  session,
  src,
  alt,
}: {
  session: Session;
  src: string;
  alt?: string;
}) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div className="relative">
          <Avatar className="cursor-pointer hover:ring-2 hover:ring-ring transition duration-300 size-[24px]">
            <AvatarImage src={src} alt={alt} />
            <AvatarFallback>
              {session?.user?.name?.slice(0, 1).toUpperCase() || "CN"}
            </AvatarFallback>
          </Avatar>

          {/* 알림표시 */}
          {/* <div className="absolute top-0 left-0 size-2 rounded-full bg-red-500"></div> */}
          {/* <NotificationCount /> */}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 [&_a]:cursor-pointer">
        {/* 회원정보 */}
        <DropdownMenuLabel>{session?.user?.email || "My Account"}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* 메뉴 */}
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={"/cart"}>장바구니</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/orders"}>주문내역</Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>설정</DropdownMenuItem> */}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* 로그아웃 */}
        <DropdownMenuGroup>
          <SignOutButton />
        </DropdownMenuGroup>

        {/* <DropdownMenuSeparator /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
