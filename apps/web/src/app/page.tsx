import Footer from "@/components/footer";
import Community from "@/sections/community";
import Faq from "@/sections/faq";
import Features from "@/sections/features";
import Header from "@/sections/header";
import Pricing from "@/sections/pricing";
import { BuLogo } from "@bu/ui/bu-logo";

export default function Home() {
  return (
    <>
      <BuLogo logo="/logo.png" text="bu.fi" width={50} height={50} />
      <Header />
      <Features />
      <Community />
      <Faq />
      <Pricing />
      <Footer />
    </>
  );
}
