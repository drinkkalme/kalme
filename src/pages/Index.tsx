import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { WhySection } from "@/components/WhySection";
import { IngredientsSection } from "@/components/IngredientsSection";
import { EveningRitualSection } from "@/components/EveningRitualSection";
import { StudioPreview } from "@/components/StudioPreview";
import { SachetTeaser } from "@/components/SachetTeaser";
import { EmailCapture } from "@/components/EmailCapture";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <WhySection />
      <IngredientsSection />
      <EveningRitualSection />
      <StudioPreview />
      <SachetTeaser />
      <EmailCapture />
      <Footer />
    </div>
  );
};

export default Index;