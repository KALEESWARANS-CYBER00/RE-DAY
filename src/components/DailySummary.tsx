import React from 'react';
import { 
  Trophy, 
  CheckCircle2, 
  Clock, 
  ListTodo, 
  Brain, 
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DayData } from '../types';

interface DailySummaryProps {
  dayData: DayData;
}

export const DailySummary: React.FC<DailySummaryProps> = ({ dayData }) => {
  const { plannerRows, matrixTasks, reflection } = dayData;

  const hoursCompleted = plannerRows.filter((r) => r.status === 'DONE').length;
  const plannerTasksCompleted = plannerRows.filter(
    (r) => r.status === 'DONE' && (r.activityFirstHalf || r.activitySecondHalf)
  ).length;

  const matrixTotal = matrixTasks.length;
  const matrixCompleted = matrixTasks.filter((t) => t.completed).length;

  const reflectionFilledCount =
    (reflection.accomplishments.trim() ? 1 : 0) +
    (reflection.learnings.trim() ? 1 : 0) +
    (reflection.improvements.trim() ? 1 : 0);

  // Balanced Score calculation:
  // Planner completion: 50%
  // Matrix completion: 30%
  // Reflection: 20%
  const plannerScore = (hoursCompleted / 24) * 50;
  const matrixScore = matrixTotal > 0 ? (matrixCompleted / matrixTotal) * 30 : 15;
  const reflectionScore = (reflectionFilledCount / 3) * 20;

  const totalScore = Math.min(100, Math.round(plannerScore + matrixScore + reflectionScore));

  const handleCelebrate = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#dc2626', '#ffffff', '#71717a'],
    });
  };

  let verdict = "DAY IN MOTION";
  if (totalScore >= 80) verdict = "HONED TO PERFECTION";
  else if (totalScore >= 60) verdict = "STRONG DISCIPLINE";
  else if (totalScore >= 40) verdict = "STEADY MOMENTUM";

  return (
    <section className="relative py-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Review Card */}
        <div className="relative rounded-3xl bg-zinc-950/80 border border-zinc-800 shadow-2xl backdrop-blur-md p-6 sm:p-10 overflow-hidden">
          
          {/* Subtle red background glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-crimson/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            {/* Left Column: Heading and Stats */}
            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-crimson uppercase mb-2">
                <Trophy className="w-4 h-4 text-crimson" />
                <span>DAILY PERFORMANCE SCORECARD</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-white mb-2">
                TODAY'S REVIEW
              </h2>
              <p className="text-zinc-400 text-sm font-mono mb-8">
                VERDICT: <span className="text-white font-bold tracking-wider">{verdict}</span>
              </p>

              {/* 4 Summary Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono mb-1">
                    <Clock className="w-3.5 h-3.5 text-crimson" />
                    <span>HOURS DONE</span>
                  </div>
                  <div className="font-display text-2xl sm:text-3xl text-white">
                    {hoursCompleted} <span className="text-zinc-600 text-lg">/ 24</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-crimson" />
                    <span>TASKS DONE</span>
                  </div>
                  <div className="font-display text-2xl sm:text-3xl text-white">
                    {plannerTasksCompleted} <span className="text-zinc-600 text-lg">Blocks</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono mb-1">
                    <ListTodo className="w-3.5 h-3.5 text-crimson" />
                    <span>MATRIX TASKS</span>
                  </div>
                  <div className="font-display text-2xl sm:text-3xl text-white">
                    {matrixCompleted} <span className="text-zinc-600 text-lg">/ {matrixTotal}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono mb-1">
                    <Brain className="w-3.5 h-3.5 text-crimson" />
                    <span>REFLECTION</span>
                  </div>
                  <div className="font-display text-2xl sm:text-3xl text-white">
                    {reflectionFilledCount} <span className="text-zinc-600 text-lg">/ 3</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Score Gauge & Celebrate */}
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 min-w-[260px] text-center">
              
              <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                {/* SVG circular progress */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#27272a"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#dc2626"
                    strokeWidth="8"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * totalScore) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display text-4xl text-white tracking-wider">{totalScore}%</span>
                  <span className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase">SCORE</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCelebrate}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white text-xs font-mono tracking-wider transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-crimson" />
                <span>HONOR PROGRESS</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
