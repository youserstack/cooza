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
import { useCommandState } from "cmdk";

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
  const [value, setValue] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const [isComposing, setIsComposing] = useState(false); // 2바이트한글단어 완성중인지 상태변수

  // const selectedItem = useCommandState((state) => state.value); // 현재 선택된 아이템 가져오기

  // // 방향키로 이동할 때 input value를 변경
  // useEffect(() => {
  //   if (ref.current && !isComposing) {
  //     console.log("set");
  //     ref.current.value = value;
  //   }
  // }, [value]);

  // useEffect(() => console.log({ value }), [value]);

  return (
    <Command
      className="rounded-lg border shadow-md md:min-w-[450px]"
      value={value}
      onValueChange={setValue}
      loop
      onCompositionStart={() => setIsComposing(true)}
      onCompositionEnd={() => setIsComposing(false)}
    >
      <CommandInput
        // value={value}
        // onValueChange={setValue}
        ref={ref}
      />

      <CommandList>
        <CommandEmpty>해당 키워드로 추천되는 항목이 없습니다.</CommandEmpty>

        <CommandGroup heading="Suggestions">
          {items.map((item) => {
            return (
              <CommandItem
                key={item.label}
                value={item.label}
                onSelect={() => {
                  console.log("on select");
                  setValue(item.label);
                  if (ref.current) {
                    ref.current.value = value;
                  }
                  // if (ref.current && !isComposing) {
                  //   console.log("set");
                  //   ref.current.value = value;
                  // }
                }}
                // onSelect={() => setValue(item.label)}
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
    </Command>
  );
}
