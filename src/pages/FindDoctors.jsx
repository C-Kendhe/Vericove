import React, { useState, useEffect } from 'react';
import { doctorService } from '../services/doctorService';
import { appointmentService } from '../services/appointmentService';
import DoctorCard from '../components/doctors/DoctorCard';
import BookingModal from '../components/doctors/BookingModal';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import MedicalDisclaimer from '../components/common/MedicalDisclaimer';
import { Stethoscope, Search, Filter, ShieldCheck, CheckCircle2 } from 'lucide-react';

const SPECIALITIES = [
  "All Specialities",
  "Obstetrics & Gynecology",
  "Reproductive Endocrinology",
  "Neurology",
  "Integrative Women's Medicine",
  "Women's Mental Health"
];

const CONSULTATION_TYPES = [
  "All Formats",
  "Video / Telehealth",
  "In-Person"
];

const LANGUAGES = [
  "All Languages",
  "English",
  "Spanish",
  "Mandarin",
  "Hindi",
  "Russian"
];

export const FindDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState('All Specialities');
  const [selectedType, setSelectedType] = useState('All Formats');
  const [selectedLanguage, setSelectedLanguage] = useState('All Languages');
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [bookingModalDoctor, setBookingModalDoctor] = useState(null);

  const loadDoctors = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await doctorService.getDoctors({
        search: searchQuery,
        speciality: selectedSpeciality,
        consultationType: selectedType,
        language: selectedLanguage,
        verifiedOnly
      });
      setDoctors(data || []);
    } catch (err) {
      setError('Unable to load verified doctor directory.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, [searchQuery, selectedSpeciality, selectedType, selectedLanguage, verifiedOnly]);

  const handleConfirmBooking = async (bookingData) => {
    await appointmentService.bookAppointment(bookingData);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-lavender-200/80 shadow-soft">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Independent Registry Credential Verification</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 tracking-tight">
          Verified Doctor Directory
        </h1>
        <p className="text-sm text-charcoal-500 mt-1 max-w-3xl leading-relaxed">
          Connect with healthcare professionals who take women's health concerns seriously. Medical registration numbers are validated against state and national licensing boards.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-5 rounded-3xl border border-lavender-200/80 shadow-soft space-y-4">
        
        {/* Search */}
        <div className="relative max-w-lg">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by doctor name, condition, or city (e.g. Endometriosis, New York)..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-lavender-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs sm:text-sm bg-white"
          />
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal-500 mb-1">
              Medical Speciality
            </label>
            <select
              value={selectedSpeciality}
              onChange={(e) => setSelectedSpeciality(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-lavender-200 text-xs font-medium bg-white"
            >
              {SPECIALITIES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal-500 mb-1">
              Consultation Format
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-lavender-200 text-xs font-medium bg-white"
            >
              {CONSULTATION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal-500 mb-1">
              Language
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-lavender-200 text-xs font-medium bg-white"
            >
              {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          <div className="flex items-center pt-5">
            <label className="flex items-center gap-2 text-xs font-semibold text-charcoal-700 cursor-pointer">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded"
              />
              <span>Verified Credentials Only</span>
            </label>
          </div>

        </div>

      </div>

      {/* Directory Grid */}
      {loading ? (
        <LoadingState message="Checking doctor registry and availability..." rows={3} />
      ) : error ? (
        <ErrorState message={error} onRetry={loadDoctors} />
      ) : doctors.length === 0 ? (
        <EmptyState
          icon={Stethoscope}
          title="No doctors match the selected filters"
          description="Try clearing your search query or expanding the medical speciality selection."
          actionLabel="Reset All Filters"
          onAction={() => {
            setSearchQuery('');
            setSelectedSpeciality('All Specialities');
            setSelectedType('All Formats');
            setSelectedLanguage('All Languages');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onBookClick={(doc) => setBookingModalDoctor(doc)}
            />
          ))}
        </div>
      )}

      {/* Medical Disclaimer */}
      <MedicalDisclaimer message="Vericove validates registration numbers against public boards. Telehealth bookings are private between patient and clinician." />

      {/* Booking Modal */}
      <BookingModal
        isOpen={!!bookingModalDoctor}
        onClose={() => setBookingModalDoctor(null)}
        doctor={bookingModalDoctor}
        onConfirmBooking={handleConfirmBooking}
      />

    </div>
  );
};

export default FindDoctors;
