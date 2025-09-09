import { Button } from "@/components/ui/button";
import {
  MdKeyboardDoubleArrowLeft,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

export function PrevJump({ onClick, disabled }: { onClick: () => void; disabled: boolean }) {
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      onClick={onClick}
      disabled={disabled}
      className="size-8 rounded-full m-1"
    >
      <MdKeyboardDoubleArrowLeft className="size-4 m-auto" />
    </Button>
  );
}

export function Prev({ onClick, disabled }: { onClick: () => void; disabled: boolean }) {
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      onClick={onClick}
      disabled={disabled}
      className="size-8 rounded-full m-1"
    >
      <MdOutlineKeyboardArrowLeft className="size-4 m-auto" />
    </Button>
  );
}

export function Next({ onClick, disabled }: { onClick: () => void; disabled: boolean }) {
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      onClick={onClick}
      disabled={disabled}
      className="size-8 rounded-full m-1"
    >
      <MdOutlineKeyboardArrowRight className="size-4 m-auto" />
    </Button>
  );
}

export function NextJump({ onClick, disabled }: { onClick: () => void; disabled: boolean }) {
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      onClick={onClick}
      disabled={disabled}
      className="size-8 rounded-full m-1"
    >
      <MdOutlineKeyboardDoubleArrowRight className="size-4 m-auto" />
    </Button>
  );
}
