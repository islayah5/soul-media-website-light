import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Only initialize on desktop/fine pointers
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('.cursor-pointer') ||
        target.classList.contains('interactive')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Hardware-accelerated rAF render loop (0ms React state overhead)
    const render = () => {
      // Silky lerp interpolation for follower ring
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.28;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.28;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mousePos.current.x - 5}px, ${mousePos.current.y - 5}px, 0)`;
      }

      if (cursorRingRef.current) {
        const offset = isHovered ? 24 : 16;
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x - offset}px, ${ringPos.current.y - offset}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible, isHovered]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Follower Ring - High Contrast Electric Pink Halo with Ambient Blur */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999999] hidden md:block will-change-transform mix-blend-exclusion"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <div
          className={`rounded-full transition-all duration-200 ${
            isHovered
              ? 'w-12 h-12 bg-[#FF94C7]/40 border-2 border-[#FFF5F8] scale-125 shadow-[0_0_20px_rgba(255,148,199,0.9)]'
              : 'w-8 h-8 bg-[#D83685]/20 border-2 border-[#D83685] scale-100 shadow-[0_0_12px_rgba(216,54,133,0.7)]'
          }`}
        />
      </div>

      {/* Inner Precision Core Dot - Dual Layer High Contrast Luminance */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000000] hidden md:block will-change-transform mix-blend-difference"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <div className="relative w-2.5 h-2.5">
          {/* Inner Core */}
          <div className="w-full h-full bg-[#FFFFFF] rounded-full shadow-[0_0_10px_#FFFFFF,_0_0_18px_#D83685]" />
        </div>
      </div>
    </>
  );
};
