import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, Lock, Mail, User, ShieldCheck, Shuffle, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import MedicalDisclaimer from '../components/common/MedicalDisclaimer';

const SUGGESTED_PSEUDONYMS = [
  "SunflowerGlow22", "QuietIris94", "LunaFern", "OceanBreeze33", 
  "SilverFern82", "VelvetPetal", "SolarisDawn", "AmberMist"
];

export const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    communityPseudonym: 'SunflowerGlow22',
    dataSharingConsent: true,
    termsAccepted: true,
    medicalDisclaimerAcknowledged: true
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateRandomPseudonym = () => {
    const random = SUGGESTED_PSEUDONYMS[Math.floor(Math.random() * SUGGESTED_PSEUDONYMS.length)];
    const suffix = Math.floor(Math.random() * 90 + 10);
    setFormData(prev => ({ ...prev, communityPseudonym: `${random.replace(/\d+$/, '')}${suffix}` }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.termsAccepted) {
      setError('Please accept the terms of service and patient privacy policy.');
      return;
    }

    if (!formData.medicalDisclaimerAcknowledged) {
      setError('Please acknowledge the medical & scientific disclaimer.');
      return;
    }

    setLoading(true);
    try {
      await signup({
        fullName: formData.fullName,
        email: formData.email,
        displayName: formData.fullName.split(' ')[0] || 'Member',
        communityPseudonym: formData.communityPseudonym,
        dataSharingConsent: formData.dataSharingConsent
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-lavender-200/80 shadow-card">
        
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-rosebud-400 flex items-center justify-center text-white shadow-soft">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <span className="text-2xl font-extrabold text-charcoal-900">Vericove</span>
          </Link>
          <h2 className="text-2xl font-bold text-charcoal-900 tracking-tight">Create your patient profile</h2>
          <p className="mt-1 text-sm text-charcoal-500">
            A safe, evidence-grounded space designed to validate your health journey
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1">
              Full Legal Name (Private)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-lavender-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm bg-white"
                placeholder="Maya Sharma"
              />
            </div>
            <p className="text-[11px] text-charcoal-400 mt-1">Only shared with licensed doctors when you book a visit.</p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-lavender-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm bg-white"
                placeholder="maya@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                minLength={8}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-lavender-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm bg-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Community Pseudonym Selection */}
          <div className="p-4 rounded-2xl bg-lavender-50/80 border border-lavender-200">
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-900">
                Anonymous Community Pseudonym
              </label>
              <button
                type="button"
                onClick={generateRandomPseudonym}
                className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:text-brand-900"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Randomize</span>
              </button>
            </div>
            <input
              type="text"
              required
              value={formData.communityPseudonym}
              onChange={(e) => setFormData({ ...formData, communityPseudonym: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-lavender-300 text-sm font-semibold text-brand-900 bg-white"
            />
            <p className="text-[11px] text-charcoal-500 mt-1.5">
              This handle protects your identity in peer discussion forums. Your legal name is never displayed publicly.
            </p>
          </div>

          {/* Consents & Agreements */}
          <div className="space-y-3 pt-2">
            <label className="flex items-start gap-2.5 text-xs text-charcoal-700 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.dataSharingConsent}
                onChange={(e) => setFormData({ ...formData, dataSharingConsent: e.target.checked })}
                className="w-4 h-4 text-brand-600 rounded border-lavender-300 mt-0.5"
              />
              <span>
                <strong>Granular Data Sharing:</strong> I consent to securely sharing my symptom history with licensed healthcare professionals only when I explicitly book an appointment.
              </span>
            </label>

            <label className="flex items-start gap-2.5 text-xs text-charcoal-700 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={formData.medicalDisclaimerAcknowledged}
                onChange={(e) => setFormData({ ...formData, medicalDisclaimerAcknowledged: e.target.checked })}
                className="w-4 h-4 text-brand-600 rounded border-lavender-300 mt-0.5"
              />
              <span>
                <strong>Non-Diagnostic Notice:</strong> I understand that Vericove's AI and peer community provide health organization and informational research, not medical diagnoses or prescriptions.
              </span>
            </label>

            <label className="flex items-start gap-2.5 text-xs text-charcoal-700 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={formData.termsAccepted}
                onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                className="w-4 h-4 text-brand-600 rounded border-lavender-300 mt-0.5"
              />
              <span>
                I agree to the <Link to="/profile" className="text-brand-700 underline font-medium">Terms of Service</Link> and <Link to="/profile" className="text-brand-700 underline font-medium">Privacy Policy</Link>.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-brand-600 text-white font-bold text-sm hover:bg-brand-700 transition-colors shadow-card flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
          >
            {loading ? 'Creating Patient Account...' : 'Complete Registration'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-lavender-100 text-center">
          <p className="text-xs text-charcoal-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-brand-700 hover:text-brand-900 underline">
              Sign In here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default SignupPage;
