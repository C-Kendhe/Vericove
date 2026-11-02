import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Activity,
  Sparkles,
  Users,
  Stethoscope,
  BookOpen,
  FileText,
  Calendar,
  Settings,
  ShieldCheck,
  Heart,
  ChevronRight
} from 'lucide-react';

export const Sidebar = () => {
  const { user } = useAuth();

  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Symptoms', path: '/symptoms', icon: Activity },
    { name: 'AI Health Insights', path: '/ai-insights', icon: Sparkles },
    { name: 'Community', path: '/community', icon: Users },
    { name: 'Find Doctors', path: '/doctors', icon: Stethoscope },
    { name: 'Research & Knowledge Hub', path: '/research', icon: BookOpen },
    { name: 'My Health Reports', path: '/reports', icon: FileText },
    { name: 'Appointments', path: '/appointments', icon: Calendar },
    { name: 'Profile & Settings', path: '/profile', icon: Settings },
  ];

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:flex flex-col bg-white border-r border-lavender-200/80 min-h-[calc(100vh-4rem)] p-4 justify-between">
      <div className="space-y-6">
        
        {/* User Mini Card */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-lavender-50 via-white to-rosebud-50/50 border border-lavender-200/70 shadow-soft">
          <div className="flex items-center gap-3">
            <img
              src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"}
              alt={user?.displayName || "User"}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-300"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-charcoal-900 truncate">{user?.displayName || "Maya Sharma"}</p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] text-charcoal-500 font-medium truncate">@{user?.communityPseudonym || "SunflowerGlow22"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-charcoal-400 mb-2">Patient Navigation</p>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                    isActive
                      ? 'bg-brand-600 text-white font-semibold shadow-card'
                      : 'text-charcoal-700 hover:bg-lavender-50 hover:text-brand-800'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-brand-600'}`} />
                      <span>{item.name}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Trust & Database connection banner */}
      <div className="pt-4 border-t border-lavender-100">
        <div className="p-3 rounded-xl bg-purple-50/80 border border-purple-100 text-xs">
          <div className="flex items-center gap-1.5 text-brand-800 font-semibold mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
            <span>Encrypted Health Record</span>
          </div>
          <p className="text-[11px] text-charcoal-500 leading-tight">
            Protected patient data. AI guidance is non-diagnostic.
          </p>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;
