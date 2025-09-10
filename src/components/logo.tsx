import { Layers } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"} className="font-semibold uppercase flex items-center gap-2 py-1 ">
      <Layers className="size-5" />
      <span>cooza</span>
    </Link>
  );
}
