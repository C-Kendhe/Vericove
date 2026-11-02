import React from 'react';
import { Sparkles } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = Sparkles,
  title = "No records found",
  description = "There are currently no items matching your criteria.",
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction
}) => {
  return (
    <div className="py-12 px-6 rounded-2xl bg-white border border-lavender-200/80 text-center max-w-lg mx-auto shadow-soft my-6">
      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-lavender-100 flex items-center justify-center text-brand-600 shadow-inner">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-semibold text-charcoal-900 mb-2">{title}</h3>
      <p className="text-sm text-charcoal-500 max-w-sm mx-auto mb-6 leading-relaxed">
        {description}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {actionLabel && (
          <button
            type="button"
            onClick={onAction}
            className="px-5 py-2.5 rounded-xl bg-brand-600 text-white font-medium text-sm hover:bg-brand-700 transition-colors shadow-sm"
          >
            {actionLabel}
          </button>
        )}
        {secondaryActionLabel && (
          <button
            type="button"
            onClick={onSecondaryAction}
            className="px-5 py-2.5 rounded-xl bg-lavender-50 text-brand-700 font-medium text-sm border border-lavender-200 hover:bg-lavender-100 transition-colors"
          >
            {secondaryActionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
