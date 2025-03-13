import Image from "next/image";

export function ItemImage({ src }: { src: string }) {
  return (
    <div className="shrink-0 sm:size-[100px] /border overflow-hidden">
      <Image
        src={src}
        alt=""
        width={300}
        height={300}
        className="size-full object-cover object-center /aspect-square"
      />
    </div>
  );
}

export function ItemOptions({
  color,
  size,
  quantity,
}: {
  color: string;
  size: string;
  quantity: number;
}) {
  return (
    <div className="flex gap-2 items-center flex-wrap p-4">
      <p>{color}</p>
      <p>{size}</p>
      <p>{quantity}</p>
    </div>
  );
}
