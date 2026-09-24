import React, { useState } from 'react';
import { BookOpen, Sparkles, Quote, ChevronDown, ChevronUp, Feather } from 'lucide-react';
import { MascotIllustration } from './MascotIllustration';

export const StorySection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <section id="story" className="relative py-20 scroll-mt-20 overflow-hidden">
      {/* Subtle background red spotlight */}
      <div 
        className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[140px] opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.4) 0%, transparent 70%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-10 text-left">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-crimson uppercase mb-2">
            <BookOpen className="w-4 h-4 text-crimson" />
            <span>STORY OF THE DAY</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl tracking-wider text-white">
            THE BROKEN PENCIL
          </h2>
          <p className="text-zinc-400 text-base font-normal tracking-wide mt-1">
            Every test in life is either a wound or a sharpening.
          </p>
        </div>

        {/* Large Cinematic Card */}
        <div className="relative rounded-3xl bg-zinc-950/80 border border-zinc-800/90 shadow-2xl backdrop-blur-xl overflow-hidden p-6 sm:p-10 lg:p-12">
          
          {/* Subtle paper grain texture pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left side: Mascot & Story Illustration */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <MascotIllustration variant="story" className="w-full max-w-md" />
              
              <div className="mt-4 px-4 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800 text-[11px] font-mono text-zinc-400 text-center">
                “Every turn removes a little more of it. But it was preparing it to write.”
              </div>
            </div>

            {/* Right side: Story Prose & Lesson */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-2">
                  <Feather className="w-3.5 h-3.5 text-crimson" />
                  CHAPTER 01 • THE GRINDSTONE
                </span>

                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-xs font-mono text-zinc-300 transition-colors"
                >
                  <span>{isExpanded ? 'COLLAPSE' : 'READ STORY'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Story Narrative */}
              {isExpanded && (
                <div className="space-y-4 text-zinc-300 text-base sm:text-lg leading-relaxed font-sans mb-8 animate-in fade-in duration-300">
                  <p>
                    Arjun found an old, short pencil lying on his grandfather's desk.
                  </p>
                  <p>
                    He picked it up and said, <span className="italic text-zinc-200">“What's the use of this? It's almost finished.”</span>
                  </p>
                  <p>
                    His grandfather smiled. <span className="text-white font-medium">“Ask the pencil why it looks that way.”</span>
                  </p>
                  <p>
                    Arjun imagined the pencil speaking. It told him that every time its tip became dull, someone placed it inside a sharpener.
                  </p>
                  <p>
                    At first, it thought the sharpener was destroying it. Every turn removed a little more of it.
                  </p>
                  <p className="text-white font-medium">
                    But then it understood. The sharpener wasn't destroying the pencil. It was preparing it to write.
                  </p>
                  <p>
                    Arjun picked up the pencil and began writing. Even though it was small, it created beautiful words.
                  </p>
                </div>
              )}

              {/* Cinematic Quote Callout */}
              <div className="relative p-6 rounded-2xl bg-zinc-900/60 border border-crimson/30 shadow-red-glow-sm mb-6">
                <Quote className="w-8 h-8 text-crimson/40 absolute -top-3 left-6 -rotate-12" />
                <p className="font-display text-2xl sm:text-3xl tracking-wide text-white leading-snug">
                  “The sharpener wasn't destroying me. It was preparing me to write.”
                </p>
              </div>

              {/* Core Lesson */}
              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-crimson/10 border border-crimson/30 text-crimson flex-shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-crimson-400 uppercase tracking-widest font-semibold mb-0.5">
                    LESSON FOR TODAY
                  </div>
                  <div className="text-sm font-medium text-zinc-200">
                    Challenges can make you stronger, sharper, and better prepared.
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
