import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doctorService } from '../services/doctorService';
import { appointmentService } from '../services/appointmentService';
import BookingModal from '../components/doctors/BookingModal';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import { VerifiedDoctorBadge, DemoDataBadge, Badge } from '../components/common/Badge';
import { 
  ArrowLeft, MapPin, Globe, Clock, ShieldCheck, CheckCircle2, 
  Calendar, Video, Star, Building2, Award, FileCheck 
} from 'lucide-react';

export const DoctorProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    const fetchDoc = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await doctorService.getDoctorById(id);
        setDoctor(data);
      } catch (err) {
        setError('Doctor profile not found or unavailable.');
      } finally {
        setLoading(false);
      }
    };
    fetchDoc();
  }, [id]);

  const handleBookingConfirm = async (bookingData) => {
    await appointmentService.bookAppointment(bookingData);
  };

  if (loading) return <LoadingState message="Retrieving physician credentials..." />;
  if (error || !doctor) return <ErrorState message={error || 'Doctor not found'} />;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      
      {/* Back Link */}
      <Link
        to="/doctors"
        className="inline-flex items-center gap-2 text-xs font-semibold text-brand-700 hover:text-brand-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Doctor Directory</span>
      </Link>

      {/* Main Profile Header Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-lavender-200/80 shadow-soft">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <img
              src={doctor.avatarUrl}
              alt={doctor.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-emerald-300 shadow-md"
            />
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold text-charcoal-900">{doctor.name}</h1>
                <DemoDataBadge />
              </div>
              <p className="text-sm font-bold text-brand-700">{doctor.title || doctor.speciality}</p>
              <p className="text-xs text-charcoal-500">{doctor.subspeciality}</p>

              <div className="pt-2 flex flex-wrap items-center gap-2">
                {doctor.isVerified && (
                  <VerifiedDoctorBadge registrationNumber={doctor.registrationNumber} />
                )}
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-lavender-100 text-charcoal-700 font-semibold">
                  {doctor.yearsExperience} Years Clinical Practice
                </span>
              </div>
            </div>
          </div>

          {/* Quick Book CTA Box */}
          <div className="w-full md:w-auto p-5 rounded-2xl bg-lavender-50/70 border border-lavender-200 text-center min-w-[220px]">
            <p className="text-xs text-charcoal-500 font-medium">Standard Consultation</p>
            <p className="text-2xl font-extrabold text-brand-900 my-1">{doctor.consultationFee || '$180'}</p>
            <p className="text-[11px] text-emerald-700 font-medium mb-3">
              {doctor.acceptsInsurance ? '✓ Accepts Insurance' : 'Superbill Provided'}
            </p>
            <button
              type="button"
              onClick={() => setBookingModalOpen(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-card transition-all"
            >
              Book Consultation
            </button>
          </div>

        </div>

        {/* Location & Languages Bar */}
        <div className="mt-6 pt-6 border-t border-lavender-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-charcoal-600">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-charcoal-400" />
            <span>{doctor.clinicAddress || doctor.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-charcoal-400" />
            <span>Languages: {doctor.languages?.join(', ')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-charcoal-400" />
            <span>Formats: {doctor.consultationTypes?.join(', ')}</span>
          </div>
        </div>
      </div>

      {/* Grid: Bio, Credentials, Expertise */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Clinical Philosophy & Expertise */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white p-6 rounded-3xl border border-lavender-200/80 shadow-soft">
            <h3 className="text-base font-bold text-charcoal-900 mb-3">Physician Bio & Patient Philosophy</h3>
            <p className="text-sm text-charcoal-700 leading-relaxed">
              {doctor.bio}
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-lavender-200/80 shadow-soft">
            <h3 className="text-base font-bold text-charcoal-900 mb-3">Focus Areas & Specialities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(doctor.areasOfExpertise || [doctor.speciality, doctor.subspeciality]).map((area, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-lavender-50/60 border border-lavender-100 flex items-center gap-2 text-xs font-semibold text-charcoal-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Col: Verified Qualifications */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-lavender-200/80 shadow-soft">
            <h3 className="text-base font-bold text-charcoal-900 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-brand-600" />
              <span>Verified Credentials</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200">
                <span className="text-[10px] uppercase font-bold text-emerald-800 block">Registration Number</span>
                <span className="font-mono font-bold text-charcoal-900 text-sm">{doctor.registrationNumber}</span>
                <span className="text-[10px] text-emerald-700 block mt-0.5">Verified active with Medical Board</span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-charcoal-400 uppercase tracking-wider block mb-1">
                  Degrees & Fellowships
                </span>
                <ul className="space-y-1 text-charcoal-700">
                  {doctor.qualifications?.map((q, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-brand-600 font-bold">•</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {doctor.acceptedInsurances && (
                <div className="pt-2 border-t border-lavender-100">
                  <span className="text-[11px] font-bold text-charcoal-400 uppercase tracking-wider block mb-1">
                    In-Network Insurances
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {doctor.acceptedInsurances.map(ins => (
                      <span key={ins} className="text-[10px] px-2 py-0.5 bg-lavender-100 rounded-md font-medium text-charcoal-800">
                        {ins}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        doctor={doctor}
        onConfirmBooking={handleBookingConfirm}
      />

    </div>
  );
};

export default DoctorProfile;
