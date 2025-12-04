import { Link } from "react-router-dom";
import { Wind, Coffee, Moon, Sparkles } from "lucide-react";

const ritualSteps = [
  {
    icon: Wind,
    step: "01",
    title: "Start a breathing cycle",
    description: "Begin with 4-4-4 breathing to signal your body it's time to unwind.",
  },
  {
    icon: Coffee,
    step: "02",
    title: "Drink kalmē",
    description: "Enjoy your evening beverage — warm or cold, your ritual.",
  },
  {
    icon: Moon,
    step: "03",
    title: "2-minute decompression",
    description: "A micro-meditation or journaling prompt to release the day.",
  },
  {
    icon: Sparkles,
    step: "04",
    title: "Sleep softer",
    description: "Drift off with a calm mind and relaxed body.",
  },
];

export const EveningRitualSection = () => {
  return (
    <section className="py-32 px-6 relative bg-card/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-sm tracking-[0.3em] text-primary uppercase mb-6">
            Your Evening Ritual
          </p>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            How kalmē fits into your night
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A simple, repeatable ritual that transforms your evenings from wired to restful.
          </p>
        </div>

        {/* Ritual Steps */}
        <div className="grid md:grid-cols-4 gap-8">
          {ritualSteps.map((ritual, index) => (
            <div key={index} className="text-center group">
              {/* Step Number & Icon */}
              <div className="relative mb-8">
                <div className="w-20 h-20 mx-auto rounded-full bg-card border border-border/50 flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/5 transition-all duration-500">
                  <ritual.icon size={28} className="text-primary/70 group-hover:text-primary transition-colors" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary">
                  {ritual.step}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-lg font-serif mb-3">{ritual.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {ritual.description}
              </p>

              {/* Connector Line */}
              {index < ritualSteps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-border to-transparent" />
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link to="/studio" className="btn-secondary inline-flex items-center gap-2">
            Explore the Experience
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};