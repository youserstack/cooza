import { ShipWheel } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link className="Logo" href={"/"}>
      <p className="font-semibold uppercase flex gap-1 items-center">
        <ShipWheel />
        <span className="hidden sm:block">cooza</span>
      </p>
    </Link>
  );
}
