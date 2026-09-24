import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-zinc-800/80 bg-background-darker py-16 overflow-hidden">
      {/* Subtle bottom red glow */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.5) 0%, transparent 70%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center relative z-10">
        
        {/* Large Cinematic Statement */}
        <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-widest text-white leading-none mb-3">
          ONE DAY. <span className="text-crimson">ONE CHANCE.</span>
        </h2>

        {/* Small text */}
        <p className="text-sm sm:text-base font-mono tracking-[0.3em] text-zinc-400 uppercase mb-4">
          SHARPEN EVERY DAY.
        </p>

        {/* Core Tagline */}
        <div className="flex items-center gap-3 text-xs sm:text-sm font-mono tracking-widest text-zinc-500 uppercase mb-10">
          <span>PLAN</span>
          <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
          <span>EXECUTE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
          <span>IMPROVE</span>
        </div>

        {/* Back to top button */}
        <button
          type="button"
          onClick={scrollToTop}
          className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-crimson text-xs font-mono text-zinc-400 hover:text-white transition-all shadow-sm"
          aria-label="Return to top of page"
        >
          <span>RETURN TO APEX</span>
          <ArrowUp className="w-4 h-4 text-crimson group-hover:-translate-y-1 transition-transform" />
        </button>

        <div className="mt-12 text-[11px] font-mono text-zinc-600">
          SHARPEN COMMAND CENTER • ZERO COMPROMISE DISCIPLINE
        </div>

      </div>
    </footer>
  );
};
