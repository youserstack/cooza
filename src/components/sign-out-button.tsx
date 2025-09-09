"use client";

// import { signOut } from "@/auth";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <DropdownMenuItem onClick={() => signOut({ redirectTo: "/" })} className="cursor-pointer">
      로그아웃
    </DropdownMenuItem>
  );
}
