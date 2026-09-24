import React, { useEffect, useRef } from 'react';

export const Atmosphere: React.FC = () => {
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

    // Subtle particles representing graphite dust / cinematic sparks
    const particleCount = 28;
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: -Math.random() * 0.35 - 0.1,
        opacity: Math.random() * 0.4 + 0.1,
        color: Math.random() > 0.6 ? '#dc2626' : '#e4e4e7',
      });
    }

    let isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (!isReducedMotion) {
        particles.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.fill();

          p.x += p.speedX;
          p.y += p.speedY;

          // Wrap around
          if (p.y < 0) p.y = height;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Deep black to charcoal base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07070a] via-[#050507] to-[#030304]" />

      {/* Top central crimson radial glow */}
      <div 
        className="absolute -top-[250px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-20 blur-[130px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.45) 0%, rgba(153, 27, 27, 0.15) 50%, transparent 80%)'
        }}
      />

      {/* Subtle mid-page ambient crimson glow */}
      <div 
        className="absolute top-[45%] -left-[200px] w-[600px] h-[600px] rounded-full opacity-10 blur-[160px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.3) 0%, transparent 70%)'
        }}
      />

      <div 
        className="absolute top-[75%] -right-[200px] w-[650px] h-[650px] rounded-full opacity-10 blur-[160px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.25) 0%, transparent 70%)'
        }}
      />

      {/* Geometric architectural grid lines */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
        }}
      />

      {/* Cinematic vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.75) 100%)'
        }}
      />

      {/* Canvas for subtle graphite dust particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />
    </div>
  );
};
