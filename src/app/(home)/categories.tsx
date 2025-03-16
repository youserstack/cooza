import { Card, CardContent } from "@/components/ui/card";
import { categories } from "@/data/categories";
import Image from "next/image";
import Link from "next/link";

export default function Categories() {
  return (
    <ul className="flex flex-wrap justify-center gap-4">
      {categories.map((item, index) => (
        <li key={index}>
          <Link href={`/products?category=${item.name}`}>
            <Card
              className="size-[100px] hover:shadow-lg hover:shadow-zinc-500/50"
              // dark:bg-foreground dark:text-background hover:shadow-lg hover:shadow-zinc-500/50
              //
            >
              <CardContent className="h-full flex flex-col justify-end /justify-center items-center gap-2  /border border-red-500">
                <Image
                  src={item.src}
                  alt=""
                  width={300}
                  height={300}
                  className="object-cover object-center"
                />
                <p className="text-xs text-nowrap/ whitespace-nowrap">{item.name}</p>
              </CardContent>
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
}
