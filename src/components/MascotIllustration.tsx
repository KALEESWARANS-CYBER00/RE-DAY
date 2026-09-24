import React from 'react';

interface MascotProps {
  variant?: 'hero' | 'story' | 'badge' | 'avatar';
  className?: string;
}

export const MascotIllustration: React.FC<MascotProps> = ({ variant = 'hero', className = '' }) => {
  if (variant === 'badge' || variant === 'avatar') {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-950 border border-zinc-700/60 p-1.5 shadow-red-glow-sm relative group overflow-hidden">
          {/* Subtle red corner glow */}
          <div className="absolute -top-3 -right-3 w-8 h-8 bg-crimson/30 rounded-full blur-md" />
          
          {/* Vector Pencil Blade Logo */}
          <svg viewBox="0 0 40 40" fill="none" className="w-full h-full relative z-10">
            {/* Pencil Katana Blade */}
            <path
              d="M20 3 L27 15 L23 35 L17 35 L13 15 Z"
              fill="#18181b"
              stroke="#dc2626"
              strokeWidth="1.5"
            />
            {/* Graphite tip */}
            <path d="M20 3 L23 10 L17 10 Z" fill="#ffffff" />
            <path d="M20 3 L21.5 7 L18.5 7 Z" fill="#dc2626" />
            {/* Wood bevel */}
            <path d="M17 10 L20 3 L23 10 L27 15 L13 15 Z" fill="#27272a" />
            {/* Red center fuller / groove */}
            <line x1="20" y1="12" x2="20" y2="33" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
            {/* Tsuba / Crossguard */}
            <rect x="11" y="32" width="18" height="2.5" rx="1" fill="#dc2626" />
            {/* Hilt / Eraser */}
            <rect x="16" y="34.5" width="8" height="3" rx="1" fill="#71717a" />
          </svg>
        </div>
      </div>
    );
  }

  if (variant === 'story') {
    return (
      <div className={`relative group ${className}`}>
        {/* Atmospheric backlight */}
        <div className="absolute -inset-2 bg-gradient-to-r from-crimson/20 to-transparent rounded-2xl blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-700" />
        
        <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-background-card shadow-2xl">
          <img
            src="/images/mascot-story.jpg"
            alt="SHARPEN mascot examining the weathered pencil and sharpener"
            className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-700"
            loading="lazy"
          />
          {/* Bottom cinematic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background-darker via-transparent to-transparent opacity-60" />
          
          {/* Subtle rim highlight border */}
          <div className="absolute inset-0 border border-crimson/20 rounded-2xl pointer-events-none" />
          
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
              THE CRAFT OF ENDURANCE
            </span>
            <span className="tracking-widest uppercase text-crimson-400">LESSON 01</span>
          </div>
        </div>
      </div>
    );
  }

  // Hero variant
  return (
    <div className={`relative select-none ${className}`}>
      {/* Giant subtle clock silhouette glow behind the mascot */}
      <div 
        className="absolute -inset-8 rounded-full blur-2xl opacity-40 pointer-events-none animate-pulse-subtle"
        style={{
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.4) 0%, rgba(0, 0, 0, 0.8) 70%)'
        }}
      />

      {/* Main mascot display */}
      <div className="relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-950/60 shadow-2xl group">
        <div className="relative aspect-square max-w-[480px] mx-auto overflow-hidden">
          <img
            src="/images/mascot-hero.jpg"
            alt="SHARPEN original cartoon mascot - warrior holding a giant pencil katana"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            loading="eager"
          />
          
          {/* Cinematic rim vignette & lighting */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
          
          {/* High-tech badge floating overlay */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background-darker/80 backdrop-blur-md border border-crimson/40 text-xs font-mono tracking-wider text-zinc-200">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-ping" />
            <span>MASCOT: KURO • WARRIOR OF TIME</span>
          </div>

          <div className="absolute bottom-4 right-4 px-3 py-1 rounded bg-background-darker/90 backdrop-blur-md border border-zinc-800 text-[10px] font-mono tracking-widest text-zinc-400">
            WEAPON: 0.5MM GRAPHITE BLADE
          </div>
        </div>
      </div>

      {/* Red accent line decoration */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-crimson to-transparent" />
    </div>
  );
};
