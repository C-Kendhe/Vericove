import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, MapPin, Globe, Clock, Star, 
  Calendar, Video, Building2, ShieldCheck, ArrowRight 
} from 'lucide-react';
import { VerifiedDoctorBadge, DemoDataBadge, Badge } from '../common/Badge';

export const DoctorCard = ({ doctor, onBookClick }) => {
  return (
    <div className="bg-white rounded-3xl border border-lavender-200/80 p-6 shadow-soft hover:shadow-card transition-all flex flex-col justify-between">
      
      <div>
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3.5">
            <img
              src={doctor.avatarUrl}
              alt={doctor.name}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-300 shadow-xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <Link 
                  to={`/doctors/${doctor.id}`}
                  className="font-bold text-base text-charcoal-900 hover:text-brand-700 transition-colors"
                >
                  {doctor.name}
                </Link>
              </div>
              <p className="text-xs font-semibold text-brand-700">{doctor.speciality}</p>
              <p className="text-[11px] text-charcoal-400">{doctor.subspeciality}</p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            {doctor.isVerified && (
              <VerifiedDoctorBadge registrationNumber={doctor.registrationNumber} />
            )}
            <DemoDataBadge />
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-charcoal-600 leading-relaxed line-clamp-3 mb-4">
          {doctor.bio}
        </p>

        {/* Key Metadata Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs text-charcoal-600 bg-lavender-50/50 p-3.5 rounded-2xl border border-lavender-100 mb-4">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-charcoal-400 flex-shrink-0" />
            <span className="truncate">{doctor.location}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-charcoal-400 flex-shrink-0" />
            <span>{doctor.yearsExperience} yrs exp.</span>
          </div>

          <div className="flex items-center gap-1.5 truncate">
            <Globe className="w-3.5 h-3.5 text-charcoal-400 flex-shrink-0" />
            <span className="truncate">{doctor.languages?.join(', ')}</span>
          </div>

          <div className="flex items-center gap-1.5 font-bold text-brand-900">
            <span>Fee: {doctor.consultationFee || '$180'}</span>
          </div>
        </div>

        {/* Format tags */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          {doctor.consultationTypes?.map(type => (
            <span key={type} className="text-[11px] px-2.5 py-0.5 rounded-full bg-white border border-lavender-200 text-charcoal-700 font-medium">
              {type === 'Video / Telehealth' ? '📹 Telehealth' : '🏥 In-Person Clinic'}
            </span>
          ))}
          {doctor.acceptsInsurance && (
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
              Accepts Insurance
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-lavender-100 flex items-center justify-between gap-3">
        <Link
          to={`/doctors/${doctor.id}`}
          className="text-xs font-semibold text-charcoal-600 hover:text-charcoal-900 flex items-center gap-1"
        >
          <span>Full Profile & Credentials</span>
          <ArrowRight className="w-3 h-3" />
        </Link>

        <button
          type="button"
          onClick={() => onBookClick(doctor)}
          className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-xs transition-colors"
        >
          Book Consultation
        </button>
      </div>

    </div>
  );
};

export default DoctorCard;
