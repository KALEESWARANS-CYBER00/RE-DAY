import React from 'react';
import { ChevronLeft, ChevronRight, Calendar, RotateCcw } from 'lucide-react';
import { formatDisplayDate, getRelativeDayLabel, getTodayDateString } from '../utils/storage';

interface DayNavigatorProps {
  selectedDate: string;
  onSelectDate: (newDate: string) => void;
}

export const DayNavigator: React.FC<DayNavigatorProps> = ({ selectedDate, onSelectDate }) => {
  const todayStr = getTodayDateString();
  const isToday = selectedDate === todayStr;
  const relativeLabel = getRelativeDayLabel(selectedDate);

  const handleShiftDay = (days: number) => {
    const [y, m, d] = selectedDate.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    date.setDate(date.getDate() + days);
    const newY = date.getFullYear();
    const newM = String(date.getMonth() + 1).padStart(2, '0');
    const newD = String(date.getDate()).padStart(2, '0');
    onSelectDate(`${newY}-${newM}-${newD}`);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-md mb-8">
      {/* Date shifting buttons */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => handleShiftDay(-1)}
          className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-colors"
          title="Previous Day"
          aria-label="Previous day"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800">
          <Calendar className="w-4 h-4 text-crimson" />
          <span className="font-mono text-sm font-semibold tracking-wider text-white">
            {formatDisplayDate(selectedDate)}
          </span>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
            isToday 
              ? 'bg-crimson/20 border border-crimson/50 text-crimson-300 font-bold' 
              : 'bg-zinc-800 text-zinc-400'
          }`}>
            {relativeLabel}
          </span>
        </div>

        <button
          type="button"
          onClick={() => handleShiftDay(1)}
          className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-colors"
          title="Next Day"
          aria-label="Next day"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Date input picker and Jump to Today button */}
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => e.target.value && onSelectDate(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 focus:border-crimson rounded-xl px-3 py-1.5 text-xs font-mono text-zinc-200 focus:outline-none transition-colors"
          aria-label="Choose specific date"
        />

        {!isToday && (
          <button
            type="button"
            onClick={() => onSelectDate(todayStr)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-crimson/15 hover:bg-crimson/25 border border-crimson/40 text-xs font-mono text-crimson-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RETURN TO TODAY</span>
          </button>
        )}
      </div>
    </div>
  );
};
