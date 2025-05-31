import Categories from "@/components/categories";
import GridBanners from "@/components/grid-banners";
import WideBanner from "@/components/wide-banner";
import { CustomCarousel } from "@/components/custom-carousel";
import { appleBanner, blackFridayBanner, cannon, iphones } from "@/data/banners";

export default function Home() {
  return (
    <main>
      <section className="min-h-fit space-y-8">
        <CustomCarousel />
        <Categories />
      </section>

      <WideBanner url={cannon} size={{ width: 1920, height: 500 }} />
      <WideBanner url={iphones} size={{ width: 1920, height: 800 }} />
      <WideBanner url={blackFridayBanner} size={{ width: 1906, height: 711 }} />

      <section className="min-h-fit">
        <GridBanners />
      </section>

      <WideBanner url={appleBanner} size={{ width: 1920, height: 500 }} />
    </main>
  );
}
