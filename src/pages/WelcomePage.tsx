import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Timer, 
  Brain, 
  Sparkles, 
  Check, 
  LogIn
} from 'lucide-react';
import { Atmosphere } from '../components/Atmosphere';
import { MascotIllustration } from '../components/MascotIllustration';
import { useAuth } from '../context/AuthContext';
import { formatDisplayDate, getTodayDateString } from '../utils/initialData';

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const todayStr = getTodayDateString();

  const handleLaunch = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const productModules = [
    {
      step: '01',
      title: '24-Hour Daily Planner',
      subtitle: 'PLAN YOUR TIME',
      desc: 'High-precision hourly structure from 00:00 to 23:00. Assign activities to half-hour blocks and own every hour before time owns you.',
      icon: Calendar,
      preview: '24 hourly time slots • Real-time active hour indicator • Auto-saved schedule',
    },
    {
      step: '02',
      title: 'Eisenhower Decision Matrix',
      subtitle: 'PRIORITIZE WHAT MATTERS',
      desc: 'Four disciplined quadrants: Do Now, Schedule, Delegate, and Eliminate. Ruthlessly separate high-leverage execution from trivial noise.',
      icon: Flame,
      preview: 'Urgent vs. Important sorting • Direct sync with planner • Zero duplicate tasks',
    },
    {
      step: '03',
      title: 'Distraction-Free Focus Engine',
      subtitle: 'EXECUTE WITH INTENT',
      desc: 'Lock in on a single selected task. 25, 45, or 60-minute deep work intervals with zero distractions and direct completion logging.',
      icon: Timer,
      preview: 'Task-linked countdown • Session time recording • No gamification noise',
    },
    {
      step: '04',
      title: 'Evening Audit & Reflection',
      subtitle: 'IMPROVE EVERY DAY',
      desc: 'Three foundational prompts before closing the ledger on today: What went well? What distracted me? What will I sharpen tomorrow?',
      icon: Brain,
      preview: 'Audit trail • Lessons extracted from friction • Habitual accountability',
    },
  ];

  return (
    <div className="relative min-h-screen bg-black text-zinc-100 selection:bg-crimson selection:text-white overflow-x-hidden antialiased">
      {/* Background Atmosphere */}
      <Atmosphere />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Navigation Bar */}
        <header className="sticky top-0 z-40 w-full bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/80 py-3.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center font-display text-lg tracking-wider text-white group-hover:border-crimson transition-colors relative">
                <span className="w-1.5 h-1.5 rounded-full bg-crimson absolute top-1 right-1" />
                S
              </div>
              <div>
                <div className="font-display text-2xl tracking-widest text-white leading-none">
                  SHARP<span className="text-crimson">EN</span>
                </div>
                <div className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase mt-0.5">
                  Plan. Execute. Improve.
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-zinc-400">
              <a href="#philosophy" className="hover:text-white transition-colors">PHILOSOPHY</a>
              <a href="#modules" className="hover:text-white transition-colors">SYSTEM</a>
              <a href="#story" className="hover:text-white transition-colors">STORY</a>
              <a href="#plans" className="hover:text-white transition-colors">MEMBERSHIP</a>
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
                <Clock className="w-3.5 h-3.5 text-crimson" />
                <span>{formatDisplayDate(todayStr)}</span>
              </div>

              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-crimson hover:bg-crimson-600 text-white text-xs font-mono font-bold tracking-wider uppercase transition-colors shadow-red-glow-sm"
                >
                  <span>Go to Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-mono font-medium tracking-wider transition-colors"
                  >
                    <LogIn className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Sign In</span>
                  </Link>

                  <Link
                    to="/register"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-crimson hover:bg-crimson-600 text-white text-xs font-mono font-bold tracking-wider uppercase transition-colors shadow-red-glow-sm"
                  >
                    <span>Get Started</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* 1. Dramatic Hero Section */}
        <section className="relative min-h-[82vh] flex items-center justify-center pt-10 pb-16 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Headline & Value Proposition */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                {/* Product Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-crimson/40 text-xs font-mono font-medium tracking-widest text-zinc-300 mb-6">
                  <span className="w-2 h-2 rounded-full bg-crimson" />
                  <span>CORE PRODUCT • KILL THE TIME KILLER</span>
                </div>

                {/* Main Headline */}
                <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-wider text-white leading-[0.92] mb-6 uppercase">
                  SHARPEN <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-crimson">
                    YOUR DAY.
                  </span>
                </h1>

                {/* Supporting Text */}
                <div className="text-zinc-300 text-lg sm:text-xl font-normal leading-relaxed mb-8 max-w-xl space-y-1.5">
                  <p className="flex items-center gap-2 text-zinc-200">
                    <span className="text-crimson font-bold">―</span> Plan your time with hourly precision.
                  </p>
                  <p className="flex items-center gap-2 text-zinc-200">
                    <span className="text-crimson font-bold">―</span> Focus only on what moves the needle.
                  </p>
                  <p className="flex items-center gap-2 text-zinc-200">
                    <span className="text-crimson font-bold">―</span> Audit and improve before tomorrow begins.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleLaunch}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-crimson hover:bg-crimson-600 text-white font-mono font-bold text-sm tracking-widest uppercase transition-all shadow-red-glow hover:shadow-red-glow-lg active:scale-95 w-full sm:w-auto"
                  >
                    <span>{isAuthenticated ? 'Open Workspace' : 'Start Today'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="#modules"
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-mono font-semibold text-sm tracking-wider uppercase transition-colors w-full sm:w-auto"
                  >
                    <span>Explore System</span>
                  </a>
                </div>

                {/* Core Pillars */}
                <div className="pt-6 border-t border-zinc-800/80 grid grid-cols-3 gap-6 w-full max-w-lg">
                  <div>
                    <div className="text-crimson text-xs font-mono font-semibold mb-0.5">TIME</div>
                    <div className="text-sm font-bold text-white">Non-Renewable</div>
                    <div className="text-[11px] text-zinc-500 font-mono">24 finite hours</div>
                  </div>
                  <div>
                    <div className="text-crimson text-xs font-mono font-semibold mb-0.5">DISCIPLINE</div>
                    <div className="text-sm font-bold text-white">Prioritize First</div>
                    <div className="text-[11px] text-zinc-500 font-mono">Kill distractions</div>
                  </div>
                  <div>
                    <div className="text-crimson text-xs font-mono font-semibold mb-0.5">GROWTH</div>
                    <div className="text-sm font-bold text-white">Daily Review</div>
                    <div className="text-[11px] text-zinc-500 font-mono">Audit every night</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Visual with Original Mascot */}
              <div className="lg:col-span-5 flex justify-center relative">
                <MascotIllustration variant="hero" className="w-full max-w-md lg:max-w-none" />
              </div>

            </div>
          </div>
        </section>

        {/* 2. Product Architecture Flow */}
        <section id="philosophy" className="py-12 border-y border-zinc-800/80 bg-zinc-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-crimson font-semibold">
                THE SHARPEN OPERATING DISCIPLINE
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Kill the Time Killer
              </h2>
            </div>

            {/* 6 Step Pipeline */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { step: '01', title: 'PLAN', desc: 'Schedule 24 hours' },
                { step: '02', title: 'PRIORITIZE', desc: 'Sort by Eisenhower' },
                { step: '03', title: 'FOCUS', desc: 'Deep work blocks' },
                { step: '04', title: 'EXECUTE', desc: 'Ship real outcomes' },
                { step: '05', title: 'REVIEW', desc: 'Audit daily spent' },
                { step: '06', title: 'IMPROVE', desc: 'Hone edge tomorrow' },
              ].map((item) => (
                <div
                  key={item.step}
                  className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center relative group hover:border-crimson/50 transition-colors"
                >
                  <span className="text-[10px] font-mono text-crimson font-bold block mb-1">
                    STEP {item.step}
                  </span>
                  <div className="font-display text-xl text-white tracking-wide">
                    {item.title}
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400 mt-1">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Deep System Feature Showcase */}
        <section id="modules" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="mb-12 text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-crimson font-semibold">
              THE COMMAND SUITE
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wider mt-1">
              BUILT FOR TIME MASTERY
            </h2>
            <p className="text-zinc-400 text-sm max-w-xl mt-1">
              A serious time-management system designed with zero filler and real functional depth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {productModules.map((mod) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.step}
                  className="rounded-2xl bg-zinc-950 border border-zinc-800 p-8 flex flex-col justify-between hover:border-zinc-700 transition-colors space-y-6 shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-crimson">
                          <Icon className="w-5 h-5 text-crimson" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-crimson tracking-widest uppercase font-bold">
                            MODULE {mod.step} • {mod.subtitle}
                          </span>
                          <h3 className="text-xl font-bold text-white tracking-wide">
                            {mod.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {mod.desc}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-zinc-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{mod.preview}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Story Section: The Broken Pencil */}
        <section id="story" className="py-20 border-t border-zinc-800/80 bg-zinc-950/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-crimson font-semibold">
                DAILY LESSON
              </span>
              <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wider mt-1">
                THE BROKEN PENCIL
              </h2>
            </div>

            <div className="rounded-3xl bg-zinc-950 border border-zinc-800 p-8 sm:p-12 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-5">
                  <MascotIllustration variant="story" className="w-full max-w-md mx-auto" />
                </div>
                <div className="lg:col-span-7 space-y-5 text-left">
                  <div className="p-4 rounded-xl bg-zinc-900 border border-crimson/30">
                    <div className="font-display text-2xl text-white">
                      “The sharpener wasn't destroying me. It was preparing me to write.”
                    </div>
                  </div>
                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                    Arjun found an old, short pencil on his grandfather's desk and asked why it looked so worn.
                    The pencil explained that every turn inside the sharpener felt like destruction at first.
                    Only later did it realize that the sharpener was not destroying it—it was honing its edge so it could create beautiful words.
                  </p>
                  <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-crimson flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] font-mono text-crimson-400 uppercase tracking-widest font-bold">
                        LESSON TAKEAWAY
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-white">
                        Challenges are not dead ends. They are the grindstones that sharpen your focus and eliminate dull habits.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Plans & Membership Preview */}
        <section id="plans" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-crimson font-semibold">
              SIMPLE TIERS
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wider mt-1">
              CHOOSE YOUR DISCIPLINE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free */}
            <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
                  <h3 className="text-xl font-bold text-white">Free Workspace</h3>
                  <span className="font-mono text-xl font-bold text-white">$0</span>
                </div>
                <p className="text-xs text-zinc-400 mb-6">
                  Core essential toolkit to plan each day and organize by urgency.
                </p>
                <ul className="space-y-2.5 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-crimson" />
                    <span>24-Hour Daily Planner</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-crimson" />
                    <span>Eisenhower Decision Matrix</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-crimson" />
                    <span>Daily Reflection Log</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-crimson" />
                    <span>Starter Wisdom Lessons</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/register"
                className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-center text-xs font-mono font-bold text-white uppercase tracking-wider transition-colors"
              >
                Start Free
              </Link>
            </div>

            {/* Pro */}
            <div className="rounded-2xl bg-zinc-950 border border-crimson/50 p-8 flex flex-col justify-between space-y-6 relative shadow-red-glow-sm">
              <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-crimson text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                RECOMMENDED
              </div>
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
                  <h3 className="text-xl font-bold text-white">Pro Command</h3>
                  <span className="font-mono text-xl font-bold text-crimson">$12 <span className="text-xs text-zinc-500 font-normal">/mo</span></span>
                </div>
                <p className="text-xs text-zinc-400 mb-6">
                  Full command center with deep focus timer and historical archive.
                </p>
                <ul className="space-y-2.5 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-crimson" />
                    <span>Everything in Free Workspace</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-crimson" />
                    <span>Distraction-Free Focus Timer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-crimson" />
                    <span>Unlimited Planner History & Dates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-crimson" />
                    <span>Complete Wisdom & Lessons Archive</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-crimson" />
                    <span>Priority Support</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/register"
                className="w-full py-3 rounded-xl bg-crimson hover:bg-crimson-600 text-center text-xs font-mono font-bold text-white uppercase tracking-wider transition-colors shadow-sm"
              >
                Join Pro
              </Link>
            </div>
          </div>
        </section>

        {/* 6. Final Call To Action */}
        <section className="py-20 border-t border-zinc-800/80 bg-zinc-950 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="font-display text-5xl sm:text-7xl text-white tracking-widest leading-none">
              ONE DAY. <span className="text-crimson">ONE CHANCE.</span>
            </h2>
            <p className="text-sm font-mono text-zinc-400 uppercase tracking-[0.25em]">
              SHARPEN EVERY DAY. PLAN. EXECUTE. IMPROVE.
            </p>
            <div className="pt-4 flex justify-center">
              <button
                type="button"
                onClick={handleLaunch}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-crimson hover:bg-crimson-600 text-white font-mono font-bold text-sm tracking-widest uppercase transition-all shadow-red-glow hover:shadow-red-glow-lg active:scale-95"
              >
                <span>{isAuthenticated ? 'Open Workspace' : 'Launch Workspace'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-800/80 bg-black py-8 text-center text-xs font-mono text-zinc-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              SHARPEN • PLAN. EXECUTE. IMPROVE.
            </div>
            <div className="flex items-center gap-4 text-zinc-400">
              <Link to="/login" className="hover:text-white transition-colors">Sign In</Link>
              <span>•</span>
              <Link to="/register" className="hover:text-white transition-colors">Register</Link>
              <span>•</span>
              <Link to="/dashboard" className="hover:text-white transition-colors">Workspace</Link>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default WelcomePage;
