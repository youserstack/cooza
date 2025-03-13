import * as React from "react";
import { MoreHorizontalIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  MdKeyboardArrowLeft,
  MdKeyboardDoubleArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

interface PaginationButtonProps
  extends Pick<React.ComponentProps<typeof Button>, "size">,
    React.ComponentProps<"button"> {
  isActive?: boolean;
}

function PaginationButton({ className, isActive, size = "icon", ...props }: PaginationButtonProps) {
  return (
    <button
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({ variant: isActive ? "outline" : "ghost", size }),
        className,
        "cursor-pointer"
      )}
      {...props}
    />
  );
}

interface PaginationArrowButtonProps extends React.ComponentProps<typeof PaginationButton> {}

function PaginationPreviousJump({ className, ...props }: PaginationArrowButtonProps) {
  return (
    <PaginationButton
      aria-label="Go to previous 10 page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <MdKeyboardDoubleArrowLeft className="/hidden /sm:block size-4 m-auto" />
    </PaginationButton>
  );
}

function PaginationPrevious({ className, ...props }: PaginationArrowButtonProps) {
  return (
    <PaginationButton
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <MdKeyboardArrowLeft className="/hidden /sm:block size-4 m-auto" />
    </PaginationButton>
  );
}

function PaginationNext({ className, ...props }: PaginationArrowButtonProps) {
  return (
    <PaginationButton
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <MdOutlineKeyboardArrowRight className="/hidden /sm:block size-4 m-auto" />
    </PaginationButton>
  );
}

function PaginationNextJump({ className, ...props }: PaginationArrowButtonProps) {
  return (
    <PaginationButton
      aria-label="Go to next 10 page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <MdOutlineKeyboardDoubleArrowRight className="/hidden /sm:block size-4 m-auto" />
    </PaginationButton>
  );
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationButton,
  PaginationItem,
  PaginationPreviousJump,
  PaginationPrevious,
  PaginationNext,
  PaginationNextJump,
  PaginationEllipsis,
};
