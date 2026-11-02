import React, { useState, useEffect } from 'react';
import { X, Activity, AlertCircle, Save } from 'lucide-react';
import { DEMO_BODY_AREAS } from '../../data/demoSymptoms';

const COMMON_TRIGGERS = [
  "Cycle Day 1–3", "Ovulation window", "Luteal phase", 
  "High stress", "Physical exertion", "Cold weather", 
  "Certain foods / Dairy", "Poor sleep", "Prolonged sitting"
];

export const SymptomFormModal = ({ isOpen, onClose, onSave, editingSymptom = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    bodyArea: 'Pelvic',
    severity: 6,
    date: new Date().toISOString().split('T')[0],
    duration: '4 hours',
    frequency: 'Cycle onset',
    triggers: [],
    notes: ''
  });

  const [triggerInput, setTriggerInput] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingSymptom) {
      setFormData({
        name: editingSymptom.name || '',
        bodyArea: editingSymptom.bodyArea || 'Pelvic',
        severity: editingSymptom.severity || 6,
        date: editingSymptom.date || new Date().toISOString().split('T')[0],
        duration: editingSymptom.duration || '',
        frequency: editingSymptom.frequency || '',
        triggers: editingSymptom.triggers || [],
        notes: editingSymptom.notes || ''
      });
    } else {
      setFormData({
        name: '',
        bodyArea: 'Pelvic',
        severity: 6,
        date: new Date().toISOString().split('T')[0],
        duration: '4 hours',
        frequency: 'Cyclic',
        triggers: ['Cycle onset'],
        notes: ''
      });
    }
  }, [editingSymptom, isOpen]);

  if (!isOpen) return null;

  const handleToggleTrigger = (trigger) => {
    setFormData(prev => ({
      ...prev,
      triggers: prev.triggers.includes(trigger)
        ? prev.triggers.filter(t => t !== trigger)
        : [...prev.triggers, trigger]
    }));
  };

  const handleAddCustomTrigger = (e) => {
    if (e.key === 'Enter' && triggerInput.trim()) {
      e.preventDefault();
      if (!formData.triggers.includes(triggerInput.trim())) {
        setFormData(prev => ({ ...prev, triggers: [...prev.triggers, triggerInput.trim()] }));
      }
      setTriggerInput('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Please provide a symptom name (e.g., Pelvic pain, Extreme fatigue).');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await onSave(formData, editingSymptom?.id);
      onClose();
    } catch (err) {
      setError(err?.message || 'Failed to save symptom log.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-elevated border border-lavender-200 animate-in fade-in zoom-in-95 my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-lavender-100 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-charcoal-900">
                {editingSymptom ? 'Edit Symptom Record' : 'Record New Symptom'}
              </h2>
              <p className="text-xs text-charcoal-500">Encrypted personal health observation</p>
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

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Symptom Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1">
              Symptom Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Deep Pelvic Cramping, Brain Fog, Migraine"
              className="w-full px-4 py-2.5 rounded-xl border border-lavender-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-medium"
            />
          </div>

          {/* Body Area & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1">
                Body Area
              </label>
              <select
                value={formData.bodyArea}
                onChange={(e) => setFormData({ ...formData, bodyArea: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-lavender-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm bg-white"
              >
                {DEMO_BODY_AREAS.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1">
                Date Observed
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-lavender-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm bg-white"
              >
              </input>
            </div>
          </div>

          {/* Severity Slider (1 - 10) */}
          <div className="p-4 rounded-2xl bg-lavender-50/70 border border-lavender-200">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-charcoal-700">
                Pain / Intensity Severity: <span className="text-sm font-extrabold text-brand-800">{formData.severity} / 10</span>
              </label>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                formData.severity >= 8 ? 'bg-rose-100 text-rose-800' :
                formData.severity >= 5 ? 'bg-amber-100 text-amber-800' :
                'bg-emerald-100 text-emerald-800'
              }`}>
                {formData.severity >= 8 ? 'Severe / Incapacitating' :
                 formData.severity >= 5 ? 'Moderate / Functional Impact' :
                 'Mild / Manageable'}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={formData.severity}
              onChange={(e) => setFormData({ ...formData, severity: parseInt(e.target.value) })}
              className="w-full accent-brand-600 h-2 bg-lavender-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-charcoal-400 mt-1">
              <span>1 - Very Mild</span>
              <span>5 - Moderate</span>
              <span>10 - Incapacitating</span>
            </div>
          </div>

          {/* Duration & Frequency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1">
                Duration
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g., 4 hours, All day, 30 mins"
                className="w-full px-3.5 py-2.5 rounded-xl border border-lavender-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1">
                Frequency / Cycle Timing
              </label>
              <input
                type="text"
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                placeholder="e.g., Day 1 of menses, Daily, Intermittent"
                className="w-full px-3.5 py-2.5 rounded-xl border border-lavender-300 text-sm"
              />
            </div>
          </div>

          {/* Triggers */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1.5">
              Associated Triggers / Factors
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {COMMON_TRIGGERS.map(trig => {
                const isSelected = formData.triggers.includes(trig);
                return (
                  <button
                    key={trig}
                    type="button"
                    onClick={() => handleToggleTrigger(trig)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                      isSelected
                        ? 'bg-brand-600 text-white'
                        : 'bg-lavender-100 text-charcoal-700 hover:bg-lavender-200'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}{trig}
                  </button>
                );
              })}
            </div>
            <input
              type="text"
              value={triggerInput}
              onChange={(e) => setTriggerInput(e.target.value)}
              onKeyDown={handleAddCustomTrigger}
              placeholder="Type custom trigger and press Enter..."
              className="w-full px-3 py-1.5 text-xs rounded-xl border border-lavender-200 text-charcoal-700"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1">
              Clinical Notes & Sensations
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Describe radiation of pain, what relieved it, medication attempted, or how it affected your day..."
              className="w-full p-3 rounded-xl border border-lavender-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-lavender-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-lavender-300 text-charcoal-700 text-sm font-semibold hover:bg-lavender-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-bold hover:bg-brand-700 transition-colors shadow-card flex items-center gap-1.5 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{submitting ? 'Saving...' : editingSymptom ? 'Update Record' : 'Save Symptom Entry'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default SymptomFormModal;
