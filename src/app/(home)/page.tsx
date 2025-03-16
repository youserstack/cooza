import Categories from "@/app/(home)/categories";
import GridBanners from "@/app/(home)/grid-banners";
import WideBanner from "@/app/(home)/wide-banner";
import { CustomCarousel } from "@/components/custom/custom-carousel";
import Image from "next/image";

export default async function Home() {
  return (
    <main>
      <section className="min-h-fit">
        <CustomCarousel />
        <Categories />
      </section>

      <WideBanner url={cannon} size={{ width: 1920, height: 500 }} />
      {/* <WideBanner url={expo} size={{ width: 1920, height: 800 }} /> */}
      {/* <WideBanner url={iphones} size={{ width: 1920, height: 800 }} /> */}
      {/* <WideBanner url={blackFridayBanner} size={{ width: 1906, height: 711 }} /> */}

      <section className="min-h-fit">
        <GridBanners />
      </section>

      <WideBanner url={appleBanner} size={{ width: 1920, height: 500 }} />
    </main>
  );
}

const appleBanner =
  "https://res.cloudinary.com/dzktdrw7o/image/upload/v1741652715/cooza/53369NPA-Apple-MAcbookAir-MacStudio-IpadAir-Hero-Desktop-PO-1_87910_gw16rg.webp";
const blackFridayBanner =
  "https://res.cloudinary.com/dzktdrw7o/image/upload/v1741616616/cooza/banner_1109_wrfh4q.jpg";
const iphones =
  "https://res.cloudinary.com/dzktdrw7o/image/upload/v1742049744/cooza/Apple-iPhone-15-promo-banner-buy-now-1920x800_o7czed.jpg";
const expo =
  "https://res.cloudinary.com/dzktdrw7o/image/upload/v1741652201/cooza/BHUX-26570-BILD2025_homepage_yfcqeg.jpg";
const cannon =
  "https://res.cloudinary.com/dzktdrw7o/image/upload/v1741652715/cooza/53369Canon_March_Cine_Savings-Hero-Desktop_67068_mceuro.webp";
