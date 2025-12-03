import { useState, useEffect, useCallback } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Play, Pause, RotateCcw } from "lucide-react";

type BreathPhase = "inhale" | "hold" | "exhale" | "rest";

const Breathing = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<BreathPhase>("inhale");
  const [counter, setCounter] = useState(4);
  const [cycles, setCycles] = useState(0);

  const phaseConfig = {
    inhale: { duration: 4, next: "hold" as BreathPhase, label: "Breathe In" },
    hold: { duration: 4, next: "exhale" as BreathPhase, label: "Hold" },
    exhale: { duration: 4, next: "rest" as BreathPhase, label: "Breathe Out" },
    rest: { duration: 0, next: "inhale" as BreathPhase, label: "Rest" },
  };

  const resetExercise = useCallback(() => {
    setIsActive(false);
    setPhase("inhale");
    setCounter(4);
    setCycles(0);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          const config = phaseConfig[phase];
          
          if (phase === "exhale") {
            setCycles((c) => c + 1);
          }
          
          const nextPhase = config.next;
          setPhase(nextPhase);
          
          // Skip rest phase for 4-4-4 pattern
          if (nextPhase === "rest") {
            setPhase("inhale");
            return 4;
          }
          
          return phaseConfig[nextPhase].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase]);

  const getCircleScale = () => {
    if (!isActive) return "scale-100";
    switch (phase) {
      case "inhale":
        return "scale-125";
      case "hold":
        return "scale-125";
      case "exhale":
        return "scale-100";
      default:
        return "scale-100";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-40 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-8 opacity-0 animate-fade-in">
            Breathing Rituals
          </p>
          <h1 className="text-5xl md:text-6xl font-serif mb-8 opacity-0 animate-fade-in-up delay-100">
            Find your rhythm
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto opacity-0 animate-fade-in-up delay-200">
            A simple 4-4-4 breathing technique to regulate your nervous system 
            and bring you back to center.
          </p>
        </div>
      </section>

      {/* Breathing Exercise */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Breathing Circle */}
          <div className="relative aspect-square max-w-md mx-auto mb-16">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border border-border/30" />
            
            {/* Animated circle */}
            <div
              className={`absolute inset-8 rounded-full bg-card/50 border border-border/50 flex items-center justify-center transition-transform duration-[4000ms] ease-in-out ${getCircleScale()}`}
            >
              <div className="text-center">
                <p className="text-6xl font-serif mb-2">{counter}</p>
                <p className="text-lg text-muted-foreground tracking-wide">
                  {isActive ? phaseConfig[phase].label : "Ready"}
                </p>
              </div>
            </div>

            {/* Ambient glow */}
            {isActive && (
              <div
                className={`absolute inset-0 rounded-full bg-primary/10 blur-3xl transition-opacity duration-1000 ${
                  phase === "inhale" ? "opacity-100" : "opacity-30"
                }`}
              />
            )}
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setIsActive(!isActive)}
              className="flex items-center gap-3 btn-primary"
            >
              {isActive ? (
                <>
                  <Pause size={20} />
                  Pause
                </>
              ) : (
                <>
                  <Play size={20} />
                  Begin
                </>
              )}
            </button>
            
            <button
              onClick={resetExercise}
              className="btn-secondary flex items-center gap-3"
            >
              <RotateCcw size={20} />
              Reset
            </button>
          </div>

          {/* Cycle Counter */}
          {cycles > 0 && (
            <p className="text-center text-muted-foreground mt-8">
              {cycles} cycle{cycles !== 1 ? "s" : ""} completed
            </p>
          )}
        </div>
      </section>

      {/* Instructions */}
      <section className="py-20 px-6 border-t border-border/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif mb-12 text-center">
            How it works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border/50 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-serif">4</span>
              </div>
              <h3 className="font-serif text-xl mb-2">Inhale</h3>
              <p className="text-sm text-muted-foreground">
                Breathe in slowly through your nose for 4 seconds
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border/50 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-serif">4</span>
              </div>
              <h3 className="font-serif text-xl mb-2">Hold</h3>
              <p className="text-sm text-muted-foreground">
                Hold your breath gently for 4 seconds
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border/50 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-serif">4</span>
              </div>
              <h3 className="font-serif text-xl mb-2">Exhale</h3>
              <p className="text-sm text-muted-foreground">
                Release slowly through your mouth for 4 seconds
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6 bg-card/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-serif mb-8">Why this works</h2>
          <p className="text-muted-foreground leading-relaxed">
            The 4-4-4 breathing pattern activates your parasympathetic nervous system, 
            signaling to your body that it's safe to relax. Regular practice can help 
            reduce anxiety, lower stress hormones, and improve sleep quality. 
            Just a few minutes can shift your entire state.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Breathing;
