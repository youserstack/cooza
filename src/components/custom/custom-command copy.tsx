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
  const [open, setOpen] = useState(false); // 리스트 활성여부 플래그
  const root = useRef<HTMLInputElement>(null); // 입력요소
  const ref = useRef<HTMLInputElement>(null); // 입력요소

  const [tempValue, setTempValue] = useState("");

  useEffect(() => {
    const shortcut = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        ref.current?.focus(); // 입력요소 포커스
        setOpen(true); // 리스트 활성화
      }
      if (e.key === "Escape") {
        e.preventDefault();
        ref.current?.blur(); // 입력요소 블러
        setOpen(false); // 리스트 비활성화
      }
    };

    document.addEventListener("keydown", shortcut);
    return () => document.removeEventListener("keydown", shortcut);
  }, []);

  useEffect(() => {
    // 외부 클릭 시 리스트 닫기
    const blur = (e: MouseEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", blur);

    return () => {
      document.removeEventListener("click", blur);
    };
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current.value = tempValue;
    }
  }, [tempValue]);

  return (
    <Command
      ref={root}
      className={cn(
        "rounded-lg border shadow-md md:min-w-[450px]",

        // 추가스타일
        "max-w-md h-auto /h-fit",
        open ? "" : "[&_.command-input-wrapper]:border-b-transparent"
      )}
      loop
    >
      <CommandInput
        ref={ref}
        // 기본설정
        value={value}
        onValueChange={setValue}
        // 포커스설정
        onFocus={() => setOpen(true)}
        // 검색설정
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            // console.log("enter", value);
            // 라우팅처리
          }
        }}
      />

      {open && (
        <CommandList>
          <CommandEmpty>해당 키워드로 검색제안이 없습니다.</CommandEmpty>

          <CommandGroup heading="검색제안">
            {items.map((item) => {
              return (
                <CommandItem
                  key={item.label}
                  value={item.label}
                  onMouseEnter={() => setTempValue(item.label)}
                  onSelect={(v) => {
                    if (ref.current) {
                      setValue(item.label);
                      ref.current.focus(); // 입력 필드 포커스 유지
                    }

                    // console.log({ label: item.label, v, value });
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
        </CommandList>
      )}

      {/* <CommandList>
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
      </CommandList> */}
    </Command>
  );
}
