import React, { useState } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  Eye, 
  EyeOff
} from 'lucide-react';
import { useTasks } from '../../context/TaskContext';
import { Lesson } from '../../types';

export const AdminContentPage: React.FC = () => {
  const { lessons, addLesson, updateLesson, deleteLesson } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);

  // Form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [illustration, setIllustration] = useState('/images/mascot-story.jpg');
  const [story, setStory] = useState('');
  const [takeaway, setTakeaway] = useState('');
  const [published, setPublished] = useState(true);

  const openCreateModal = () => {
    setEditingLesson(null);
    setTitle('');
    setDescription('');
    setIllustration('/images/mascot-story.jpg');
    setStory('');
    setTakeaway('');
    setPublished(true);
    setIsModalOpen(true);
  };

  const openEditModal = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setTitle(lesson.title);
    setDescription(lesson.description);
    setIllustration(lesson.illustration);
    setStory(lesson.story);
    setTakeaway(lesson.takeaway);
    setPublished(lesson.published);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !story.trim()) return;

    if (editingLesson) {
      updateLesson(editingLesson.id, {
        title: title.trim(),
        description: description.trim(),
        illustration,
        story: story.trim(),
        takeaway: takeaway.trim(),
        published,
      });
    } else {
      addLesson({
        title: title.trim(),
        description: description.trim(),
        illustration,
        story: story.trim(),
        takeaway: takeaway.trim(),
        published,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Content Management
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Author and publish daily productivity stories and core lessons
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-crimson hover:bg-crimson-600 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Lesson</span>
        </button>
      </div>

      {/* Lesson List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="rounded-2xl bg-zinc-950 border border-zinc-800 p-5 flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-bold text-white text-base leading-snug">
                  {lesson.title}
                </h3>
                <button
                  type="button"
                  onClick={() => updateLesson(lesson.id, { published: !lesson.published })}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold flex items-center gap-1 transition-colors ${
                    lesson.published
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-zinc-800 text-zinc-500 border border-zinc-700'
                  }`}
                >
                  {lesson.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  <span>{lesson.published ? 'PUBLISHED' : 'DRAFT'}</span>
                </button>
              </div>

              <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-3">
                {lesson.description}
              </p>

              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                <span className="text-[10px] font-mono text-crimson-400 uppercase block mb-0.5">Takeaway</span>
                {lesson.takeaway}
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-500">
                {(lesson.completedBy || []).length} readers completed
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openEditModal(lesson)}
                  className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white"
                  aria-label="Edit lesson"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => deleteLesson(lesson.id)}
                  className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-crimson text-zinc-500 hover:text-crimson"
                  aria-label="Delete lesson"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/80 transition-opacity" 
            onClick={() => setIsModalOpen(false)} 
            aria-hidden="true" 
          />

          <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h2 className="text-base font-bold text-white">
                {editingLesson ? 'Edit Lesson' : 'Author New Lesson'}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-500 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. The Broken Pencil"
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl px-3.5 py-2 text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="One-sentence teaser of the lesson..."
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl px-3.5 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">
                  Illustration URL
                </label>
                <input
                  type="text"
                  value={illustration}
                  onChange={(e) => setIllustration(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl px-3.5 py-2 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">
                  Story Narrative
                </label>
                <textarea
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  rows={8}
                  placeholder="Write the full lesson story here..."
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl p-3.5 text-xs text-white resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">
                  Core Takeaway / Lesson Learned
                </label>
                <input
                  type="text"
                  value={takeaway}
                  onChange={(e) => setTakeaway(e.target.value)}
                  placeholder="e.g. Challenges make you stronger, sharper, and better prepared."
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl px-3.5 py-2 text-xs text-white"
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="publishedCheck"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="rounded border-zinc-800 text-crimson focus:ring-crimson"
                />
                <label htmlFor="publishedCheck" className="text-xs text-zinc-300 font-mono">
                  Publish immediately (visible to all users)
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-crimson hover:bg-crimson-600 text-xs font-mono font-bold text-white uppercase tracking-wider"
                >
                  Save Lesson
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
