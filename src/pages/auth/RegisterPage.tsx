import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    const res = register(name, email, password);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.error || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative antialiased">
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
          Create Your Account
        </h2>
        <p className="text-center text-xs text-zinc-400 font-mono">
          Join the discipline. Plan. Execute. Improve.
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
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Marcus Aurelius"
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-colors"
                autoComplete="name"
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
                placeholder="name@example.com"
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-colors"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-crimson rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-colors"
                autoComplete="new-password"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-crimson hover:bg-crimson-600 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-zinc-400">
            Already have an account?{' '}
            <Link to="/login" className="text-white hover:underline font-semibold">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
