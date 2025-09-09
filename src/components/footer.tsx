import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { BsFacebook, BsGithub, BsYoutube } from "react-icons/bs";

export default function Footer() {
  return (
    <footer>
      <section className="flex flex-col md:flex-row gap-10 justify-between">
        {/* 좌측 */}
        <div className="flex-1 bg-muted/50 text-lg flex flex-col gap-4 p-4 rounded-lg">
          <Logo />

          <p className="text-muted-foreground">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid corporis officia
            voluptates repudiandae neque natus laborum, nobis alias, optio nisi aspernatur.
          </p>

          <div
            className="flex gap-6 items-center mt-10 
        [&_svg]:cursor-pointer
        [&_svg]:hover:scale-110
        [&_svg]:transition
        [&_svg]:duration-300
        "
          >
            <BsYoutube />
            <BsFacebook />
            <BsGithub />
          </div>
        </div>

        {/* 우측 */}
        <div
          className="flex-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6
          [&_li]:hover:text-muted-foreground/50
          [&_li]:hover:cursor-pointer
          "
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-muted/50 rounded-lg p-4 flex flex-col gap-4">
              <h1 className="text-lg font-semibold">카테고리</h1>
              <ul className="text-muted-foreground flex flex-col gap-2 ">
                <li>전체</li>
                <li>디지털/가전</li>
                <li>패션의류</li>
                <li>생활건강</li>
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-30 border-t flex items-center">
        <p className="text-xs">© 2025 youserstack. All rights reserved.</p>

        <ul className="flex items-center gap-4 text-xs ml-auto">
          <li>
            <Button variant={"link"} asChild className="text-xs">
              <Link href="">개인정보</Link>
            </Button>
          </li>
          <li>
            <Button variant={"link"} asChild className="text-xs">
              <Link href="">이용약관</Link>
            </Button>
          </li>
        </ul>
      </section>
    </footer>
  );
}
