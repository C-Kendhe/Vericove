import React from 'react';
import { Activity, ShieldCheck, Heart, Sparkles, Calendar, BookOpen } from 'lucide-react';

export const HealthOverviewCard = ({ 
  user, 
  symptomCount = 0, 
  averageSeverity = '6.8', 
  upcomingAppointmentCount = 0, 
  savedResearchCount = 0 
}) => {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-brand-900 via-brand-800 to-lavender-900 text-white p-6 sm:p-8 shadow-card relative overflow-hidden">
      
      {/* Decorative blurred background shapes */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-rosebud-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-brand-400/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Welcome Text */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-lavender-200">
            <Sparkles className="w-3.5 h-3.5 text-brand-300" />
            <span>Patient Health Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.displayName || 'Maya'}
          </h1>
          <p className="text-sm text-lavender-200 max-w-xl leading-relaxed">
            Your symptom journal and clinical insights are active. All observations are encrypted and ready to support your upcoming doctor consultations.
          </p>
        </div>

        {/* Dynamic Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
            <div className="flex items-center justify-center gap-1 text-lavender-200 text-xs mb-1">
              <Activity className="w-3.5 h-3.5" />
              <span>Logs</span>
            </div>
            <p className="text-2xl font-black text-white">{symptomCount}</p>
            <p className="text-[10px] text-lavender-300">Recorded</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
            <div className="flex items-center justify-center gap-1 text-lavender-200 text-xs mb-1">
              <Heart className="w-3.5 h-3.5" />
              <span>Avg. Pain</span>
            </div>
            <p className="text-2xl font-black text-rosebud-300">{averageSeverity}<span className="text-xs font-normal text-white/70">/10</span></p>
            <p className="text-[10px] text-lavender-300">Severity</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
            <div className="flex items-center justify-center gap-1 text-lavender-200 text-xs mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Visits</span>
            </div>
            <p className="text-2xl font-black text-emerald-300">{upcomingAppointmentCount}</p>
            <p className="text-[10px] text-lavender-300">Upcoming</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
            <div className="flex items-center justify-center gap-1 text-lavender-200 text-xs mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Research</span>
            </div>
            <p className="text-2xl font-black text-indigo-300">{savedResearchCount}</p>
            <p className="text-[10px] text-lavender-300">Bookmarked</p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default HealthOverviewCard;
