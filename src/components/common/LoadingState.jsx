import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState = ({ message = "Loading healthcare data...", rows = 3 }) => {
  return (
    <div className="py-12 px-6 flex flex-col items-center justify-center text-center">
      <div className="relative mb-4">
        <div className="w-12 h-12 rounded-full border-4 border-lavender-200 border-t-brand-600 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-rosebud-300 animate-pulse" />
        </div>
      </div>
      <p className="text-sm font-medium text-charcoal-700 animate-pulse mb-6">{message}</p>
      
      {/* Shimmer skeleton */}
      <div className="w-full max-w-md space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-10 bg-lavender-100/60 rounded-xl animate-pulse" style={{ opacity: 1 - i * 0.2 }} />
        ))}
      </div>
    </div>
  );
};

export default LoadingState;
