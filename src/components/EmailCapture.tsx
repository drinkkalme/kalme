import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";

export const EmailCapture = () => {
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
    <section className="py-32 px-6 relative">
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full gradient-blue-glow opacity-20 animate-breathe" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="glass p-12 md:p-16 rounded-2xl text-center">
          {!isSubmitted ? (
            <>
              <p className="text-sm tracking-[0.3em] text-primary uppercase mb-6">
                Early Access
              </p>
              <h2 className="text-4xl md:text-5xl font-serif mb-4">
                Be the first to taste calm.
              </h2>
              <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
                Join our waitlist for exclusive pre-order access and special perks 
                for early supporters.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-card/50 border border-border px-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors rounded-lg"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary whitespace-nowrap disabled:opacity-50 rounded-lg"
                >
                  {isSubmitting ? "Joining..." : "Join Waitlist"}
                </button>
              </form>

              <p className="text-xs text-muted-foreground mt-6">
                Early supporters get exclusive pre-order access.
              </p>
            </>
          ) : (
            <div className="py-8">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                <Check size={28} className="text-primary" />
              </div>
              <h2 className="text-3xl font-serif mb-4">You're in!</h2>
              <p className="text-muted-foreground">
                We'll be in touch soon with exclusive access.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};