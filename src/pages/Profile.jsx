import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { researchService } from '../services/researchService';
import { 
  User, Lock, Shield, Bell, Globe, Bookmark, 
  Trash2, Save, CheckCircle2, AlertCircle, Shuffle, ShieldCheck 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Profile = () => {
  const { user, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || 'Maya Sharma',
    displayName: user?.displayName || 'Maya S.',
    communityPseudonym: user?.communityPseudonym || 'SunflowerGlow22',
    email: user?.email || 'maya.sharma@example.com',
    preferredLanguage: user?.preferredLanguage || 'en',
    timezone: user?.timezone || 'America/New_York',
    privacySettings: {
      shareSymptomsWithBookedDoctor: user?.privacySettings?.shareSymptomsWithBookedDoctor ?? true,
      showInCommunityMemberCount: user?.privacySettings?.showInCommunityMemberCount ?? true,
      allowAnonymousResearchAggregation: user?.privacySettings?.allowAnonymousResearchAggregation ?? false,
      pseudonymVisibleInCommunity: user?.privacySettings?.pseudonymVisibleInCommunity ?? true
    },
    notificationPreferences: {
      appointmentReminders: user?.notificationPreferences?.appointmentReminders ?? true,
      communityReplies: user?.notificationPreferences?.communityReplies ?? true,
      weeklyHealthSummary: user?.notificationPreferences?.weeklyHealthSummary ?? false,
      newRelevantResearchAlerts: user?.notificationPreferences?.newRelevantResearchAlerts ?? true
    }
  });

  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleRandomizePseudonym = () => {
    const names = ["SunflowerGlow", "QuietIris", "LunaFern", "OceanBreeze", "SilverFern", "VelvetPetal"];
    const chosen = names[Math.floor(Math.random() * names.length)];
    const num = Math.floor(Math.random() * 90 + 10);
    setFormData(prev => ({ ...prev, communityPseudonym: `${chosen}${num}` }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage('');
    try {
      await updateProfile(formData);
      setSuccessMessage('Profile and privacy preferences updated successfully.');
      setTimeout(() => setSuccessMessage(''), 4000);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your Vericove patient account? This will permanently erase your symptom records from this device.')) {
      localStorage.clear();
      window.location.href = '/';
    }
  };

  const savedPaperCount = researchService.getSavedPaperIds().length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-lavender-200/80 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"}
              alt="Avatar"
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-brand-300 shadow-xs"
            />
            <div>
              <h1 className="text-2xl font-extrabold text-charcoal-900 leading-tight">
                {formData.fullName}
              </h1>
              <p className="text-xs text-brand-700 font-semibold">
                Community Pseudonym: @{formData.communityPseudonym}
              </p>
              <p className="text-xs text-charcoal-400 mt-0.5">Patient ID: {user?.id || 'usr_101'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Link
              to="/research"
              className="px-3.5 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold flex items-center gap-1.5 hover:bg-indigo-100 transition-colors"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{savedPaperCount} Saved Papers</span>
            </Link>
          </div>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Personal & Community Information */}
        <div className="bg-white p-6 rounded-3xl border border-lavender-200/80 shadow-soft space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal-900 flex items-center gap-2">
            <User className="w-4 h-4 text-brand-600" />
            <span>Profile & Identity</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1">
                Full Legal Name (Private)
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-lavender-300 text-xs sm:text-sm bg-white"
              />
              <span className="text-[11px] text-charcoal-400 mt-1 block">Visible only to clinicians you consult.</span>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-lavender-300 text-xs sm:text-sm bg-white"
              />
            </div>
          </div>

          {/* Pseudonym Customizer */}
          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100">
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-purple-900">
                Community Pseudonym
              </label>
              <button
                type="button"
                onClick={handleRandomizePseudonym}
                className="text-xs text-brand-700 hover:text-brand-900 font-semibold flex items-center gap-1"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Randomize</span>
              </button>
            </div>
            <input
              type="text"
              value={formData.communityPseudonym}
              onChange={(e) => setFormData({ ...formData, communityPseudonym: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-purple-200 text-sm font-bold text-brand-900 bg-white"
            />
            <p className="text-[11px] text-charcoal-500 mt-1">
              Your identity in community discussions is protected by this pseudonym.
            </p>
          </div>
        </div>

        {/* Data Sharing & Privacy Settings */}
        <div className="bg-white p-6 rounded-3xl border border-lavender-200/80 shadow-soft space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Patient-Controlled Privacy & Doctor Sharing</span>
          </h3>

          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 rounded-2xl bg-lavender-50/50 border border-lavender-100 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={formData.privacySettings.shareSymptomsWithBookedDoctor}
                onChange={(e) => setFormData({
                  ...formData,
                  privacySettings: { ...formData.privacySettings, shareSymptomsWithBookedDoctor: e.target.checked }
                })}
                className="w-4 h-4 text-brand-600 rounded mt-0.5"
              />
              <div>
                <strong className="text-charcoal-900 block font-bold">Auto-attach longitudinal symptom charts to booked consultations</strong>
                <span className="text-charcoal-500">Allows doctors you book to view your structured timeline prior to meeting.</span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-2xl bg-lavender-50/50 border border-lavender-100 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={formData.privacySettings.showInCommunityMemberCount}
                onChange={(e) => setFormData({
                  ...formData,
                  privacySettings: { ...formData.privacySettings, showInCommunityMemberCount: e.target.checked }
                })}
                className="w-4 h-4 text-brand-600 rounded mt-0.5"
              />
              <div>
                <strong className="text-charcoal-900 block font-bold">Public Anonymous Presence</strong>
                <span className="text-charcoal-500">Allow other verified patients to read your anonymous community posts.</span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-2xl bg-lavender-50/50 border border-lavender-100 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={formData.privacySettings.allowAnonymousResearchAggregation}
                onChange={(e) => setFormData({
                  ...formData,
                  privacySettings: { ...formData.privacySettings, allowAnonymousResearchAggregation: e.target.checked }
                })}
                className="w-4 h-4 text-brand-600 rounded mt-0.5"
              />
              <div>
                <strong className="text-charcoal-900 block font-bold">Contribute to De-Identified Academic Research</strong>
                <span className="text-charcoal-500">Allow academic partners to aggregate de-identified symptom latency statistics to publish medical bias studies.</span>
              </div>
            </label>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white p-6 rounded-3xl border border-lavender-200/80 shadow-soft space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal-900 flex items-center gap-2">
            <Bell className="w-4 h-4 text-purple-600" />
            <span>Notification Preferences</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <label className="flex items-center gap-2.5 p-3 rounded-xl border border-lavender-100">
              <input
                type="checkbox"
                checked={formData.notificationPreferences.appointmentReminders}
                onChange={(e) => setFormData({
                  ...formData,
                  notificationPreferences: { ...formData.notificationPreferences, appointmentReminders: e.target.checked }
                })}
                className="w-4 h-4 text-brand-600 rounded"
              />
              <span>Appointment Reminders</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl border border-lavender-100">
              <input
                type="checkbox"
                checked={formData.notificationPreferences.communityReplies}
                onChange={(e) => setFormData({
                  ...formData,
                  notificationPreferences: { ...formData.notificationPreferences, communityReplies: e.target.checked }
                })}
                className="w-4 h-4 text-brand-600 rounded"
              />
              <span>Community Replies & Upvotes</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl border border-lavender-100">
              <input
                type="checkbox"
                checked={formData.notificationPreferences.newRelevantResearchAlerts}
                onChange={(e) => setFormData({
                  ...formData,
                  notificationPreferences: { ...formData.notificationPreferences, newRelevantResearchAlerts: e.target.checked }
                })}
                className="w-4 h-4 text-brand-600 rounded"
              />
              <span>New Relevant Research Alerts</span>
            </label>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm shadow-card flex items-center gap-2 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>

      </form>

      {/* Account Deletion Danger Zone */}
      <div className="p-6 rounded-3xl bg-rose-50/70 border border-rose-200 mt-8">
        <h4 className="text-sm font-bold text-rose-950 mb-1 flex items-center gap-2">
          <Trash2 className="w-4 h-4 text-rose-600" />
          <span>Patient Account Deletion</span>
        </h4>
        <p className="text-xs text-rose-800 mb-4 leading-relaxed">
          Permanent removal of all personal symptom observations, health reports, and community bookmarks from this device.
        </p>
        <button
          type="button"
          onClick={handleDeleteAccount}
          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs"
        >
          Erase My Patient Data
        </button>
      </div>

    </div>
  );
};

export default Profile;
