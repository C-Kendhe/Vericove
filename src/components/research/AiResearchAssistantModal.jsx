import React, { useState } from 'react';
import { aiService } from '../../services/aiService';
import { 
  X, Sparkles, Send, BookOpen, ExternalLink, ShieldCheck, 
  AlertCircle, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { EvidenceBadge } from '../common/Badge';

export const AiResearchAssistantModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleAsk = async (e) => {
    e?.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    try {
      const data = await aiService.askResearchAssistant(query);
      setResponse(data);
    } catch (err) {
      setError('Unable to query research assistant service.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickQuestion = (q) => {
    setQuery(q);
    setLoading(true);
    setError('');
    aiService.askResearchAssistant(q)
      .then(res => setResponse(res))
      .catch(() => setError('Assistant query error.'))
      .finally(() => setLoading(false));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-elevated border border-lavender-200 animate-in fade-in zoom-in-95 my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-lavender-100 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-charcoal-900 leading-tight">Research-Backed AI Assistant</h2>
              <p className="text-xs text-charcoal-500">Grounded strictly in approved scientific papers & clinical guidelines</p>
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

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          
          <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs text-charcoal-700">
            <strong>Evidence Transparency:</strong> Every answer is synthesized with transparent citations and direct links to peer-reviewed medical publications in our database. The AI does not invent unverified citations.
          </div>

          {/* Quick Prompts */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400 mb-2">Example Scientific Queries:</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleQuickQuestion("What are the diagnostic guidelines for endometriosis when ultrasound is normal?")}
                className="text-xs px-3 py-1.5 rounded-xl bg-lavender-50 hover:bg-lavender-100 text-charcoal-700 border border-lavender-200 text-left transition-colors"
              >
                Normal ultrasound in endometriosis?
              </button>
              <button
                type="button"
                onClick={() => handleQuickQuestion("What does research show about 40:1 inositol for PCOS?")}
                className="text-xs px-3 py-1.5 rounded-xl bg-lavender-50 hover:bg-lavender-100 text-charcoal-700 border border-lavender-200 text-left transition-colors"
              >
                Inositols in PCOS guidelines?
              </button>
              <button
                type="button"
                onClick={() => handleQuickQuestion("How does heavy menstrual bleeding relate to non-anemic iron deficiency?")}
                className="text-xs px-3 py-1.5 rounded-xl bg-lavender-50 hover:bg-lavender-100 text-charcoal-700 border border-lavender-200 text-left transition-colors"
              >
                Ferritin testing vs Hemoglobin?
              </button>
            </div>
          </div>

          {/* Answer Box */}
          {loading ? (
            <div className="py-12 text-center">
              <div className="w-8 h-8 rounded-full border-3 border-indigo-200 border-t-indigo-600 animate-spin mx-auto mb-3" />
              <p className="text-xs font-semibold text-charcoal-600 animate-pulse">
                Searching peer-reviewed literature and synthesizing verified citations...
              </p>
            </div>
          ) : error ? (
            <div className="p-4 rounded-xl bg-rose-50 text-rose-800 text-xs border border-rose-200">
              {error}
            </div>
          ) : response ? (
            <div className="space-y-4 pt-2">
              
              {/* Synthesized Answer */}
              <div className="bg-white p-5 rounded-2xl border border-lavender-200 shadow-soft">
                <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-400 mb-2">Evidence Synthesis:</h4>
                <p className="text-sm text-charcoal-800 leading-relaxed">
                  {response.answer}
                </p>
              </div>

              {/* Citations List */}
              {response.sources && response.sources.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-700 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Cited Scientific References ({response.sources.length})</span>
                  </h4>

                  {response.sources.map((src, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-indigo-50/40 border border-indigo-200 text-xs space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="font-bold text-charcoal-900 leading-snug">{src.title}</h5>
                        {src.evidenceClassification && (
                          <EvidenceBadge classification={src.evidenceClassification} className="text-[10px] py-0" />
                        )}
                      </div>

                      <p className="text-[11px] text-charcoal-500">
                        {src.authors} • <em>{src.journal}</em> ({src.year})
                      </p>

                      {src.relevantPassage && (
                        <p className="text-[11px] text-charcoal-700 italic bg-white/70 p-2 rounded-lg border border-indigo-100">
                          "{src.relevantPassage}"
                        </p>
                      )}

                      {src.url && (
                        <div className="pt-1">
                          <a
                            href={src.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] font-semibold text-brand-700 hover:text-brand-900 inline-flex items-center gap-1"
                          >
                            <span>DOI: {src.doi || src.url}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

            </div>
          ) : null}

        </div>

        {/* Input Bar */}
        <form onSubmit={handleAsk} className="pt-3 border-t border-lavender-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask a scientific question regarding women's health research..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-lavender-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm bg-white"
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-card flex items-center gap-1.5 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>Ask Hub</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default AiResearchAssistantModal;
