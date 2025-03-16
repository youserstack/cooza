"use client";

import CustomCommand from "@/components/custom/custom-command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
  // const [focus, setFocus] = useState(false);
  const [open, setOpen] = useState(false); // 리스트 활성여부 플래그

  return (
    <div
      className={cn(
        "SearchBar group z-100",
        open ? "fixed inset-0 md:relative" : "relative", // position
        open ? "p-2 md:p-0" : "p-0", // padding
        "flex flex-col justify-between items-start md:items-center",
        "w-full md:w-fit"
      )}
    >
      <div
        className={cn(
          "SearchBar-Background absolute inset-0 bg-black/70 z-10",
          open ? "block md:hidden" : "hidden" // display
        )}
        onClick={() => setOpen(false)}
      ></div>

      <div
        className={cn("SearchBar-CommandWrapper w-full h-[32px] z-10")}
        onFocus={() => setOpen(true)}
      >
        <CustomCommand open={open} setOpen={setOpen} />
      </div>

      <Button
        className={cn(
          "SearchBar-CloseButton z-10",
          open ? "flex md:hidden justify-center items-center self-end" : "hidden" // display
        )}
        onClick={() => setOpen(false)}
        variant={"secondary"}
      >
        <X />
      </Button>
    </div>
  );
}
