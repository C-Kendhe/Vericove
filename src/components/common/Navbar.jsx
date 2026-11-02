import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Heart, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Search, 
  BookOpen, 
  Users, 
  Stethoscope, 
  Activity,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { Badge } from './Badge';

export const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const navLinks = [
    { label: 'Explore Features', path: '/#features' },
    { label: 'Research Hub', path: '/research' },
    { label: 'Find Doctors', path: '/doctors' },
    { label: 'Community', path: '/community' },
  ];

  const isCurrent = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-lavender-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 via-lavender-600 to-rosebud-400 flex items-center justify-center text-white shadow-card group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 fill-white/90" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-charcoal-900">Vericove</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-brand-100 text-brand-800">AI</span>
              </div>
              <p className="text-[10px] text-charcoal-500 font-medium -mt-1 hidden sm:block">Women's Health Intelligence</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${
                  isCurrent(link.path)
                    ? 'text-brand-700 bg-brand-50 font-semibold'
                    : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-lavender-50'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated && (
              <Link
                to="/dashboard"
                className={`px-3 py-1.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  isCurrent('/dashboard')
                    ? 'text-brand-700 bg-brand-50'
                    : 'text-charcoal-700 hover:text-brand-700 hover:bg-lavender-50'
                }`}
              >
                <Activity className="w-4 h-4 text-brand-600" />
                <span>Patient Portal</span>
              </Link>
            )}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full border border-lavender-200 bg-lavender-50/70 hover:bg-lavender-100 transition-all text-left"
                >
                  <img
                    src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"}
                    alt={user?.displayName || "User"}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                  />
                  <div className="text-xs">
                    <p className="font-semibold text-charcoal-900 leading-tight">{user?.displayName || "Maya Sharma"}</p>
                    <p className="text-[11px] text-brand-700">@{user?.communityPseudonym || "SunflowerGlow22"}</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-charcoal-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-elevated border border-lavender-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-lavender-100">
                      <p className="text-xs text-charcoal-500 font-medium">Signed in as</p>
                      <p className="text-sm font-semibold text-charcoal-900 truncate">{user?.email}</p>
                      <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium">Patient Mode</span>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-charcoal-700 hover:bg-lavender-50 hover:text-brand-700 transition-colors"
                    >
                      <Activity className="w-4 h-4 text-brand-600" />
                      <span>Dashboard Overview</span>
                    </Link>

                    <Link
                      to="/symptoms"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-charcoal-700 hover:bg-lavender-50 hover:text-brand-700 transition-colors"
                    >
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      <span>My Symptoms</span>
                    </Link>

                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-charcoal-700 hover:bg-lavender-50 hover:text-brand-700 transition-colors"
                    >
                      <User className="w-4 h-4 text-charcoal-500" />
                      <span>Profile & Privacy</span>
                    </Link>

                    <div className="my-1 border-t border-lavender-100" />

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-charcoal-700 hover:text-brand-700 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-brand-600 to-lavender-600 text-white hover:opacity-95 shadow-card hover:shadow-elevated transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-charcoal-700 hover:bg-lavender-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-lavender-200 bg-white/95 backdrop-blur-lg px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-xl text-base font-medium ${
                  isCurrent(link.path) ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-charcoal-700 hover:bg-lavender-50'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl text-base font-semibold text-brand-700 bg-brand-50"
                >
                  Patient Dashboard
                </Link>
                <Link
                  to="/symptoms"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl text-base font-medium text-charcoal-700 hover:bg-lavender-50"
                >
                  My Symptoms
                </Link>
                <Link
                  to="/ai-insights"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl text-base font-medium text-charcoal-700 hover:bg-lavender-50"
                >
                  AI Health Insights
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl text-base font-medium text-charcoal-700 hover:bg-lavender-50"
                >
                  Profile & Settings
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-base font-medium text-rose-600 hover:bg-rose-50"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="pt-3 flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl border border-lavender-300 font-semibold text-charcoal-800"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-brand-600 text-white font-semibold shadow-card"
                >
                  Get Started Free
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
