import { Link } from "react-router-dom";
import { Wind, Waves, BookOpen, Timer, PenTool } from "lucide-react";

const tools = [
  {
    icon: Wind,
    title: "Breathing",
    preview: "4-4-4, 4-7-8, Fast Reset",
  },
  {
    icon: Waves,
    title: "Noise Library",
    preview: "Green, Pink, Brown, Ocean",
  },
  {
    icon: BookOpen,
    title: "Journal Prompts",
    preview: "One-tap new prompts",
  },
  {
    icon: Timer,
    title: "Micro Meditations",
    preview: "1-3 minute scripts",
  },
  {
    icon: PenTool,
    title: "FreeWriter",
    preview: "Dark mode writing",
  },
];

export const StudioPreview = () => {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] text-primary uppercase mb-6">
            Digital Calm Tools
          </p>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            The kalmē Studio
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A collection of premium digital tools designed to help you decompress, 
            reflect, and find your center.
          </p>
        </div>

        {/* Tools Preview Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {tools.map((tool, index) => (
            <Link
              key={index}
              to="/studio"
              className="tool-card text-center group"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <tool.icon size={20} className="text-primary" />
              </div>
              <h3 className="font-medium mb-1">{tool.title}</h3>
              <p className="text-xs text-muted-foreground">{tool.preview}</p>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/studio" className="btn-primary inline-flex items-center gap-2">
            Open the kalmē Studio
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};