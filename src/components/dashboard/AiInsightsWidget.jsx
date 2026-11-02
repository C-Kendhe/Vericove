import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Lightbulb, HelpCircle, ShieldAlert } from 'lucide-react';

export const AiInsightsWidget = () => {
  return (
    <div className="bg-gradient-to-br from-white via-lavender-50/40 to-purple-50/30 p-6 rounded-3xl border border-lavender-200 shadow-card flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-charcoal-900 text-base">AI Health Insights</h3>
              <p className="text-[11px] text-charcoal-500">Pattern synthesis from your logs</p>
            </div>
          </div>
          <Link to="/ai-insights" className="text-xs font-semibold text-brand-700 hover:text-brand-900 flex items-center gap-1">
            <span>Explore AI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Highlight Card */}
        <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-soft space-y-3 mb-4">
          <div className="flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-charcoal-900">Detected Cyclical Recurrence</h4>
              <p className="text-xs text-charcoal-600 mt-1 leading-relaxed">
                Your pelvic discomfort and fatigue exhibit a <strong>27–29 day cyclical spike</strong>. Peak pain correlates directly with cycle days 1–3 and day 14 (ovulation window).
              </p>
            </div>
          </div>
        </div>

        {/* Doctor Discussion Pointer */}
        <div className="p-3.5 rounded-2xl bg-lavender-100/60 border border-lavender-200 text-xs text-charcoal-700 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-brand-900">
            <HelpCircle className="w-3.5 h-3.5 text-brand-700" />
            <span>Suggested Consultation Question:</span>
          </div>
          <p className="italic text-charcoal-600 pl-5">
            "Given my recurring luteal-phase pelvic pain and extreme fatigue, would an expert ultrasound protocol or hormonal panel help assess possible endometriosis or adenomyosis?"
          </p>
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-lavender-200/60 flex items-center justify-between text-xs">
        <span className="text-[11px] text-charcoal-500">AI insights are non-diagnostic</span>
        <Link to="/ai-insights" className="font-semibold text-brand-700 hover:text-brand-900">
          Run Natural Language Analysis →
        </Link>
      </div>
    </div>
  );
};

export default AiInsightsWidget;
