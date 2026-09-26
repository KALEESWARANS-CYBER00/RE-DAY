import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  CreditCard, 
  Settings, 
  ArrowLeft, 
  LogOut, 
  Menu, 
  X,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLayout: React.FC = () => {
  const { currentUser, logout, demoLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const adminNavItems = [
    { label: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'User Management', path: '/admin/users', icon: Users },
    { label: 'Content Management', path: '/admin/content', icon: FileText },
    { label: 'Subscriptions', path: '/admin/subscriptions', icon: CreditCard },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getPageTitle = () => {
    const current = adminNavItems.find((item) => location.pathname === item.path);
    return current ? current.label : 'Admin Portal';
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col md:flex-row antialiased">
      {/* Admin Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-zinc-950 border-r border-zinc-800/80 flex-shrink-0 select-none">
        {/* Brand Header */}
        <div className="p-6 border-b border-zinc-800/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-crimson/15 border border-crimson/40 text-crimson">
              <ShieldAlert className="w-4 h-4 text-crimson" />
            </div>
            <div>
              <div className="font-display text-xl tracking-wider text-white">
                SHARPEN ADMIN
              </div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase">
                Control Management
              </div>
            </div>
          </div>
        </div>

        {/* Back to User Dashboard button */}
        <div className="px-4 pt-4 pb-2">
          <NavLink
            to="/dashboard"
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-crimson" />
            <span>Return to User Dashboard</span>
          </NavLink>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-zinc-900 border border-zinc-700/60 text-white font-semibold'
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
        </nav>

        {/* Admin Footer */}
        <div className="p-4 border-t border-zinc-800/80 bg-zinc-950/60 space-y-3">
          <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <span className="text-[10px] font-mono uppercase text-zinc-400">DEMO ROLE:</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  demoLogin('user');
                  navigate('/dashboard');
                }}
                className="px-2 py-0.5 rounded text-[10px] font-mono font-medium text-zinc-400 hover:text-white"
              >
                USER
              </button>
              <button
                type="button"
                onClick={() => demoLogin('admin')}
                className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-crimson text-white"
              >
                ADMIN
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <div className="min-w-0">
              <div className="font-medium text-zinc-200 truncate">{currentUser?.name}</div>
              <div className="text-[10px] font-mono text-crimson uppercase">Administrator</div>
            </div>
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

      {/* Main Admin Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 h-16 bg-zinc-950/95 border-b border-zinc-800/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
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
              <div className="text-[11px] font-mono text-zinc-500">
                System Administration
              </div>
            </div>
          </div>

          <NavLink
            to="/dashboard"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-crimson" />
            <span>Exit Admin</span>
          </NavLink>
        </header>

        {mobileMenuOpen && (
          <div className="md:hidden bg-zinc-950 border-b border-zinc-800 p-4 space-y-1">
            {adminNavItems.map((item) => {
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
            <div className="pt-3 border-t border-zinc-800">
              <NavLink
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-xs text-crimson font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to User Dashboard</span>
              </NavLink>
            </div>
          </div>
        )}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
