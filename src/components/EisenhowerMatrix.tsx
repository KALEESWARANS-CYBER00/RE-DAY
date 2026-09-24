import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  Flame, 
  Calendar, 
  UserCheck, 
  Ban,
  CheckCircle2,
  Circle
} from 'lucide-react';
import { MatrixTask, MatrixQuadrant } from '../types';

interface EisenhowerMatrixProps {
  tasks: MatrixTask[];
  onAddTask: (title: string, quadrant: MatrixQuadrant) => void;
  onUpdateTask: (id: string, updates: Partial<MatrixTask>) => void;
  onDeleteTask: (id: string) => void;
}

export const EisenhowerMatrix: React.FC<EisenhowerMatrixProps> = ({
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
}) => {
  const [quickInput, setQuickInput] = useState<{ [key in MatrixQuadrant]?: string }>({});
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const quadrantsConfig: Array<{
    id: MatrixQuadrant;
    title: string;
    subtitle: string;
    description: string;
    badge: string;
    borderColor: string;
    glowClass: string;
    icon: React.ReactNode;
    dotBg: string;
    accentText: string;
  }> = [
    {
      id: 'Q1',
      title: 'DO NOW',
      subtitle: 'Urgent + Important',
      description: 'Handle it immediately.',
      badge: '🔴 Q1',
      borderColor: 'border-crimson/50 hover:border-crimson',
      glowClass: 'shadow-red-glow-sm',
      icon: <Flame className="w-4 h-4 text-crimson" />,
      dotBg: 'bg-crimson',
      accentText: 'text-crimson',
    },
    {
      id: 'Q2',
      title: 'SCHEDULE',
      subtitle: 'Important + Not Urgent',
      description: 'Protect time for it.',
      badge: '🟢 Q2',
      borderColor: 'border-emerald-500/40 hover:border-emerald-500/80',
      glowClass: 'hover:shadow-[0_0_20px_-3px_rgba(16,185,129,0.2)]',
      icon: <Calendar className="w-4 h-4 text-emerald-400" />,
      dotBg: 'bg-emerald-500',
      accentText: 'text-emerald-400',
    },
    {
      id: 'Q3',
      title: 'DELEGATE',
      subtitle: 'Urgent + Not Important',
      description: 'Reduce your involvement.',
      badge: '🟡 Q3',
      borderColor: 'border-amber-400/40 hover:border-amber-400/80',
      glowClass: 'hover:shadow-[0_0_20px_-3px_rgba(251,191,36,0.2)]',
      icon: <UserCheck className="w-4 h-4 text-amber-400" />,
      dotBg: 'bg-amber-400',
      accentText: 'text-amber-400',
    },
    {
      id: 'Q4',
      title: 'ELIMINATE',
      subtitle: 'Not Urgent + Not Important',
      description: 'Remove the noise.',
      badge: '⚫ Q4',
      borderColor: 'border-zinc-700/60 hover:border-zinc-600',
      glowClass: '',
      icon: <Ban className="w-4 h-4 text-zinc-400" />,
      dotBg: 'bg-zinc-600',
      accentText: 'text-zinc-400',
    },
  ];

  const handleAddSubmit = (qId: MatrixQuadrant, e: React.FormEvent) => {
    e.preventDefault();
    const text = quickInput[qId]?.trim();
    if (!text) return;
    onAddTask(text, qId);
    setQuickInput((prev) => ({ ...prev, [qId]: '' }));
  };

  const handleDragStart = (taskId: string) => {
    setDraggedTaskId(taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (qId: MatrixQuadrant) => {
    if (draggedTaskId) {
      onUpdateTask(draggedTaskId, { quadrant: qId });
      setDraggedTaskId(null);
    }
  };

  return (
    <section id="matrix" className="relative py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="mb-10 text-left">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-crimson uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-crimson" />
            <span>DECISION MATRIX</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl tracking-wider text-white">
            CONTROL THE IMPORTANT.
          </h2>
          <p className="text-zinc-400 text-base font-normal tracking-wide mt-1">
            Not everything deserves your attention.
          </p>
        </div>

        {/* 2x2 Eisenhower Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quadrantsConfig.map((quad) => {
            const quadrantTasks = tasks.filter((t) => t.quadrant === quad.id);
            const activeCount = quadrantTasks.filter((t) => !t.completed).length;

            return (
              <div
                key={quad.id}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(quad.id)}
                className={`relative flex flex-col rounded-2xl bg-background-card/90 border ${quad.borderColor} ${quad.glowClass} backdrop-blur-md p-5 sm:p-6 transition-all duration-300 min-h-[380px]`}
              >
                {/* Quadrant Header */}
                <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-zinc-800/80">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                      {quad.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-2xl tracking-wider text-zinc-100">
                          {quad.title}
                        </h3>
                        <span className="text-[11px] font-mono text-zinc-500 font-semibold">
                          — {quadrantTasks.length}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-zinc-400">
                        {quad.subtitle}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-zinc-400 italic hidden sm:block">
                    "{quad.description}"
                  </span>
                </div>

                {/* Add Task Input Form */}
                <form
                  onSubmit={(e) => handleAddSubmit(quad.id, e)}
                  className="flex items-center gap-2 mb-4"
                >
                  <input
                    type="text"
                    value={quickInput[quad.id] || ''}
                    onChange={(e) => setQuickInput({ ...quickInput, [quad.id]: e.target.value })}
                    placeholder={`Add task to ${quad.title.toLowerCase()}...`}
                    className="flex-1 bg-zinc-900/90 border border-zinc-800 focus:border-crimson rounded-xl px-3.5 py-2 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-crimson text-zinc-300 hover:text-white transition-colors"
                    aria-label={`Add task to ${quad.title}`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </form>

                {/* Task List */}
                <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-[320px]">
                  {quadrantTasks.length === 0 ? (
                    <div className="h-32 flex flex-col items-center justify-center border border-dashed border-zinc-800/80 rounded-xl text-center p-4">
                      <span className="text-xs font-mono text-zinc-600 uppercase tracking-wider mb-1">
                        QUADRANT CLEAR
                      </span>
                      <p className="text-[11px] text-zinc-500">
                        {quad.description} Drag or add new tasks above.
                      </p>
                    </div>
                  ) : (
                    quadrantTasks.map((task) => (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={() => handleDragStart(task.id)}
                        className={`group flex items-center justify-between gap-3 p-3 rounded-xl bg-zinc-900/70 border border-zinc-800/80 hover:border-zinc-700 transition-all ${
                          task.completed ? 'opacity-60 bg-zinc-950/40' : ''
                        }`}
                      >
                        <div className="flex items-center gap-2.5 flex-1 min-w-0">
                          {/* Drag handle */}
                          <div className="cursor-grab active:cursor-grabbing text-zinc-600 group-hover:text-zinc-400 p-0.5">
                            <GripVertical className="w-3.5 h-3.5" />
                          </div>

                          {/* Completion Toggle */}
                          <button
                            type="button"
                            onClick={() => onUpdateTask(task.id, { completed: !task.completed })}
                            className="text-zinc-500 hover:text-crimson transition-colors flex-shrink-0"
                            aria-label="Toggle task status"
                          >
                            {task.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-crimson" />
                            ) : (
                              <Circle className="w-4 h-4" />
                            )}
                          </button>

                          {/* Title (Inline Editable) */}
                          <input
                            type="text"
                            value={task.title}
                            onChange={(e) => onUpdateTask(task.id, { title: e.target.value })}
                            className={`flex-1 bg-transparent text-xs text-zinc-200 focus:outline-none focus:bg-zinc-800/50 rounded px-1.5 py-0.5 truncate ${
                              task.completed ? 'line-through text-zinc-500' : ''
                            }`}
                          />
                        </div>

                        {/* Move Quadrant Dropdown & Delete */}
                        <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                          <select
                            value={task.quadrant}
                            onChange={(e) => onUpdateTask(task.id, { quadrant: e.target.value as MatrixQuadrant })}
                            className="bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-400 rounded px-1 py-1 focus:outline-none"
                            title="Move to another quadrant"
                          >
                            <option value="Q1">Q1 (Do Now)</option>
                            <option value="Q2">Q2 (Schedule)</option>
                            <option value="Q3">Q3 (Delegate)</option>
                            <option value="Q4">Q4 (Eliminate)</option>
                          </select>

                          <button
                            type="button"
                            onClick={() => onDeleteTask(task.id)}
                            className="p-1 text-zinc-500 hover:text-crimson transition-colors rounded"
                            aria-label="Delete task"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Bottom Footer Info */}
                <div className="mt-3 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>{activeCount} PENDING</span>
                  <span className="uppercase text-zinc-600 tracking-wider">
                    PRIORITY LEVEL: {quad.id}
                  </span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Motivational microcopy below Matrix */}
        <div className="mt-8 text-center">
          <p className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
            FOCUS ON WHAT MATTERS. ELIMINATE THE TRIVIAL.
          </p>
        </div>

      </div>
    </section>
  );
};
