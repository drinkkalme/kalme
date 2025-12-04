import { Link } from "react-router-dom";

export const WhySection = () => {
  return (
    <section id="story" className="py-32 px-6 relative wave-bg">
      <div className="max-w-5xl mx-auto">
        {/* Section Label */}
        <p className="text-sm tracking-[0.3em] text-primary uppercase mb-8 opacity-0 animate-fade-in">
          Why kalmē exists
        </p>

        {/* Main Story */}
        <div className="space-y-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.2] text-gradient">
            Life feels loud.
          </h2>
          
          <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed max-w-3xl">
            We created kalmē for the moments you want to slow down — not sleep. 
            To relax without switching off. To feel present again.
          </p>

          <div className="grid md:grid-cols-2 gap-8 pt-8">
            <p className="text-lg text-muted-foreground leading-relaxed">
              In a world that glorifies constant productivity and endless stimulation, 
              we believe there's power in stillness. Not the kind that makes you feel lazy, 
              but the kind that makes you feel whole.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              kalmē is for people who live fast and feel everything. We're building tools 
              that help you reconnect with yourself — through ritual, through breath, 
              through taste.
            </p>
          </div>
        </div>

        {/* Founder Touch */}
        <div className="mt-20 pt-12 border-t border-border/30">
          <blockquote className="text-lg italic text-muted-foreground max-w-2xl">
            "We didn't build kalmē because we had it all figured out. We built it 
            because we needed it ourselves. And we thought you might too."
          </blockquote>
          <p className="mt-4 text-sm text-muted-foreground/70">— The kalmē Team</p>
        </div>

        {/* CTA */}
        <div className="mt-12">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors group"
          >
            Read our full story
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};