import React from 'react';
import { 
  Users, 
  BookOpen, 
  CreditCard, 
  CheckCircle2
} from 'lucide-react';
import { useTasks } from '../../context/TaskContext';

export const AdminDashboardPage: React.FC = () => {
  const { allUsers, lessons } = useTasks();

  // Real calculations only
  const totalUsers = allUsers.length;
  const activeUsers = allUsers.filter((u) => u.status === 'active').length;
  const totalLessons = lessons.length;
  const publishedLessons = lessons.filter((l) => l.published).length;

  const proCount = allUsers.filter((u) => u.plan === 'Pro').length;
  const freeCount = allUsers.filter((u) => u.plan === 'Free').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-zinc-800">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
          Admin Overview
        </h1>
        <p className="text-xs font-mono text-zinc-400 mt-1">
          Real system telemetry and user account statistics
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
            <span>TOTAL USERS</span>
            <Users className="w-4 h-4 text-crimson" />
          </div>
          <div className="text-3xl font-bold text-white">{totalUsers}</div>
          <div className="text-[11px] text-zinc-500 font-mono mt-1">
            {activeUsers} active accounts
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
            <span>ACTIVE ACCOUNTS</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-white">{activeUsers}</div>
          <div className="text-[11px] text-zinc-500 font-mono mt-1">
            {totalUsers - activeUsers} disabled
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
            <span>LESSONS ARCHIVE</span>
            <BookOpen className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold text-white">{totalLessons}</div>
          <div className="text-[11px] text-zinc-500 font-mono mt-1">
            {publishedLessons} published
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
            <span>SUBSCRIPTION MIX</span>
            <CreditCard className="w-4 h-4 text-zinc-300" />
          </div>
          <div className="text-3xl font-bold text-white">
            {proCount} <span className="text-sm font-normal text-zinc-500">Pro</span>
          </div>
          <div className="text-[11px] text-zinc-500 font-mono mt-1">
            {freeCount} Free tier users
          </div>
        </div>
      </div>

      {/* Subscription Breakdown Card */}
      <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
          Plan Distribution
        </h2>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-zinc-300">Pro Plan ($12/mo)</span>
              <span className="text-white font-bold">{proCount} users ({totalUsers > 0 ? Math.round((proCount / totalUsers) * 100) : 0}%)</span>
            </div>
            <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden">
              <div 
                className="h-full bg-crimson rounded-full" 
                style={{ width: `${totalUsers > 0 ? (proCount / totalUsers) * 100 : 0}%` }} 
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-zinc-300">Free Tier ($0)</span>
              <span className="text-white font-bold">{freeCount} users ({totalUsers > 0 ? Math.round((freeCount / totalUsers) * 100) : 0}%)</span>
            </div>
            <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden">
              <div 
                className="h-full bg-zinc-700 rounded-full" 
                style={{ width: `${totalUsers > 0 ? (freeCount / totalUsers) * 100 : 0}%` }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Users Table Preview */}
      <div className="rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden">
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Registered Users ({allUsers.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-zinc-900/60 text-zinc-400 border-b border-zinc-800">
              <tr>
                <th className="py-3 px-4">NAME</th>
                <th className="py-3 px-4">EMAIL</th>
                <th className="py-3 px-4">ROLE</th>
                <th className="py-3 px-4">PLAN</th>
                <th className="py-3 px-4">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {allUsers.map((u) => (
                <tr key={u.id} className="hover:bg-zinc-900/30">
                  <td className="py-3 px-4 font-semibold text-white">{u.name}</td>
                  <td className="py-3 px-4 text-zinc-400">{u.email}</td>
                  <td className="py-3 px-4">
                    <span className="uppercase text-crimson font-bold">{u.role}</span>
                  </td>
                  <td className="py-3 px-4">{u.plan}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                      u.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
