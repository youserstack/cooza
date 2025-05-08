"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  product: Product;
  className?: string;
}

export default function KeepButton({ product, className }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
  };

  return (
    <Button
      className={cn("KeepButton rounded-full cursor-pointer", className)}
      onClick={handleClick}
      variant={"secondary"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="none"
        viewBox="0 0 16 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.81 6.142 8.785 8.088a1.423 1.423 0 0 1-1.93 0 1.25 1.25 0 0 1-.398-.91c0-.342.141-.665.398-.908l2.077-2.005a2.7 2.7 0 0 1 1.892-.765c.713 0 1.385.27 1.89.765 1 .976 1.049 2.551.131 3.567L7.99 12.5 3.286 7.975a2.58 2.58 0 0 1 0-3.71 2.68 2.68 0 0 1 1.89-.765c.617 0 1.204.203 1.68.579"
        ></path>
      </svg>
    </Button>
  );
}
