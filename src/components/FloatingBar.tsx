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
        className="px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded-full hover:scale-[1.02] transition-transform"
      >
        Join Waitlist
      </Link>
      <button 
        onClick={onSpinClick}
        className="px-5 py-2.5 text-foreground text-sm font-medium rounded-full hover:bg-foreground/10 transition-colors"
      >
        Spin to Win
      </button>
    </div>
  );
};
