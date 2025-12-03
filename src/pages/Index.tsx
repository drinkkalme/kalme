import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { WhySection } from "@/components/WhySection";
import { WhatWeOffer } from "@/components/WhatWeOffer";
import { ComingSoon } from "@/components/ComingSoon";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <WhySection />
      <WhatWeOffer />
      <ComingSoon />
      <Footer />
    </div>
  );
};

export default Index;
