import React from 'react';
import { Clock, CheckCircle2, Zap, Hourglass } from 'lucide-react';
import { PlannerRowData } from '../types';

interface DailyProgressProps {
  plannerRows: PlannerRowData[];
  currentHour: number;
}

export const DailyProgress: React.FC<DailyProgressProps> = ({ plannerRows, currentHour }) => {
  const completedHours = plannerRows.filter((r) => r.status === 'DONE').length;
  const inProgressHours = plannerRows.filter((r) => r.status === 'IN_PROGRESS').length;
  const percentage = Math.round((completedHours / 24) * 100);
  const remainingHours = 24 - completedHours;

  return (
    <section className="relative py-8 border-y border-zinc-800/80 bg-background-surface/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header line */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-crimson uppercase mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
              <span>COMMAND DASHBOARD METRIC</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl tracking-wider text-white">
              TODAY'S PROGRESS
            </h2>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="font-display text-3xl sm:text-4xl text-crimson tracking-wider">
              {completedHours} <span className="text-zinc-600">/</span> 24 HOURS
            </span>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
              TODAY — <span className="text-white font-bold">{percentage}% COMPLETE</span>
            </span>
          </div>
        </div>

        {/* Cinematic Horizontal Progress Bar */}
        <div className="relative w-full h-5 bg-zinc-950 rounded-full border border-zinc-800 overflow-hidden p-0.5 shadow-inner mb-4">
          {/* Main animated glowing fill */}
          <div
            className="h-full bg-gradient-to-r from-crimson-800 via-crimson to-crimson-400 rounded-full transition-all duration-700 ease-out relative shadow-red-glow"
            style={{ width: `${Math.max(percentage, 2)}%` }}
          >
            {/* Gloss shine line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/30 rounded-t-full" />
          </div>

          {/* Current Hour Indicator Marker line on the progress bar */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none transition-all duration-300 z-10"
            style={{ left: `${(currentHour / 24) * 100}%` }}
            title={`Current Hour: ${String(currentHour).padStart(2, '0')}:00`}
          />
        </div>

        {/* 24-Hour Segmented Timeline Overview */}
        <div className="hidden sm:grid grid-cols-24 gap-1 w-full mb-6">
          {plannerRows.map((row) => {
            const isDone = row.status === 'DONE';
            const isInProgress = row.status === 'IN_PROGRESS';
            const isCurrent = row.hour === currentHour;

            let bgColor = 'bg-zinc-900/60 border-zinc-800/80 text-zinc-500';
            if (isDone) {
              bgColor = 'bg-crimson/90 border-crimson text-white shadow-red-glow-sm';
            } else if (isInProgress) {
              bgColor = 'bg-amber-500/80 border-amber-400 text-black';
            } else if (isCurrent) {
              bgColor = 'bg-zinc-800 border-crimson ring-1 ring-crimson text-white';
            }

            return (
              <div
                key={row.id}
                className={`relative flex flex-col items-center justify-center py-1.5 px-0.5 rounded border text-[10px] font-mono transition-all group cursor-default ${bgColor}`}
                title={`${row.timeLabel} • ${row.status}${isCurrent ? ' (CURRENT HOUR)' : ''}`}
              >
                <span>{String(row.hour).padStart(2, '0')}</span>
                {isCurrent && (
                  <span className="w-1 h-1 rounded-full bg-crimson absolute -top-1 animate-ping" />
                )}
              </div>
            );
          })}
        </div>

        {/* Metric summary chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <div className="p-2 rounded-lg bg-crimson/10 border border-crimson/20 text-crimson">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-zinc-400 uppercase">COMPLETED</div>
              <div className="font-display text-xl text-white tracking-wide">{completedHours} Hours</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Hourglass className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-zinc-400 uppercase">IN PROGRESS</div>
              <div className="font-display text-xl text-white tracking-wide">{inProgressHours} Blocks</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-zinc-400 uppercase">CURRENT HOUR</div>
              <div className="font-display text-xl text-white tracking-wide">
                {String(currentHour).padStart(2, '0')}:00 – {String((currentHour + 1) % 24).padStart(2, '0')}:00
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <div className="p-2 rounded-lg bg-crimson/10 border border-crimson/20 text-crimson">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-zinc-400 uppercase">REMAINING</div>
              <div className="font-display text-xl text-white tracking-wide">{remainingHours} Hours</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
