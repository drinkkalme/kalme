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
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm tracking-[0.3em] text-primary uppercase mb-8 opacity-0 animate-fade-in">
            Our Story
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1] mb-8 opacity-0 animate-fade-in-up delay-100">
            We make calm
            <br />
            <span className="text-muted-foreground">accessible.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl opacity-0 animate-fade-in-up delay-200">
            kalmē was created for people who live fast and feel everything. 
            The ones who give their all during the day and struggle to switch off at night.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-6 bg-card/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-serif mb-6">The Problem</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Modern life is designed to keep us wired. Endless notifications, 
                constant stimulation, and a culture that glorifies hustle over rest.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By evening, we're too wired to unwind but too tired to do anything meaningful. 
                We scroll, we zone out, we crash — but we rarely feel truly rested.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-serif mb-6">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                kalmē exists to change that. Our mission is to make calm accessible — 
                not by shutting you down, but by helping you reconnect with yourself.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We're building tools that help you wind down with intention: 
                through ritual, through breath, through taste. Real relaxation, not sedation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Evenings Matter */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm tracking-[0.3em] text-primary uppercase mb-6">
            The Evening Philosophy
          </p>
          <h2 className="text-4xl md:text-5xl font-serif mb-8">
            Why evenings matter
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              The transition between day and night is sacred. It's the moment 
              where we leave behind who we had to be and return to who we are.
            </p>
            <p>
              But most of us skip this transition entirely. We go from deadline 
              to dinner to doom-scrolling to sleep. No pause. No presence. No ritual.
            </p>
            <p>
              kalmē is built for this in-between space. The golden hour between 
              productivity and rest. The moment you finally have permission to just… be.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] text-primary uppercase mb-6">
              What We Believe
            </p>
            <h2 className="text-4xl md:text-5xl font-serif">Our Values</h2>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center md:text-left">
                <h3 className="text-xl font-serif mb-3 text-primary">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Note */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm tracking-[0.3em] text-primary uppercase mb-8">
            A Note From Us
          </p>
          <blockquote className="text-2xl md:text-3xl font-serif leading-relaxed mb-8 text-foreground/80 italic">
            "We didn't build kalmē because we had it all figured out. We built it 
            because we needed it. Late nights, racing minds, that feeling of being 
            tired but wired. We thought you might know it too."
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
            <Link to="/studio" className="btn-primary">
              Explore the Studio
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