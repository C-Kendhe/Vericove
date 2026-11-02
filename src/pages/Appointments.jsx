import React, { useState, useEffect } from 'react';
import { appointmentService } from '../services/appointmentService';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import { VerifiedDoctorBadge } from '../components/common/Badge';
import { 
  Calendar, Video, MapPin, Clock, Plus, Trash2, 
  ExternalLink, CheckCircle2, AlertCircle, FileText 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'past'

  const loadAppointments = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await appointmentService.getAppointments();
      setAppointments(data || []);
    } catch (err) {
      setError('Unable to load appointment schedule.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      await appointmentService.cancelAppointment(id);
      await loadAppointments();
    }
  };

  const upcomingList = appointments.filter(a => a.status === 'Confirmed' || a.status === 'Upcoming');
  const pastList = appointments.filter(a => a.status === 'Completed' || a.status === 'Cancelled');

  const displayedList = activeTab === 'upcoming' ? upcomingList : pastList;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-lavender-200/80 shadow-soft">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 mb-2">
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            <span>Consultation Schedule & Telehealth</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 tracking-tight">
            My Appointments
          </h1>
          <p className="text-sm text-charcoal-500 mt-1 max-w-2xl">
            Review booked visits with verified physicians. Launch encrypted telehealth rooms or access attached clinical symptom briefs.
          </p>
        </div>

        <Link
          to="/doctors"
          className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-card transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Book New Doctor</span>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-lavender-200 pb-1">
        <button
          type="button"
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold border-b-2 transition-all ${
            activeTab === 'upcoming'
              ? 'border-brand-600 text-brand-700'
              : 'border-transparent text-charcoal-500 hover:text-charcoal-900'
          }`}
        >
          Upcoming Consultations ({upcomingList.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('past')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold border-b-2 transition-all ${
            activeTab === 'past'
              ? 'border-brand-600 text-brand-700'
              : 'border-transparent text-charcoal-500 hover:text-charcoal-900'
          }`}
        >
          Past / Cancelled ({pastList.length})
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <LoadingState message="Fetching appointment records..." rows={2} />
      ) : error ? (
        <ErrorState message={error} onRetry={loadAppointments} />
      ) : displayedList.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title={activeTab === 'upcoming' ? "No upcoming appointments" : "No past appointments"}
          description={activeTab === 'upcoming' ? "Explore our verified physician directory to book a supportive consultation." : "You have not completed any consultations yet."}
          actionLabel={activeTab === 'upcoming' ? "Browse Doctors" : undefined}
          onAction={() => window.location.href = '/doctors'}
        />
      ) : (
        <div className="space-y-4">
          {displayedList.map((apt) => (
            <div 
              key={apt.id} 
              className="bg-white rounded-3xl border border-lavender-200/80 p-6 shadow-soft hover:shadow-card transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              {/* Doctor Details */}
              <div className="flex items-start gap-4 flex-1">
                <img
                  src={apt.avatarUrl || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200"}
                  alt={apt.doctorName}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-300 flex-shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-base text-charcoal-900">{apt.doctorName}</h3>
                    <VerifiedDoctorBadge className="text-[10px]" />
                  </div>
                  <p className="text-xs text-charcoal-500">{apt.speciality}</p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal-600 pt-1">
                    <span className="flex items-center gap-1 font-semibold text-brand-900">
                      <Calendar className="w-3.5 h-3.5 text-brand-600" />
                      {apt.date} • {apt.time}
                    </span>
                    <span className="flex items-center gap-1">
                      {apt.type === 'In-Person' ? <MapPin className="w-3.5 h-3.5 text-charcoal-400" /> : <Video className="w-3.5 h-3.5 text-brand-600" />}
                      {apt.type}
                    </span>
                  </div>

                  {apt.reasonForVisit && (
                    <p className="text-xs text-charcoal-600 italic bg-lavender-50/50 p-2.5 rounded-xl border border-lavender-100 mt-2 max-w-xl">
                      "{apt.reasonForVisit}"
                    </p>
                  )}
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div className="flex flex-col sm:flex-row md:flex-col items-end gap-2.5 w-full md:w-auto self-end md:self-center border-t md:border-t-0 pt-3 md:pt-0 border-lavender-100">
                <span className={`text-xs px-3 py-1 rounded-full font-bold border ${
                  apt.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                  apt.status === 'Upcoming' ? 'bg-brand-50 text-brand-800 border-brand-200' :
                  apt.status === 'Completed' ? 'bg-charcoal-50 text-charcoal-600 border-charcoal-200' :
                  'bg-rose-50 text-rose-700 border-rose-200'
                }`}>
                  {apt.status}
                </span>

                {apt.meetingLink && apt.status === 'Confirmed' && (
                  <a
                    href={apt.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Join Room</span>
                  </a>
                )}

                {(apt.status === 'Confirmed' || apt.status === 'Upcoming') && (
                  <button
                    type="button"
                    onClick={() => handleCancel(apt.id)}
                    className="text-xs text-rose-600 hover:text-rose-800 font-semibold"
                  >
                    Cancel Appointment
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Appointments;
