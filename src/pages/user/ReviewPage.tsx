import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Save 
} from 'lucide-react';
import { useTasks } from '../../context/TaskContext';
import { getTodayDateString, formatDisplayDate } from '../../utils/initialData';
import { Reflection } from '../../types';

export const ReviewPage: React.FC = () => {
  const { tasks, getReflection, saveReflection, focusSessions } = useTasks();
  const todayStr = getTodayDateString();

  const todayTasks = tasks.filter((t) => t.date === todayStr);
  const completedTasks = todayTasks.filter((t) => t.completed);
  const incompleteTasks = todayTasks.filter((t) => !t.completed);

  // Focus sessions completed today
  const todaySessions = focusSessions.filter((s) => s.completedAt.startsWith(todayStr));
  const totalFocusMinutes = todaySessions.reduce((acc, curr) => acc + curr.durationMinutes, 0);

  // Real stats
  const totalTasks = todayTasks.length;
  const completedCount = completedTasks.length;
  const incompleteCount = incompleteTasks.length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  // Reflection form
  const [wentWell, setWentWell] = useState('');
  const [distracted, setDistracted] = useState('');
  const [improveTomorrow, setImproveTomorrow] = useState('');
  const [savedFeedback, setSavedFeedback] = useState(false);

  useEffect(() => {
    const existing = getReflection(todayStr);
    if (existing) {
      setWentWell(existing.wentWell || '');
      setDistracted(existing.distracted || '');
      setImproveTomorrow(existing.improveTomorrow || '');
    }
  }, [todayStr, getReflection]);

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: Reflection = {
      date: todayStr,
      wentWell,
      distracted,
      improveTomorrow,
      savedAt: new Date().toISOString(),
    };
    saveReflection(updated);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Daily Review
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            {formatDisplayDate(todayStr)} • Audit today to prepare tomorrow
          </p>
        </div>
      </div>

      {/* Day Summary (Calculated from Real Data) */}
      <div>
        <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
          Day Summary
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="text-[11px] font-mono text-zinc-400 mb-1">TOTAL TASKS</div>
            <div className="text-2xl font-bold text-white">{totalTasks}</div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950 border border-emerald-500/30">
            <div className="text-[11px] font-mono text-emerald-400 mb-1">COMPLETED</div>
            <div className="text-2xl font-bold text-white">{completedCount}</div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="text-[11px] font-mono text-zinc-400 mb-1">INCOMPLETE</div>
            <div className="text-2xl font-bold text-white">{incompleteCount}</div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950 border border-crimson/40">
            <div className="text-[11px] font-mono text-crimson-400 mb-1">COMPLETION</div>
            <div className="text-2xl font-bold text-white">{completionPercentage}%</div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 col-span-2 sm:col-span-1">
            <div className="text-[11px] font-mono text-zinc-400 mb-1">FOCUS SESSIONS</div>
            <div className="text-2xl font-bold text-white">
              {todaySessions.length} <span className="text-xs text-zinc-500 font-mono">({totalFocusMinutes}m)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Completed & Incomplete Task Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Completed Tasks */}
        <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-5 flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white tracking-wide">
                Completed Tasks ({completedCount})
              </h3>
            </div>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto max-h-[300px]">
            {completedTasks.length === 0 ? (
              <div className="p-6 text-center text-xs font-mono text-zinc-500 italic">
                No tasks completed yet today.
              </div>
            ) : (
              completedTasks.map((t) => (
                <div
                  key={t.id}
                  className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs flex items-center justify-between gap-3"
                >
                  <span className="text-zinc-300 font-medium truncate">{t.title}</span>
                  <span className="text-[10px] font-mono text-zinc-500 flex-shrink-0">
                    {t.startTime} – {t.endTime}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Incomplete Tasks */}
        <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-5 flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <Circle className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white tracking-wide">
                Incomplete Tasks ({incompleteCount})
              </h3>
            </div>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto max-h-[300px]">
            {incompleteTasks.length === 0 ? (
              <div className="p-6 text-center text-xs font-mono text-emerald-400">
                All scheduled tasks completed.
              </div>
            ) : (
              incompleteTasks.map((t) => (
                <div
                  key={t.id}
                  className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs flex items-center justify-between gap-3"
                >
                  <span className="text-zinc-300 font-medium truncate">{t.title}</span>
                  <span className="text-[10px] font-mono text-crimson-400 flex-shrink-0">
                    {t.priority.replace('_', ' ')}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Daily Reflection Form */}
      <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-zinc-800">
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">
              Daily Reflection
            </h2>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              Review honestly before closing the day.
            </p>
          </div>

          {savedFeedback && (
            <span className="text-xs font-mono text-emerald-400">
              Reflection saved successfully.
            </span>
          )}
        </div>

        <form onSubmit={handleSaveReflection} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              1. What went well?
            </label>
            <textarea
              value={wentWell}
              onChange={(e) => setWentWell(e.target.value)}
              rows={3}
              placeholder="Outcomes achieved, disciplined moments, uninterrupted focus blocks..."
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl p-3.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-colors resize-none font-sans"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              2. What distracted me?
            </label>
            <textarea
              value={distracted}
              onChange={(e) => setDistracted(e.target.value)}
              rows={3}
              placeholder="Time leaks, unplanned interruptions, context switching, procrastination triggers..."
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl p-3.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-colors resize-none font-sans"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              3. What should I improve tomorrow?
            </label>
            <textarea
              value={improveTomorrow}
              onChange={(e) => setImproveTomorrow(e.target.value)}
              rows={3}
              placeholder="The single edge to hone first thing tomorrow morning..."
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl p-3.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-colors resize-none font-sans"
            />
          </div>

          <div className="flex items-center justify-end pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-crimson hover:bg-crimson-600 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save Reflection</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
