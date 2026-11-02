import React from 'react';
import { Calendar, Clock, Edit2, Trash2, Tag, AlertCircle } from 'lucide-react';
import { Badge } from '../common/Badge';

export const SymptomTimeline = ({ symptoms = [], onEdit, onDelete }) => {
  if (symptoms.length === 0) {
    return (
      <div className="py-12 text-center bg-white rounded-3xl border border-lavender-200/80 p-8">
        <p className="text-charcoal-500 text-sm">No symptoms match the current filter.</p>
      </div>
    );
  }

  return (
    <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:inset-0 before:left-3 sm:before:left-4 before:w-0.5 before:bg-lavender-200">
      {symptoms.map((symptom) => {
        const sev = symptom.severity || 5;
        const sevColor = sev >= 8 ? 'bg-rose-500' :
                         sev >= 5 ? 'bg-amber-500' :
                         'bg-emerald-500';

        return (
          <div key={symptom.id} className="relative group">
            {/* Timeline node circle */}
            <div className={`absolute -left-6 sm:-left-8 top-5 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full ring-4 ring-white ${sevColor}`} />

            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-lavender-200/80 shadow-soft hover:shadow-card transition-all">
              
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h4 className="text-base font-bold text-charcoal-900">{symptom.name}</h4>
                  <Badge size="sm" variant="default">{symptom.bodyArea}</Badge>
                  {symptom.frequency && (
                    <span className="text-xs text-charcoal-500 bg-lavender-50 px-2.5 py-0.5 rounded-full border border-lavender-200">
                      {symptom.frequency}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-50 border border-purple-200 text-xs font-bold text-brand-800">
                    <span>Severity {sev}/10</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onEdit(symptom)}
                      title="Edit entry"
                      className="p-1.5 rounded-lg text-charcoal-400 hover:text-brand-700 hover:bg-lavender-100 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(symptom.id)}
                      title="Delete entry"
                      className="p-1.5 rounded-lg text-charcoal-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Timing row */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal-500 mb-3">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-charcoal-400" />
                  {symptom.date}
                </span>
                {symptom.duration && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-charcoal-400" />
                    Duration: {symptom.duration}
                  </span>
                )}
              </div>

              {/* Notes */}
              {symptom.notes && (
                <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed bg-lavender-50/50 p-3.5 rounded-2xl border border-lavender-100 mb-3">
                  "{symptom.notes}"
                </p>
              )}

              {/* Triggers list */}
              {symptom.triggers && symptom.triggers.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-lavender-100">
                  <span className="text-[11px] font-semibold text-charcoal-400 flex items-center gap-1 mr-1">
                    <Tag className="w-3 h-3" /> Triggers:
                  </span>
                  {symptom.triggers.map((trigger, idx) => (
                    <span 
                      key={idx} 
                      className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-lavender-200 text-charcoal-600"
                    >
                      {trigger}
                    </span>
                  ))}
                </div>
              )}

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SymptomTimeline;
