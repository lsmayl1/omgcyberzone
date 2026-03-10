import { Header } from "@/components/ui/header";
import { Hero } from "@/components/ui/hero/hero";
import { Kpi } from "@/components/ui/kpi/kpi";
import { MenuSection } from "@/components/ui/menusection/menuSection";
import { PsSection } from "@/components/ui/playstationsection/psSection";
import { PremiumSection } from "@/components/ui/premiumsection/premiumSection";
import { PriceLayout } from "@/components/ui/pricelist/priceLayout";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen  bg-background ">
      <Header />
      <Hero />
      <Kpi />
      <PriceLayout />
      <PsSection />
      <PremiumSection />
      <MenuSection />
    </div>
  );
}
