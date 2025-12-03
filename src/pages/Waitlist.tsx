import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";

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
      title: "You're on the list",
      description: "We'll notify you when kalmē launches.",
    });

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-xl mx-auto text-center">
          {!isSubmitted ? (
            <>
              <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-8 opacity-0 animate-fade-in">
                Early Access
              </p>
              
              <h1 className="text-5xl md:text-6xl font-serif mb-8 opacity-0 animate-fade-in-up delay-100">
                Join the
                <br />
                <span className="text-muted-foreground">waitlist.</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-12 opacity-0 animate-fade-in-up delay-200">
                Be the first to know when our evening beverage launches. 
                Early supporters get exclusive access and special perks.
              </p>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up delay-300"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent border border-border px-6 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary whitespace-nowrap disabled:opacity-50"
                >
                  {isSubmitting ? "Joining..." : "Join Waitlist"}
                </button>
              </form>

              <p className="text-sm text-muted-foreground mt-6 opacity-0 animate-fade-in-up delay-400">
                No spam. Just calm.
              </p>
            </>
          ) : (
            <div className="animate-fade-in-up">
              <div className="w-20 h-20 rounded-full bg-card border border-border/50 flex items-center justify-center mx-auto mb-8">
                <Check size={32} className="text-foreground" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-serif mb-6">
                You're in.
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8">
                We'll be in touch soon. In the meantime, take a breath.
              </p>
              
              <a
                href="/breathing"
                className="btn-secondary inline-block"
              >
                Try a breathing exercise
              </a>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Waitlist;
