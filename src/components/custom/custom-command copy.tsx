"use client";

import { Calculator, Calendar, CreditCard, Settings, Smile, User } from "lucide-react";

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
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// 표시할 항목들 (예시 데이터)
const items = [
  { label: "Calculator", icon: <Calculator />, disabled: false },
  { label: "Calendar", icon: <Calendar />, disabled: false },
  { label: "Credit Card", icon: <CreditCard />, disabled: false },
  { label: "Settings", icon: <Settings />, disabled: false },
  { label: "Smile", icon: <Smile />, disabled: false },
  { label: "User", icon: <User />, disabled: false },
  { label: "한글", icon: <Smile />, disabled: false },
  { label: "대학교", icon: <User />, disabled: false },
  { label: "서울대학교", icon: <User />, disabled: false },
];

export default function CustomCommand() {
  const [value, setValue] = useState(""); // 검색어
  const [open, setOpen] = useState(false); // 리스트 활성여부 플래그
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

  // useEffect(() => console.log({ open }), [open]);
  useEffect(() => console.log({ value }), [value]);

  return (
    <Command
      loop
      className={cn(
        "rounded-lg border shadow-md md:min-w-[450px]",

        // 추가스타일
        "max-w-md h-auto /h-fit",
        open ? "" : "[&_.command-input-wrapper]:border-b-transparent"
      )}
    >
      <CommandInput
        ref={inputRef}
        // 기본설정
        value={value}
        onValueChange={setValue}
        // 포커스설정
        onFocus={() => {
          setOpen(true);
        }}
        // 입력요소에서 리스트가 비활성화되었다면 방향키로 열수있도록
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            setOpen(true);
          }
          if (e.key === "Enter") {
            setOpen(false);
          }
        }}
        onMouseDown={() => {
          setOpen(true);
        }}

        // 포커스설정
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
          {items.map((item) => {
            return (
              <CommandItem
                key={item.label}
                onSelect={() => {
                  setValue(item.label);
                  router.push(`/products?query=${item.label}`);
                }}
                onMouseDown={() => {
                  setValue(item.label);
                  router.push(`/products?query=${item.label}`);
                }}
                className="cursor-pointer"
                // onMouseEnter={() => setTempValue(item.label)}
                // disabled={item.disabled}
              >
                {item.icon}
                {item.label}
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

{
  /* <CommandList>
        <CommandEmpty>해당 키워드로 검색제안이 없습니다.</CommandEmpty>

        <CommandGroup heading="검색제안">
          {items.map((item) => {
            return (
              <CommandItem
                key={item.label}
                value={item.label}
                onMouseEnter={() => setTempValue(item.label)}
                onSelect={(v) => {
                  // setValue(item.label);
                  setTempValue(item.label);
                  console.log({ label: item.label, v, value });
                }}
                // onSelect={() => setValue(item.label)}
                // disabled={item.disabled}
              >
                {item.icon}
                {item.label}
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList> */
}
