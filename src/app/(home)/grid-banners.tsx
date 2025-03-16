import { gridBanners } from "@/data/gridBanners";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function GridBanners() {
  return (
    <div
      className="aspect-[11/7] 
        grid grid-cols-8 grid-rows-7 gap-4 my-10"
    >
      <div
        className="col-span-2 row-span-full
          grid grid-cols-1 grid-rows-8 gap-4"
      >
        <CustomImage src={gridBanners.sofa} className="col-span-1 row-span-2" />
        <CustomImage src={gridBanners.ipad} className="col-span-1 row-span-4" />
        <CustomImage src={gridBanners.whiteRoom} className="col-span-1 row-span-2" />
      </div>

      <div
        className="col-span-4 row-span-full
          grid grid-cols-2 grid-rows-8 gap-4"
      >
        <CustomImage src={gridBanners.iphone} className="col-span-2 row-span-3" />
        <CustomImage src={gridBanners.newbalance} className="col-span-1 row-span-3" />
        <CustomImage src={gridBanners.adidas} className="col-span-1 row-span-3" />
        <CustomImage src={gridBanners.nike} className="col-span-2 row-span-2 h-full mb-2" />
      </div>

      <div
        className="col-span-2 row-span-full
          grid grid-cols-1 grid-rows-8 gap-4"
      >
        <CustomImage src={gridBanners.room} className="col-span-1 row-span-2" />
        <CustomImage src={gridBanners.appleWatch} className="col-span-1 row-span-2" />
        <CustomImage src={gridBanners.chairs} className="col-span-1 row-span-4" />
      </div>
    </div>
  );
}

function CustomImage({
  src,
  className,
}: {
  src: string;
  className: string;
  // size?: { width: number; height: number };
}) {
  return (
    <Image
      src={src}
      alt=""
      width={500}
      height={500}
      className={cn(
        className,
        "size-full object-cover object-center cursor-pointer rounded-[10px]",
        "hover:grayscale-50 transition-all duration-300",
        "hover:shadow-lg hover:shadow-zinc-500/50"
      )}
    />
  );
}
