import { Link } from "react-router-dom";

export const ComingSoon = () => {
  return (
    <section className="py-40 px-6 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] animate-breathe" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Cinematic Text */}
        <p className="text-sm tracking-[0.4em] text-muted-foreground uppercase mb-8">
          Something is brewing
        </p>

        <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-8 text-gradient">
          Something calm
          <br />
          is coming.
        </h2>

        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-12">
          Our evening beverage is in development. Be the first to experience calm 
          in a cup when we launch.
        </p>

        {/* CTA */}
        <Link
          to="/waitlist"
          className="btn-primary inline-flex items-center gap-3"
        >
          Get Early Access
          <span className="text-foreground/50">→</span>
        </Link>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
};
