import Categories from "@/components/categories";
import GridBanners from "@/components/sections/grid-banners";
import WideBanner from "@/components/sections/wide-banner";
import { CustomCarousel } from "@/components/custom-carousel";
import { iphones } from "@/data/banners";

export default function Home() {
  return (
    <main>
      <CustomCarousel />
      <Categories />
      <WideBanner src={iphones} width={1920} height={800} className="max-w-6xl" />
      <GridBanners />
    </main>
  );
}
