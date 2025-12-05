import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

const values = [
  { title: "Presence", description: "Being here, now." },
  { title: "Ritual", description: "Intentional daily practices." },
  { title: "Design", description: "Beauty in simplicity." },
  { title: "Simplicity", description: "Less is more." },
  { title: "Science", description: "Evidence-backed ingredients." },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 relative">
        {/* Aurora glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-grey-aurora/25 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-8 opacity-0 animate-fade-in">
            Our Story
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1] mb-8 opacity-0 animate-fade-in-up delay-100">
            We make calm accessible.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl opacity-0 animate-fade-in-up delay-200">
            kalmē was created for people who live fast and feel everything.
          </p>
        </div>
      </section>

      {/* Why We Exist */}
      <section className="py-24 px-6 bg-card/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif mb-8">Why we exist</h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Modern life is designed to keep us wired. Endless notifications, 
              constant stimulation, and a culture that glorifies hustle over rest.
            </p>
            <p>
              By evening, we're too wired to unwind but too tired to do anything meaningful. 
              We scroll, we zone out, we crash — but we rarely feel truly rested.
            </p>
            <p>
              kalmē exists to change that. Not by shutting you down, 
              but by helping you reconnect with yourself.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-4">
              What We Believe
            </p>
            <h2 className="text-3xl md:text-4xl font-serif">Our Philosophy</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="px-6 py-4 bg-card/50 border border-border/50 rounded-2xl text-center opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <h3 className="font-serif text-lg mb-1">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Note */}
      <section className="py-24 px-6 bg-card/20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-8">
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

      {/* CTA */}
      <section className="py-20 px-6">
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
