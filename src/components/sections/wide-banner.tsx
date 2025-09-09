import { cn } from "@/lib/utils";
import Image from "next/image";

export default function WideBanner({
  src,
  width,
  height,
  className,
}: {
  src: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <section className={cn("max-w-full min-h-auto p-0", className)}>
      <Image src={src} alt="" width={width} height={height} />
    </section>
  );
}
