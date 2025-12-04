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
      // Create ambient hum
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      oscillatorRef.current = audioContextRef.current.createOscillator();
      gainNodeRef.current = audioContextRef.current.createGain();
      
      oscillatorRef.current.type = 'sine';
      oscillatorRef.current.frequency.setValueAtTime(110, audioContextRef.current.currentTime);
      gainNodeRef.current.gain.setValueAtTime(0.02, audioContextRef.current.currentTime);
      
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay">
      {/* Ambient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 gradient-navy-radial" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full gradient-blue-glow animate-breathe-circle opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] animate-pulse-soft" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Pre-order Badge */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in delay-100">
        <div className="flex items-center gap-2 text-xs tracking-[0.2em] text-primary uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Pre-orders opening soon
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
        {/* Tagline */}
        <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-8 opacity-0 animate-fade-in delay-200">
          Evening Wellness, Reimagined
        </p>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.1] mb-6 opacity-0 animate-fade-in-up delay-300">
          Find Your
          <br />
          <span className="text-gradient-blue">Calm</span>
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12 opacity-0 animate-fade-in-up delay-400">
          Premium calming beverages crafted with science-backed ingredients.
          <br className="hidden md:block" />
          Designed to help you unwind without switching off.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 animate-fade-in-up delay-500">
          <Link to="/waitlist" className="btn-primary">
            Pre-order Now
          </Link>
          <Link to="/waitlist" className="btn-secondary">
            Join the Waitlist
          </Link>
        </div>

        {/* Tertiary CTA */}
        <div className="mt-8 opacity-0 animate-fade-in-up delay-600">
          <Link
            to="/studio"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            Explore the kalmē Studio
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in delay-700">
        <a
          href="#story"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-xs tracking-[0.2em] uppercase">Discover</span>
          <ArrowDown size={16} className="animate-float" />
        </a>
      </div>
    </section>
  );
};