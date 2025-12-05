import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Gift, Sparkles } from "lucide-react";

const Spin = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "spinning" | "won">("email");
  const [rotation, setRotation] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStep("spinning");
      const targetRotation = 1800 + 45;
      setRotation(targetRotation);
      
      setTimeout(() => {
        setStep("won");
      }, 4000);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="pt-40 pb-24 px-6 min-h-[80vh] flex items-center justify-center relative">
        {/* Aurora glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-grey-aurora/30 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-lg mx-auto text-center relative z-10">
          {step === "email" && (
            <div className="animate-fade-in">
              <Gift className="w-16 h-16 mx-auto mb-8 text-foreground/60" />
              <h1 className="text-4xl md:text-5xl font-serif mb-6">Spin to Win</h1>
              <p className="text-xl text-muted-foreground mb-10">
                Enter your email for a chance to win a free kalmē sachet.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 bg-card/50 border border-border/50 rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors"
                  required
                />
                <button type="submit" className="btn-primary w-full">
                  Spin the Wheel
                </button>
              </form>
            </div>
          )}

          {step === "spinning" && (
            <div className="animate-fade-in">
              <div className="relative w-72 h-72 mx-auto mb-10">
                <div 
                  className="spin-wheel"
                  style={{ 
                    transform: `rotate(${rotation}deg)`,
                    transition: 'transform 4s cubic-bezier(0.2, 0.8, 0.3, 1)'
                  }}
                >
                  {[...Array(8)].map((_, i) => (
                    <div 
                      key={i} 
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ transform: `rotate(${i * 45 + 22.5}deg)` }}
                    >
                      <span 
                        className="absolute text-xs font-medium text-foreground/70"
                        style={{ transform: 'translateY(-100px)' }}
                      >
                        {i === 0 ? 'Free Sachet' : i % 2 === 0 ? '10% Off' : '15% Off'}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[24px] border-l-transparent border-r-transparent border-t-foreground z-10" />
              </div>
              
              <p className="text-xl text-muted-foreground">Spinning...</p>
            </div>
          )}

          {step === "won" && (
            <div className="animate-fade-in">
              <div className="relative mb-8">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-grey-aurora/50 rounded-full blur-[60px]" />
                <Sparkles className="w-20 h-20 mx-auto text-foreground relative z-10" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-serif mb-4">You Won!</h1>
              <p className="text-2xl text-foreground mb-2">Free Sachet</p>
              <p className="text-muted-foreground mb-10">
                Your reward has been saved. We'll send you details soon.
              </p>
              
              <div className="px-6 py-3 bg-foreground/5 rounded-full inline-block">
                <span className="text-muted-foreground">
                  🎉 Congratulations, <span className="text-foreground underline">{email.split('@')[0]}***</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Spin;
