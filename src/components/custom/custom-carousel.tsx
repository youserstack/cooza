"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useRef } from "react";

const items = [
  {
    src: "https://res.cloudinary.com/dzktdrw7o/image/upload/v1741652715/cooza/53369NPA-Apple-MAcbookAir-MacStudio-IpadAir-Hero-Desktop-PO-1_87910_gw16rg.webp",
  },
  {
    src: "https://res.cloudinary.com/dzktdrw7o/image/upload/v1741652201/cooza/BHUX-20655-TechCorner_homepage-new_ut4jqf.jpg",
  },
  {
    src: "https://res.cloudinary.com/dzktdrw7o/image/upload/v1741652201/cooza/BHUX-26570-BILD2025_homepage_yfcqeg.jpg",
  },
  {
    src: "https://res.cloudinary.com/dzktdrw7o/image/upload/v1741652201/cooza/BHUX-26848-Apple_Homepage_ivwc1k.jpg",
  },
  {
    src: "https://res.cloudinary.com/dzktdrw7o/image/upload/v1741652715/cooza/53369Canon_March_Cine_Savings-Hero-Desktop_67068_mceuro.webp",
  },
  {
    src: "https://res.cloudinary.com/dzktdrw7o/image/upload/v1741654218/cooza/1741623963016-desk-mainslider27_h1rovx.webp",
  },
];

export function CustomCarousel() {
  // const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <Carousel
      className="w-full h-[80px] sm:h-[150px] md:h-[250px] /max-w-2xl /max-w-xs relative"
      opts={{ loop: true }}
      // // plugins={[Autoplay({ delay: 1000, stopOnMouseEnter: true })]}
      // plugins={[plugin.current]}
      // onMouseEnter={() => plugin.current.stop()} // 마우스 올리면 멈추기
      // onMouseLeave={() => plugin.current.play()} // 마우스 나가면 재개
    >
      <CarouselContent className="h-full">
        {items.map((item, index) => (
          <CarouselItem key={index} className="h-full cursor-pointer">
            <div className="h-full p-1">
              <Image
                src={item.src}
                alt=""
                width={1000}
                height={1000}
                className="size-full object-cover /object-contain object-center /object-scale-down"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="left-4 sm:left-6 md:left-8 lg:left-10" />
      <CarouselNext className="right-4 sm:right-6 md:right-8 lg:right-10" />
    </Carousel>
  );
}
