import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Sparkles, Stethoscope, FileText, MessageSquareHeart, BookOpen } from 'lucide-react';

export const QuickActions = ({ onOpenSymptomModal }) => {
  return (
    <div className="bg-white p-5 rounded-3xl border border-lavender-200/80 shadow-soft">
      <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-400 mb-3">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        
        <button
          type="button"
          onClick={onOpenSymptomModal}
          className="p-3.5 rounded-2xl bg-brand-50 hover:bg-brand-100 text-brand-800 transition-all border border-brand-200/60 flex flex-col items-center text-center group"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform">
            <PlusCircle className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-charcoal-900 leading-tight">Log Symptom</span>
          <span className="text-[10px] text-charcoal-500 mt-0.5">Record pain or event</span>
        </button>

        <Link
          to="/ai-insights"
          className="p-3.5 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-800 transition-all border border-purple-200/60 flex flex-col items-center text-center group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-charcoal-900 leading-tight">AI Insights</span>
          <span className="text-[10px] text-charcoal-500 mt-0.5">Pattern synthesis</span>
        </Link>

        <Link
          to="/doctors"
          className="p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-all border border-emerald-200/60 flex flex-col items-center text-center group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform">
            <Stethoscope className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-charcoal-900 leading-tight">Find Doctor</span>
          <span className="text-[10px] text-charcoal-500 mt-0.5">Verified clinicians</span>
        </Link>

        <Link
          to="/reports"
          className="p-3.5 rounded-2xl bg-teal-50 hover:bg-teal-100 text-teal-800 transition-all border border-teal-200/60 flex flex-col items-center text-center group"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-charcoal-900 leading-tight">Clinical Report</span>
          <span className="text-[10px] text-charcoal-500 mt-0.5">Generate PDF brief</span>
        </Link>

        <Link
          to="/research"
          className="p-3.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 transition-all border border-indigo-200/60 flex flex-col items-center text-center group"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-charcoal-900 leading-tight">Research Hub</span>
          <span className="text-[10px] text-charcoal-500 mt-0.5">Peer-reviewed studies</span>
        </Link>

        <Link
          to="/community"
          className="p-3.5 rounded-2xl bg-rosebud-50 hover:bg-rosebud-100 text-rosebud-800 transition-all border border-rosebud-200/60 flex flex-col items-center text-center group"
        >
          <div className="w-10 h-10 rounded-xl bg-rosebud-600 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform">
            <MessageSquareHeart className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-charcoal-900 leading-tight">Community</span>
          <span className="text-[10px] text-charcoal-500 mt-0.5">Anonymous peers</span>
        </Link>

      </div>
    </div>
  );
};

export default QuickActions;
