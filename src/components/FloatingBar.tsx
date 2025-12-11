import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface FloatingBarProps {
  onSpinClick: () => void;
}

export const FloatingBar = ({ onSpinClick }: FloatingBarProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="floating-bar animate-fade-in-up">
      <Link 
        to="/waitlist" 
        className="px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 hover:scale-[1.02]"
        style={{
          background: 'linear-gradient(135deg, hsl(210 80% 55%), hsl(210 70% 45%))',
          color: 'white',
        }}
      >
        Join Waitlist
      </Link>
      <button 
        onClick={onSpinClick}
        className="px-5 py-2.5 text-foreground text-sm font-medium rounded-full hover:bg-primary/10 transition-all duration-300"
      >
        Spin to Win
      </button>
    </div>
  );
};
