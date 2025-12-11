import { Link } from "react-router-dom";
import { ArrowDown, Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export const Hero = () => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const toggleSound = () => {
    if (!soundEnabled) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      oscillatorRef.current = audioContextRef.current.createOscillator();
      gainNodeRef.current = audioContextRef.current.createGain();
      
      oscillatorRef.current.type = 'sine';
      oscillatorRef.current.frequency.setValueAtTime(80, audioContextRef.current.currentTime);
      gainNodeRef.current.gain.setValueAtTime(0.015, audioContextRef.current.currentTime);
      
      oscillatorRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(audioContextRef.current.destination);
      oscillatorRef.current.start();
      
      setSoundEnabled(true);
    } else {
      if (oscillatorRef.current && audioContextRef.current) {
        oscillatorRef.current.stop();
        audioContextRef.current.close();
      }
      setSoundEnabled(false);
    }
  };

  useEffect(() => {
    return () => {
      if (oscillatorRef.current && audioContextRef.current) {
        oscillatorRef.current.stop();
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Atmospheric Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-background" />
        
        {/* Main aurora glow - metallic blue blend */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[700px] rounded-full blur-[120px] animate-aurora-blue"
          style={{
            background: 'radial-gradient(ellipse at center, hsl(210 80% 55% / 0.25) 0%, hsl(210 70% 45% / 0.1) 40%, hsl(0 0% 25% / 0.15) 60%, transparent 80%)'
          }}
        />
        
        {/* Secondary grey glow */}
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-grey-glow/10 rounded-full blur-[100px] animate-pulse-soft" />
        
        {/* Ambient fog motion */}
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full blur-[80px] animate-ambient-fog"
          style={{
            background: 'radial-gradient(ellipse at center, hsl(210 60% 50% / 0.1) 0%, transparent 70%)'
          }}
        />
        
        {/* Bottom transition glow */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      {/* Top Micro-Line */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in delay-100">
        <div className="relative flex items-center gap-3 text-xs tracking-[0.25em] text-muted-foreground uppercase">
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-primary/40" />
          <span className="relative">
            A new way to unwind
            <div className="absolute inset-0 -z-10 blur-xl bg-primary/20 scale-150" />
          </span>
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-primary/40" />
        </div>
      </div>

      {/* Sound Toggle */}
      <button
        onClick={toggleSound}
        className={`absolute top-28 right-6 lg:right-12 sound-toggle opacity-0 animate-fade-in delay-200 ${soundEnabled ? 'active' : ''}`}
        aria-label={soundEnabled ? "Disable ambient sound" : "Enable ambient sound"}
      >
        {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Main Heading with glow behind */}
        <div className="relative">
          <div className="absolute inset-0 -z-10 blur-3xl scale-110"
            style={{
              background: 'radial-gradient(ellipse at center, hsl(210 80% 55% / 0.15) 0%, hsl(0 0% 30% / 0.1) 50%, transparent 70%)'
            }}
          />
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.05] mb-6 opacity-0 animate-fade-in-up delay-200">
            For the Evenings
            <br />
            That Need Softening
          </h1>
        </div>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 opacity-0 animate-fade-in-up delay-300">
          Unwind without switching off.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 animate-fade-in-up delay-400">
          <Link to="/waitlist" className="btn-primary">
            Join the Waitlist
          </Link>
          <Link to="/spin" className="btn-secondary">
            Spin to Win
          </Link>
        </div>

        {/* Tertiary CTA */}
        <div className="mt-6 opacity-0 animate-fade-in-up delay-500">
          <span className="text-sm text-muted-foreground">
            Pre-order Coming Soon
          </span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in delay-600">
        <a
          href="#ingredients"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-xs tracking-[0.2em] uppercase">Discover</span>
          <ArrowDown size={16} className="animate-float" />
        </a>
      </div>
    </section>
  );
};
