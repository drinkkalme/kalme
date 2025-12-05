import { useState, useEffect, useCallback, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Wind, Waves, BookOpen, Timer, PenTool, Play, Pause, RotateCcw, Volume2, VolumeX, RefreshCw, X, Copy, Check } from "lucide-react";

type BreathPattern = {
  name: string;
  inhale: number;
  hold: number;
  exhale: number;
  holdAfter?: number;
  description: string;
};

const breathPatterns: BreathPattern[] = [
  { name: "4-4-4-4 Box", inhale: 4, hold: 4, exhale: 4, holdAfter: 4, description: "Classic box breathing for balance" },
  { name: "4-7-8 Relaxing", inhale: 4, hold: 7, exhale: 8, description: "Deep relaxation for sleep" },
  { name: "2.5-2.5-2.5", inhale: 2.5, hold: 2.5, exhale: 2.5, description: "Quick rhythmic calm" },
  { name: "30s Reset", inhale: 2, hold: 0, exhale: 4, description: "Fast anxiety reset" },
];

const noiseLibrary = [
  { name: "Green Noise", frequency: 500 },
  { name: "Pink Noise", frequency: 300 },
  { name: "Brown Noise", frequency: 100 },
  { name: "True Rain", frequency: 350 },
  { name: "True Wind", frequency: 180 },
  { name: "Ocean", frequency: 220 },
  { name: "Night", frequency: 150 },
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
  const [breathSound, setBreathSound] = useState(false);
  
  // Noise state
  const [playingNoise, setPlayingNoise] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  
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

  // Noise player
  const playNoise = (noiseName: string, frequency: number) => {
    if (playingNoise === noiseName) {
      stopNoise();
      return;
    }
    
    stopNoise();
    
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    const bufferSize = 2 * audioContextRef.current.sampleRate;
    const noiseBuffer = audioContextRef.current.createBuffer(1, bufferSize, audioContextRef.current.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    
    const whiteNoise = audioContextRef.current.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;
    
    const filter = audioContextRef.current.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = frequency;
    
    const gainNode = audioContextRef.current.createGain();
    gainNode.gain.value = 0.08;
    
    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    whiteNoise.start();
    
    setPlayingNoise(noiseName);
  };

  const stopNoise = () => {
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
    { id: "noise" as const, icon: Waves, label: "Noise" },
    { id: "journal" as const, icon: BookOpen, label: "Journal" },
    { id: "meditation" as const, icon: Timer, label: "Meditations" },
    { id: "freewriter" as const, icon: PenTool, label: "FreeWriter" },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-6 opacity-0 animate-fade-in">
            Digital Calm Tools
          </p>
          <h1 className="text-5xl md:text-6xl font-serif mb-6 opacity-0 animate-fade-in-up delay-100">
            The kalmē Studio
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto opacity-0 animate-fade-in-up delay-200">
            Premium tools for your evening ritual.
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="px-6 mb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-foreground text-background"
                    : "bg-card/50 border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }`}
              >
                <tab.icon size={18} />
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
            <div className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {breathPatterns.map((pattern) => (
                  <button
                    key={pattern.name}
                    onClick={() => {
                      setSelectedPattern(pattern);
                      resetBreathing();
                    }}
                    className={`p-4 rounded-2xl text-left transition-all duration-300 ${
                      selectedPattern.name === pattern.name
                        ? "bg-foreground/10 border border-foreground/30"
                        : "bg-card/50 border border-border/50 hover:border-foreground/20"
                    }`}
                  >
                    <p className="font-medium text-sm">{pattern.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{pattern.description}</p>
                  </button>
                ))}
              </div>

              <div className="flex flex-col items-center py-12">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  <div className="absolute inset-0 rounded-full border border-border/30" />
                  
                  <div
                    className="absolute inset-6 rounded-full bg-gradient-to-br from-grey-aurora/30 to-grey-aurora/5 border border-foreground/20 flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{ transform: `scale(${getCircleScale()})` }}
                  >
                    <div className="text-center">
                      <p className="text-5xl font-serif mb-2">{Math.ceil(counter)}</p>
                      <p className="text-lg text-muted-foreground tracking-wide">
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

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setIsBreathing(!isBreathing)}
                    className="btn-primary flex items-center gap-2"
                  >
                    {isBreathing ? <Pause size={20} /> : <Play size={20} />}
                    {isBreathing ? "Pause" : "Begin"}
                  </button>
                  <button onClick={resetBreathing} className="btn-secondary flex items-center gap-2">
                    <RotateCcw size={20} />
                    Reset
                  </button>
                </div>

                {cycles > 0 && (
                  <p className="text-muted-foreground mt-6">
                    {cycles} cycle{cycles !== 1 ? "s" : ""} completed
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Noise Tab */}
          {activeTab === "noise" && (
            <div className="animate-fade-in">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {noiseLibrary.map((noise) => (
                  <button
                    key={noise.name}
                    onClick={() => playNoise(noise.name, noise.frequency)}
                    className={`noise-tile ${playingNoise === noise.name ? 'playing' : ''}`}
                  >
                    <div className="flex items-end justify-center gap-1 h-8 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`waveform-bar ${playingNoise === noise.name ? '' : 'h-2'}`}
                          style={playingNoise === noise.name ? { animationDelay: `${i * 0.1}s` } : { height: '8px' }}
                        />
                      ))}
                    </div>
                    <p className="font-medium text-sm">{noise.name}</p>
                  </button>
                ))}
              </div>
              
              {playingNoise && (
                <div className="mt-8 text-center">
                  <button
                    onClick={stopNoise}
                    className="btn-secondary inline-flex items-center gap-2"
                  >
                    <VolumeX size={18} />
                    Stop Sound
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Journal Tab */}
          {activeTab === "journal" && (
            <div className="animate-fade-in max-w-2xl mx-auto">
              <div className="prompt-card text-center">
                <p className="text-2xl md:text-3xl font-serif leading-relaxed text-foreground/90">
                  "{currentPrompt}"
                </p>
              </div>
              <div className="text-center mt-8">
                <button
                  onClick={newPrompt}
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  <RefreshCw size={18} />
                  New Prompt
                </button>
              </div>
            </div>
          )}

          {/* Meditation Tab */}
          {activeTab === "meditation" && (
            <div className="animate-fade-in grid md:grid-cols-3 gap-4">
              {microMeditations.map((meditation, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedMeditation(meditation)}
                  className="card-premium p-6 text-left hover:scale-[1.02] transition-transform"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-serif">{meditation.title}</h3>
                    <span className="text-xs text-muted-foreground bg-foreground/5 px-3 py-1 rounded-full">
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
                <div className="text-center py-20">
                  <h3 className="text-2xl font-serif mb-4">FreeWriter</h3>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Write freely for 5 minutes. No backspace. 
                    Let your thoughts flow.
                  </p>
                  <button
                    onClick={() => {
                      setFreeWriterActive(true);
                      setFreeWriterText("");
                      setFreeWriterTime(300);
                    }}
                    className="btn-primary"
                  >
                    Start Writing
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-serif">{formatTime(freeWriterTime)}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={copyText}
                        className="btn-ghost flex items-center gap-2"
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                        {copied ? "Copied" : "Copy"}
                      </button>
                      <button
                        onClick={() => setFreeWriterActive(false)}
                        className="btn-ghost"
                      >
                        <X size={18} />
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
                    className="freewriter-input min-h-[400px] p-6 bg-card/30 border border-border/30 rounded-2xl"
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
          <div className="relative max-w-lg mx-6 p-8">
            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-grey-aurora/30 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative z-10 text-center">
              <button
                onClick={() => setSelectedMeditation(null)}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center hover:border-foreground/30 transition-colors"
              >
                <X size={18} />
              </button>
              
              <span className="text-sm text-muted-foreground">{selectedMeditation.duration}</span>
              <h2 className="text-3xl font-serif mt-2 mb-8">{selectedMeditation.title}</h2>
              
              <div className="space-y-4">
                {selectedMeditation.steps.map((step, i) => (
                  <div 
                    key={i}
                    className="p-4 bg-card/30 border border-border/30 rounded-2xl animate-fade-in-up"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    <p className="text-foreground/90">{step}</p>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => setSelectedMeditation(null)}
                className="btn-secondary mt-8"
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
