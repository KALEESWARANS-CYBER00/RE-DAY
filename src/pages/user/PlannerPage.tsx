import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  Circle, 
  Trash2, 
  Edit2, 
  LocateFixed, 
  LayoutList, 
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  Flame,
  UserCheck,
  Ban
} from 'lucide-react';
import { useTasks } from '../../context/TaskContext';
import { Task, PriorityType, StatusType } from '../../types';
import { getTodayDateString, formatDisplayDate } from '../../utils/initialData';
import { TaskModal } from '../../components/tasks/TaskModal';

const HOURS = Array.from({ length: 24 }, (_, i) => {
  const start = String(i).padStart(2, '0');
  const end = String((i + 1) % 24).padStart(2, '0');
  return {
    hour: i,
    label: `${start}:00 – ${end}:00`,
    startTime: `${start}:00`,
    endTime: `${end}:00`,
  };
});

export const PlannerPage: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask, toggleTaskComplete } = useTasks();
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDateString());
  const [activeView, setActiveView] = useState<'timeline' | 'matrix'>('timeline');
  const [currentHour, setCurrentHour] = useState<number>(new Date().getHours());
  
  // Modal state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [modalInitialTime, setModalInitialTime] = useState<string>('09:00');
  const [modalInitialPriority, setModalInitialPriority] = useState<PriorityType>('DO_NOW');

  const hourRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Auto-detect current local hour
  useEffect(() => {
    const updateTime = () => setCurrentHour(new Date().getHours());
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const dateTasks = tasks.filter((t) => t.date === selectedDate);
  const todayStr = getTodayDateString();
  const isToday = selectedDate === todayStr;

  const handleShiftDay = (days: number) => {
    const [y, m, d] = selectedDate.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    date.setDate(date.getDate() + days);
    const newY = date.getFullYear();
    const newM = String(date.getMonth() + 1).padStart(2, '0');
    const newD = String(date.getDate()).padStart(2, '0');
    setSelectedDate(`${newY}-${newM}-${newD}`);
  };

  const handleJumpToNow = () => {
    if (!isToday) {
      setSelectedDate(todayStr);
    }
    setTimeout(() => {
      const el = hourRefs.current[currentHour];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const openNewTaskModal = (time?: string, priority?: PriorityType) => {
    setEditingTask(null);
    setModalInitialTime(time || '09:00');
    setModalInitialPriority(priority || 'DO_NOW');
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = (taskData: Omit<Task, 'id'>) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
      setEditingTask(null);
    } else {
      addTask(taskData);
    }
  };

  // Get tasks that fall into a specific hour
  const getTasksForHour = (hour: number) => {
    return dateTasks.filter((t) => {
      const startHour = parseInt(t.startTime.split(':')[0], 10);
      return startHour === hour;
    });
  };

  const getPriorityBadge = (priority: PriorityType) => {
    switch (priority) {
      case 'DO_NOW':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-crimson/20 border border-crimson/50 text-crimson-400">DO NOW</span>;
      case 'SCHEDULE':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">SCHEDULE</span>;
      case 'DELEGATE':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-amber-400/20 border border-amber-400/40 text-amber-300">DELEGATE</span>;
      case 'ELIMINATE':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-zinc-800 border border-zinc-700 text-zinc-400">ELIMINATE</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        editingTask={editingTask}
        initialDate={selectedDate}
        initialTime={modalInitialTime}
        initialPriority={modalInitialPriority}
      />

      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Planner
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            24-hour daily timeline & Eisenhower prioritization
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-zinc-900 border border-zinc-800">
            <button
              type="button"
              onClick={() => setActiveView('timeline')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeView === 'timeline'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <LayoutList className="w-3.5 h-3.5" />
              <span>24h Timeline</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveView('matrix')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeView === 'matrix'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Eisenhower Matrix</span>
            </button>
          </div>

          {/* Jump to current hour */}
          <button
            type="button"
            onClick={handleJumpToNow}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-crimson text-zinc-300 hover:text-white text-xs font-mono tracking-wider transition-colors"
            title="Focus current local hour"
          >
            <LocateFixed className="w-3.5 h-3.5 text-crimson" />
            <span>Now ({String(currentHour).padStart(2, '0')}:00)</span>
          </button>

          {/* Add Task */}
          <button
            type="button"
            onClick={() => openNewTaskModal()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-crimson hover:bg-crimson-600 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Date Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleShiftDay(-1)}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-colors"
            aria-label="Previous day"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800">
            <CalendarIcon className="w-4 h-4 text-crimson" />
            <span className="text-sm font-semibold text-white">
              {formatDisplayDate(selectedDate)}
            </span>
            {isToday && (
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-crimson/20 border border-crimson/40 text-crimson-300 font-bold">
                TODAY
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => handleShiftDay(1)}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-colors"
            aria-label="Next day"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => e.target.value && setSelectedDate(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl px-3 py-1.5 text-xs font-mono text-zinc-200 focus:outline-none"
          />
          {!isToday && (
            <button
              type="button"
              onClick={() => setSelectedDate(todayStr)}
              className="text-xs font-mono text-crimson hover:underline"
            >
              Return to Today
            </button>
          )}
        </div>
      </div>

      {/* VIEW 1: 24-HOUR TIMELINE */}
      {activeView === 'timeline' && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 divide-y divide-zinc-800/80 overflow-hidden">
          {HOURS.map((slot) => {
            const isCurrent = isToday && slot.hour === currentHour;
            const hourTasks = getTasksForHour(slot.hour);

            return (
              <div
                key={slot.hour}
                ref={(el) => (hourRefs.current[slot.hour] = el)}
                className={`p-3 sm:p-4 flex flex-col sm:flex-row sm:items-start gap-3 transition-colors ${
                  isCurrent ? 'bg-crimson/10 border-l-4 border-crimson' : 'hover:bg-zinc-900/30'
                }`}
              >
                {/* Time Slot Label */}
                <div className="w-36 flex-shrink-0 flex items-center justify-between sm:justify-start gap-2">
                  <span className={`font-mono text-xs font-semibold ${isCurrent ? 'text-white' : 'text-zinc-400'}`}>
                    {slot.label}
                  </span>
                  {isCurrent && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-crimson text-white">
                      NOW
                    </span>
                  )}
                </div>

                {/* Tasks in this hour */}
                <div className="flex-1 space-y-2 min-w-0">
                  {hourTasks.length === 0 ? (
                    <div className="flex items-center justify-between py-1 group">
                      <span className="text-xs text-zinc-600 font-mono italic">
                        No tasks scheduled
                      </span>
                      <button
                        type="button"
                        onClick={() => openNewTaskModal(slot.startTime)}
                        className="opacity-0 group-hover:opacity-100 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-mono text-zinc-400 hover:text-white transition-all"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Schedule Task</span>
                      </button>
                    </div>
                  ) : (
                    hourTasks.map((task) => (
                      <div
                        key={task.id}
                        className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                          task.completed
                            ? 'bg-zinc-900/30 border-zinc-800/60 opacity-60'
                            : 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <button
                            type="button"
                            onClick={() => toggleTaskComplete(task.id)}
                            className="text-zinc-500 hover:text-crimson flex-shrink-0"
                            aria-label="Toggle complete"
                          >
                            {task.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-crimson" />
                            ) : (
                              <Circle className="w-4 h-4" />
                            )}
                          </button>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-xs font-medium ${task.completed ? 'line-through text-zinc-500' : 'text-zinc-200'}`}>
                                {task.title}
                              </span>
                              {getPriorityBadge(task.priority)}
                              <span className="text-[10px] font-mono text-zinc-400">
                                {task.startTime} – {task.endTime}
                              </span>
                            </div>
                            {task.notes && (
                              <p className="text-[11px] text-zinc-500 truncate mt-0.5">
                                {task.notes}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                          {/* Quick priority change */}
                          <select
                            value={task.priority}
                            onChange={(e) => updateTask(task.id, { priority: e.target.value as PriorityType })}
                            className="bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-400 rounded px-1.5 py-1 focus:outline-none"
                            aria-label="Change priority"
                          >
                            <option value="DO_NOW">Do Now</option>
                            <option value="SCHEDULE">Schedule</option>
                            <option value="DELEGATE">Delegate</option>
                            <option value="ELIMINATE">Eliminate</option>
                          </select>

                          {/* Quick status change */}
                          <select
                            value={task.status}
                            onChange={(e) => updateTask(task.id, { status: e.target.value as StatusType })}
                            className="bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-400 rounded px-1.5 py-1 focus:outline-none"
                            aria-label="Change status"
                          >
                            <option value="TODO">TODO</option>
                            <option value="IN_PROGRESS">IN PROGRESS</option>
                            <option value="DONE">DONE</option>
                          </select>

                          <button
                            type="button"
                            onClick={() => handleEditTask(task)}
                            className="p-1 text-zinc-400 hover:text-white"
                            aria-label="Edit task"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteTask(task.id)}
                            className="p-1 text-zinc-500 hover:text-crimson"
                            aria-label="Delete task"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: INTEGRATED EISENHOWER MATRIX */}
      {activeView === 'matrix' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(
            [
              {
                id: 'DO_NOW',
                title: 'DO NOW',
                sub: 'Urgent + Important',
                desc: 'Handle immediately.',
                borderColor: 'border-crimson/50',
                icon: Flame,
                textColor: 'text-crimson',
              },
              {
                id: 'SCHEDULE',
                title: 'SCHEDULE',
                sub: 'Important + Not Urgent',
                desc: 'Protect dedicated time.',
                borderColor: 'border-emerald-500/40',
                icon: Clock,
                textColor: 'text-emerald-400',
              },
              {
                id: 'DELEGATE',
                title: 'DELEGATE',
                sub: 'Urgent + Not Important',
                desc: 'Reduce involvement.',
                borderColor: 'border-amber-400/40',
                icon: UserCheck,
                textColor: 'text-amber-400',
              },
              {
                id: 'ELIMINATE',
                title: 'ELIMINATE',
                sub: 'Not Urgent + Not Important',
                desc: 'Remove trivial noise.',
                borderColor: 'border-zinc-800',
                icon: Ban,
                textColor: 'text-zinc-400',
              },
            ] as const
          ).map((quad) => {
            const quadTasks = dateTasks.filter((t) => t.priority === quad.id);
            const Icon = quad.icon;

            return (
              <div
                key={quad.id}
                className={`rounded-2xl bg-zinc-950 border ${quad.borderColor} p-5 flex flex-col min-h-[380px]`}
              >
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800">
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${quad.textColor}`} />
                    <div>
                      <h3 className="text-sm font-bold text-white tracking-wide">
                        {quad.title} ({quadTasks.length})
                      </h3>
                      <p className="text-[11px] font-mono text-zinc-500">
                        {quad.sub}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => openNewTaskModal(undefined, quad.id)}
                    className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-colors"
                    aria-label={`Add task to ${quad.title}`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex-1 space-y-2 overflow-y-auto max-h-[320px] pr-1">
                  {quadTasks.length === 0 ? (
                    <div className="h-32 flex flex-col items-center justify-center border border-dashed border-zinc-800/80 rounded-xl text-center p-4">
                      <span className="text-xs font-mono text-zinc-600 uppercase">
                        Quadrant Clear
                      </span>
                      <p className="text-[11px] text-zinc-500 mt-1">{quad.desc}</p>
                    </div>
                  ) : (
                    quadTasks.map((task) => (
                      <div
                        key={task.id}
                        className={`p-3 rounded-xl bg-zinc-900 border border-zinc-800/80 flex items-center justify-between gap-3 ${
                          task.completed ? 'opacity-60 bg-zinc-950' : ''
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <button
                            type="button"
                            onClick={() => toggleTaskComplete(task.id)}
                            className="text-zinc-500 hover:text-crimson flex-shrink-0"
                          >
                            {task.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-crimson" />
                            ) : (
                              <Circle className="w-4 h-4" />
                            )}
                          </button>

                          <div className="min-w-0 flex-1">
                            <span className={`text-xs block truncate ${task.completed ? 'line-through text-zinc-500' : 'text-zinc-200'}`}>
                              {task.title}
                            </span>
                            <span className="text-[10px] font-mono text-zinc-500">
                              {task.startTime} – {task.endTime}
                            </span>
                          </div>
                        </div>

                        {/* Switch quadrant dropdown */}
                        <div className="flex items-center gap-1.5">
                          <select
                            value={task.priority}
                            onChange={(e) => updateTask(task.id, { priority: e.target.value as PriorityType })}
                            className="bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-400 rounded px-1.5 py-1 focus:outline-none"
                          >
                            <option value="DO_NOW">Do Now</option>
                            <option value="SCHEDULE">Schedule</option>
                            <option value="DELEGATE">Delegate</option>
                            <option value="ELIMINATE">Eliminate</option>
                          </select>

                          <button
                            type="button"
                            onClick={() => deleteTask(task.id)}
                            className="p-1 text-zinc-500 hover:text-crimson"
                            aria-label="Delete task"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
