import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  url: string;
  size: { width: number; height: number };
  className?: string;
}

export default function WideBanner({ url, size: { width, height }, className }: Props) {
  return (
    <section className={cn("WideBanner max-w-full min-h-auto p-0 my-10", className)}>
      <Image
        src={url}
        alt=""
        width={width}
        height={height}
        className="size-full object-cover object-center"
      />
    </section>
  );
}
