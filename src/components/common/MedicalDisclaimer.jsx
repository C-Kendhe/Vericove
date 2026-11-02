import React, { useState } from 'react';
import { ShieldAlert, Info, ChevronDown, ChevronUp } from 'lucide-react';

export const MedicalDisclaimer = ({ 
  compact = false, 
  title = "Medical & Scientific Disclaimer",
  message = "Vericove provides health tracking, community support, and evidence-informed summaries for educational and communication purposes only. It does not provide medical diagnoses, treatment plans, or prescriptions. Always consult a qualified physician for clinical care."
}) => {
  const [expanded, setExpanded] = useState(false);

  if (compact) {
    return (
      <div className="flex items-center gap-2 p-2.5 rounded-xl bg-lavender-50/80 border border-lavender-200/80 text-xs text-charcoal-600">
        <Info className="w-4 h-4 text-brand-600 flex-shrink-0" />
        <span className="truncate">{message}</span>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50/90 via-lavender-50/70 to-pink-50/50 border border-lavender-200 shadow-soft">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-white shadow-xs text-brand-700 flex-shrink-0">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="flex-1 text-xs">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-charcoal-900 text-sm mb-1">{title}</h4>
            <button 
              type="button" 
              onClick={() => setExpanded(!expanded)}
              className="text-brand-700 hover:text-brand-900 flex items-center gap-1 font-medium text-xs md:hidden"
            >
              {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
          <p className={`text-charcoal-600 leading-relaxed ${expanded ? 'block' : 'hidden md:block'}`}>
            {message}
          </p>
          <div className={`mt-2 pt-2 border-t border-lavender-200/70 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-charcoal-500 ${expanded ? 'block' : 'hidden md:flex'}`}>
            <span>• Non-diagnostic AI</span>
            <span>• Verified physician credentials checked against state registries</span>
            <span>• Peer-reviewed research cited with DOIs</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalDisclaimer;
