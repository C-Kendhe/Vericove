import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export const ErrorState = ({
  title = "Unable to load data",
  message = "A network or server communication error occurred while fetching information from the backend.",
  onRetry
}) => {
  return (
    <div className="py-8 px-6 rounded-2xl bg-rose-50/70 border border-rose-200 text-center max-w-lg mx-auto shadow-sm my-6">
      <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-rose-950 mb-1">{title}</h3>
      <p className="text-sm text-rose-800 mb-5 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-rose-300 text-rose-800 font-medium text-sm hover:bg-rose-50 transition-colors shadow-xs"
        >
          <RotateCcw className="w-4 h-4 text-rose-600" />
          <span>Retry Request</span>
        </button>
      )}
    </div>
  );
};

export default ErrorState;
