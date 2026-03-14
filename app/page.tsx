import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";
import { Hero } from "@/components/ui/hero/hero";
import { Kpi } from "@/components/ui/kpi/kpi";
import { MenuSection } from "@/components/ui/menusection/menuSection";
import { PsSection } from "@/components/ui/playstationsection/psSection";
import { PremiumSection } from "@/components/ui/premiumsection/premiumSection";
import { PriceLayout } from "@/components/ui/pricelist/priceLayout";
import { Rooms } from "@/components/ui/rooms";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full  bg-background no-scrollbar ">
      <Header />
      <Hero />
      <Kpi />
      <Rooms />
      {/* <PriceLayout /> */}
      {/* <PsSection />
      <PremiumSection /> */}
      <MenuSection />
      <Footer />
    </div>
  );
}
