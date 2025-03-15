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
  const [open, setOpen] = useState(true); // 리스트 활성여부 플래그
  const [isComposing, setIsComposing] = useState(false); // 컴포지션(2바이트한글단어) 플래그
  const ref = useRef<HTMLInputElement>(null); // 입력요소

  // 검색어변경시 입력요소의값으로 검색어를설정(자동으로변경되지않기때문에 수동으로설정해야함)
  useEffect(() => {
    if (ref.current && !isComposing) {
      ref.current.value = value;
    }
  }, [value]);

  useEffect(() => {
    const shortcut = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        ref.current?.focus();
      }
    };

    document.addEventListener("keydown", shortcut);
    return () => document.removeEventListener("keydown", shortcut);
  }, []);

  return (
    <Command
      className={cn(
        "rounded-lg border shadow-md md:min-w-[450px] max-w-md h-fit",
        open ? "" : "[&_.command-input-wrapper]:border-b-transparent"
        // open ? "" : "[&_data-[slot=command-input-wrapper]]:border-b-0"
      )}
      // 기본설정
      value={value}
      onValueChange={setValue}
      // 포커스설정
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      // onMouseOver={() => ref.current?.focus()}
      loop
      // 한글설정(한글은 초성, 중성, 종성을 가지기 때문에 컴포지션 이벤트가 필요)
      onCompositionStart={() => setIsComposing(true)}
      onCompositionEnd={() => setIsComposing(false)}
      // 검색설정
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          // console.log("enter", value);
          // 라우팅처리
        }
      }}
    >
      <CommandInput ref={ref} />

      {open && (
        <CommandList
        //
        // className="absolute top-full bg-background w-full"
        >
          <CommandEmpty>해당 키워드로 추천되는 항목이 없습니다.</CommandEmpty>

          <CommandGroup heading="Suggestions">
            {items.map((item) => {
              return (
                <CommandItem
                  key={item.label}
                  value={item.label}
                  onSelect={() => setValue(item.label)}
                  // onSelect={() => {
                  //   setValue(item.label);
                  //   // if (ref.current) {
                  //   //   ref.current.value = value;
                  //   // }
                  //   // if (ref.current && !isComposing) {
                  //   //   console.log("set");
                  //   //   ref.current.value = value;
                  //   // }
                  // }}
                  // onSelect={(value) => setValue(value)}
                  // disabled={item.disabled}
                >
                  {item.icon}
                  {item.label}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      )}
    </Command>
  );
}
