import React, { useState } from 'react';
import { 
  Check, 
  Edit2, 
  X, 
  Plus, 
  Trash2 
} from 'lucide-react';
import { useTasks } from '../../context/TaskContext';
import { SubscriptionPlan } from '../../types';

export const AdminSubscriptionsPage: React.FC = () => {
  const { plans, updatePlan } = useTasks();
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
  const [featureInput, setFeatureInput] = useState('');

  const handleSavePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;
    updatePlan(editingPlan.id, editingPlan);
    setEditingPlan(null);
  };

  const handleAddFeature = () => {
    if (!featureInput.trim() || !editingPlan) return;
    setEditingPlan({
      ...editingPlan,
      features: [...editingPlan.features, featureInput.trim()],
    });
    setFeatureInput('');
  };

  const handleRemoveFeature = (index: number) => {
    if (!editingPlan) return;
    setEditingPlan({
      ...editingPlan,
      features: editingPlan.features.filter((_, idx) => idx !== index),
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-6 border-b border-zinc-800">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
          Subscription Management
        </h1>
        <p className="text-xs font-mono text-zinc-400 mt-1">
          Configure tiers, pricing display, feature checklists, and active status
        </p>
      </div>

      {/* Plans List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between space-y-6"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
                <div>
                  <h2 className="text-lg font-bold text-white">{p.name} Tier</h2>
                  <span className="text-xs font-mono text-zinc-500">ID: {p.id}</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-mono font-bold text-crimson">{p.price}</div>
                  <div className="text-[10px] font-mono text-zinc-500">{p.billingPeriod}</div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <span className="text-[11px] font-mono uppercase text-zinc-500">
                  Included Features ({p.features.length}):
                </span>
                <ul className="space-y-1.5 text-xs text-zinc-300">
                  {p.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-crimson flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                p.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-500'
              }`}>
                {p.active ? 'ACTIVE' : 'INACTIVE'}
              </span>

              <button
                type="button"
                onClick={() => setEditingPlan(p)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-mono text-zinc-200 hover:text-white transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Plan</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Plan Modal */}
      {editingPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/80 transition-opacity" 
            onClick={() => setEditingPlan(null)} 
            aria-hidden="true" 
          />

          <div className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-2xl z-10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h2 className="text-base font-bold text-white">
                Edit {editingPlan.name} Plan
              </h2>
              <button
                type="button"
                onClick={() => setEditingPlan(null)}
                className="text-zinc-500 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePlan} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">
                  Plan Name
                </label>
                <input
                  type="text"
                  value={editingPlan.name}
                  onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">
                    Display Price
                  </label>
                  <input
                    type="text"
                    value={editingPlan.price}
                    onChange={(e) => setEditingPlan({ ...editingPlan, price: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">
                    Billing Period
                  </label>
                  <input
                    type="text"
                    value={editingPlan.billingPeriod}
                    onChange={(e) => setEditingPlan({ ...editingPlan, billingPeriod: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              {/* Features List Editing */}
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">
                  Features
                </label>
                <div className="space-y-1.5 mb-2 max-h-36 overflow-y-auto pr-1">
                  {editingPlan.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-2 p-1.5 rounded bg-zinc-900 text-xs text-zinc-300"
                    >
                      <span className="truncate">{feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="text-zinc-500 hover:text-crimson"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="Add feature item..."
                    className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="p-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="activePlanCheck"
                  checked={editingPlan.active}
                  onChange={(e) => setEditingPlan({ ...editingPlan, active: e.target.checked })}
                  className="rounded border-zinc-800 text-crimson focus:ring-crimson"
                />
                <label htmlFor="activePlanCheck" className="text-xs text-zinc-300 font-mono">
                  Tier is active and selectable by users
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setEditingPlan(null)}
                  className="px-4 py-2 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-crimson hover:bg-crimson-600 text-xs font-mono font-bold text-white uppercase tracking-wider"
                >
                  Save Tier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
