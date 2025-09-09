import { ShipWheel } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"} className="font-semibold uppercase flex gap-2 py-1">
      <ShipWheel />
      <span>cooza</span>
    </Link>
  );
}
