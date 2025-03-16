import { signOut } from "@/app/api/auth/[...nextauth]/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Session } from "next-auth";
import Link from "next/link";

interface Props {
  session: Session;
  src: string;
  alt?: string;
}

export default function UserAvatar({ session, src, alt }: Props) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar>
          <AvatarImage src={src} alt={alt} />
          <AvatarFallback>{session?.user?.name?.slice(0, 1).toUpperCase() || "CN"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 [&_a]:cursor-pointer">
        <DropdownMenuLabel>{session?.user?.email || "My Account"}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            프로필
            {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={"/orders"}>
              주문내역
              {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            설정
            {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            Keyboard shortcuts
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        {/* <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
        <DropdownMenuSeparator /> */}

        <SignoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SignoutButton() {
  const action = async () => {
    "use server";
    await signOut({ redirectTo: "/" });
  };

  return (
    <form action={action}>
      <DropdownMenuItem asChild className="size-full cursor-pointer">
        <button type="submit">로그아웃</button>
      </DropdownMenuItem>
    </form>
  );
}
