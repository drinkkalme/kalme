import { useState } from "react";
import { X, Gift, Sparkles } from "lucide-react";

interface SpinToWinProps {
  onClose: () => void;
}

// Metallic confetti component
const Confetti = () => {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
    size: 4 + Math.random() * 6,
    isBlue: Math.random() > 0.5,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-full animate-confetti-metallic ${
            p.isBlue ? 'bg-primary/60' : 'bg-foreground/30'
          }`}
          style={{
            left: `${p.left}%`,
            top: "-10px",
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export const SpinToWin = ({ onClose }: SpinToWinProps) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-lg mx-6 p-8 glass-metallic rounded-3xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center hover:border-primary/40 transition-all hover:shadow-glow"
        >
          <X size={18} />
        </button>

        {step === "email" && (
          <div className="text-center animate-fade-in">
            <div className="relative inline-block">
              <Gift className="w-12 h-12 mx-auto mb-6 text-primary" />
              <div className="absolute inset-0 blur-xl bg-primary/30 scale-150" />
            </div>
            <h2 className="text-3xl font-serif mb-3">Spin to Win</h2>
            <p className="text-muted-foreground mb-8">
              Enter your email for a chance to win a free sachet.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-6 py-4 glass rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
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
              {/* Glow behind wheel */}
              <div className="absolute inset-0 rounded-full blur-3xl bg-primary/20 scale-110" />
              
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
                      style={{ transform: 'translateY(-90px) rotate(0deg)' }}
                    >
                      {i === 0 ? 'Free Sachet' : i % 2 === 0 ? '10% Off' : '15% Off'}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[20px] border-l-transparent border-r-transparent border-t-primary z-10" />
            </div>
            
            <p className="text-lg text-muted-foreground">Spinning...</p>
          </div>
        )}

        {step === "won" && (
          <div className="text-center py-8 animate-fade-in relative">
            <Confetti />
            
            <div className="relative">
              {/* Animated metallic glow effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full blur-[80px] animate-pulse-metallic"
                style={{
                  background: 'radial-gradient(ellipse at center, hsl(210 80% 55% / 0.4) 0%, hsl(210 70% 45% / 0.2) 50%, transparent 70%)'
                }}
              />
              
              <Sparkles className="w-16 h-16 mx-auto mb-6 text-primary relative z-10" />
            </div>
            
            <h2 className="text-3xl font-serif mb-3">You Won!</h2>
            <p className="text-xl text-foreground mb-2">Free Sachet</p>
            <p className="text-muted-foreground mb-8">
              Your reward has been saved. We'll send you details soon.
            </p>
            
            <button onClick={onClose} className="btn-primary">
              Claim Your Reward
            </button>
            
            {/* Email highlight with glow */}
            <div className="mt-6 px-4 py-2 glass rounded-full inline-block shadow-glow">
              <span className="text-sm text-muted-foreground">
                🎉 Congratulations, <span className="text-primary underline">{email.charAt(0)}***</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
