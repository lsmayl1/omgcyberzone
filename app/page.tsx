import { Header } from "@/components/ui/header";
import { Hero } from "@/components/ui/hero/hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen  bg-background ">
      <Header />
      <Hero />
    </div>
  );
}
