export const WhySection = () => {
  return (
    <section id="why" className="py-32 px-6 relative wave-bg">
      <div className="max-w-4xl mx-auto">
        {/* Section Label */}
        <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-8">
          Why kalmē exists
        </p>

        {/* Main Story */}
        <div className="space-y-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.2]">
            Life feels loud.
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
            We built kalmē for the moments you want to pause — not sleep. 
            To feel present, not numb. To relax without checking out.
          </p>

          <p className="text-lg text-muted-foreground/80 leading-relaxed max-w-3xl">
            In a world that glorifies constant productivity and endless stimulation, 
            we believe there's power in stillness. Not the kind that makes you feel lazy, 
            but the kind that makes you feel whole.
          </p>
        </div>

        {/* Decorative Line */}
        <div className="mt-20 h-px bg-gradient-to-r from-border via-border/50 to-transparent max-w-md" />
      </div>
    </section>
  );
};
