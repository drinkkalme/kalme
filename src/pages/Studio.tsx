import { useState, useEffect, useCallback, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CursorHalo } from "@/components/CursorHalo";
import { Wind, Waves, BookOpen, Timer, PenTool, Play, Pause, RotateCcw, VolumeX, RefreshCw, X, Copy, Check } from "lucide-react";

type BreathPattern = {
  name: string;
  inhale: number;
  hold: number;
  exhale: number;
  holdAfter?: number;
  description: string;
};

const breathPatterns: BreathPattern[] = [
  { name: "4-4-4-4 Box", inhale: 4, hold: 4, exhale: 4, holdAfter: 4, description: "Classic box breathing" },
  { name: "4-7-8 Relaxing", inhale: 4, hold: 7, exhale: 8, description: "Deep relaxation" },
  { name: "2.5-2.5-2.5", inhale: 2.5, hold: 2.5, exhale: 2.5, description: "Quick rhythmic calm" },
  { name: "30s Reset", inhale: 2, hold: 0, exhale: 4, description: "Fast anxiety reset" },
];

// Distinct noise configurations
const noiseLibrary = [
  { name: "Green Noise", frequency: 500, type: "green" },
  { name: "Pink Noise", frequency: 250, type: "pink" },
  { name: "Brown Noise", frequency: 80, type: "brown" },
  { name: "Rain", frequency: 400, type: "rain" },
  { name: "Wind", frequency: 150, type: "wind" },
  { name: "Ocean", frequency: 200, type: "ocean" },
  { name: "Night", frequency: 120, type: "night" },
];

const journalPrompts = [
  "One thing from today I'm releasing…",
  "What made my shoulders tense today?",
  "A small win I nearly missed…",
  "What do I need to hear right now?",
  "If I could tell my morning self one thing…",
  "The kindest thing someone did for me recently…",
  "What am I grateful for in this moment?",
  "A boundary I need to set…",
  "What would make tomorrow easier?",
  "Something I've been avoiding thinking about…",
];

const microMeditations = [
  {
    title: "60-Second Reset",
    duration: "1 min",
    content: "Close your eyes. Take three deep breaths. Feel your feet on the ground. You are here. You are safe. You are exactly where you need to be.",
    steps: ["Close your eyes", "Three deep breaths", "Feel grounded"]
  },
  {
    title: "Overwhelmed",
    duration: "2 min",
    content: "Name 5 things you see. 4 you can touch. 3 you hear. 2 you smell. 1 you taste. You've returned to the present.",
    steps: ["5 things you see", "4 you can touch", "3 you hear", "2 you smell", "1 you taste"]
  },
  {
    title: "Before Bed",
    duration: "3 min",
    content: "Scan your body from head to toe. Where are you holding tension? Breathe into that space. Let it rest now.",
    steps: ["Scan head to toe", "Find tension", "Breathe into it", "Release"]
  },
];

type BreathPhase = "inhale" | "hold" | "exhale" | "holdAfter" | "ready";

const Studio = () => {
  const [activeTab, setActiveTab] = useState<"breathing" | "noise" | "journal" | "meditation" | "freewriter">("breathing");
  
  // Breathing state
  const [selectedPattern, setSelectedPattern] = useState<BreathPattern>(breathPatterns[0]);
  const [isBreathing, setIsBreathing] = useState(false);
  const [phase, setPhase] = useState<BreathPhase>("ready");
  const [counter, setCounter] = useState(0);
  const [cycles, setCycles] = useState(0);
  
  // Noise state
  const [playingNoise, setPlayingNoise] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  
  // Journal state
  const [currentPrompt, setCurrentPrompt] = useState(journalPrompts[0]);
  
  // FreeWriter state
  const [freeWriterText, setFreeWriterText] = useState("");
  const [freeWriterTime, setFreeWriterTime] = useState(300);
  const [freeWriterActive, setFreeWriterActive] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Meditation modal
  const [selectedMeditation, setSelectedMeditation] = useState<typeof microMeditations[0] | null>(null);

  // Breathing logic
  const resetBreathing = useCallback(() => {
    setIsBreathing(false);
    setPhase("ready");
    setCounter(0);
    setCycles(0);
  }, []);

  useEffect(() => {
    if (!isBreathing) return;

    const pattern = selectedPattern;
    
    if (phase === "ready") {
      setPhase("inhale");
      setCounter(pattern.inhale);
      return;
    }

    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 0.1) {
          if (phase === "inhale") {
            if (pattern.hold > 0) {
              setPhase("hold");
              return pattern.hold;
            } else {
              setPhase("exhale");
              return pattern.exhale;
            }
          } else if (phase === "hold") {
            setPhase("exhale");
            return pattern.exhale;
          } else if (phase === "exhale") {
            if (pattern.holdAfter && pattern.holdAfter > 0) {
              setPhase("holdAfter");
              return pattern.holdAfter;
            } else {
              setCycles((c) => c + 1);
              setPhase("inhale");
              return pattern.inhale;
            }
          } else if (phase === "holdAfter") {
            setCycles((c) => c + 1);
            setPhase("inhale");
            return pattern.inhale;
          }
        }
        return prev - 0.1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [isBreathing, phase, selectedPattern]);

  const getCircleScale = () => {
    if (phase === "ready") return 1;
    if (phase === "inhale") return 1.4;
    if (phase === "hold" || phase === "holdAfter") return 1.4;
    if (phase === "exhale") return 1;
    return 1;
  };

  const getPhaseLabel = () => {
    switch (phase) {
      case "inhale": return "Breathe In";
      case "hold": return "Hold";
      case "exhale": return "Breathe Out";
      case "holdAfter": return "Hold";
      default: return "Ready";
    }
  };

  // Enhanced noise player with distinct sounds
  const playNoise = (noiseName: string, frequency: number, type: string) => {
    if (playingNoise === noiseName) {
      stopNoise();
      return;
    }
    
    stopNoise();
    
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    const ctx = audioContextRef.current;
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    // Generate different noise types
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      
      switch (type) {
        case "brown":
          output[i] = (lastOut + (0.02 * white)) / 1.02;
          lastOut = output[i];
          output[i] *= 3.5;
          break;
        case "pink":
          // Simple pink noise approximation
          output[i] = (lastOut * 0.95) + (white * 0.05);
          lastOut = output[i];
          output[i] *= 4;
          break;
        case "rain":
          output[i] = white * (0.3 + Math.random() * 0.7) * (Math.sin(i / 1000) * 0.5 + 0.5);
          break;
        case "wind":
          output[i] = white * (0.2 + Math.sin(i / 5000) * 0.3);
          break;
        case "ocean":
          output[i] = white * (0.3 + Math.sin(i / 10000) * 0.4 + Math.sin(i / 3000) * 0.2);
          break;
        case "night":
          output[i] = white * 0.15 * (1 + Math.sin(i / 20000) * 0.3);
          break;
        default: // green noise
          output[i] = white;
      }
    }
    
    noiseSourceRef.current = ctx.createBufferSource();
    noiseSourceRef.current.buffer = noiseBuffer;
    noiseSourceRef.current.loop = true;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = frequency;
    
    const gainNode = ctx.createGain();
    gainNode.gain.value = 0.08;
    
    noiseSourceRef.current.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    noiseSourceRef.current.start();
    
    setPlayingNoise(noiseName);
  };

  const stopNoise = () => {
    if (noiseSourceRef.current) {
      noiseSourceRef.current.stop();
      noiseSourceRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setPlayingNoise(null);
  };

  // New prompt
  const newPrompt = () => {
    const remaining = journalPrompts.filter(p => p !== currentPrompt);
    setCurrentPrompt(remaining[Math.floor(Math.random() * remaining.length)]);
  };

  // FreeWriter
  useEffect(() => {
    if (!freeWriterActive || freeWriterTime <= 0) return;
    
    const timer = setInterval(() => {
      setFreeWriterTime((t) => t - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [freeWriterActive, freeWriterTime]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const copyText = () => {
    navigator.clipboard.writeText(freeWriterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    return () => stopNoise();
  }, []);

  const tabs = [
    { id: "breathing" as const, icon: Wind, label: "Breathing" },
    { id: "noise" as const, icon: Waves, label: "Sounds" },
    { id: "journal" as const, icon: BookOpen, label: "Journal" },
    { id: "meditation" as const, icon: Timer, label: "Meditations" },
    { id: "freewriter" as const, icon: PenTool, label: "FreeWriter" },
  ];

  return (
    <div className="min-h-screen">
      <CursorHalo />
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-8 px-6 relative">
        {/* Section glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-grey-aurora/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif mb-4 opacity-0 animate-fade-in-up">
            The kalmē Studio
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto opacity-0 animate-fade-in-up delay-100">
            Premium tools for your evening ritual.
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="px-6 mb-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-foreground text-background"
                    : "bg-card/50 border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Area */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          {/* Breathing Tab */}
          {activeTab === "breathing" && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {breathPatterns.map((pattern) => (
                  <button
                    key={pattern.name}
                    onClick={() => {
                      setSelectedPattern(pattern);
                      resetBreathing();
                    }}
                    className={`p-3 rounded-xl text-left transition-all duration-300 ${
                      selectedPattern.name === pattern.name
                        ? "bg-foreground/10 border border-foreground/30"
                        : "bg-card/50 border border-border/50 hover:border-foreground/20"
                    }`}
                  >
                    <p className="font-medium text-sm">{pattern.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{pattern.description}</p>
                  </button>
                ))}
              </div>

              <div className="flex flex-col items-center py-10">
                <div className="relative w-56 h-56 md:w-72 md:h-72">
                  {/* Background glow */}
                  <div className="absolute inset-0 rounded-full bg-grey-aurora/20 blur-[60px] pointer-events-none" />
                  
                  <div className="absolute inset-0 rounded-full border border-border/30" />
                  
                  <div
                    className="absolute inset-6 rounded-full bg-gradient-to-br from-grey-aurora/30 to-grey-aurora/5 border border-foreground/20 flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{ transform: `scale(${getCircleScale()})` }}
                  >
                    <div className="text-center">
                      <p className="text-4xl font-serif mb-1">{Math.ceil(counter)}</p>
                      <p className="text-muted-foreground tracking-wide text-sm">
                        {getPhaseLabel()}
                      </p>
                    </div>
                  </div>

                  {isBreathing && (
                    <div
                      className="absolute inset-0 rounded-full bg-grey-glow/10 blur-3xl transition-opacity duration-1000"
                      style={{ opacity: phase === "inhale" ? 0.8 : 0.3 }}
                    />
                  )}
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setIsBreathing(!isBreathing)}
                    className="btn-primary flex items-center gap-2 text-sm py-3"
                  >
                    {isBreathing ? <Pause size={18} /> : <Play size={18} />}
                    {isBreathing ? "Pause" : "Begin"}
                  </button>
                  <button onClick={resetBreathing} className="btn-secondary flex items-center gap-2 text-sm py-3">
                    <RotateCcw size={18} />
                    Reset
                  </button>
                </div>

                {cycles > 0 && (
                  <p className="text-muted-foreground mt-4 text-sm">
                    {cycles} cycle{cycles !== 1 ? "s" : ""} completed
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Noise Tab */}
          {activeTab === "noise" && (
            <div className="animate-fade-in">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {noiseLibrary.map((noise, index) => (
                  <button
                    key={noise.name}
                    onClick={() => playNoise(noise.name, noise.frequency, noise.type)}
                    className={`noise-tile relative overflow-hidden ${playingNoise === noise.name ? 'playing' : ''}`}
                  >
                    {/* Subtle glow behind */}
                    <div className="absolute inset-0 bg-grey-aurora/0 group-hover:bg-grey-aurora/10 blur-xl transition-all duration-500 pointer-events-none" />
                    
                    <div className="relative z-10">
                      <div className="flex items-end justify-center gap-0.5 h-6 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`waveform-bar ${playingNoise === noise.name ? '' : 'h-1.5'}`}
                            style={playingNoise === noise.name ? { animationDelay: `${i * 0.1}s` } : { height: '6px' }}
                          />
                        ))}
                      </div>
                      <p className="font-medium text-sm">{noise.name}</p>
                    </div>
                  </button>
                ))}
              </div>
              
              {playingNoise && (
                <div className="mt-6 text-center">
                  <button
                    onClick={stopNoise}
                    className="btn-secondary inline-flex items-center gap-2 text-sm py-3"
                  >
                    <VolumeX size={16} />
                    Stop Sound
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Journal Tab */}
          {activeTab === "journal" && (
            <div className="animate-fade-in max-w-xl mx-auto">
              <div className="prompt-card text-center flex items-center justify-center">
                <p className="text-xl md:text-2xl font-serif leading-relaxed text-foreground/90">
                  "{currentPrompt}"
                </p>
              </div>
              <div className="text-center mt-6">
                <button
                  onClick={newPrompt}
                  className="btn-secondary inline-flex items-center gap-2 text-sm py-3"
                >
                  <RefreshCw size={16} />
                  New Prompt
                </button>
              </div>
            </div>
          )}

          {/* Meditation Tab */}
          {activeTab === "meditation" && (
            <div className="animate-fade-in grid md:grid-cols-3 gap-3">
              {microMeditations.map((meditation, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedMeditation(meditation)}
                  className="card-premium p-5 text-left"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-serif">{meditation.title}</h3>
                    <span className="text-xs text-muted-foreground bg-foreground/5 px-2 py-1 rounded-full">
                      {meditation.duration}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {meditation.content}
                  </p>
                </button>
              ))}
            </div>
          )}

          {/* FreeWriter Tab */}
          {activeTab === "freewriter" && (
            <div className="animate-fade-in">
              {!freeWriterActive ? (
                <div className="text-center py-16">
                  <h3 className="text-xl font-serif mb-3">FreeWriter</h3>
                  <p className="text-muted-foreground mb-6 max-w-sm mx-auto text-sm">
                    Write freely for 5 minutes. No backspace. Let your thoughts flow.
                  </p>
                  <button
                    onClick={() => {
                      setFreeWriterActive(true);
                      setFreeWriterText("");
                      setFreeWriterTime(300);
                    }}
                    className="btn-primary text-sm py-3"
                  >
                    Start Writing
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-serif">{formatTime(freeWriterTime)}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={copyText}
                        className="btn-ghost flex items-center gap-2 text-sm py-2"
                      >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        {copied ? "Copied" : "Copy"}
                      </button>
                      <button
                        onClick={() => setFreeWriterActive(false)}
                        className="btn-ghost py-2"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                  <textarea
                    value={freeWriterText}
                    onChange={(e) => setFreeWriterText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace") {
                        e.preventDefault();
                      }
                    }}
                    className="freewriter-input min-h-[350px] p-5 bg-card/30 border border-border/30 rounded-xl"
                    placeholder="Start writing..."
                    autoFocus
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Meditation Modal */}
      {selectedMeditation && (
        <div className="meditation-modal animate-fade-in">
          <div className="relative max-w-md mx-6 p-8">
            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[250px] bg-grey-aurora/30 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative z-10 text-center">
              <button
                onClick={() => setSelectedMeditation(null)}
                className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-card border border-border/50 flex items-center justify-center hover:border-foreground/30 transition-colors"
              >
                <X size={16} />
              </button>
              
              <span className="text-xs text-muted-foreground">{selectedMeditation.duration}</span>
              <h2 className="text-2xl font-serif mt-1 mb-6">{selectedMeditation.title}</h2>
              
              <div className="space-y-3">
                {selectedMeditation.steps.map((step, i) => (
                  <div 
                    key={i}
                    className="p-3 bg-card/30 border border-border/30 rounded-xl animate-fade-in-up"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    <p className="text-foreground/90 text-sm">{step}</p>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => setSelectedMeditation(null)}
                className="btn-secondary mt-6 text-sm py-3"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Studio;
