import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Components from "@/components/sections/Components";
import Templates from "@/components/sections/Templates";
import Blocks from "@/components/sections/Blocks";
import Pricing from "@/components/sections/Pricing";
import Review from "@/components/sections/Review";
import FAQSection from "@/components/sections/FAQSection";
import { defaultSEO, viewport } from "@/config/site"
import Bento from "@/components/sections/Bento";
import CTA from "@/components/Blog/CTA";

export const metadata = defaultSEO;
export { viewport };

export const dynamic = "force-static";
export const revalidate = 60;

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <Features />
      <Components />
      <Templates />
      <Blocks />
      <Bento />
      <div className="mt-3">
        <Pricing />
      </div>
      {/* <Review /> */}
      {/* <br /> */}
      <FAQSection />
      <CTA />
    </main>
  );
}
