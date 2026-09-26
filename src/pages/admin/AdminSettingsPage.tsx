import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { useTasks } from '../../context/TaskContext';

export const AdminSettingsPage: React.FC = () => {
  const { appSettings, updateSettings } = useTasks();

  const [appName, setAppName] = useState(appSettings.appName);
  const [tagline, setTagline] = useState(appSettings.tagline);
  const [allowRegistration, setAllowRegistration] = useState(appSettings.allowRegistration);
  const [defaultPlan, setDefaultPlan] = useState(appSettings.defaultPlan);
  const [feedback, setFeedback] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      appName: appName.trim(),
      tagline: tagline.trim(),
      allowRegistration,
      defaultPlan,
    });
    setFeedback(true);
    setTimeout(() => setFeedback(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="pb-6 border-b border-zinc-800">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
          Application Settings
        </h1>
        <p className="text-xs font-mono text-zinc-400 mt-1">
          Global branding, registration toggles, and workspace policies
        </p>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-xs text-emerald-300">
          Settings updated successfully.
        </div>
      )}

      <form onSubmit={handleSubmit} className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 sm:p-8 space-y-6">
        <div>
          <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
            Application Name
          </label>
          <input
            type="text"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl px-3.5 py-2.5 text-sm text-white"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
            Application Tagline
          </label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl px-3.5 py-2.5 text-sm text-white"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
            Default User Plan on Registration
          </label>
          <select
            value={defaultPlan}
            onChange={(e) => setDefaultPlan(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl px-3.5 py-2.5 text-sm text-white font-mono"
          >
            <option value="Free">Free Tier</option>
            <option value="Pro">Pro Plan</option>
          </select>
        </div>

        <div className="pt-2">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <input
              type="checkbox"
              id="registrationToggle"
              checked={allowRegistration}
              onChange={(e) => setAllowRegistration(e.target.checked)}
              className="rounded border-zinc-800 text-crimson focus:ring-crimson w-4 h-4"
            />
            <label htmlFor="registrationToggle" className="text-xs text-zinc-300 font-mono cursor-pointer">
              Allow new user self-registration via /register
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-crimson hover:bg-crimson-600 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
