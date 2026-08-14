import { About } from "@/components/ui/about";
import { FAQ } from "@/components/ui/faq";
import { Gallery } from "@/components/ui/gallery";
import { Games } from "@/components/ui/games";
import { Hero } from "@/components/ui/hero/hero";
import { MenuSection } from "@/components/ui/menusection/menuSection";
import { Reveal } from "@/components/ui/reveal";
import { Rooms } from "@/components/ui/rooms";
import { FaqJsonLd } from "@/components/seo/jsonLd";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);

  return (
    <div className="flex flex-col min-h-screen w-full  bg-background no-scrollbar ">
      <FaqJsonLd t={t} />
      {/* Hero is deliberately not wrapped: it runs its own staged load
          animation, and it owns the BookModal, which must not be trapped
          inside an animated transform. */}
      <Hero />
      <Reveal>
        <About t={t} />
      </Reveal>
      <Reveal>
        <Rooms />
      </Reveal>
      <Reveal>
        <Games />
      </Reveal>
      <Reveal>
        <MenuSection />
      </Reveal>
      <Reveal>
        <Gallery t={t} />
      </Reveal>
      <Reveal>
        <FAQ />
      </Reveal>
    </div>
  );
}
