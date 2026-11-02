import React, { useState } from 'react';
import { X, Calendar, Clock, Video, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { VerifiedDoctorBadge } from '../common/Badge';

export const BookingModal = ({ isOpen, onClose, doctor, onConfirmBooking }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [consultationType, setConsultationType] = useState('Video / Telehealth');
  const [visitReason, setVisitReason] = useState('Cyclic pelvic pain discussion and symptom review');
  const [attachSymptoms, setAttachSymptoms] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen || !doctor) return null;

  const slots = doctor.availableSlots || [
    { date: "2026-11-06", time: "10:00 AM", type: "Video / Telehealth" },
    { date: "2026-11-09", time: "02:30 PM", type: "In-Person" },
    { date: "2026-11-11", time: "11:15 AM", type: "Video / Telehealth" }
  ];

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!selectedSlot) return;
    setSubmitting(true);
    try {
      await onConfirmBooking({
        doctorId: doctor.id,
        doctorName: doctor.name,
        speciality: doctor.speciality,
        avatarUrl: doctor.avatarUrl,
        date: selectedSlot.date,
        time: selectedSlot.time,
        type: consultationType,
        clinicAddress: doctor.clinicAddress,
        fee: doctor.consultationFee,
        reasonForVisit: visitReason,
        attachSymptoms
      });
      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-elevated border border-lavender-200 animate-in fade-in zoom-in-95 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-lavender-100 mb-6">
          <div className="flex items-center gap-2.5">
            <img
              src={doctor.avatarUrl}
              alt={doctor.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-300"
            />
            <div>
              <h2 className="text-base font-bold text-charcoal-900 leading-tight">Book Consultation</h2>
              <p className="text-xs text-charcoal-500">{doctor.name}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-charcoal-400 hover:text-charcoal-700 hover:bg-lavender-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="py-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-charcoal-900">Consultation Confirmed!</h3>
            <p className="text-xs text-charcoal-600 max-w-sm mx-auto leading-relaxed">
              Your appointment with {doctor.name} for {selectedSlot?.date} at {selectedSlot?.time} has been registered in the patient portal.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="space-y-4">
            
            {/* Consultation Fee Notice */}
            <div className="p-3 rounded-2xl bg-lavender-50 border border-lavender-200 flex items-center justify-between text-xs">
              <span className="text-charcoal-600">Standard Consultation Fee:</span>
              <span className="text-sm font-extrabold text-brand-900">{doctor.consultationFee || '$180'}</span>
            </div>

            {/* Select Slot */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-2">
                Available Appointment Slots *
              </label>
              <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto p-1">
                {slots.map((slot, idx) => {
                  const isSelected = selectedSlot === slot;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedSlot(slot);
                        if (slot.type) setConsultationType(slot.type);
                      }}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-brand-600 bg-brand-50/80 ring-2 ring-brand-400'
                          : 'border-lavender-200 hover:bg-lavender-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 text-xs">
                        <Calendar className="w-4 h-4 text-brand-600" />
                        <div>
                          <p className="font-bold text-charcoal-900">{slot.date}</p>
                          <p className="text-charcoal-500">{slot.time}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white border border-lavender-200 text-charcoal-700">
                        {slot.type}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Format Preference */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1.5">
                Consultation Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setConsultationType('Video / Telehealth')}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 ${
                    consultationType === 'Video / Telehealth'
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-white text-charcoal-700 border-lavender-200'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Telehealth Video</span>
                </button>
                <button
                  type="button"
                  onClick={() => setConsultationType('In-Person')}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 ${
                    consultationType === 'In-Person'
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-white text-charcoal-700 border-lavender-200'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>In-Person Clinic</span>
                </button>
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1">
                Reason for Consultation
              </label>
              <textarea
                rows={2}
                value={visitReason}
                onChange={(e) => setVisitReason(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-lavender-300 text-xs"
              />
            </div>

            {/* Attach symptom brief checkbox */}
            <label className="flex items-center gap-2 text-xs text-charcoal-700 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={attachSymptoms}
                onChange={(e) => setAttachSymptoms(e.target.checked)}
                className="w-4 h-4 text-brand-600 rounded"
              />
              <span>Attach my 90-day structured symptom overview report to this appointment</span>
            </label>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-lavender-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-charcoal-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || !selectedSlot}
                className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-card disabled:opacity-50"
              >
                {submitting ? 'Confirming...' : 'Confirm Consultation'}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

export default BookingModal;
