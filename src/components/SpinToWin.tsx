import { useState, useEffect } from "react";
import { X, Gift, Sparkles } from "lucide-react";

interface SpinToWinProps {
  onClose: () => void;
}

export const SpinToWin = ({ onClose }: SpinToWinProps) => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "spinning" | "won">("email");
  const [rotation, setRotation] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStep("spinning");
      // Spin to land on "Free Sachet" (specific rotation)
      const targetRotation = 1800 + 45; // 5 full rotations + offset to land on prize
      setRotation(targetRotation);
      
      setTimeout(() => {
        setStep("won");
      }, 4000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-lg animate-fade-in">
      <div className="relative w-full max-w-lg mx-6 p-8 bg-card border border-border/50 rounded-3xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/50 border border-border/50 flex items-center justify-center hover:border-foreground/30 transition-colors"
        >
          <X size={18} />
        </button>

        {step === "email" && (
          <div className="text-center animate-fade-in">
            <Gift className="w-12 h-12 mx-auto mb-6 text-foreground/60" />
            <h2 className="text-3xl font-serif mb-4">Spin to Win</h2>
            <p className="text-muted-foreground mb-8">
              Enter your email for a chance to win a free kalmē sachet.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-6 py-4 bg-background border border-border/50 rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors"
                required
              />
              <button type="submit" className="btn-primary w-full">
                Spin the Wheel
              </button>
            </form>
          </div>
        )}

        {step === "spinning" && (
          <div className="text-center py-8 animate-fade-in">
            <div className="relative w-64 h-64 mx-auto mb-8">
              {/* Wheel */}
              <div 
                className="spin-wheel"
                style={{ 
                  transform: `rotate(${rotation}deg)`,
                  transition: 'transform 4s cubic-bezier(0.2, 0.8, 0.3, 1)'
                }}
              >
                {/* Segments */}
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ transform: `rotate(${i * 45 + 22.5}deg)` }}
                  >
                    <span 
                      className="absolute text-xs font-medium text-foreground/70"
                      style={{ transform: 'translateY(-90px) rotate(0deg)' }}
                    >
                      {i === 0 ? 'Free Sachet' : i % 2 === 0 ? '10% Off' : '15% Off'}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Pointer */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[20px] border-l-transparent border-r-transparent border-t-foreground z-10" />
            </div>
            
            <p className="text-lg text-muted-foreground">Spinning...</p>
          </div>
        )}

        {step === "won" && (
          <div className="text-center py-8 animate-fade-in">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-grey-aurora/40 rounded-full blur-[60px]" />
              
              <Sparkles className="w-16 h-16 mx-auto mb-6 text-foreground relative z-10" />
            </div>
            
            <h2 className="text-3xl font-serif mb-4">You Won!</h2>
            <p className="text-xl text-foreground mb-2">Free Sachet</p>
            <p className="text-muted-foreground mb-8">
              Your reward has been saved. We'll send you details soon.
            </p>
            
            <button onClick={onClose} className="btn-primary">
              Claim Your Reward
            </button>
            
            <div className="mt-6 px-4 py-2 bg-foreground/5 rounded-full inline-block">
              <span className="text-sm text-muted-foreground">
                🎉 Congratulations, <span className="text-foreground underline">{email.charAt(0)}***</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
