import apiClient, { USE_MOCK_FALLBACK } from './api';
import { DEMO_DOCTORS } from '../data/demoDoctors';

export const doctorService = {
  async getDoctors(filters = {}) {
    try {
      const response = await apiClient.get('/doctors', { params: filters });
      return response.data || response;
    } catch (err) {
      if (USE_MOCK_FALLBACK) {
        let list = [...DEMO_DOCTORS];

        if (filters.search) {
          const q = filters.search.toLowerCase();
          list = list.filter(d => 
            d.name.toLowerCase().includes(q) ||
            d.speciality.toLowerCase().includes(q) ||
            d.subspeciality.toLowerCase().includes(q) ||
            d.bio.toLowerCase().includes(q) ||
            d.location.toLowerCase().includes(q)
          );
        }

        if (filters.speciality && filters.speciality !== 'All Specialities') {
          list = list.filter(d => d.speciality.toLowerCase().includes(filters.speciality.toLowerCase()));
        }

        if (filters.consultationType && filters.consultationType !== 'All Formats') {
          list = list.filter(d => 
            d.consultationTypes.includes(filters.consultationType) || 
            filters.consultationType === 'All Formats'
          );
        }

        if (filters.language && filters.language !== 'All Languages') {
          list = list.filter(d => d.languages.includes(filters.language));
        }

        if (filters.verifiedOnly) {
          list = list.filter(d => d.isVerified);
        }

        return list;
      }
      throw err;
    }
  },

  async getDoctorById(id) {
    try {
      const response = await apiClient.get(`/doctors/${id}`);
      return response.data || response;
    } catch (err) {
      if (USE_MOCK_FALLBACK) {
        const found = DEMO_DOCTORS.find(d => d.id === id);
        if (!found) throw new Error('Doctor profile not found');
        return found;
      }
      throw err;
    }
  }
};

export default doctorService;
