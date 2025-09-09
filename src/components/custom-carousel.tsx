"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { carouselItems } from "@/data/carousel-items";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useRef } from "react";

export function CustomCarousel() {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <section>
      <Carousel
        opts={{ loop: true }}
        plugins={[plugin.current]}
        onMouseEnter={() => plugin.current.stop()} // 마우스 올리면 멈추기
        onMouseLeave={() => plugin.current.play()} // 마우스 나가면 재개
        // plugins={[Autoplay({ delay: 1000, stopOnMouseEnter: true })]}
      >
        <CarouselContent>
          {carouselItems.map((item, index) => (
            <CarouselItem key={index} className="aspect-[4/1] relative">
              <Image src={item.src} alt="" fill />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-4 sm:left-6 md:left-8 lg:left-10" />
        <CarouselNext className="right-4 sm:right-6 md:right-8 lg:right-10" />
      </Carousel>
    </section>
  );
}
