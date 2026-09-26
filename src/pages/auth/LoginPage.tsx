import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const LoginPage: React.FC = () => {
  const { login, demoLogin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }
    const res = login(email, password);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.error || 'Authentication failed.');
    }
  };

  const handleDemo = (role: 'user' | 'admin') => {
    demoLogin(role);
    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative antialiased">
      {/* Background Accent */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-[140px] opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.4) 0%, transparent 70%)'
        }}
      />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <Link to="/" className="flex items-center justify-center gap-3 mb-6 group">
          <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-display text-xl text-white group-hover:border-crimson transition-colors relative">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson absolute top-1 right-1" />
            S
          </div>
          <span className="font-display text-3xl tracking-widest text-white">
            SHARP<span className="text-crimson">EN</span>
          </span>
        </Link>
        <h2 className="text-center text-xl font-bold tracking-tight text-white mb-1">
          Sign In to Your Workspace
        </h2>
        <p className="text-center text-xs text-zinc-400 font-mono">
          Kill the time killer. Own your hours.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 relative z-10">
        <div className="bg-zinc-950 border border-zinc-800/90 py-8 px-6 sm:px-10 rounded-2xl shadow-2xl">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-crimson/15 border border-crimson/40 text-xs text-crimson-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@sharpen.app"
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-colors"
                autoComplete="email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-zinc-300">
                  Password
                </label>
                <span className="text-[11px] text-zinc-500 font-mono">
                  (Demo: any password)
                </span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-colors"
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-crimson hover:bg-crimson-600 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Access Buttons */}
          <div className="mt-8 pt-6 border-t border-zinc-800/80">
            <div className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase text-center mb-3">
              INSTANT DEMO EVALUATION
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleDemo('user')}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-medium text-zinc-200 transition-colors"
              >
                <UserIcon className="w-3.5 h-3.5 text-crimson" />
                <span>Demo User</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemo('admin')}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-crimson/50 text-xs font-medium text-zinc-200 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-crimson" />
                <span>Demo Admin</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-zinc-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-white hover:underline font-semibold">
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
