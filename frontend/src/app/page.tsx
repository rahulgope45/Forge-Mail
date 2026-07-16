import Image from "next/image";
import GetStartedButton from "./Component/getStarted";
import Hero from "./Component/Hero";
import WhyUs from "./Component/WhyUs";
import Pricing from "./Component/Pricing";
import Footer from "./Component/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-8">
        <span className="text-xl font-medium tracking-tight text-neutral-900">
          mailforge
        </span>
      </header>

      <main>
        <Hero />
        <WhyUs />
        <Pricing />
      </main>

      <Footer />
    </div>
  );
}
