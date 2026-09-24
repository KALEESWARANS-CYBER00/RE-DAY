import React, { useState } from 'react';
import { Save, Brain, CheckCircle } from 'lucide-react';
import { DailyReflection as ReflectionType } from '../types';

interface DailyReflectionProps {
  reflection: ReflectionType;
  onUpdateReflection: (updates: Partial<ReflectionType>) => void;
  onSaveReflection: () => void;
}

export const DailyReflection: React.FC<DailyReflectionProps> = ({
  reflection,
  onUpdateReflection,
  onSaveReflection,
}) => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const isCard1Filled = reflection.accomplishments.trim().length > 0;
  const isCard2Filled = reflection.learnings.trim().length > 0;
  const isCard3Filled = reflection.improvements.trim().length > 0;

  const completedCount = (isCard1Filled ? 1 : 0) + (isCard2Filled ? 1 : 0) + (isCard3Filled ? 1 : 0);

  return (
    <section id="reflection" className="relative py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-crimson uppercase mb-2">
              <Brain className="w-4 h-4 text-crimson" />
              <span>EVENING AUDIT</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl tracking-wider text-white">
              SHARPEN YOURSELF.
            </h2>
            <p className="text-zinc-400 text-base font-normal tracking-wide mt-1">
              Before tomorrow begins, understand today.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-400">
              AUDIT STATUS: <strong className="text-white">{completedCount} / 3 ANSWERED</strong>
            </span>
            <button
              type="button"
              onClick={onSaveReflection}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-crimson hover:bg-crimson-600 text-white text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-red-glow hover:shadow-red-glow-lg active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>SAVE REFLECTION</span>
            </button>
          </div>
        </div>

        {/* Three Reflection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Card 1: What did I accomplish? */}
          <div
            className={`relative rounded-2xl p-6 bg-background-card/90 border backdrop-blur-md transition-all duration-300 flex flex-col min-h-[300px] ${
              activeCard === 1
                ? 'border-crimson ring-1 ring-crimson shadow-red-glow-sm'
                : 'border-zinc-800/90 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-crimson tracking-widest">
                QUESTION 01
              </span>
              {isCard1Filled ? (
                <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                  LOGGED
                </span>
              ) : (
                <span className="text-[11px] font-mono text-zinc-500">PENDING</span>
              )}
            </div>

            <h3 className="font-display text-2xl tracking-wide text-white mb-2">
              What did I accomplish?
            </h3>
            <p className="text-xs text-zinc-400 font-mono mb-4">
              Celebrate concrete completed outcomes, no matter how small.
            </p>

            <textarea
              value={reflection.accomplishments}
              onChange={(e) => onUpdateReflection({ accomplishments: e.target.value })}
              onFocus={() => setActiveCard(1)}
              onBlur={() => setActiveCard(null)}
              rows={6}
              placeholder="I shipped the deployment pipeline, defended 3 hours of deep work, and finished..."
              className="w-full flex-1 bg-zinc-900/80 border border-zinc-800 focus:border-crimson rounded-xl p-3.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-colors resize-none font-sans"
            />
          </div>

          {/* Card 2: What did I learn? */}
          <div
            className={`relative rounded-2xl p-6 bg-background-card/90 border backdrop-blur-md transition-all duration-300 flex flex-col min-h-[300px] ${
              activeCard === 2
                ? 'border-crimson ring-1 ring-crimson shadow-red-glow-sm'
                : 'border-zinc-800/90 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-crimson tracking-widest">
                QUESTION 02
              </span>
              {isCard2Filled ? (
                <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                  LOGGED
                </span>
              ) : (
                <span className="text-[11px] font-mono text-zinc-500">PENDING</span>
              )}
            </div>

            <h3 className="font-display text-2xl tracking-wide text-white mb-2">
              What did I learn?
            </h3>
            <p className="text-xs text-zinc-400 font-mono mb-4">
              Turn resistance, friction, and mistakes into durable wisdom.
            </p>

            <textarea
              value={reflection.learnings}
              onChange={(e) => onUpdateReflection({ learnings: e.target.value })}
              onFocus={() => setActiveCard(2)}
              onBlur={() => setActiveCard(null)}
              rows={6}
              placeholder="I noticed that morning interruptions derail my focus. I discovered that writing..."
              className="w-full flex-1 bg-zinc-900/80 border border-zinc-800 focus:border-crimson rounded-xl p-3.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-colors resize-none font-sans"
            />
          </div>

          {/* Card 3: What will I improve tomorrow? */}
          <div
            className={`relative rounded-2xl p-6 bg-background-card/90 border backdrop-blur-md transition-all duration-300 flex flex-col min-h-[300px] ${
              activeCard === 3
                ? 'border-crimson ring-1 ring-crimson shadow-red-glow-sm'
                : 'border-zinc-800/90 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-crimson tracking-widest">
                QUESTION 03
              </span>
              {isCard3Filled ? (
                <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                  LOGGED
                </span>
              ) : (
                <span className="text-[11px] font-mono text-zinc-500">PENDING</span>
              )}
            </div>

            <h3 className="font-display text-2xl tracking-wide text-white mb-2">
              What will I improve tomorrow?
            </h3>
            <p className="text-xs text-zinc-400 font-mono mb-4">
              Define the single edge you will hone first thing in the morning.
            </p>

            <textarea
              value={reflection.improvements}
              onChange={(e) => onUpdateReflection({ improvements: e.target.value })}
              onFocus={() => setActiveCard(3)}
              onBlur={() => setActiveCard(null)}
              rows={6}
              placeholder="Tomorrow I will start at 08:00 sharp without opening email first..."
              className="w-full flex-1 bg-zinc-900/80 border border-zinc-800 focus:border-crimson rounded-xl p-3.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-colors resize-none font-sans"
            />
          </div>

        </div>

      </div>
    </section>
  );
};
