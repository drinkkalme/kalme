import { Link } from "react-router-dom";
import { Wind, Coffee, Sparkles } from "lucide-react";

const offerings = [
  {
    icon: Wind,
    title: "Breathing Rituals",
    description:
      "Guided animations to regulate your nervous system. Simple practices that take you from wired to calm in minutes.",
    link: "/breathing",
    linkText: "Try a ritual",
  },
  {
    icon: Coffee,
    title: "Evening Beverage",
    description:
      "A calm-supporting formula created for everyday use. Designed to help you wind down without sedation.",
    link: "/waitlist",
    linkText: "Coming soon",
    comingSoon: true,
  },
  {
    icon: Sparkles,
    title: "Digital Calm Tools",
    description:
      "Micro-practices for stress and anxiety. Bite-sized exercises you can do anywhere, anytime.",
    link: "/breathing",
    linkText: "Explore tools",
  },
];

export const WhatWeOffer = () => {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-6">
            What We Offer
          </p>
          <h2 className="text-4xl md:text-5xl font-serif">
            Tools for your evening ritual
          </h2>
        </div>

        {/* Offerings Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {offerings.map((offering, index) => (
            <div
              key={index}
              className="group p-8 lg:p-10 bg-card/50 border border-border/50 hover:border-border transition-all duration-500 hover-lift"
            >
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center mb-8 text-foreground/80 group-hover:text-foreground transition-colors">
                <offering.icon size={28} strokeWidth={1.5} />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-serif mb-4 flex items-center gap-3">
                {offering.title}
                {offering.comingSoon && (
                  <span className="text-xs tracking-wider text-muted-foreground bg-muted px-2 py-1">
                    SOON
                  </span>
                )}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-8">
                {offering.description}
              </p>

              {/* Link */}
              <Link
                to={offering.link}
                className="inline-flex items-center text-sm tracking-wide text-foreground/70 hover:text-foreground transition-colors group/link"
              >
                {offering.linkText}
                <span className="ml-2 group-hover/link:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
