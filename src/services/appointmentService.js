import apiClient, { USE_MOCK_FALLBACK } from './api';
import { DEMO_APPOINTMENTS } from '../data/demoAppointments';

const APPOINTMENTS_STORAGE_KEY = 'vericove_appointments';

const getLocalAppointments = () => {
  try {
    const raw = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEMO_APPOINTMENTS;
  } catch {
    return DEMO_APPOINTMENTS;
  }
};

const saveLocalAppointments = (items) => {
  try {
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Storage error', e);
  }
};

export const appointmentService = {
  async getAppointments() {
    try {
      const response = await apiClient.get('/appointments');
      return response.data || response;
    } catch (err) {
      if (USE_MOCK_FALLBACK) {
        return getLocalAppointments();
      }
      throw err;
    }
  },

  async bookAppointment(bookingData) {
    try {
      const response = await apiClient.post('/appointments', bookingData);
      return response.data || response;
    } catch (err) {
      if (USE_MOCK_FALLBACK) {
        const list = getLocalAppointments();
        const newBooking = {
          id: `apt_${Date.now()}`,
          doctorId: bookingData.doctorId,
          doctorName: bookingData.doctorName,
          speciality: bookingData.speciality,
          avatarUrl: bookingData.avatarUrl,
          date: bookingData.date,
          time: bookingData.time,
          dateTimeIso: `${bookingData.date}T10:00:00Z`,
          type: bookingData.type || "Video / Telehealth",
          location: bookingData.type === "In-Person" ? (bookingData.clinicAddress || "Doctor's Clinic") : "Vericove Encrypted Telehealth Room",
          meetingLink: bookingData.type !== "In-Person" ? `https://meet.vericove.health/room/${bookingData.doctorId}-${Date.now().toString().slice(-4)}` : null,
          status: "Confirmed",
          fee: bookingData.fee || "$180",
          reasonForVisit: bookingData.reasonForVisit || "Consultation regarding symptom history",
          attachedReportId: bookingData.attachedReportId || null,
          createdAt: new Date().toISOString()
        };
        const updated = [newBooking, ...list];
        saveLocalAppointments(updated);
        return newBooking;
      }
      throw err;
    }
  },

  async cancelAppointment(id) {
    try {
      await apiClient.delete(`/appointments/${id}`);
      return { success: true };
    } catch (err) {
      if (USE_MOCK_FALLBACK) {
        const list = getLocalAppointments();
        const updated = list.map(item => item.id === id ? { ...item, status: 'Cancelled' } : item);
        saveLocalAppointments(updated);
        return { success: true };
      }
      throw err;
    }
  }
};

export default appointmentService;
