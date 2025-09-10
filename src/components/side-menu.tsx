"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function SideMenu() {
  return (
    <Drawer direction="right" disablePreventScroll>
      <DrawerTrigger className="block">
        <Menu className="size-[20px]" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>카테고리 메뉴</DrawerTitle>

          <Accordion type="single" collapsible>
            {/* 디지털/가전 */}
            <AccordionItem value="디지털/가전">
              <AccordionTrigger>
                <DrawerClose asChild>
                  <Link href={"/products?category=디지털/가전"}>디지털/가전</Link>
                </DrawerClose>
              </AccordionTrigger>
              <AccordionContent>
                <ul>
                  {["전체", "컴퓨터", "TV", "세탁기/건조기", "냉장고", "청소기"].map((item) => (
                    <li key={item} title={item}>
                      <DrawerClose asChild>
                        <Link href={`/products?category=디지털/가전&query=${item}`}>{item}</Link>
                      </DrawerClose>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* 패션의류 */}
            <AccordionItem value="패션의류">
              <AccordionTrigger>
                <DrawerClose asChild>
                  <Link href={"/products?category=패션의류"}>패션의류</Link>
                </DrawerClose>
              </AccordionTrigger>
              <AccordionContent>
                <ul>
                  {["전체", "공용", "남성", "여성", "아동", "잡화", "신발"].map((item) => (
                    <li key={item} title={item}>
                      <DrawerClose asChild>
                        <Link href={`/products?category=패션의류&query=${item}`}>{item}</Link>
                      </DrawerClose>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* 생활/건강 */}
            <AccordionItem value="생활/건강">
              <AccordionTrigger>
                <DrawerClose asChild>
                  <Link href={"/products?category=생활/건강"}>생활/건강</Link>
                </DrawerClose>
              </AccordionTrigger>
              <AccordionContent>
                <ul>
                  {[
                    "전체",
                    "인테리어/조명",
                    "패브릭",
                    "수납/정리",
                    "욕실",
                    "주방",
                    "청소/세탁",
                    "공구",
                  ].map((item) => (
                    <li key={item} title={item}>
                      <DrawerClose asChild>
                        <Link href={`/products?category=생활/건강&query=${item}`}>{item}</Link>
                      </DrawerClose>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </DrawerHeader>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant={"outline"}>닫기</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
