import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, Calendar, AlertCircle } from 'lucide-react';
import { Badge } from '../common/Badge';

export const RecentSymptomsWidget = ({ symptoms = [], onOpenModal }) => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-lavender-200/80 shadow-soft flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-brand-100 text-brand-700">
              <Activity className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-charcoal-900 text-base">Recent Symptom Logs</h3>
          </div>
          <Link to="/symptoms" className="text-xs font-semibold text-brand-700 hover:text-brand-900 flex items-center gap-1">
            <span>View All ({symptoms.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {symptoms.length === 0 ? (
          <div className="py-8 text-center text-charcoal-400 text-sm">
            <p>No symptoms logged yet.</p>
            <button
              type="button"
              onClick={onOpenModal}
              className="mt-2 text-xs font-semibold text-brand-600 underline"
            >
              Log your first symptom
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {symptoms.slice(0, 4).map((symptom) => {
              const sev = symptom.severity || 5;
              const sevColor = sev >= 8 ? 'bg-rose-50 text-rose-700 border-rose-200' :
                               sev >= 5 ? 'bg-amber-50 text-amber-700 border-amber-200' :
                               'bg-emerald-50 text-emerald-700 border-emerald-200';

              return (
                <div 
                  key={symptom.id} 
                  className="p-3.5 rounded-2xl bg-lavender-50/50 hover:bg-lavender-50 border border-lavender-200/60 transition-colors flex items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-charcoal-900 truncate">{symptom.name}</h4>
                      <Badge size="sm" variant="default">{symptom.bodyArea}</Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-charcoal-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-charcoal-400" />
                        {symptom.date}
                      </span>
                      {symptom.frequency && (
                        <span className="truncate max-w-[140px] text-charcoal-400">• {symptom.frequency}</span>
                      )}
                    </div>
                  </div>

                  <div className={`px-2.5 py-1 rounded-xl text-xs font-bold border ${sevColor} flex-shrink-0 flex items-center gap-1`}>
                    <span>{sev}/10</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="pt-4 mt-4 border-t border-lavender-100 flex items-center justify-between">
        <span className="text-xs text-charcoal-500">Continuous logging increases diagnostic accuracy</span>
        <button
          type="button"
          onClick={onOpenModal}
          className="text-xs font-bold text-brand-700 hover:text-brand-900"
        >
          + Add Entry
        </button>
      </div>
    </div>
  );
};

export default RecentSymptomsWidget;
