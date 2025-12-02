import { Card } from "@/components/ui/card";
import { Moon, Zap, Shield, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: Moon,
    title: "Better Sleep",
    description: "Fall asleep faster and wake up refreshed with our blend of calming ingredients.",
  },
  {
    icon: Zap,
    title: "Reduced Stress",
    description: "Combat daily stress and anxiety naturally without drowsiness or side effects.",
  },
  {
    icon: Shield,
    title: "Enhanced Focus",
    description: "Stay calm and focused throughout your day with L-theanine's unique properties.",
  },
  {
    icon: Sparkles,
    title: "Gut Health",
    description: "Support your digestive system and overall wellness with prebiotic fiber.",
  },
];

export const Benefits = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-5xl md:text-6xl font-serif font-bold">
            Why Choose
            <span className="block bg-gradient-blue bg-clip-text text-transparent">
              Kalmē?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the transformative power of natural relaxation with every sip.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, idx) => (
            <Card 
              key={idx}
              className="p-6 bg-card/30 backdrop-blur-sm border-border/50 hover:bg-card/50 hover:border-primary/50 transition-all duration-300 text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                <benefit.icon className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
