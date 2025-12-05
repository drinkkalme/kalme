import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { WhySection } from "@/components/WhySection";
import { IngredientsSection } from "@/components/IngredientsSection";
import { EmailCapture } from "@/components/EmailCapture";
import { FAQ } from "@/components/FAQ";
import { StudioPreview } from "@/components/StudioPreview";
import { SachetTeaser } from "@/components/SachetTeaser";
import { Footer } from "@/components/Footer";
import { SpinToWin } from "@/components/SpinToWin";
import { FloatingBar } from "@/components/FloatingBar";

const Index = () => {
  const [showSpinPopup, setShowSpinPopup] = useState(false);
  const [hasSeenPopup, setHasSeenPopup] = useState(false);

  useEffect(() => {
    // Show popup on first visit after 3 seconds
    const hasVisited = localStorage.getItem("kalme-visited");
    if (!hasVisited && !hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowSpinPopup(true);
        setHasSeenPopup(true);
        localStorage.setItem("kalme-visited", "true");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [hasSeenPopup]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <WhySection />
      <IngredientsSection />
      <EmailCapture />
      <FAQ />
      <StudioPreview />
      <SachetTeaser />
      <Footer />
      
      {showSpinPopup && (
        <SpinToWin onClose={() => setShowSpinPopup(false)} />
      )}
      
      <FloatingBar onSpinClick={() => setShowSpinPopup(true)} />
    </div>
  );
};

export default Index;
