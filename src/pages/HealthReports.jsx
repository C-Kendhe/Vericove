import React, { useState, useEffect } from 'react';
import { reportService } from '../services/reportService';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import MedicalDisclaimer from '../components/common/MedicalDisclaimer';
import { 
  FileText, Download, Printer, Plus, Calendar, 
  Activity, HelpCircle, CheckCircle2, ShieldCheck, Clock 
} from 'lucide-react';

export const HealthReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [generateModalOpen, setGenerateModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState('Last 90 Days (Aug – Nov 2026)');
  const [customTitle, setCustomTitle] = useState('Clinical Consultation Brief: Pelvic & Hormonal Patterns');
  const [generating, setGenerating] = useState(false);

  const loadReports = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await reportService.getReports();
      setReports(data || []);
    } catch (err) {
      setError('Unable to load generated health reports.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setGenerating(true);
    try {
      await reportService.generateReport({
        title: customTitle,
        dateRange
      });
      setGenerateModalOpen(false);
      await loadReports();
    } finally {
      setGenerating(false);
    }
  };

  const handlePrint = () => {
    reportService.downloadReportPdf();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-lavender-200/80 shadow-soft">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-xs font-semibold text-teal-800 mb-2">
            <FileText className="w-3.5 h-3.5 text-teal-600" />
            <span>Consultation Preparation Packets</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 tracking-tight">
            My Health Reports
          </h1>
          <p className="text-sm text-charcoal-500 mt-1 max-w-2xl">
            Synthesize your recorded symptoms, peak pain events, and cyclical correlations into structured clinical summaries ready to print or present to physicians.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setGenerateModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-card transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Generate New Brief</span>
        </button>
      </div>

      {/* Reports List */}
      {loading ? (
        <LoadingState message="Compiling clinical reports from longitudinal logs..." rows={2} />
      ) : error ? (
        <ErrorState message={error} onRetry={loadReports} />
      ) : reports.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No clinical reports generated yet"
          description="Generate your first consultation brief to compile recorded symptoms and doctor discussion questions."
          actionLabel="Generate Brief"
          onAction={() => setGenerateModalOpen(true)}
        />
      ) : (
        <div className="space-y-6">
          {reports.map((report) => (
            <div 
              key={report.id} 
              className="bg-white rounded-3xl border border-lavender-200/80 p-6 sm:p-8 shadow-card space-y-6"
            >
              {/* Report Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-lavender-100">
                <div>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-charcoal-400">
                    Patient Consultation Brief • ID: {report.id}
                  </span>
                  <h2 className="text-xl font-extrabold text-charcoal-900 mt-0.5">{report.title}</h2>
                  <p className="text-xs text-charcoal-500 flex items-center gap-1.5 mt-1">
                    <Calendar className="w-3.5 h-3.5 text-charcoal-400" />
                    <span>Coverage: {report.dateRange}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto no-print">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="px-4 py-2 rounded-xl bg-lavender-100 hover:bg-lavender-200 text-brand-900 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print / Save PDF</span>
                  </button>
                </div>
              </div>

              {/* Metrics Summary Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-2xl bg-lavender-50 border border-lavender-100 text-center">
                  <span className="text-[10px] font-semibold text-charcoal-500 uppercase">Symptoms Logged</span>
                  <p className="text-xl font-black text-brand-900">{report.totalSymptomsLogged}</p>
                </div>
                <div className="p-3 rounded-2xl bg-lavender-50 border border-lavender-100 text-center">
                  <span className="text-[10px] font-semibold text-charcoal-500 uppercase">Average Pain</span>
                  <p className="text-xl font-black text-rosebud-600">{report.averageSeverity} / 10</p>
                </div>
                <div className="p-3 rounded-2xl bg-lavender-50 border border-lavender-100 text-center">
                  <span className="text-[10px] font-semibold text-charcoal-500 uppercase">Peak Intensity</span>
                  <p className="text-xl font-black text-rose-700">{report.peakSeverity} / 10</p>
                </div>
                <div className="p-3 rounded-2xl bg-lavender-50 border border-lavender-100 text-center">
                  <span className="text-[10px] font-semibold text-charcoal-500 uppercase">Primary Systems</span>
                  <p className="text-xs font-bold text-charcoal-900 truncate mt-1">
                    {report.primaryBodyAreas?.join(', ') || 'Pelvic, Neuro'}
                  </p>
                </div>
              </div>

              {/* Structured Summary Text */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-400">
                  Clinical Overview for Attending Physician
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed bg-lavender-50/40 p-4 rounded-2xl border border-lavender-100">
                  {report.structuredClinicalSummary}
                </p>
              </div>

              {/* Frequencies breakdown */}
              {report.symptomFrequencies && report.symptomFrequencies.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-400">
                    Symptom Recurrence & Peak Intensity
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {report.symptomFrequencies.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white border border-lavender-200 flex items-center justify-between text-xs">
                        <span className="font-bold text-charcoal-900">{item.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-charcoal-500">{item.occurrences} logs</span>
                          <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 font-bold border border-rose-200">
                            Peak: {item.peakSeverity}/10
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Doctor Questions */}
              {report.suggestedDoctorQuestions && (
                <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-purple-700" />
                    <span>Suggested Discussion Questions for Physician</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-charcoal-700">
                    {report.suggestedDoctorQuestions.map((q, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-bold text-brand-700">{idx + 1}.</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Report Disclaimer */}
              <div className="text-[11px] text-charcoal-400 pt-2 border-t border-lavender-100">
                <strong>Disclaimer:</strong> {report.disclaimer || "Prepared solely to facilitate patient-physician dialogue. It does not constitute a formal diagnosis or prescription."}
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Generate Report Modal */}
      {generateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-elevated border border-lavender-200">
            <h3 className="text-lg font-bold text-charcoal-900 mb-1">Generate Consultation Brief</h3>
            <p className="text-xs text-charcoal-500 mb-4">
              Compile your longitudinal symptom logs into a clean physician-ready packet.
            </p>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1">
                  Report Title
                </label>
                <input
                  type="text"
                  required
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-lavender-300 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1">
                  Date Range
                </label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-lavender-300 text-xs sm:text-sm bg-white"
                >
                  <option value="Last 30 Days">Last 30 Days</option>
                  <option value="Last 90 Days (Aug – Nov 2026)">Last 90 Days (Recommended)</option>
                  <option value="Last 6 Months">Last 6 Months</option>
                  <option value="All Time History">All Time History</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-lavender-100">
                <button
                  type="button"
                  onClick={() => setGenerateModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-charcoal-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={generating}
                  className="px-5 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold shadow-xs"
                >
                  {generating ? 'Compiling Packet...' : 'Generate Packet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default HealthReports;
