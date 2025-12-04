import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  "Exclusive pre-order access",
  "Early supporter pricing",
  "Free sachet sample",
  "First access to custom blends",
];

const Waitlist = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    toast({
      title: "You're on the list!",
      description: "We'll notify you when kalmē launches.",
    });

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="min-h-screen flex items-center justify-center px-6 pt-20 pb-12">
        <div className="max-w-xl mx-auto text-center">
          {!isSubmitted ? (
            <>
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-8 animate-pulse-glow opacity-0 animate-fade-in">
                <Sparkles size={28} className="text-primary" />
              </div>

              <p className="text-sm tracking-[0.3em] text-primary uppercase mb-6 opacity-0 animate-fade-in delay-100">
                Pre-order & Early Access
              </p>
              
              <h1 className="text-5xl md:text-6xl font-serif mb-6 opacity-0 animate-fade-in-up delay-200">
                Join the
                <br />
                <span className="text-gradient-blue">waitlist.</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 opacity-0 animate-fade-in-up delay-300">
                Be the first to experience kalmē. Early supporters get exclusive 
                access and special perks.
              </p>

              {/* Benefits */}
              <div className="grid grid-cols-2 gap-3 mb-10 opacity-0 animate-fade-in-up delay-400">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check size={14} className="text-primary flex-shrink-0" />
                    {benefit}
                  </div>
                ))}
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up delay-500"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-card/50 border border-border px-6 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors rounded-lg"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary whitespace-nowrap disabled:opacity-50 rounded-lg"
                >
                  {isSubmitting ? "Joining..." : "Pre-order Now"}
                </button>
              </form>

              <p className="text-xs text-muted-foreground mt-6 opacity-0 animate-fade-in-up delay-600">
                No spam. Just calm. Unsubscribe anytime.
              </p>
            </>
          ) : (
            <div className="animate-fade-in-up">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-8">
                <Check size={36} className="text-primary" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-serif mb-6">
                You're in.
              </h1>
              
              <p className="text-lg text-muted-foreground mb-4">
                Welcome to the kalmē community.
              </p>
              <p className="text-muted-foreground mb-10">
                We'll be in touch soon with exclusive access. 
                In the meantime, take a breath.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/studio" className="btn-primary">
                  Try the Studio
                </Link>
                <Link to="/builder" className="btn-secondary">
                  Build Your Blend
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Waitlist;