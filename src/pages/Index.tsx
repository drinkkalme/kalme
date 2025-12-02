import { EmailPopup } from "@/components/EmailPopup";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Ingredients } from "@/components/Ingredients";
import { IngredientCustomizer } from "@/components/IngredientCustomizer";
import { Benefits } from "@/components/Benefits";
import { PreOrder } from "@/components/PreOrder";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-royal">
      <EmailPopup />
      <Navigation />
      <Hero />
      <Ingredients />
      <IngredientCustomizer />
      <Benefits />
      <PreOrder />
      <Footer />
    </div>
  );
};

export default Index;
