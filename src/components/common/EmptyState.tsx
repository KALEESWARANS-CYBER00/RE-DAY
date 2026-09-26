import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-zinc-800 bg-background-card">
      {Icon && (
        <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 text-zinc-400">
          <Icon className="w-6 h-6 text-zinc-400" />
        </div>
      )}
      <h3 className="text-base font-semibold text-zinc-200 mb-1">{title}</h3>
      {description && <p className="text-xs text-zinc-400 max-w-sm mb-6">{description}</p>}
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-crimson hover:bg-crimson-600 text-white text-xs font-mono font-medium uppercase tracking-wider transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
