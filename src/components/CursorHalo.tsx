import { useState, useEffect, useCallback, useRef } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export const CursorHalo = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isOverInteractive, setIsOverInteractive] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleIdRef = useRef(0);
  const smoothPosition = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Check if over interactive element
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('tool-card') ||
        target.classList.contains('noise-tile') ||
        target.classList.contains('ingredient-pill') ||
        target.classList.contains('card-premium') ||
        target.classList.contains('glass') ||
        target.classList.contains('glass-metallic');
      
      setIsOverInteractive(!!isInteractive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('glass') ||
        target.classList.contains('glass-metallic');
      
      if (isInteractive) {
        const newRipple = {
          id: rippleIdRef.current++,
          x: e.clientX,
          y: e.clientY,
        };
        setRipples(prev => [...prev, newRipple]);
        
        setTimeout(() => {
          setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 600);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("click", handleClick);

    // Smooth animation loop
    const animate = () => {
      smoothPosition.current.x = lerp(smoothPosition.current.x, position.x, 0.15);
      smoothPosition.current.y = lerp(smoothPosition.current.y, position.y, 0.15);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("click", handleClick);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [position.x, position.y]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor halo */}
      <div
        className="cursor-halo z-[9998]"
        style={{
          left: position.x,
          top: position.y,
          width: isOverInteractive ? 100 : 160,
          height: isOverInteractive ? 100 : 160,
          transform: "translate(-50%, -50%)",
          opacity: isOverInteractive ? 0.8 : 0.5,
        }}
      />
      
      {/* Orbit effect when over interactive */}
      {isOverInteractive && (
        <div
          className="fixed pointer-events-none z-[9997]"
          style={{
            left: position.x,
            top: position.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div 
            className="w-3 h-3 rounded-full bg-metallic-blue/40 animate-orbit"
            style={{ transformOrigin: 'center center' }}
          />
        </div>
      )}
      
      {/* Ripples on click */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="cursor-ripple z-[9999]"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 40,
            height: 40,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </>
  );
};
