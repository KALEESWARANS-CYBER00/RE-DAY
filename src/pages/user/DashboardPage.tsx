import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  Circle, 
  Hourglass, 
  Plus, 
  Timer, 
  Calendar, 
  CheckSquare, 
  Flame, 
  Clock, 
  UserCheck, 
  Ban,
  ArrowRight,
  Trash2,
  Edit2
} from 'lucide-react';
import { useTasks } from '../../context/TaskContext';
import { Task, PriorityType } from '../../types';
import { getTodayDateString, formatDisplayDate } from '../../utils/initialData';
import { TaskModal } from '../../components/tasks/TaskModal';
import { EmptyState } from '../../components/common/EmptyState';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { tasks, toggleTaskComplete, deleteTask, addTask, updateTask } = useTasks();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const todayStr = getTodayDateString();
  const todayTasks = tasks.filter((t) => t.date === todayStr);

  // Time-based real greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Real calculations directly from tasks
  const completedCount = todayTasks.filter((t) => t.completed).length;
  const inProgressCount = todayTasks.filter((t) => t.status === 'IN_PROGRESS').length;
  const remainingCount = todayTasks.filter((t) => !t.completed).length;

  // Real Eisenhower counts
  const doNowCount = todayTasks.filter((t) => t.priority === 'DO_NOW' && !t.completed).length;
  const scheduleCount = todayTasks.filter((t) => t.priority === 'SCHEDULE' && !t.completed).length;
  const delegateCount = todayTasks.filter((t) => t.priority === 'DELEGATE' && !t.completed).length;
  const eliminateCount = todayTasks.filter((t) => t.priority === 'ELIMINATE' && !t.completed).length;

  const handleEdit = (task: Task) => {
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

  const getPriorityBadge = (priority: PriorityType) => {
    switch (priority) {
      case 'DO_NOW':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-crimson/20 border border-crimson/50 text-crimson-400">DO NOW</span>;
      case 'SCHEDULE':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">SCHEDULE</span>;
      case 'DELEGATE':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-amber-400/20 border border-amber-400/40 text-amber-300">DELEGATE</span>;
      case 'ELIMINATE':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-zinc-800 border border-zinc-700 text-zinc-400">ELIMINATE</span>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        editingTask={editingTask}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
            {getGreeting()}
          </h1>
          <p className="text-sm font-mono text-zinc-400 mt-0.5">
            {formatDisplayDate(todayStr)}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              setEditingTask(null);
              setIsTaskModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-crimson hover:bg-crimson-600 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/focus')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-mono tracking-wider transition-colors"
          >
            <Timer className="w-4 h-4 text-crimson" />
            <span>Start Focus</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/planner')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-mono tracking-wider transition-colors"
          >
            <Calendar className="w-4 h-4 text-zinc-400" />
            <span>Open Planner</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/review')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-mono tracking-wider transition-colors"
          >
            <CheckSquare className="w-4 h-4 text-zinc-400" />
            <span>Review Day</span>
          </button>
        </div>
      </div>

      {/* Today's Progress Cards (Real Task Counts) */}
      <div>
        <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
          Today's Progress
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-medium text-zinc-400 mb-1">Completed</div>
              <div className="text-3xl font-bold text-white">{completedCount}</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-medium text-zinc-400 mb-1">In Progress</div>
              <div className="text-3xl font-bold text-white">{inProgressCount}</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <Hourglass className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-medium text-zinc-400 mb-1">Remaining</div>
              <div className="text-3xl font-bold text-white">{remainingCount}</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-crimson/10 border border-crimson/30 flex items-center justify-center text-crimson">
              <Circle className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Priority Summary (Real Eisenhower Active Counts) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
            Priority Summary (Pending)
          </h2>
          <span className="text-xs font-mono text-zinc-500">Eisenhower Breakdown</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-zinc-950 border border-crimson/40">
            <div className="flex items-center justify-between text-xs text-crimson font-medium mb-1">
              <span>Do Now</span>
              <Flame className="w-3.5 h-3.5" />
            </div>
            <div className="text-2xl font-bold text-white">{doNowCount}</div>
            <div className="text-[10px] text-zinc-500 font-mono mt-0.5">Urgent + Important</div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950 border border-emerald-500/30">
            <div className="flex items-center justify-between text-xs text-emerald-400 font-medium mb-1">
              <span>Schedule</span>
              <Clock className="w-3.5 h-3.5" />
            </div>
            <div className="text-2xl font-bold text-white">{scheduleCount}</div>
            <div className="text-[10px] text-zinc-500 font-mono mt-0.5">Not Urgent + Important</div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950 border border-amber-400/30">
            <div className="flex items-center justify-between text-xs text-amber-300 font-medium mb-1">
              <span>Delegate</span>
              <UserCheck className="w-3.5 h-3.5" />
            </div>
            <div className="text-2xl font-bold text-white">{delegateCount}</div>
            <div className="text-[10px] text-zinc-500 font-mono mt-0.5">Urgent + Not Important</div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-medium mb-1">
              <span>Eliminate</span>
              <Ban className="w-3.5 h-3.5" />
            </div>
            <div className="text-2xl font-bold text-white">{eliminateCount}</div>
            <div className="text-[10px] text-zinc-500 font-mono mt-0.5">Not Urgent + Not Important</div>
          </div>
        </div>
      </div>

      {/* Today's Tasks List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
            Today's Tasks ({todayTasks.length})
          </h2>
          <button
            type="button"
            onClick={() => navigate('/planner')}
            className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <span>View Full 24h Planner</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {todayTasks.length === 0 ? (
          <EmptyState
            title="No tasks scheduled today"
            description="Add tasks to plan your day hour by hour and focus on what matters."
            actionLabel="Add First Task"
            onAction={() => {
              setEditingTask(null);
              setIsTaskModalOpen(true);
            }}
          />
        ) : (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 divide-y divide-zinc-800/80 overflow-hidden">
            {todayTasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 flex items-center justify-between gap-4 hover:bg-zinc-900/40 transition-colors ${
                  task.completed ? 'opacity-60 bg-zinc-950/60' : ''
                }`}
              >
                {/* Checkbox and Title */}
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={() => toggleTaskComplete(task.id)}
                    className="flex-shrink-0 text-zinc-500 hover:text-crimson transition-colors"
                    aria-label={task.completed ? 'Mark task incomplete' : 'Mark task complete'}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-crimson" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-sm font-medium ${task.completed ? 'line-through text-zinc-500' : 'text-zinc-200'}`}>
                        {task.title}
                      </span>
                      {getPriorityBadge(task.priority)}
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400">
                        {task.category}
                      </span>
                    </div>

                    {task.notes && (
                      <p className="text-xs text-zinc-500 truncate mt-0.5">
                        {task.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Time & Action Controls */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-xs font-mono text-zinc-400 hidden sm:block">
                    {task.startTime} – {task.endTime}
                  </div>

                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border hidden md:inline-block ${
                    task.status === 'DONE'
                      ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
                      : task.status === 'IN_PROGRESS'
                      ? 'border-amber-400/40 text-amber-300 bg-amber-400/10'
                      : 'border-zinc-800 text-zinc-400 bg-zinc-900'
                  }`}>
                    {task.status.replace('_', ' ')}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleEdit(task)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                      title="Edit task"
                      aria-label="Edit task"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteTask(task.id)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-crimson hover:bg-zinc-900 transition-colors"
                      title="Delete task"
                      aria-label="Delete task"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
