import React, { useState, useEffect } from 'react';
import { ArrowRight, Shield, Flame, Target } from 'lucide-react';
import { MascotIllustration } from './MascotIllustration';

interface HeroProps {
  onStartClick: () => void;
  onViewPlannerClick: () => void;
  currentDateStr: string;
}

export const Hero: React.FC<HeroProps> = ({
  onStartClick,
  onViewPlannerClick,
}) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="today" className="relative min-h-[85vh] flex items-center justify-center pt-8 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">

            {/* Main Headline */}
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-wider text-white leading-[0.92] mb-6 uppercase">
              SHARPEN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-crimson">
                YOUR DAY.
              </span>
            </h1>

            {/* Supporting Text */}
            <div className="text-zinc-300 text-lg sm:text-xl font-normal leading-relaxed mb-8 max-w-xl space-y-1">
              <p className="flex items-center gap-2 text-zinc-200">
                <span className="text-crimson font-bold">―</span> Plan your time.
              </p>
              <p className="flex items-center gap-2 text-zinc-200">
                <span className="text-crimson font-bold">―</span> Focus on what matters.
              </p>
              <p className="flex items-center gap-2 text-zinc-200">
                <span className="text-crimson font-bold">―</span> Improve every day.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <button
                type="button"
                onClick={onStartClick}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-crimson hover:bg-crimson-600 text-white font-mono font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-red-glow hover:shadow-red-glow-lg active:scale-95 w-full sm:w-auto"
              >
                <span>START TODAY</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={onViewPlannerClick}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/80 hover:border-crimson/60 text-zinc-200 hover:text-white font-mono font-semibold text-sm tracking-wider uppercase transition-all duration-300 w-full sm:w-auto"
              >
                <span>VIEW PLANNER</span>
              </button>
            </div>

            {/* Core Pillars: TIME + DISCIPLINE + GROWTH */}
            <div className="pt-6 border-t border-zinc-800/80 grid grid-cols-3 gap-6 w-full max-w-lg">
              <div>
                <div className="flex items-center gap-1.5 text-crimson text-xs font-mono mb-1">
                  <Shield className="w-3.5 h-3.5" />
                  <span>PILLAR 01</span>
                </div>
                <div className="font-display text-xl tracking-wider text-zinc-100">TIME</div>
                <div className="text-[11px] text-zinc-400 font-mono">Unforgiving & finite</div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-crimson text-xs font-mono mb-1">
                  <Flame className="w-3.5 h-3.5" />
                  <span>PILLAR 02</span>
                </div>
                <div className="font-display text-xl tracking-wider text-zinc-100">DISCIPLINE</div>
                <div className="text-[11px] text-zinc-400 font-mono">Action over emotion</div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-crimson text-xs font-mono mb-1">
                  <Target className="w-3.5 h-3.5" />
                  <span>PILLAR 03</span>
                </div>
                <div className="font-display text-xl tracking-wider text-zinc-100">GROWTH</div>
                <div className="text-[11px] text-zinc-400 font-mono">Honed by resistance</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Mascot & Clock Atmosphere */}
          <div className="lg:col-span-5 flex justify-center relative">
            {/* Live Clock HUD element */}
            <div className="absolute -top-6 right-2 sm:right-6 z-20 px-3.5 py-1.5 rounded-lg bg-background-darker/90 border border-zinc-800 shadow-xl backdrop-blur-md flex items-center gap-2 font-mono text-xs text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-crimson animate-ping" />
              <span>LIVE:</span>
              <span className="text-white font-bold tracking-widest">{timeStr || '00:00:00'}</span>
            </div>

            <MascotIllustration variant="hero" className="w-full max-w-md lg:max-w-none" />
          </div>

        </div>
      </div>
    </section>
  );
};
