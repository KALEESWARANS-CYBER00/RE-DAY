import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Clock, Calendar, CheckSquare, User as UserIcon, LogIn } from 'lucide-react';
import { formatDisplayDate } from '../utils/storage';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentDateStr: string;
  completionPercentage: number;
  completedHours: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentDateStr,
  completionPercentage,
  completedHours,
}) => {
  const { currentUser, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'TODAY', href: '#today' },
    { label: 'PLANNER', href: '#planner' },
    { label: 'MATRIX', href: '#matrix' },
    { label: 'STORY', href: '#story' },
    { label: 'REFLECTION', href: '#reflection' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-zinc-800/80 shadow-2xl py-2.5'
          : 'bg-background/50 backdrop-blur-sm border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Logo & Tagline */}
        <a 
          href="#today" 
          onClick={(e) => handleNavClick(e, '#today')}
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson rounded-lg p-1"
        >
          {/* Logo Icon: stylized pencil blade */}
          <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700/80 flex items-center justify-center shadow-inner group-hover:border-crimson transition-colors relative overflow-hidden">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson absolute top-1 right-1" />
            <span className="font-display text-lg tracking-wider text-white">S</span>
          </div>

          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-2xl tracking-widest text-zinc-100 group-hover:text-white transition-colors">
                SHARP<span className="text-crimson">EN</span>
              </span>
            </div>
            <p className="text-[9px] tracking-[0.25em] text-zinc-400 font-mono -mt-1 uppercase hidden sm:block">
              Plan. Execute. Improve.
            </p>
          </div>
        </a>

        {/* Center: Desktop Navigation links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-3 py-1.5 text-xs font-mono font-medium tracking-widest text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40 rounded-lg transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side: Date, Progress & Auth Controls */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Current Date */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300 font-mono">
            <Calendar className="w-3.5 h-3.5 text-crimson" />
            <span>{formatDisplayDate(currentDateStr)}</span>
          </div>

          {/* Daily Progress Indicator */}
          <div 
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-zinc-900/80 border border-crimson/30 text-xs font-mono shadow-red-glow-sm"
            title={`${completedHours} of 24 hours completed`}
          >
            <div className="flex items-center gap-1.5">
              <CheckSquare className="w-3.5 h-3.5 text-crimson" />
              <span className="text-zinc-300 font-semibold">{completionPercentage}%</span>
            </div>
            <div className="w-10 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-crimson transition-all duration-500 rounded-full"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          {/* Authentication Links */}
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-crimson hover:bg-crimson-600 text-white text-xs font-mono font-bold tracking-wider uppercase transition-colors shadow-red-glow-sm"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Workspace</span>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-mono font-medium tracking-wider uppercase transition-colors"
              >
                <LogIn className="w-3.5 h-3.5 text-zinc-400" />
                <span>Sign In</span>
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-crimson hover:bg-crimson-600 text-white text-xs font-mono font-bold tracking-wider uppercase transition-colors shadow-red-glow-sm"
              >
                <span>Get Started</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex sm:hidden items-center gap-2">
          {/* Quick mini percentage on mobile */}
          <div className="px-2 py-1 rounded bg-zinc-900 border border-crimson/40 text-[11px] font-mono text-zinc-200">
            {completionPercentage}%
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-3 pb-6 bg-background-card/98 border-b border-zinc-800/90 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-1 mb-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-2.5 rounded-lg text-sm font-mono tracking-wider text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-800/80 flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-mono px-2">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-crimson" />
                {formatDisplayDate(currentDateStr)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                {completedHours}/24 HOURS
              </span>
            </div>

            {isAuthenticated ? (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 block w-full py-2.5 rounded-xl bg-crimson text-center text-xs font-mono font-bold text-white uppercase tracking-wider"
              >
                Go to Workspace ({currentUser?.name})
              </Link>
            ) : (
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-center text-xs font-mono text-zinc-200 uppercase"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 rounded-xl bg-crimson text-center text-xs font-mono font-bold text-white uppercase tracking-wider"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
