import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Gift } from "lucide-react";

export const PreOrder = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <Card className="p-12 bg-card/80 backdrop-blur-xl border-border/50 shadow-premium">
          <div className="text-center space-y-8">
            {/* Gift icon */}
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-gold flex items-center justify-center">
              <Gift className="w-10 h-10 text-primary-foreground" />
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-serif font-bold">
                Pre-Order Kalmē Today
              </h2>
              <p className="text-xl text-muted-foreground">
                Join our exclusive pre-order list and receive{" "}
                <span className="text-primary font-semibold">one free sachet</span>{" "}
                when we launch our MVP.
              </p>
            </div>

            {/* Benefits list */}
            <div className="space-y-3 max-w-md mx-auto">
              {[
                "One free sachet with your first order",
                "Early access to new products and flavors",
                "Exclusive launch pricing",
                "Priority shipping on release day",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-left">
                  <div className="w-6 h-6 rounded-full bg-gradient-accent flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-foreground" />
                  </div>
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button 
              size="lg"
              className="bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90 transition-opacity px-12 text-lg h-14"
            >
              Reserve Your Free Sachet
            </Button>

            <p className="text-sm text-muted-foreground">
              Limited spots available. MVP launching Q1 2025.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};
