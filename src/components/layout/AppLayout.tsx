import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Timer, 
  BookOpen, 
  CheckSquare, 
  User as UserIcon, 
  ShieldAlert, 
  LogOut, 
  Plus, 
  Menu, 
  X,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTasks } from '../../context/TaskContext';
import { TaskModal } from '../tasks/TaskModal';
import { formatDisplayDate, getTodayDateString } from '../../utils/initialData';

export const AppLayout: React.FC = () => {
  const { currentUser, logout, demoLogin, isAdmin } = useAuth();
  const { addTask } = useTasks();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const todayStr = getTodayDateString();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Planner', path: '/planner', icon: Calendar },
    { label: 'Focus', path: '/focus', icon: Timer },
    { label: 'Review', path: '/review', icon: CheckSquare },
    { label: 'Lessons', path: '/lessons', icon: BookOpen },
    { label: 'Profile', path: '/profile', icon: UserIcon },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getPageTitle = () => {
    const current = navItems.find((item) => location.pathname.startsWith(item.path));
    if (current) return current.label;
    if (location.pathname.startsWith('/admin')) return 'Admin Area';
    return 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col md:flex-row antialiased">
      {/* Task Creation Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={(data) => addTask(data)}
      />

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-zinc-950 border-r border-zinc-800/80 flex-shrink-0 select-none">
        {/* Brand Header */}
        <div className="p-6 border-b border-zinc-800/80">
          <NavLink to="/dashboard" className="flex items-center gap-3 group">
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
          </NavLink>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-zinc-900 border border-zinc-700/60 text-white font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-crimson' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />}
              </NavLink>
            );
          })}

          {/* Admin link if user is admin */}
          {isAdmin && (
            <div className="pt-4 mt-4 border-t border-zinc-800/80">
              <div className="px-3 pb-2 text-[10px] font-mono tracking-widest uppercase text-zinc-500 font-semibold">
                ADMINISTRATION
              </div>
              <NavLink
                to="/admin/dashboard"
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  location.pathname.startsWith('/admin')
                    ? 'bg-crimson/15 border border-crimson/40 text-crimson-200'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                }`}
              >
                <ShieldAlert className="w-4 h-4 text-crimson" />
                <span>Admin Portal</span>
              </NavLink>
            </div>
          )}
        </nav>

        {/* Demo Switcher & Account Footer */}
        <div className="p-4 border-t border-zinc-800/80 bg-zinc-950/60 space-y-3">
          {/* Quick Demo Switcher */}
          <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <span className="text-[10px] font-mono uppercase text-zinc-400">DEMO ROLE:</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => demoLogin('user')}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium transition-colors ${
                  !isAdmin ? 'bg-crimson text-white font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                USER
              </button>
              <button
                type="button"
                onClick={() => demoLogin('admin')}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium transition-colors ${
                  isAdmin ? 'bg-crimson text-white font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                ADMIN
              </button>
            </div>
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <NavLink to="/profile" className="flex items-center gap-2.5 min-w-0 flex-1 group">
              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-white flex-shrink-0 group-hover:border-crimson transition-colors">
                {currentUser?.name.charAt(0) || 'U'}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-zinc-200 truncate group-hover:text-white">
                  {currentUser?.name || 'User'}
                </div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase">
                  {currentUser?.plan || 'Free'} Plan
                </div>
              </div>
            </NavLink>

            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-crimson hover:bg-zinc-900 transition-colors"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 bg-zinc-950/95 border-b border-zinc-800/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 rounded-lg text-zinc-400 hover:text-white md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-wide">
                {getPageTitle()}
              </h1>
              <div className="text-[11px] font-mono text-zinc-400 hidden sm:block">
                {formatDisplayDate(todayStr)}
              </div>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsTaskModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-crimson hover:bg-crimson-600 text-white text-xs font-medium transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Task</span>
              <span className="sm:hidden">Task</span>
            </button>

            <NavLink
              to="/profile"
              className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-xs font-bold text-zinc-300 hover:border-crimson hover:text-white transition-colors"
              title="View Profile"
            >
              {currentUser?.name.charAt(0) || 'U'}
            </NavLink>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-zinc-950 border-b border-zinc-800 p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                    isActive
                      ? 'bg-zinc-900 text-white font-semibold border border-zinc-800'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}

            {isAdmin && (
              <NavLink
                to="/admin/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-crimson-400 hover:text-crimson-300"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Admin Portal</span>
              </NavLink>
            )}

            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs">
              <span className="text-zinc-400">{currentUser?.name}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="text-crimson font-medium hover:underline"
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Page Content Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
