import apiClient, { USE_MOCK_FALLBACK } from './api';
import { DEMO_SYMPTOMS } from '../data/demoSymptoms';

const SYMPTOMS_STORAGE_KEY = 'vericove_symptoms_cache';

const getLocalSymptoms = () => {
  try {
    const raw = localStorage.getItem(SYMPTOMS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEMO_SYMPTOMS;
  } catch {
    return DEMO_SYMPTOMS;
  }
};

const saveLocalSymptoms = (items) => {
  try {
    localStorage.setItem(SYMPTOMS_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Storage error', e);
  }
};

export const symptomService = {
  async getSymptoms(filters = {}) {
    try {
      const response = await apiClient.get('/symptoms', { params: filters });
      return response.data || response;
    } catch (err) {
      if (USE_MOCK_FALLBACK) {
        let list = getLocalSymptoms();
        if (filters.bodyArea && filters.bodyArea !== 'All') {
          list = list.filter(s => s.bodyArea === filters.bodyArea);
        }
        if (filters.search) {
          const q = filters.search.toLowerCase();
          list = list.filter(s => 
            s.name.toLowerCase().includes(q) || 
            (s.notes && s.notes.toLowerCase().includes(q))
          );
        }
        return list;
      }
      throw err;
    }
  },

  async addSymptom(symptomData) {
    try {
      const response = await apiClient.post('/symptoms', symptomData);
      return response.data || response;
    } catch (err) {
      if (USE_MOCK_FALLBACK) {
        const list = getLocalSymptoms();
        const newRecord = {
          ...symptomData,
          id: `sym_${Date.now()}`,
          createdAt: new Date().toISOString()
        };
        const updated = [newRecord, ...list];
        saveLocalSymptoms(updated);
        return newRecord;
      }
      throw err;
    }
  },

  async updateSymptom(id, updates) {
    try {
      const response = await apiClient.put(`/symptoms/${id}`, updates);
      return response.data || response;
    } catch (err) {
      if (USE_MOCK_FALLBACK) {
        const list = getLocalSymptoms();
        const updated = list.map(item => item.id === id ? { ...item, ...updates } : item);
        saveLocalSymptoms(updated);
        return updated.find(item => item.id === id);
      }
      throw err;
    }
  },

  async deleteSymptom(id) {
    try {
      await apiClient.delete(`/symptoms/${id}`);
      return { success: true };
    } catch (err) {
      if (USE_MOCK_FALLBACK) {
        const list = getLocalSymptoms();
        const updated = list.filter(item => item.id !== id);
        saveLocalSymptoms(updated);
        return { success: true };
      }
      throw err;
    }
  }
};

export default symptomService;
