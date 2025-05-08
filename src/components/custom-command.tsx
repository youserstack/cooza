"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

const suggestions = [
  "키보드",
  "마우스",
  "세탁세제",
  "카메라",
  "아이폰",
  "아이폰 16",
  "갤럭시",
  "나이키",
];

const items = [{ label: "설정", icon: <Settings /> }];

export default function CustomCommand({
  className,
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}) {
  const [value, setValue] = useState(""); // 검색어
  const inputRef = useRef<HTMLInputElement>(null); // 입력요소
  const router = useRouter();

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      // console.log(e.key);

      if (e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus(); // 입력요소 포커스
        setOpen(true); // 리스트 활성화
      }

      if (e.key === "Escape") {
        e.preventDefault();
        inputRef.current?.blur(); // 입력요소 블러
        setOpen(false); // 리스트 비활성화
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  useEffect(() => {
    const handleMousedown = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleMousedown);
    return () => document.removeEventListener("mousedown", handleMousedown);
  }, []);

  return (
    <Command
      loop
      className={cn(
        "rounded-lg border shadow-md md:min-w-[450px]",
        "h-auto",
        open ? "" : "[&_.command-input-wrapper]:border-b-transparent",
        className
      )}
    >
      <CommandInput
        ref={inputRef}
        value={value}
        onValueChange={setValue}
        onFocus={() => setOpen(true)}
        onMouseDown={() => setOpen(true)}
        // 입력요소에서 리스트가 비활성화되었다면 방향키로 열수있도록
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            setOpen(true);
          }
          if (e.key === "Enter") {
            router.push(`/products?query=${value}`);
            setOpen(false);
          }
        }}

        // onFocus={() => setOpen(true)}
        // onBlur={() => setOpen(false)}
        // 검색설정
        // onKeyDown={(e) => {
        //   if (e.key === "Enter") {
        //     if (value.length > 0) {
        //       console.log("enter", value);
        //       // 라우팅처리
        //       router.push(`/products?query=${value}`);
        //       setOpen(false);
        //     }
        //   }
        //   // if (e.key === "ArrowDown") {
        //   //   inputRef.current?.focus(); // 입력요소 포커스
        //   //   setOpen(true); // 리스트 활성화
        //   // }
        // }}
      />

      <CommandList className={cn(open ? "block" : "hidden")}>
        <CommandEmpty>해당 키워드로 검색제안이 없습니다.</CommandEmpty>

        <CommandGroup heading="검색제안">
          {suggestions.map((item) => {
            return (
              <CommandItem
                key={item}
                onSelect={() => {
                  setValue(item);
                  setOpen(false);
                  router.push(`/products?query=${item}`);
                }}
                onMouseDown={(e) => {
                  // 마우스클릭시 셀릭트이벤트로인해 실행되지않는것으로보임, 셀렉트이벤트 막아주고 실행
                  e.preventDefault();
                  setValue(item);
                  setOpen(false);
                  console.log("mousedown");
                  router.push(`/products?query=${item}`);
                }}
                className="cursor-pointer"
              >
                <Search />
                {item}
              </CommandItem>
            );
          })}
        </CommandGroup>
        <CommandSeparator />

        <CommandGroup heading="설정" onMouseDown={() => setOpen(false)}>
          {items.map((item) => (
            <CommandItem key={item.label} className="cursor-pointer">
              {item.icon}
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
