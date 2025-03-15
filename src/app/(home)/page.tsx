import Categories from "@/app/(home)/categories";
import GridBanners from "@/app/(home)/grid-banners";
import WideBanner from "@/app/(home)/wide-banner";
import { CustomCarousel } from "@/components/custom/custom-carousel";
import CustomCommand from "@/components/custom/custom-command";
import Image from "next/image";

export default async function Home() {
  return (
    <main>
      <section className="flex justify-center items-center">
        <div className="h-[50vh] /border-2 border-green-500">
          <div>{/* <CustomCommand /> */}</div>
        </div>
      </section>

      {/* <section className="min-h-fit">
        <CustomCarousel />
        <Categories />
      </section> */}

      {/* <WideBanner url={appleBanner} size={{ width: 1920, height: 500 }} /> */}
      {/* <WideBanner url={blackFridayBanner} size={{ width: 1906, height: 711 }} /> */}

      {/* <section className="min-h-fit">
        <GridBanners />
      </section> */}
    </main>
  );
}

const appleBanner =
  "https://res.cloudinary.com/dzktdrw7o/image/upload/v1741652715/cooza/53369NPA-Apple-MAcbookAir-MacStudio-IpadAir-Hero-Desktop-PO-1_87910_gw16rg.webp";
const blackFridayBanner =
  "https://res.cloudinary.com/dzktdrw7o/image/upload/v1741616616/cooza/banner_1109_wrfh4q.jpg";
