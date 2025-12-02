import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";

export const EmailPopup = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem("kalme-popup-seen");
      if (!hasSeenPopup) {
        setOpen(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    localStorage.setItem("kalme-popup-seen", "true");
    setOpen(false);
    toast({
      title: "Welcome to Kalmē! 🎉",
      description: "You're on the list! Get ready to receive your free sachet when we launch.",
    });

    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md border-border/50 bg-card/95 backdrop-blur-xl">
        <DialogHeader className="space-y-3">
          <div className="mx-auto w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <DialogTitle className="text-2xl font-serif text-center">
            Join the Calm Revolution
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Be among the first to experience Kalmē. Pre-order now and receive{" "}
            <span className="text-primary font-semibold">one free sachet</span> when we launch our MVP.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-secondary/50 border-border/50 focus:border-primary transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="tel"
              placeholder="Phone number (optional)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-secondary/50 border-border/50 focus:border-primary transition-colors"
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            {isSubmitting ? "Joining..." : "Claim Your Free Sachet"}
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            By joining, you agree to receive updates about Kalmē products and launch details.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
