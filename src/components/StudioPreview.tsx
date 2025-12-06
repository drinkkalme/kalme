import { Link } from "react-router-dom";
import { Wind, Waves, BookOpen, Timer } from "lucide-react";

const tools = [
  {
    icon: Wind,
    title: "Breathing",
    preview: "Guided cycles",
  },
  {
    icon: Waves,
    title: "Sounds",
    preview: "Noise library",
  },
  {
    icon: BookOpen,
    title: "Journal",
    preview: "Prompts + FreeWriter",
  },
  {
    icon: Timer,
    title: "Meditations",
    preview: "1-3 minute resets",
  },
];

export const StudioPreview = () => {
  return (
    <section className="py-24 px-6 relative">
      {/* Section glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-grey-aurora/15 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="absolute inset-0 -z-10 blur-2xl bg-grey-glow/20 scale-150" />
            <h2 className="text-4xl md:text-5xl font-serif mb-3">
              The kalmē Studio
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md mx-auto">
            Premium digital tools for your evening ritual.
          </p>
        </div>

        {/* Tools Preview Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tools.map((tool, index) => (
            <Link
              key={index}
              to="/studio"
              className="tool-card text-center group relative"
            >
              {/* Tile glow on hover */}
              <div className="absolute inset-0 bg-grey-glow/0 group-hover:bg-grey-glow/10 rounded-2xl blur-xl transition-all duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-11 h-11 mx-auto mb-3 rounded-full bg-foreground/5 flex items-center justify-center group-hover:bg-foreground/10 transition-colors">
                  <tool.icon size={18} className="text-foreground/60" />
                </div>
                <h3 className="font-medium text-sm mb-0.5">{tool.title}</h3>
                <p className="text-xs text-muted-foreground">{tool.preview}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link to="/studio" className="btn-primary inline-flex items-center gap-2">
            Open the kalmē Studio
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
