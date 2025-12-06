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

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    toast({
      title: "You're on the list!",
      description: "We'll notify you when kalmē launches.",
    });

    setIsSubmitting(false);
  };

  return (
    <section className="py-20 px-6 relative">
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-grey-aurora/20 blur-[100px] animate-breathe" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="glass p-10 md:p-12 rounded-2xl text-center">
          {!isSubmitted ? (
            <>
              <h2 className="text-3xl md:text-4xl font-serif mb-3">
                Be the first to taste calm.
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Join our waitlist for exclusive early access.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-card/50 border border-border px-5 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors rounded-full"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary whitespace-nowrap disabled:opacity-50"
                >
                  {isSubmitting ? "Joining..." : "Join Waitlist"}
                </button>
              </form>

              <p className="text-xs text-muted-foreground mt-5">
                Early supporters get exclusive pre-order access.
              </p>
            </>
          ) : (
            <div className="py-6">
              <div className="w-14 h-14 rounded-full bg-foreground/10 flex items-center justify-center mx-auto mb-5">
                <Check size={24} className="text-foreground/70" />
              </div>
              <h2 className="text-2xl font-serif mb-3">You're in!</h2>
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
