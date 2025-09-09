import { Card, CardContent } from "@/components/ui/card";
import { categories } from "@/data/categories";
import Image from "next/image";
import Link from "next/link";

export default function Categories() {
  return (
    <section className="mt-[2vw]">
      <ul className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
        {categories.map((item, index) => (
          <li key={index}>
            <Link href={`/products?category=${item.name}`}>
              <Card className="size-full">
                <CardContent>
                  <div className="relative ">
                    <Image src={item.src} alt="" width={300} height={300} />
                  </div>
                  <p className="text-xs mt-[2.5vw] text-center">{item.name}</p>
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
