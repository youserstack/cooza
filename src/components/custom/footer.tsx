import { ModeToggle } from "@/components/custom/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { ShipWheel } from "lucide-react";
import Link from "next/link";
import { BsFacebook, BsGithub, BsYoutube } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="Footer">
      <section className="flex flex-col md:flex-row gap-10 justify-between">
        {/* left side */}
        <div
          className="flex-1
          bg-muted/50 text-lg flex flex-col gap-4 p-4 rounded-lg"
        >
          <Logo />

          <p className="text-muted-foreground">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid corporis officia
            voluptates repudiandae neque natus laborum, nobis alias, optio nisi aspernatur.
          </p>

          <SocialIcons />
        </div>

        {/* right side */}
        <div
          className="flex-3
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6
          [&_li]:hover:text-muted-foreground/50
          "
        >
          <div
            className="bg-muted/50 rounded-lg p-4
            flex flex-col gap-4"
          >
            <h1 className="text-lg font-semibold">카테고리</h1>

            <ul
              className="text-muted-foreground
              flex flex-col gap-2 [&_li]:hover:cursor-pointer"
            >
              <li>전체</li>
              <li>디지털/가전</li>
              <li>패션의류</li>
              <li>생활건강</li>
            </ul>
          </div>
          <div
            className="bg-muted/50 rounded-lg p-4
            flex flex-col gap-4"
          >
            <h1 className="text-lg font-semibold">카테고리</h1>

            <ul
              className="text-muted-foreground
              flex flex-col gap-2 [&_li]:hover:cursor-pointer"
            >
              <li>전체</li>
              <li>디지털/가전</li>
              <li>패션의류</li>
              <li>생활건강</li>
            </ul>
          </div>
          <div
            className="bg-muted/50 rounded-lg p-4
            flex flex-col gap-4"
          >
            <h1 className="text-lg font-semibold">카테고리</h1>

            <ul
              className="text-muted-foreground
              flex flex-col gap-2 [&_li]:hover:cursor-pointer"
            >
              <li>전체</li>
              <li>디지털/가전</li>
              <li>패션의류</li>
              <li>생활건강</li>
            </ul>
          </div>
        </div>
      </section>

      <Separator className="bg-muted-foreground/50 mx-auto max-w-7xl" decorative />

      <section
        className="text-muted-foreground 
        flex items-center gap-8 justify-between text-xs"
      >
        <p>© 2025 youserstack. All rights reserved.</p>

        {/* <ul className="flex items-center gap-4">
          <Link href="" className="hover:underline">
            개인정보
          </Link>
          <Link href="" className="hover:underline">
            이용약관
          </Link>
        </ul> */}

        <ModeToggle />
      </section>
    </footer>
  );
}

function Logo() {
  return (
    <Link className="Logo" href={"/"}>
      <p className="font-semibold uppercase flex gap-1 items-center text-2xl">
        <ShipWheel />
        <span className="hidden sm:block">cooza</span>
      </p>
    </Link>
  );
}

function SocialIcons() {
  return (
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
  );
}
