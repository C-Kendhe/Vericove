import apiClient, { USE_MOCK_FALLBACK } from './api';
import { DEMO_REPORTS } from '../data/demoReports';
import { symptomService } from './symptomService';

const REPORTS_STORAGE_KEY = 'vericove_health_reports';

const getLocalReports = () => {
  try {
    const raw = localStorage.getItem(REPORTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEMO_REPORTS;
  } catch {
    return DEMO_REPORTS;
  }
};

const saveLocalReports = (items) => {
  try {
    localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Storage error', e);
  }
};

export const reportService = {
  async getReports() {
    try {
      const response = await apiClient.get('/reports');
      return response.data || response;
    } catch (err) {
      if (USE_MOCK_FALLBACK) {
        return getLocalReports();
      }
      throw err;
    }
  },

  async getReportById(id) {
    try {
      const response = await apiClient.get(`/reports/${id}`);
      return response.data || response;
    } catch (err) {
      if (USE_MOCK_FALLBACK) {
        const list = getLocalReports();
        const found = list.find(r => r.id === id);
        if (!found) throw new Error('Report not found');
        return found;
      }
      throw err;
    }
  },

  async generateReport(options = {}) {
    try {
      const response = await apiClient.post('/reports/generate', options);
      return response.data || response;
    } catch (err) {
      if (USE_MOCK_FALLBACK) {
        const symptoms = await symptomService.getSymptoms();
        const list = getLocalReports();

        // Calculate metrics
        const totalCount = symptoms.length;
        const avgSev = totalCount > 0 
          ? (symptoms.reduce((acc, curr) => acc + (curr.severity || 5), 0) / totalCount).toFixed(1)
          : "6.5";
        
        const areas = [...new Set(symptoms.map(s => s.bodyArea))].filter(Boolean);

        const newReport = {
          id: `rep_${Date.now()}`,
          title: options.title || "Clinical Consultation Summary: Longitudinal Symptoms",
          dateRange: options.dateRange || "Last 90 Days",
          generatedAt: new Date().toISOString(),
          totalSymptomsLogged: totalCount,
          averageSeverity: parseFloat(avgSev),
          peakSeverity: Math.max(...symptoms.map(s => s.severity || 6), 8),
          primaryBodyAreas: areas.length > 0 ? areas : ["Pelvic", "Whole Body / Energy"],
          symptomFrequencies: symptoms.slice(0, 4).map(s => ({
            name: s.name,
            occurrences: Math.floor(Math.random() * 5) + 3,
            avgSeverity: s.severity || 7,
            peakSeverity: Math.min(10, (s.severity || 7) + 1)
          })),
          primaryTriggers: [
            "Menstrual cycle onset (Days 1–3)",
            "Late luteal phase",
            "Physical exertion and stress"
          ],
          structuredClinicalSummary: options.notes || `Structured compilation of ${totalCount} self-reported clinical observations. Patient exhibits recurring cyclical distress with functional impairment. Recommended for physician review during differential diagnosis.`,
          suggestedDoctorQuestions: [
            "What targeted diagnostic imaging or biochemical assays are warranted given the duration and cyclical nature of these symptoms?",
            "Could recurrent fatigue be related to non-anemic iron deficiency (ferritin) in the context of heavy bleeding?",
            "What multimodal non-pharmacological or specialist therapies are recommended alongside clinical evaluation?"
          ],
          disclaimer: "Prepared solely to facilitate patient-physician dialogue. This summary organizes patient observations and does not constitute a formal diagnosis or prescription."
        };

        const updated = [newReport, ...list];
        saveLocalReports(updated);
        return newReport;
      }
      throw err;
    }
  },

  downloadReportPdf(report) {
    // In browser, trigger window.print with print media styling or structured PDF download
    window.print();
  }
};

export default reportService;
