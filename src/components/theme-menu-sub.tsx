"use client";

import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeMenuSub() {
  const { setTheme, theme } = useTheme();
  // console.log({ theme });

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="mx-2">
          {theme === "system" && "시스템 모드"}
          {theme === "dark" && "다크 모드"}
          {theme === "light" && "라이트 모드"}
        </span>
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("light")}>
          라이트 모드
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("dark")}>
          다크 모드
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("system")}>
          시스템 모드
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
