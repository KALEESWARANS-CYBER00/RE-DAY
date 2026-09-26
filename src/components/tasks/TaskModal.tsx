import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Task, PriorityType, StatusType } from '../../types';
import { getTodayDateString } from '../../utils/initialData';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id'>) => void;
  editingTask?: Task | null;
  initialDate?: string;
  initialTime?: string;
  initialPriority?: PriorityType;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingTask,
  initialDate,
  initialTime,
  initialPriority,
}) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(initialDate || getTodayDateString());
  const [startTime, setStartTime] = useState(initialTime || '09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [priority, setPriority] = useState<PriorityType>(initialPriority || 'DO_NOW');
  const [category, setCategory] = useState('Deep Work');
  const [status, setStatus] = useState<StatusType>('TODO');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDate(editingTask.date);
      setStartTime(editingTask.startTime);
      setEndTime(editingTask.endTime);
      setPriority(editingTask.priority);
      setCategory(editingTask.category);
      setStatus(editingTask.status);
      setNotes(editingTask.notes || '');
    } else {
      setTitle('');
      setDate(initialDate || getTodayDateString());
      setStartTime(initialTime || '09:00');
      // Calculate end time + 1 hour
      if (initialTime) {
        const hour = parseInt(initialTime.split(':')[0], 10);
        const nextHour = (hour + 1) % 24;
        setEndTime(`${String(nextHour).padStart(2, '0')}:00`);
      } else {
        setEndTime('10:00');
      }
      setPriority(initialPriority || 'DO_NOW');
      setCategory('Deep Work');
      setStatus('TODO');
      setNotes('');
    }
    setError('');
  }, [editingTask, isOpen, initialDate, initialTime, initialPriority]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task name is required.');
      return;
    }

    onSave({
      title: title.trim(),
      date,
      startTime,
      endTime,
      priority,
      category,
      status,
      completed: status === 'DONE',
      notes: notes.trim() || undefined,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 transition-opacity" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      {/* Solid Dialog Container (No glassmorphism) */}
      <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-2xl z-10">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800">
          <h2 className="text-lg font-bold text-white tracking-wide">
            {editingTask ? 'Edit Task' : 'New Task'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-crimson/15 border border-crimson/40 text-xs text-crimson-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Task Name */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Task Name <span className="text-crimson">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Implement payment webhook handler"
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl px-3.5 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-colors"
              autoFocus
            />
          </div>

          {/* Date & Time Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Priority & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">Eisenhower Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as PriorityType)}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition-colors"
              >
                <option value="DO_NOW">DO NOW (Urgent + Important)</option>
                <option value="SCHEDULE">SCHEDULE (Not Urgent + Important)</option>
                <option value="DELEGATE">DELEGATE (Urgent + Not Important)</option>
                <option value="ELIMINATE">ELIMINATE (Not Urgent + Not Important)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition-colors"
              >
                <option value="Deep Work">Deep Work</option>
                <option value="Core Project">Core Project</option>
                <option value="Planning">Planning</option>
                <option value="Collaboration">Collaboration</option>
                <option value="Administration">Administration</option>
                <option value="Health">Health</option>
                <option value="Personal">Personal</option>
                <option value="Review">Review</option>
              </select>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">Status</label>
            <div className="grid grid-cols-3 gap-2">
              {(['TODO', 'IN_PROGRESS', 'DONE'] as StatusType[]).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatus(st)}
                  className={`py-2 px-3 rounded-xl border text-xs font-mono font-medium transition-colors ${
                    status === st
                      ? 'bg-crimson/20 border-crimson text-white'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {st.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Context, requirements, links..."
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl p-3 text-xs text-white placeholder:text-zinc-600 focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-zinc-800 hover:bg-zinc-900 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-crimson hover:bg-crimson-600 text-xs font-medium text-white transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>{editingTask ? 'Save Changes' : 'Create Task'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
