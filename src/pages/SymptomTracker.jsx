import React, { useState, useEffect } from 'react';
import { symptomService } from '../services/symptomService';
import SymptomCharts from '../components/symptoms/SymptomCharts';
import SymptomTimeline from '../components/symptoms/SymptomTimeline';
import SymptomFormModal from '../components/symptoms/SymptomFormModal';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import MedicalDisclaimer from '../components/common/MedicalDisclaimer';
import { DEMO_BODY_AREAS } from '../data/demoSymptoms';
import { 
  Activity, Plus, Search, Filter, BarChart3, Clock, 
  Sparkles, FileText, Download 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const SymptomTracker = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedArea, setSelectedArea] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSymptom, setEditingSymptom] = useState(null);
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' | 'charts'

  const loadSymptoms = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await symptomService.getSymptoms({
        bodyArea: selectedArea,
        search: searchQuery
      });
      setSymptoms(data || []);
    } catch (err) {
      setError('Unable to load symptoms from the server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSymptoms();
  }, [selectedArea, searchQuery]);

  const handleSave = async (formData, editingId) => {
    if (editingId) {
      await symptomService.updateSymptom(editingId, formData);
    } else {
      await symptomService.addSymptom(formData);
    }
    setEditingSymptom(null);
    await loadSymptoms();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this symptom record?')) {
      await symptomService.deleteSymptom(id);
      await loadSymptoms();
    }
  };

  const handleOpenEdit = (symptom) => {
    setEditingSymptom(symptom);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-lavender-200/80 shadow-soft">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-xs font-semibold text-brand-800 mb-2">
            <Activity className="w-3.5 h-3.5 text-brand-600" />
            <span>Continuous Longitudinal Journal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 tracking-tight">
            My Symptoms
          </h1>
          <p className="text-sm text-charcoal-500 mt-1 max-w-2xl">
            Record pain levels, durations, and triggers. Objective records transform subjective healthcare encounters into evidence-grounded consultations.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            to="/ai-insights"
            className="px-4 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>AI Pattern Insights</span>
          </Link>

          <button
            type="button"
            onClick={() => { setEditingSymptom(null); setModalOpen(true); }}
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-card transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Log Symptom</span>
          </button>
        </div>
      </div>

      {/* Filter & View Switcher Bar */}
      <div className="bg-white p-4 rounded-3xl border border-lavender-200/80 shadow-soft flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search symptoms, sensations, notes..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-lavender-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs sm:text-sm bg-white"
          />
        </div>

        {/* Body Area Filter Dropdown */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-charcoal-400" />
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="px-3 py-2 rounded-xl border border-lavender-200 text-xs sm:text-sm font-medium text-charcoal-700 bg-white"
          >
            <option value="All">All Anatomical Areas</option>
            {DEMO_BODY_AREAS.map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>

        {/* View Switcher: Timeline vs Charts */}
        <div className="flex items-center bg-lavender-100/70 p-1 rounded-xl self-end sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('timeline')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'timeline'
                ? 'bg-white text-brand-900 shadow-xs'
                : 'text-charcoal-600 hover:text-charcoal-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Timeline</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('charts')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'charts'
                ? 'bg-white text-brand-900 shadow-xs'
                : 'text-charcoal-600 hover:text-charcoal-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Trends & Charts</span>
          </button>
        </div>

      </div>

      {/* Main Content Area */}
      {loading ? (
        <LoadingState message="Fetching symptom timeline..." rows={4} />
      ) : error ? (
        <ErrorState message={error} onRetry={loadSymptoms} />
      ) : symptoms.length === 0 ? (
        <EmptyState
          icon={Activity}
          title="No symptoms recorded yet"
          description="Begin recording your daily health experiences. Logging symptoms helps identify cyclical recurrence and prepares you for doctor appointments."
          actionLabel="Record First Symptom"
          onAction={() => { setEditingSymptom(null); setModalOpen(true); }}
        />
      ) : (
        <>
          {viewMode === 'charts' ? (
            <SymptomCharts symptoms={symptoms} />
          ) : (
            <div className="space-y-6">
              <SymptomCharts symptoms={symptoms} />
              <div className="pt-4">
                <h3 className="text-base font-bold text-charcoal-900 mb-4 px-2">Detailed Symptom History</h3>
                <SymptomTimeline
                  symptoms={symptoms}
                  onEdit={handleOpenEdit}
                  onDelete={handleDelete}
                />
              </div>
            </div>
          )}
        </>
      )}

      {/* Medical Disclaimer */}
      <MedicalDisclaimer compact message="Symptom records are strictly personal observations and do not constitute clinical diagnoses." />

      {/* Form Modal */}
      <SymptomFormModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingSymptom(null); }}
        onSave={handleSave}
        editingSymptom={editingSymptom}
      />

    </div>
  );
};

export default SymptomTracker;
