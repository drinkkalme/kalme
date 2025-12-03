import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

const values = [
  {
    title: "Presence",
    description: "Being here, now. Not lost in yesterday or anxious about tomorrow.",
  },
  {
    title: "Ritual",
    description: "Small, intentional practices that ground us in what matters.",
  },
  {
    title: "Design",
    description: "Beauty in simplicity. Every detail serves a purpose.",
  },
  {
    title: "Honesty",
    description: "No false promises. Just real tools for real calm.",
  },
  {
    title: "Simplicity",
    description: "Less is more. Calm doesn't need to be complicated.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-8 opacity-0 animate-fade-in">
            Our Story
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1] mb-8 opacity-0 animate-fade-in-up delay-100">
            We make calm
            <br />
            <span className="text-muted-foreground">accessible.</span>
          </h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6 border-t border-border/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-serif mb-6">The Beginning</h2>
              <p className="text-muted-foreground leading-relaxed">
                kalmē was created for people who live fast and feel everything. 
                The ones who give their all during the day and struggle to switch off at night.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-serif mb-6">The Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our mission is to make calm accessible — not by shutting you down, 
                but by helping you reconnect with yourself. Real relaxation, not sedation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 px-6 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-6">
              What We Believe
            </p>
            <h2 className="text-4xl md:text-5xl font-serif">Our Values</h2>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center md:text-left">
                <h3 className="text-xl font-serif mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Note */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-8">
            A Note From Us
          </p>
          <blockquote className="text-2xl md:text-3xl font-serif leading-relaxed mb-8 text-muted-foreground">
            "We didn't build kalmē because we had it all figured out. We built it 
            because we needed it. And we thought you might too."
          </blockquote>
          <p className="text-muted-foreground">— The kalmē Team</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-border/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-8">
            Ready to find your calm?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/breathing" className="btn-primary">
              Experience Calm
            </Link>
            <Link to="/waitlist" className="btn-secondary">
              Join Waitlist
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
