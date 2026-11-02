import React from 'react';
import { CheckCircle2, ShieldCheck, Sparkles, BookOpen, AlertCircle } from 'lucide-react';

export const Badge = ({ children, variant = 'default', size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  };

  const variants = {
    default: 'bg-lavender-100 text-brand-800 border-lavender-200',
    primary: 'bg-brand-50 text-brand-700 border-brand-200',
    secondary: 'bg-rosebud-100 text-rosebud-800 border-rosebud-200',
    verified: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    evidence: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    outline: 'bg-transparent text-charcoal-600 border-charcoal-200',
    demo: 'bg-purple-100 text-purple-800 border-purple-300 font-mono tracking-wide',
  };

  return (
    <span className={`inline-flex items-center gap-1 font-medium rounded-full border ${variants[variant] || variants.default} ${sizeClasses[size] || sizeClasses.md} ${className}`}>
      {children}
    </span>
  );
};

export const VerifiedDoctorBadge = ({ registrationNumber, className = '' }) => (
  <span 
    title={registrationNumber ? `Credentials Verified: Registration #${registrationNumber}` : 'Credentials Verified by Medical Board Review'}
    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-xs ${className}`}
  >
    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
    <span>Verified Medical Specialist</span>
  </span>
);

export const DemoDataBadge = ({ label = 'DEMO RECORD', className = '' }) => (
  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-amber-100 text-amber-800 border border-amber-300 ${className}`}>
    <AlertCircle className="w-3 h-3 text-amber-700" />
    <span>{label}</span>
  </span>
);

export const EvidenceBadge = ({ classification = 'Level 1A Evidence', className = '' }) => (
  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200 ${className}`}>
    <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
    <span>{classification}</span>
  </span>
);

export default Badge;
