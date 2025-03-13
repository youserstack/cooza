import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function ProductImageCard({ src }: { src: string }) {
  return (
    <Card className="ProductImageCard md:h-[400px] overflow-hidden p-0">
      <Image
        src={src}
        alt={""}
        width={1000}
        height={1000}
        className="aspect-[4/3] lg:aspect-[16/9] size-full object-cover"
      />
    </Card>
  );
}
