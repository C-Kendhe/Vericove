import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import MedicalDisclaimer from '../components/common/MedicalDisclaimer';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('maya.sharma@example.com');
  const [password, setPassword] = useState('DemoPassword123!');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-lavender-200/80 shadow-card">
        
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-rosebud-400 flex items-center justify-center text-white shadow-soft">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <span className="text-2xl font-extrabold text-charcoal-900">Vericove</span>
          </Link>
          <h2 className="text-2xl font-bold text-charcoal-900 tracking-tight">Welcome back</h2>
          <p className="mt-1 text-sm text-charcoal-500">Sign in to your patient health portal</p>
        </div>

        {/* Demo Mode Notice */}
        <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs text-charcoal-700 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-brand-900">Demo Account Preloaded:</span> Click sign in to test all features with mock patient data.
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-lavender-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm text-charcoal-900 bg-white"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600">
                Password
              </label>
              <button
                type="button"
                onClick={() => setForgotModalOpen(true)}
                className="text-xs font-semibold text-brand-700 hover:text-brand-900"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-lavender-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm text-charcoal-900 bg-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-brand-600 border-lavender-300 rounded focus:ring-brand-500"
            />
            <label htmlFor="remember-me" className="ml-2 block text-xs text-charcoal-600">
              Keep me securely logged in on this browser
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 transition-colors shadow-card flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In to Portal'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-lavender-100 text-center">
          <p className="text-xs text-charcoal-600">
            Don't have an account yet?{' '}
            <Link to="/signup" className="font-semibold text-brand-700 hover:text-brand-900 underline">
              Create a free account
            </Link>
          </p>
        </div>

        <MedicalDisclaimer compact message="Patient portal logins are end-to-end protected. AI does not diagnose." />

      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-elevated border border-lavender-200">
            <h3 className="text-lg font-bold text-charcoal-900 mb-2">Reset Password</h3>
            {resetSent ? (
              <div className="py-4 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-charcoal-900">Reset instructions sent!</p>
                <p className="text-xs text-charcoal-500 mt-1">If an account exists for {email}, a recovery link has been dispatched.</p>
                <button
                  type="button"
                  onClick={() => { setResetSent(false); setForgotModalOpen(false); }}
                  className="mt-4 px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold"
                >
                  Return to Login
                </button>
              </div>
            ) : (
              <div>
                <p className="text-xs text-charcoal-600 mb-4">Enter your registered email address and we'll send a password recovery token.</p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-lavender-300 rounded-xl text-sm mb-4"
                  placeholder="name@example.com"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(false)}
                    className="px-3 py-1.5 text-xs text-charcoal-600 hover:text-charcoal-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setResetSent(true)}
                    className="px-4 py-1.5 rounded-xl bg-brand-600 text-white text-xs font-semibold"
                  >
                    Send Reset Link
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default LoginPage;
