import { useState, useEffect, useCallback, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CursorHalo } from "@/components/CursorHalo";
import { Wind, Waves, BookOpen, Timer, PenTool, Play, Pause, RotateCcw, VolumeX, Volume2, RefreshCw, X, Copy, Check, Flame, Droplets, TreePine, Maximize2, Minimize2 } from "lucide-react";

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

// Background experiences
const backgrounds = [
  { id: "fireplace", name: "Fireplace", icon: Flame, description: "Warm crackling fire", video: "https://assets.mixkit.co/videos/preview/mixkit-fireplace-in-a-dim-room-4024-large.mp4" },
  { id: "stream", name: "Stream", icon: Droplets, description: "Flowing water sounds", video: "https://assets.mixkit.co/videos/preview/mixkit-river-stream-running-through-rocks-4109-large.mp4" },
  { id: "zen", name: "Zen Garden", icon: TreePine, description: "Peaceful garden ambience", video: "https://assets.mixkit.co/videos/preview/mixkit-zen-garden-with-green-bamboo-4710-large.mp4" },
];

// Distinct noise configurations with proper sound synthesis
const noiseLibrary = [
  { name: "Green Noise", frequency: 500, type: "green", color: "hsl(120 40% 40%)" },
  { name: "Pink Noise", frequency: 250, type: "pink", color: "hsl(330 50% 50%)" },
  { name: "Brown Noise", frequency: 80, type: "brown", color: "hsl(30 50% 35%)" },
  { name: "Rain", frequency: 400, type: "rain", color: "hsl(200 60% 45%)" },
  { name: "Wind", frequency: 150, type: "wind", color: "hsl(180 30% 40%)" },
  { name: "Ocean", frequency: 200, type: "ocean", color: "hsl(210 70% 45%)" },
  { name: "Night", frequency: 120, type: "night", color: "hsl(240 30% 25%)" },
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
type TabType = "backgrounds" | "noise" | "breathing" | "journal" | "meditation";

const Studio = () => {
  const [activeTab, setActiveTab] = useState<TabType>("backgrounds");
  
  // Background state
  const [activeBackground, setActiveBackground] = useState<string | null>(null);
  const [backgroundSound, setBackgroundSound] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
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
  
  // Journal & FreeWriter state (merged)
  const [currentPrompt, setCurrentPrompt] = useState(journalPrompts[0]);
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
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      
      switch (type) {
        case "brown":
          output[i] = (lastOut + (0.02 * white)) / 1.02;
          lastOut = output[i];
          output[i] *= 3.5;
          break;
        case "pink":
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
          b6 = white * 0.115926;
          break;
        case "green":
          // Green noise: band-limited around 500Hz
          output[i] = white * Math.sin(i / 20) * 0.5;
          break;
        case "rain":
          // Rain: random bursts with varying intensity
          const rainIntensity = Math.random() > 0.7 ? 1 : 0.3;
          output[i] = white * rainIntensity * (0.3 + Math.sin(i / 500) * 0.2);
          break;
        case "wind":
          // Wind: slow sweeping with occasional gusts
          const gust = Math.sin(i / 10000) * 0.5 + 0.5;
          output[i] = white * (0.15 + gust * 0.25);
          break;
        case "ocean":
          // Ocean: waves with crashing patterns
          const wave = Math.sin(i / 8000) * 0.5 + Math.sin(i / 15000) * 0.3;
          output[i] = white * (0.2 + Math.abs(wave) * 0.4);
          break;
        case "night":
          // Night: very quiet with occasional cricket-like sounds
          output[i] = white * 0.1 * (1 + Math.sin(i / 30000) * 0.5);
          if (Math.random() > 0.9995) output[i] *= 3;
          break;
        default:
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
    gainNode.gain.value = 0.1;
    
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

  // Background handlers
  const openBackground = (id: string) => {
    setActiveBackground(id);
    setIsFullscreen(true);
  };

  const closeBackground = () => {
    setIsFullscreen(false);
    setActiveBackground(null);
  };

  const tabs = [
    { id: "backgrounds" as const, icon: Flame, label: "Backgrounds" },
    { id: "noise" as const, icon: Waves, label: "Sounds" },
    { id: "breathing" as const, icon: Wind, label: "Breathing" },
    { id: "journal" as const, icon: PenTool, label: "Write" },
    { id: "meditation" as const, icon: Timer, label: "Meditations" },
  ];

  return (
    <div className="min-h-screen">
      <CursorHalo />
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-8 px-6 relative section-glow">
        {/* Section glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[100px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, hsl(210 80% 55% / 0.15) 0%, hsl(0 0% 25% / 0.1) 50%, transparent 70%)'
          }}
        />
        
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
                    ? "btn-primary py-2.5"
                    : "glass text-muted-foreground hover:text-foreground hover:border-primary/30"
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
          {/* Backgrounds Tab - Centerpiece */}
          {activeTab === "backgrounds" && (
            <div className="animate-fade-in">
              <div className="grid md:grid-cols-3 gap-4">
                {backgrounds.map((bg, index) => (
                  <button
                    key={bg.id}
                    onClick={() => openBackground(bg.id)}
                    className={`${index === 1 ? 'tool-card-highlight' : 'tool-card'} text-left group`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full glass-metallic flex items-center justify-center group-hover:shadow-metallic transition-all">
                        <bg.icon size={20} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="text-base font-serif">{bg.name}</h3>
                        <p className="text-xs text-muted-foreground">{bg.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Immersive</span>
                      <Maximize2 size={14} className="group-hover:text-primary transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
              
              <p className="text-center text-sm text-muted-foreground mt-6">
                Click to enter fullscreen immersive mode
              </p>
            </div>
          )}

          {/* Noise Tab */}
          {activeTab === "noise" && (
            <div className="animate-fade-in">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {noiseLibrary.map((noise) => (
                  <button
                    key={noise.name}
                    onClick={() => playNoise(noise.name, noise.frequency, noise.type)}
                    className={`noise-tile relative overflow-hidden ${playingNoise === noise.name ? 'playing' : ''}`}
                  >
                    <div className="relative z-10">
                      <div className="flex items-end justify-center gap-0.5 h-6 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`waveform-bar ${playingNoise === noise.name ? '' : 'h-1.5'}`}
                            style={{
                              animationDelay: `${i * 0.1}s`,
                              height: playingNoise === noise.name ? undefined : '6px',
                              backgroundColor: noise.color,
                            }}
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
                        ? "glass-metallic border-primary/30"
                        : "glass hover:border-primary/20"
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
                  <div className="absolute inset-0 rounded-full blur-[60px] pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse at center, hsl(210 80% 55% / 0.2) 0%, transparent 70%)'
                    }}
                  />
                  
                  <div className="absolute inset-0 rounded-full border border-primary/20" />
                  
                  <div
                    className="absolute inset-6 rounded-full border border-primary/30 flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{ 
                      transform: `scale(${getCircleScale()})`,
                      background: 'radial-gradient(ellipse at center, hsl(210 80% 55% / 0.1) 0%, hsl(210 70% 45% / 0.05) 50%, transparent 100%)'
                    }}
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
                      className="absolute inset-0 rounded-full blur-3xl transition-opacity duration-1000"
                      style={{ 
                        opacity: phase === "inhale" ? 0.6 : 0.2,
                        background: 'hsl(210 80% 55% / 0.15)'
                      }}
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

          {/* Journal & FreeWriter Tab (Merged) */}
          {activeTab === "journal" && (
            <div className="animate-fade-in">
              {!freeWriterActive ? (
                <div className="space-y-8">
                  {/* Journal Prompt Section */}
                  <div className="max-w-xl mx-auto">
                    <h3 className="text-lg font-serif text-center mb-4">Today's Prompt</h3>
                    <div className="prompt-card text-center flex items-center justify-center">
                      <p className="text-xl md:text-2xl font-serif leading-relaxed text-foreground/90">
                        "{currentPrompt}"
                      </p>
                    </div>
                    <div className="text-center mt-4">
                      <button
                        onClick={newPrompt}
                        className="btn-ghost inline-flex items-center gap-2 text-sm"
                      >
                        <RefreshCw size={16} />
                        New Prompt
                      </button>
                    </div>
                  </div>

                  {/* FreeWriter Start */}
                  <div className="text-center py-8 border-t border-primary/10">
                    <BookOpen className="w-10 h-10 mx-auto mb-4 text-primary/60" />
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
                </div>
              ) : (
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-serif text-primary">{formatTime(freeWriterTime)}</span>
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
                    className="freewriter-input min-h-[350px] p-5 glass rounded-xl"
                    placeholder="Start writing..."
                    autoFocus
                  />
                </div>
              )}
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
                    <span className="text-xs text-muted-foreground glass px-2 py-1 rounded-full">
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
        </div>
      </section>

      {/* Meditation Modal */}
      {selectedMeditation && (
        <div className="meditation-modal animate-fade-in">
          <div className="relative max-w-md mx-6 p-8">
            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[250px] rounded-full blur-[80px] pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, hsl(210 80% 55% / 0.2) 0%, hsl(0 0% 25% / 0.1) 50%, transparent 70%)'
              }}
            />
            
            <div className="relative z-10 text-center">
              <button
                onClick={() => setSelectedMeditation(null)}
                className="absolute -top-3 -right-3 w-9 h-9 rounded-full glass flex items-center justify-center hover:border-primary/30 transition-all"
              >
                <X size={16} />
              </button>
              
              <span className="text-xs text-muted-foreground">{selectedMeditation.duration}</span>
              <h2 className="text-2xl font-serif mt-1 mb-6">{selectedMeditation.title}</h2>
              
              <div className="space-y-3">
                {selectedMeditation.steps.map((step, i) => (
                  <div 
                    key={i}
                    className="p-3 glass rounded-xl animate-fade-in-up"
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

      {/* Immersive Fullscreen Background */}
      {isFullscreen && activeBackground && (
        <div className="immersive-fullscreen animate-fade-in">
          <video
            ref={videoRef}
            src={backgrounds.find(b => b.id === activeBackground)?.video}
            autoPlay
            loop
            muted={!backgroundSound}
            playsInline
            className="w-full h-full object-cover"
          />
          
          {/* Video overlay for better contrast */}
          <div className="video-overlay" />
          
          {/* Minimal controls */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <button
              onClick={() => setBackgroundSound(!backgroundSound)}
              className="glass-metallic p-3 rounded-full hover:shadow-metallic transition-all"
            >
              {backgroundSound ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
            <button
              onClick={closeBackground}
              className="glass-metallic p-3 rounded-full hover:shadow-metallic transition-all"
            >
              <Minimize2 size={20} />
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Studio;
