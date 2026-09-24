import React, { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  dateStr: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  dateStr,
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-background-card border border-crimson/40 rounded-2xl p-6 shadow-red-glow-lg z-10 animate-in zoom-in-95 duration-200">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 p-1.5 rounded-lg transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-4">
          <div className="p-3 rounded-xl bg-crimson/10 border border-crimson/30 text-crimson">
            <AlertTriangle className="w-6 h-6 text-crimson" />
          </div>
          <div>
            <h3 className="font-display text-2xl tracking-wide text-zinc-100">RESET DAY DATA?</h3>
            <p className="text-xs text-zinc-400 font-mono tracking-wider">TARGET: {dateStr}</p>
          </div>
        </div>

        <p className="text-sm text-zinc-300 leading-relaxed mb-6">
          This will wipe all 24-hour activities, priority assignments, and reflections for this specific date. This action cannot be undone.
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl border border-zinc-700/80 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl bg-crimson hover:bg-crimson-600 text-sm font-semibold text-white shadow-red-glow transition-all active:scale-95"
          >
            Confirm Reset
          </button>
        </div>
      </div>
    </div>
  );
};
