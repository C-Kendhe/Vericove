import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Video, Clock, ArrowRight, UserCheck, CheckCircle2 } from 'lucide-react';
import { VerifiedDoctorBadge } from '../common/Badge';

export const UpcomingAppointmentsWidget = ({ appointments = [] }) => {
  const upcoming = appointments.filter(a => a.status === 'Confirmed' || a.status === 'Upcoming');

  return (
    <div className="bg-white p-6 rounded-3xl border border-lavender-200/80 shadow-soft flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <Calendar className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-charcoal-900 text-base">Upcoming Consultations</h3>
          </div>
          <Link to="/appointments" className="text-xs font-semibold text-brand-700 hover:text-brand-900 flex items-center gap-1">
            <span>Manage ({upcoming.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {upcoming.length === 0 ? (
          <div className="py-8 text-center text-charcoal-400 text-sm">
            <p>No upcoming consultations scheduled.</p>
            <Link to="/doctors" className="mt-2 inline-block text-xs font-semibold text-brand-600 underline">
              Browse verified doctors directory
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {upcoming.slice(0, 2).map((apt) => (
              <div 
                key={apt.id} 
                className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-200/80 hover:bg-emerald-50/70 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={apt.avatarUrl || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200"}
                      alt={apt.doctorName}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-300"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-charcoal-900 leading-tight">{apt.doctorName}</h4>
                      <p className="text-xs text-charcoal-500">{apt.speciality}</p>
                    </div>
                  </div>
                  <VerifiedDoctorBadge className="text-[10px]" />
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-charcoal-600 my-2 pt-2 border-t border-emerald-100">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{apt.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{apt.time}</span>
                  </div>
                </div>

                {apt.meetingLink && (
                  <a
                    href={apt.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full mt-2 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Join Encrypted Telehealth Room</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 mt-4 border-t border-lavender-100 flex items-center justify-between text-xs">
        <span className="text-charcoal-500">Attach clinical reports anytime</span>
        <Link to="/doctors" className="font-semibold text-brand-700 hover:text-brand-900">
          Book New Consultation →
        </Link>
      </div>
    </div>
  );
};

export default UpcomingAppointmentsWidget;
