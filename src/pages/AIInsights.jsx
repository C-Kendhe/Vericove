import React, { useState } from 'react';
import { aiService } from '../services/aiService';
import { symptomService } from '../services/symptomService';
import { 
  Sparkles, Send, ShieldAlert, CheckCircle2, HelpCircle, 
  Clock, ArrowRight, Lightbulb, FileText, ChevronRight, Stethoscope 
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import MedicalDisclaimer from '../components/common/MedicalDisclaimer';
import { Link } from 'react-router-dom';

const SAMPLE_PROMPTS = [
  "I have been experiencing severe fatigue, irregular periods and pelvic pain for the last three months.",
  "Every month right before my period, I get terrible migraines on one side of my head and nausea.",
  "I have extreme bloating in the evenings, pelvic heaviness, and stabbing pains during ovulation."
];

export const AIInsights = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleAnalyze = async (textToAnalyze = inputText) => {
    if (!textToAnalyze.trim()) return;
    setLoading(true);
    setError('');
    try {
      const response = await aiService.extractSymptoms(textToAnalyze);
      setResult(response);
    } catch (err) {
      setError('Unable to analyze symptoms with AI service.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSample = (sample) => {
    setInputText(sample);
    handleAnalyze(sample);
  };

  const handleAnswerFollowUp = (questionIdx, answer) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIdx]: answer }));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-brand-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl shadow-elevated relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rosebud-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-brand-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-300" />
            <span>AI Clinical Symptom Intelligence</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Synthesize Your Health Narrative
          </h1>

          <p className="mt-2 text-sm text-lavender-200 leading-relaxed">
            Describe what you have been feeling in your own words. Our AI organizes complex descriptions into structured parameters, identifies cyclical patterns, and suggests targeted questions for your physician.
          </p>
        </div>
      </div>

      {/* Prominent Ethical Non-Diagnostic Alert */}
      <MedicalDisclaimer 
        title="Ethical Non-Diagnostic AI Safeguard"
        message="Vericove AI does not diagnose diseases, prescribe medication, or claim that symptoms establish a medical condition. This tool organizes patient-reported narratives into clinical summaries solely to facilitate productive communication with qualified physicians."
      />

      {/* Input Box Area */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-lavender-200/80 shadow-soft">
        <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-2">
          Describe your health experiences in plain language:
        </label>

        <textarea
          rows={4}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="e.g. 'I have been experiencing fatigue, irregular periods and pelvic pain for the last three months, worse around my period...'"
          className="w-full p-4 rounded-2xl border border-lavender-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm leading-relaxed text-charcoal-900 bg-white shadow-inner"
        />

        {/* Quick Sample Prompts */}
        <div className="mt-3">
          <p className="text-[11px] font-semibold text-charcoal-400 mb-1.5">Try sample descriptions:</p>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_PROMPTS.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSample(sample)}
                className="text-xs px-3 py-1.5 rounded-xl bg-lavender-50 hover:bg-lavender-100 text-charcoal-700 border border-lavender-200 text-left transition-colors truncate max-w-md"
              >
                "{sample}"
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-lavender-100">
          <span className="text-xs text-charcoal-500">
            Encrypted analysis • No sensitive data shared publicly
          </span>

          <button
            type="button"
            onClick={() => handleAnalyze()}
            disabled={loading || !inputText.trim()}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-card flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Synthesizing Entities...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Extract Clinical Entities</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analysis Output Section */}
      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
          
          {/* 1. Extracted Symptoms Cards */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-lavender-200/80 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-brand-100 text-brand-700">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-charcoal-900 text-lg">Extracted Clinical Parameters</h3>
              </div>
              <Badge variant="verified">Extracted {result.extractedSymptoms?.length || 0} Entities</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {result.extractedSymptoms?.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-lavender-50/60 border border-lavender-200">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-bold text-charcoal-900 text-sm">{item.name}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-lavender-200 font-semibold text-brand-800">
                      {item.bodyArea}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-charcoal-600">
                    <div className="flex justify-between">
                      <span className="text-charcoal-400">Duration:</span>
                      <span className="font-medium text-charcoal-800">{item.suspectedDuration || '3 months'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-400">Frequency:</span>
                      <span className="font-medium text-charcoal-800">{item.frequency || 'Recurring'}</span>
                    </div>
                    {item.severityRatingEstimate && (
                      <div className="flex justify-between">
                        <span className="text-charcoal-400">Est. Severity:</span>
                        <span className="font-bold text-brand-700">{item.severityRatingEstimate}/10</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Structured Health Summary */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-lavender-200/80 shadow-soft">
            <h3 className="font-bold text-charcoal-900 text-base mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-600" />
              <span>Structured Clinical Summary</span>
            </h3>
            <p className="text-sm text-charcoal-700 leading-relaxed bg-lavender-50/50 p-4 rounded-2xl border border-lavender-200">
              "{result.structuredSummary}"
            </p>
          </div>

          {/* 3. Follow-Up Structured Questions */}
          {result.followUpQuestions && result.followUpQuestions.length > 0 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-lavender-200/80 shadow-soft">
              <h3 className="font-bold text-charcoal-900 text-base mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-purple-600" />
                <span>Clarifying Follow-Up Questions</span>
              </h3>
              <p className="text-xs text-charcoal-500 mb-4">
                Answering these helps refine the pattern timeline before your medical visit.
              </p>

              <div className="space-y-3">
                {result.followUpQuestions.map((q, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <span className="font-medium text-charcoal-800 flex-1">{q}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleAnswerFollowUp(idx, 'Yes')}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                          selectedAnswers[idx] === 'Yes' 
                            ? 'bg-brand-600 text-white border-brand-600' 
                            : 'bg-white text-charcoal-700 border-lavender-200 hover:bg-lavender-50'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAnswerFollowUp(idx, 'Sometimes')}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                          selectedAnswers[idx] === 'Sometimes' 
                            ? 'bg-brand-600 text-white border-brand-600' 
                            : 'bg-white text-charcoal-700 border-lavender-200 hover:bg-lavender-50'
                        }`}
                      >
                        Sometimes
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAnswerFollowUp(idx, 'No')}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                          selectedAnswers[idx] === 'No' 
                            ? 'bg-brand-600 text-white border-brand-600' 
                            : 'bg-white text-charcoal-700 border-lavender-200 hover:bg-lavender-50'
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Questions to Discuss with Healthcare Professional */}
          <div className="bg-gradient-to-br from-white to-lavender-50/60 p-6 sm:p-8 rounded-3xl border border-lavender-200 shadow-soft">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-charcoal-900 text-base">Questions to Discuss with Your Doctor</h3>
                <p className="text-xs text-charcoal-500">Take these directly to your next medical appointment</p>
              </div>
            </div>

            <div className="space-y-2.5 mt-4">
              {result.suggestedQuestionsForDoctor?.map((question, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white border border-lavender-200 flex items-start gap-3 shadow-xs">
                  <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-800 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-charcoal-800 leading-relaxed">
                    {question}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-lavender-200 flex flex-wrap items-center justify-between gap-3">
              <Link
                to="/reports"
                className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs sm:text-sm font-semibold hover:bg-brand-700 transition-colors shadow-xs"
              >
                Generate Printable Clinical Brief →
              </Link>
              <Link
                to="/doctors"
                className="px-4 py-2 rounded-xl bg-white text-charcoal-800 border border-lavender-300 text-xs sm:text-sm font-semibold hover:bg-lavender-50 transition-colors"
              >
                Find Recommended Specialists →
              </Link>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default AIInsights;
