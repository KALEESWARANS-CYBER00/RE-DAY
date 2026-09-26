import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ArrowLeft, 
  Check
} from 'lucide-react';
import { useTasks } from '../../context/TaskContext';
import { getTodayDateString } from '../../utils/initialData';

export const FocusPage: React.FC = () => {
  const navigate = useNavigate();
  const { tasks, toggleTaskComplete, addFocusSession } = useTasks();

  const todayStr = getTodayDateString();
  const pendingTasks = tasks.filter((t) => t.date === todayStr && !t.completed);

  // Selected task state
  const [selectedTaskId, setSelectedTaskId] = useState<string>(
    pendingTasks.length > 0 ? pendingTasks[0].id : ''
  );

  // Timer settings
  const [durationMinutes, setDurationMinutes] = useState<number>(25);
  const [customInput, setCustomInput] = useState<string>('25');
  const [secondsRemaining, setSecondsRemaining] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<string>('');

  const timerRef = useRef<number | null>(null);

  const selectedTask = tasks.find((t) => t.id === selectedTaskId);

  // Reset timer whenever duration changes
  const handleSelectDuration = (minutes: number) => {
    setIsRunning(false);
    setDurationMinutes(minutes);
    setSecondsRemaining(minutes * 60);
  };

  const handleCustomDurationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(customInput, 10);
    if (!isNaN(parsed) && parsed > 0 && parsed <= 180) {
      handleSelectDuration(parsed);
    }
  };

  // Timer countdown effect
  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            // Record focus session
            if (selectedTask) {
              addFocusSession({
                taskId: selectedTask.id,
                taskTitle: selectedTask.title,
                durationMinutes,
                completedAt: new Date().toISOString(),
              });
            }
            setShowNotification('Focus block completed.');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, durationMinutes, selectedTask, addFocusSession]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSecondsRemaining(durationMinutes * 60);
  };

  const handleCompleteTask = () => {
    if (selectedTaskId) {
      toggleTaskComplete(selectedTaskId);
      addFocusSession({
        taskId: selectedTaskId,
        taskTitle: selectedTask ? selectedTask.title : 'Focus Session',
        durationMinutes: Math.round((durationMinutes * 60 - secondsRemaining) / 60) || durationMinutes,
        completedAt: new Date().toISOString(),
      });
      setShowNotification('Task marked complete.');
      // Switch to next pending task if available
      const remaining = pendingTasks.filter((t) => t.id !== selectedTaskId);
      if (remaining.length > 0) {
        setSelectedTaskId(remaining[0].id);
      } else {
        setSelectedTaskId('');
      }
      handleReset();
    }
  };

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="max-w-2xl mx-auto py-6 space-y-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Focus</span>
        </button>

        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
          DISTRACTION-FREE FOCUS
        </span>
      </div>

      {showNotification && (
        <div className="p-3 rounded-xl bg-crimson/15 border border-crimson/40 text-xs text-crimson-200 flex items-center justify-between">
          <span>{showNotification}</span>
          <button 
            type="button" 
            onClick={() => setShowNotification('')} 
            className="text-zinc-400 hover:text-white font-mono text-xs"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Focus Card */}
      <div className="rounded-3xl bg-zinc-950 border border-zinc-800 p-8 sm:p-12 text-center shadow-2xl space-y-8">
        {/* Task Selection */}
        <div className="space-y-2 max-w-md mx-auto">
          <label className="block text-xs font-mono uppercase text-zinc-400">
            Current Task
          </label>
          {pendingTasks.length === 0 ? (
            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 font-mono">
              No pending tasks today. Create one in the planner.
            </div>
          ) : (
            <select
              value={selectedTaskId}
              onChange={(e) => setSelectedTaskId(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl px-4 py-2.5 text-sm text-white font-medium focus:outline-none transition-colors"
            >
              {pendingTasks.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title} ({t.priority.replace('_', ' ')})
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Giant Timer Display */}
        <div className="select-none py-4">
          <div className="font-display text-8xl sm:text-9xl tracking-widest text-white leading-none font-bold">
            {timeFormatted}
          </div>
        </div>

        {/* Timer Control Buttons */}
        <div className="flex items-center justify-center gap-4">
          {!isRunning ? (
            <button
              type="button"
              onClick={handleStart}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-crimson hover:bg-crimson-600 text-white font-mono font-bold text-sm tracking-wider uppercase transition-colors shadow-sm"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePause}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-mono font-bold text-sm tracking-wider uppercase transition-colors"
            >
              <Pause className="w-4 h-4 fill-white" />
              <span>Pause</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors"
            title="Reset Timer"
            aria-label="Reset Timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Duration Selectors */}
        <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-center gap-2">
          {[25, 45, 60].map((mins) => (
            <button
              key={mins}
              type="button"
              onClick={() => handleSelectDuration(mins)}
              className={`px-4 py-1.5 rounded-xl text-xs font-mono font-semibold transition-colors ${
                durationMinutes === mins
                  ? 'bg-crimson/20 border border-crimson text-crimson-300'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {mins}m
            </button>
          ))}

          {/* Custom Duration Input */}
          <form onSubmit={handleCustomDurationSubmit} className="flex items-center gap-1.5 ml-2">
            <input
              type="number"
              min="1"
              max="180"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="w-16 bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl px-2.5 py-1.5 text-xs font-mono text-center text-white focus:outline-none"
              placeholder="mins"
            />
            <button
              type="submit"
              className="px-2.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400 hover:text-white"
            >
              Set
            </button>
          </form>
        </div>

        {/* Complete Task Button */}
        {selectedTaskId && (
          <div className="pt-2">
            <button
              type="button"
              onClick={handleCompleteTask}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/60 text-zinc-300 hover:text-emerald-400 text-xs font-mono font-semibold tracking-wider transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Mark Task Complete & Log Session</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
