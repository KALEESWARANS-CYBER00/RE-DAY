import React, { useState } from 'react';
import { 
  CreditCard, 
  Check, 
  Lock, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTasks } from '../../context/TaskContext';

export const ProfilePage: React.FC = () => {
  const { currentUser, updateProfile, logout } = useAuth();
  const { plans } = useTasks();

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [isEditing, setIsEditing] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name: name.trim(), email: email.trim() });
    setIsEditing(false);
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 3000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim()) return;
    setCurrentPassword('');
    setNewPassword('');
    setPasswordSuccess(true);
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  const handleSelectPlan = (planName: 'Free' | 'Pro') => {
    updateProfile({ plan: planName });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-zinc-800">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
          User Profile
        </h1>
        <p className="text-xs font-mono text-zinc-400 mt-1">
          Account details, subscription plan, and workspace credentials
        </p>
      </div>

      {profileSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-xs text-emerald-300">
          Profile details updated successfully.
        </div>
      )}

      {passwordSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-xs text-emerald-300">
          Password updated successfully.
        </div>
      )}

      {/* Account Info Card */}
      <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-display text-2xl font-bold text-white text-center">
              {currentUser?.name.charAt(0) || 'U'}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{currentUser?.name}</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-zinc-400 font-mono">{currentUser?.email}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-crimson/20 border border-crimson/40 text-crimson-300 font-semibold">
                  {currentUser?.role}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="self-start sm:self-center px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-mono text-zinc-200 transition-colors"
          >
            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleProfileSubmit} className="space-y-4 max-w-md">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-crimson hover:bg-crimson-600 text-xs font-mono font-bold text-white uppercase tracking-wider transition-colors"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-zinc-500 block mb-1">USER ID</span>
              <span className="text-zinc-200">{currentUser?.id}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-zinc-500 block mb-1">MEMBER SINCE</span>
              <span className="text-zinc-200">{currentUser?.createdAt || '2026-09-01'}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-zinc-500 block mb-1">ACCOUNT STATUS</span>
              <span className="text-emerald-400 capitalize">{currentUser?.status}</span>
            </div>
          </div>
        )}
      </div>

      {/* Subscription Card */}
      <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-crimson" />
              <h2 className="text-lg font-bold text-white tracking-wide">
                Subscription Plan
              </h2>
            </div>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              Current Tier: <strong className="text-white uppercase">{currentUser?.plan} PLAN</strong>
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleSelectPlan(currentUser?.plan === 'Pro' ? 'Free' : 'Pro')}
            className="self-start sm:self-center px-4 py-2 rounded-xl bg-crimson hover:bg-crimson-600 text-xs font-mono font-bold text-white uppercase tracking-wider transition-colors"
          >
            {currentUser?.plan === 'Pro' ? 'Switch to Free Tier' : 'Upgrade to Pro'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {plans.map((p) => {
            const isCurrent = currentUser?.plan === p.name;
            return (
              <div
                key={p.id}
                className={`p-5 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-zinc-900 border-crimson/50'
                    : 'bg-zinc-900/40 border-zinc-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-white text-base">{p.name}</h3>
                  <span className="text-sm font-mono font-bold text-crimson">
                    {p.price} <span className="text-[10px] text-zinc-500 font-normal">/{p.billingPeriod}</span>
                  </span>
                </div>
                <ul className="space-y-1.5 my-3 text-xs text-zinc-400">
                  {p.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-crimson flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                {isCurrent ? (
                  <div className="mt-4 text-center py-1.5 rounded-lg bg-zinc-800 text-[11px] font-mono text-zinc-300 font-semibold">
                    CURRENT PLAN
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSelectPlan(p.name as 'Free' | 'Pro')}
                    className="mt-4 w-full py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-[11px] font-mono text-white transition-colors"
                  >
                    Switch to {p.name}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Change Password Card */}
      <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 pb-4 border-b border-zinc-800">
          <Lock className="w-4 h-4 text-zinc-400" />
          <h2 className="text-lg font-bold text-white tracking-wide">
            Change Password
          </h2>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-mono font-medium text-white transition-colors"
          >
            Update Password
          </button>
        </form>
      </div>

      {/* Logout button */}
      <div className="pt-2 flex justify-start">
        <button
          type="button"
          onClick={logout}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-crimson text-xs font-mono text-zinc-400 hover:text-crimson transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out of Account</span>
        </button>
      </div>
    </div>
  );
};
