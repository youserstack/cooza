"use client";

import CustomCommand from "@/components/custom-command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "SearchBar group z-100",
        open ? "fixed inset-0 md:relative" : "relative",
        open ? "p-2 md:p-0" : "p-0",
        "flex flex-col justify-between items-start md:items-center",
        "w-full md:w-fit"
      )}
    >
      <div
        className={cn(
          "SearchBar-Background absolute inset-0 bg-black/70 z-10",
          open ? "block md:hidden" : "hidden"
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
          open ? "flex md:hidden justify-center items-center self-end" : "hidden"
        )}
        onClick={() => setOpen(false)}
        variant={"secondary"}
      >
        <X />
      </Button>
    </div>
  );
}
