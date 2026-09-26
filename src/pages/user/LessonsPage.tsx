import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  X, 
  ArrowRight
} from 'lucide-react';
import { useTasks } from '../../context/TaskContext';
import { useAuth } from '../../context/AuthContext';
import { Lesson } from '../../types';
import { EmptyState } from '../../components/common/EmptyState';

export const LessonsPage: React.FC = () => {
  const { lessons, toggleLessonCompleted } = useTasks();
  const { currentUser } = useAuth();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const publishedLessons = lessons.filter((l) => l.published);
  const userId = currentUser?.id || 'user-1';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-zinc-800">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
          Lessons & Wisdom
        </h1>
        <p className="text-xs font-mono text-zinc-400 mt-1">
          Practical stories on discipline, focus, and continuous sharpening
        </p>
      </div>

      {publishedLessons.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No lessons available"
          description="Check back soon for new daily lessons and stories."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedLessons.map((lesson) => {
            const isCompleted = (lesson.completedBy || []).includes(userId);

            return (
              <div
                key={lesson.id}
                className="rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col overflow-hidden group shadow-lg"
              >
                {/* Image */}
                <div className="relative aspect-video bg-zinc-900 overflow-hidden border-b border-zinc-800">
                  <img
                    src={lesson.illustration}
                    alt={lesson.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {isCompleted && (
                    <div className="absolute top-3 right-3 px-2 py-1 rounded bg-zinc-900/90 border border-emerald-500/40 text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 backdrop-blur-sm">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>COMPLETED</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-crimson-400 transition-colors mb-1.5">
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {lesson.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setSelectedLesson(lesson)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-white hover:text-crimson transition-colors"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleLessonCompleted(lesson.id, userId)}
                      className="text-zinc-500 hover:text-white transition-colors"
                      title={isCompleted ? 'Mark incomplete' : 'Mark completed'}
                      aria-label="Toggle completed"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lesson Reader Modal */}
      {selectedLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/85 transition-opacity"
            onClick={() => setSelectedLesson(null)}
            aria-hidden="true"
          />

          <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-crimson font-bold">
                  LESSON ARCHIVE
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {selectedLesson.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLesson(null)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Illustration */}
            <div className="rounded-2xl overflow-hidden border border-zinc-800 aspect-video max-h-64 w-full">
              <img
                src={selectedLesson.illustration}
                alt={selectedLesson.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Story Text */}
            <div className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans space-y-4 whitespace-pre-line">
              {selectedLesson.story}
            </div>

            {/* Takeaway Box */}
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-crimson flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-[10px] font-mono text-crimson-400 uppercase tracking-widest font-semibold mb-0.5">
                  CORE TAKEAWAY
                </div>
                <div className="text-xs sm:text-sm font-medium text-white">
                  {selectedLesson.takeaway}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => setSelectedLesson(null)}
                className="px-4 py-2 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-400 hover:text-white"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  toggleLessonCompleted(selectedLesson.id, userId);
                  setSelectedLesson(null);
                }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-crimson hover:bg-crimson-600 text-white text-xs font-mono font-semibold uppercase tracking-wider transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {(selectedLesson.completedBy || []).includes(userId)
                    ? 'Mark as Unread'
                    : 'Mark as Completed'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
