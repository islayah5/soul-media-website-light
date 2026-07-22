import React, { useEffect, useRef } from 'react';

export const LiquidPaintCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse Interaction Position
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Vibrant Pastel Liquid Paint Blotches
    const colors = [
      'rgba(255, 133, 192, 0.45)', // Vibrant Pink #FF85C0
      'rgba(192, 132, 252, 0.40)', // Iridescent Lavender #C084FC
      'rgba(255, 158, 122, 0.42)', // Warm Coral Peach #FF9E7A
      'rgba(92, 225, 230, 0.38)',  // Mint Cyan #5CE1E6
    ];

    interface Blob {
      x: number;
      y: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
      angle: number;
      speed: number;
    }

    const blobs: Blob[] = [
      { x: width * 0.2, y: height * 0.25, radius: Math.min(width, height) * 0.32, color: colors[0], vx: 0.4, vy: 0.3, angle: 0, speed: 0.008 },
      { x: width * 0.8, y: height * 0.3, radius: Math.min(width, height) * 0.36, color: colors[1], vx: -0.3, vy: 0.4, angle: 1, speed: 0.006 },
      { x: width * 0.35, y: height * 0.75, radius: Math.min(width, height) * 0.34, color: colors[2], vx: 0.5, vy: -0.3, angle: 2, speed: 0.009 },
      { x: width * 0.75, y: height * 0.8, radius: Math.min(width, height) * 0.30, color: colors[3], vx: -0.4, vy: -0.4, angle: 3, speed: 0.007 },
    ];

    const render = () => {
      // Smooth Mouse Following
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Clear Canvas to Soft Cream Pink Background
      ctx.fillStyle = '#FFF5F8';
      ctx.fillRect(0, 0, width, height);

      // Render Each Fluid Blot
      blobs.forEach((blob, i) => {
        blob.angle += blob.speed;
        blob.x += Math.cos(blob.angle) * blob.vx * 1.5;
        blob.y += Math.sin(blob.angle) * blob.vy * 1.5;

        // Mouse attraction force
        const dx = mouse.x - blob.x;
        const dy = mouse.y - blob.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 450) {
          blob.x += (dx / dist) * 0.6;
          blob.y += (dy / dist) * 0.6;
        }

        // Draw Organic Fluid Blob with Radial Soft Blur
        const gradient = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          blob.radius
        );

        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(0.65, blob.color.replace(/[\d\.]+\)$/, '0.15)'));
        gradient.addColorStop(1, 'rgba(255, 245, 248, 0)');

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-90 transition-opacity duration-1000"
    />
  );
};
