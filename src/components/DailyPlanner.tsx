import React, { useRef } from 'react';
import { 
  Save, 
  RotateCcw, 
  Check, 
  LocateFixed, 
  CheckCircle2, 
  Circle, 
  Hourglass,
  LayoutTemplate
} from 'lucide-react';
import { PlannerRowData, PriorityType, StatusType } from '../types';

interface DailyPlannerProps {
  rows: PlannerRowData[];
  currentHour: number;
  onUpdateRow: (id: string, updates: Partial<PlannerRowData>) => void;
  onSaveDay: () => void;
  onResetDay: () => void;
  onClearCompleted: () => void;
  onLoadTemplate: () => void;
}

export const DailyPlanner: React.FC<DailyPlannerProps> = ({
  rows,
  currentHour,
  onUpdateRow,
  onSaveDay,
  onResetDay,
  onClearCompleted,
  onLoadTemplate,
}) => {
  const rowRefs = useRef<{ [key: number]: HTMLTableRowElement | null }>({});

  const handleJumpToNow = () => {
    const el = rowRefs.current[currentHour];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="planner" className="relative py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-crimson uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
              <span>TIME MASTERY MATRIX</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl tracking-wider text-white">
              YOUR 24 HOURS
            </h2>
            <p className="text-zinc-400 text-base font-normal tracking-wide mt-1">
              Own your time before your time owns you.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleJumpToNow}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700/80 hover:border-crimson text-zinc-300 hover:text-white text-xs font-mono tracking-wider transition-colors shadow-sm"
              title="Scroll directly to the current active hour"
            >
              <LocateFixed className="w-3.5 h-3.5 text-crimson" />
              <span>JUMP TO NOW</span>
            </button>

            <button
              type="button"
              onClick={onSaveDay}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-crimson hover:bg-crimson-600 text-white text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-red-glow hover:shadow-red-glow-lg active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>SAVE DAY</span>
            </button>

            <button
              type="button"
              onClick={onLoadTemplate}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-mono tracking-wider transition-colors"
              title="Load standard high-performance daily blueprint"
            >
              <LayoutTemplate className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden sm:inline">LOAD BLUEPRINT</span>
              <span className="sm:hidden">BLUEPRINT</span>
            </button>

            <button
              type="button"
              onClick={onClearCompleted}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 text-xs font-mono tracking-wider transition-colors"
              title="Reset status of completed hours back to TODO"
            >
              <Check className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden sm:inline">CLEAR COMPLETED</span>
              <span className="sm:hidden">CLEAR</span>
            </button>

            <button
              type="button"
              onClick={onResetDay}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-crimson/50 text-zinc-400 hover:text-crimson text-xs font-mono tracking-wider transition-colors"
              title="Wipe current day data with confirmation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET DAY</span>
            </button>
          </div>
        </div>

        {/* Priority Legend Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 mb-6 text-xs font-mono">
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="text-zinc-500 font-semibold uppercase">PRIORITY KEY:</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-zinc-300">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-crimson shadow-red-glow-sm" />
              <strong className="text-white">NOW</strong>
              <span className="text-zinc-500 hidden sm:inline">(Urgent + Important)</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <strong className="text-white">PLAN</strong>
              <span className="text-zinc-500 hidden sm:inline">(Important + Not Urgent)</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <strong className="text-white">DELEGATE</strong>
              <span className="text-zinc-500 hidden sm:inline">(Urgent + Not Important)</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
              <strong className="text-white">REMOVE</strong>
              <span className="text-zinc-500 hidden sm:inline">(Not Urgent + Not Important)</span>
            </span>
          </div>
        </div>

        {/* 24-HOUR TABLE CONTAINER */}
        <div className="rounded-2xl border border-zinc-800/90 bg-background-card/90 backdrop-blur-md shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[950px]">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950/80 text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
                  <th className="py-4 px-4 w-36">1. TIME</th>
                  <th className="py-4 px-4 w-[24%]">2. ACTIVITY — FIRST HALF</th>
                  <th className="py-4 px-4 w-[24%]">3. ACTIVITY — SECOND HALF</th>
                  <th className="py-4 px-4 w-36">4. PRIORITY</th>
                  <th className="py-4 px-4">5. NEXT IMPROVEMENT</th>
                  <th className="py-4 px-4 w-36 text-center">6. STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 font-sans">
                {rows.map((row) => {
                  const isCurrentHour = row.hour === currentHour;
                  const isDone = row.status === 'DONE';
                  const isInProgress = row.status === 'IN_PROGRESS';

                  let rowBgClass = 'hover:bg-zinc-900/40 transition-colors';
                  if (isCurrentHour) {
                    rowBgClass = 'bg-crimson/5 hover:bg-crimson/10 relative';
                  } else if (isDone) {
                    rowBgClass = 'bg-zinc-950/40 opacity-75 hover:opacity-95 transition-opacity';
                  }

                  return (
                    <tr
                      key={row.id}
                      ref={(el) => (rowRefs.current[row.hour] = el)}
                      className={`group ${rowBgClass} ${
                        isCurrentHour ? 'ring-1 ring-inset ring-crimson/60 shadow-red-glow-sm' : ''
                      }`}
                    >
                      {/* 1. TIME */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className={`font-mono text-xs font-semibold ${
                            isCurrentHour ? 'text-white' : 'text-zinc-300'
                          }`}>
                            {row.timeLabel}
                          </span>
                          {isCurrentHour && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-crimson text-white text-[10px] font-mono font-bold tracking-widest uppercase animate-pulse shadow-red-glow-sm">
                              NOW
                            </span>
                          )}
                        </div>
                      </td>

                      {/* 2. ACTIVITY — FIRST HALF (:00 - :30) */}
                      <td className="py-2.5 px-3">
                        <input
                          type="text"
                          value={row.activityFirstHalf}
                          onChange={(e) => onUpdateRow(row.id, { activityFirstHalf: e.target.value })}
                          placeholder=":00 – :30 action..."
                          className={`w-full bg-transparent hover:bg-zinc-900/60 focus:bg-zinc-900/90 rounded-lg px-2.5 py-1.5 text-xs text-zinc-100 placeholder:text-zinc-600 border border-transparent hover:border-zinc-800 focus:border-crimson/60 focus:outline-none transition-all ${
                            isDone ? 'line-through text-zinc-400' : ''
                          }`}
                        />
                      </td>

                      {/* 3. ACTIVITY — SECOND HALF (:30 - :00) */}
                      <td className="py-2.5 px-3">
                        <input
                          type="text"
                          value={row.activitySecondHalf}
                          onChange={(e) => onUpdateRow(row.id, { activitySecondHalf: e.target.value })}
                          placeholder=":30 – :00 action..."
                          className={`w-full bg-transparent hover:bg-zinc-900/60 focus:bg-zinc-900/90 rounded-lg px-2.5 py-1.5 text-xs text-zinc-100 placeholder:text-zinc-600 border border-transparent hover:border-zinc-800 focus:border-crimson/60 focus:outline-none transition-all ${
                            isDone ? 'line-through text-zinc-400' : ''
                          }`}
                        />
                      </td>

                      {/* 4. PRIORITY (NOW, PLAN, DELEGATE, REMOVE) */}
                      <td className="py-2.5 px-3">
                        <select
                          value={row.priority}
                          onChange={(e) => onUpdateRow(row.id, { priority: e.target.value as PriorityType })}
                          className={`w-full bg-zinc-900/70 border rounded-lg px-2.5 py-1.5 text-xs font-mono font-medium focus:outline-none focus:border-crimson transition-all ${
                            row.priority === 'NOW'
                              ? 'border-crimson/50 text-crimson-400'
                              : row.priority === 'PLAN'
                              ? 'border-emerald-500/40 text-emerald-400'
                              : row.priority === 'DELEGATE'
                              ? 'border-amber-400/40 text-amber-300'
                              : row.priority === 'REMOVE'
                              ? 'border-zinc-600 text-zinc-400'
                              : 'border-zinc-800 text-zinc-500'
                          }`}
                        >
                          <option value="">— SELECT —</option>
                          <option value="NOW">🔴 NOW</option>
                          <option value="PLAN">🟢 PLAN</option>
                          <option value="DELEGATE">🟡 DELEGATE</option>
                          <option value="REMOVE">⚫ REMOVE</option>
                        </select>
                      </td>

                      {/* 5. NEXT IMPROVEMENT */}
                      <td className="py-2.5 px-3">
                        <input
                          type="text"
                          value={row.nextImprovement}
                          onChange={(e) => onUpdateRow(row.id, { nextImprovement: e.target.value })}
                          placeholder="Refinement notes / lesson..."
                          className="w-full bg-transparent hover:bg-zinc-900/60 focus:bg-zinc-900/90 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 placeholder:text-zinc-600 border border-transparent hover:border-zinc-800 focus:border-zinc-700 focus:outline-none transition-all"
                        />
                      </td>

                      {/* 6. STATUS (TODO, IN PROGRESS, DONE) */}
                      <td className="py-2.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              const nextStatus: StatusType =
                                row.status === 'TODO'
                                  ? 'IN_PROGRESS'
                                  : row.status === 'IN_PROGRESS'
                                  ? 'DONE'
                                  : 'TODO';
                              onUpdateRow(row.id, { status: nextStatus });
                            }}
                            className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                              isDone
                                ? 'bg-crimson/20 border border-crimson text-crimson-300 shadow-red-glow-sm'
                                : isInProgress
                                ? 'bg-amber-500/20 border border-amber-500 text-amber-300'
                                : 'bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                            }`}
                          >
                            {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-crimson" />}
                            {isInProgress && <Hourglass className="w-3.5 h-3.5 text-amber-400" />}
                            {!isDone && !isInProgress && <Circle className="w-3.5 h-3.5 text-zinc-500" />}
                            <span>{row.status.replace('_', ' ')}</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Motivational microcopy banner */}
        <div className="mt-8 flex items-center justify-between text-xs font-mono text-zinc-500 px-4">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
            DISCIPLINE BEFORE MOTIVATION.
          </span>
          <span className="tracking-widest">
            24 HOURLY BLOCKS • ALL SAVED LOCALLY
          </span>
        </div>

      </div>
    </section>
  );
};
