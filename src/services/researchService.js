import apiClient, { USE_MOCK_FALLBACK } from './api';
import { DEMO_RESEARCH_PAPERS, DEMO_COLLECTIONS } from '../data/demoResearch';

const SAVED_RESEARCH_KEY = 'vericove_saved_research';

const getSavedIds = () => {
  try {
    const raw = localStorage.getItem(SAVED_RESEARCH_KEY);
    return raw ? JSON.parse(raw) : ["res_001", "res_002", "res_004"];
  } catch {
    return ["res_001", "res_002"];
  }
};

const setSavedIds = (ids) => {
  try {
    localStorage.setItem(SAVED_RESEARCH_KEY, JSON.stringify(ids));
  } catch (e) {
    console.error('Storage error', e);
  }
};

export const researchService = {
  async getResearchPapers(filters = {}) {
    try {
      const response = await apiClient.get('/research', { params: filters });
      return response.data || response;
    } catch (err) {
      if (USE_MOCK_FALLBACK) {
        let list = [...DEMO_RESEARCH_PAPERS];

        if (filters.search) {
          const q = filters.search.toLowerCase();
          list = list.filter(p => 
            p.title.toLowerCase().includes(q) ||
            p.abstract.toLowerCase().includes(q) ||
            p.authors.some(a => a.toLowerCase().includes(q)) ||
            p.journal.toLowerCase().includes(q) ||
            (p.keyFindings && p.keyFindings.some(kf => kf.toLowerCase().includes(q)))
          );
        }

        if (filters.category && filters.category !== 'All Categories') {
          list = list.filter(p => p.category.toLowerCase() === filters.category.toLowerCase());
        }

        if (filters.publicationType && filters.publicationType !== 'All Types') {
          list = list.filter(p => p.publicationType.toLowerCase() === filters.publicationType.toLowerCase());
        }

        if (filters.collectionSlug) {
          list = list.filter(p => p.collections && p.collections.includes(filters.collectionSlug));
        }

        if (filters.savedOnly) {
          const saved = getSavedIds();
          list = list.filter(p => saved.includes(p.id));
        }

        if (filters.sortBy === 'newest') {
          list.sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate));
        } else if (filters.sortBy === 'oldest') {
          list.sort((a, b) => new Date(a.publicationDate) - new Date(b.publicationDate));
        } else if (filters.sortBy === 'citations' || filters.sortBy === 'popular') {
          list.sort((a, b) => (b.savedCount || 0) - (a.savedCount || 0));
        }

        return list;
      }
      throw err;
    }
  },

  async getResearchById(id) {
    try {
      const response = await apiClient.get(`/research/${id}`);
      return response.data || response;
    } catch (err) {
      if (USE_MOCK_FALLBACK) {
        const found = DEMO_RESEARCH_PAPERS.find(p => p.id === id);
        if (!found) throw new Error('Research paper not found');
        return found;
      }
      throw err;
    }
  },

  async getCollections() {
    try {
      const response = await apiClient.get('/research/collections');
      return response.data || response;
    } catch (err) {
      if (USE_MOCK_FALLBACK) {
        return DEMO_COLLECTIONS;
      }
      throw err;
    }
  },

  async toggleSavePaper(id) {
    try {
      const response = await apiClient.post(`/research/saved/${id}`);
      return response.data || response;
    } catch (err) {
      if (USE_MOCK_FALLBACK) {
        const saved = getSavedIds();
        let updated;
        let isSavedNow = false;
        if (saved.includes(id)) {
          updated = saved.filter(item => item !== id);
          isSavedNow = false;
        } else {
          updated = [...saved, id];
          isSavedNow = true;
        }
        setSavedIds(updated);
        return { isSaved: isSavedNow, savedIds: updated };
      }
      throw err;
    }
  },

  getSavedPaperIds() {
    return getSavedIds();
  }
};

export default researchService;
