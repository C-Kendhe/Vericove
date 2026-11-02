import React, { useState, useEffect } from 'react';
import { researchService } from '../services/researchService';
import ResearchCard from '../components/research/ResearchCard';
import AiResearchAssistantModal from '../components/research/AiResearchAssistantModal';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import MedicalDisclaimer from '../components/common/MedicalDisclaimer';
import { 
  BookOpen, Search, Sparkles, Filter, Bookmark, 
  Layers, ArrowRight, ExternalLink, ShieldCheck 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const RESEARCH_CATEGORIES = [
  "All Categories",
  "PCOS",
  "Endometriosis",
  "Menstrual Health",
  "Mental Health",
  "Hormonal Health",
  "Fertility",
  "Menopause"
];

const PUBLICATION_TYPES = [
  "All Types",
  "Systematic Review & Meta-Analysis",
  "Clinical Practice Guideline",
  "Original Research",
  "Observational Cohort"
];

export const ResearchHub = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedType, setSelectedType] = useState('All Types');
  const [sortBy, setSortBy] = useState('newest');
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [savedIds, setSavedIds] = useState(researchService.getSavedPaperIds());
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  const loadPapers = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await researchService.getResearchPapers({
        search: searchQuery,
        category: selectedCategory,
        publicationType: selectedType,
        sortBy,
        savedOnly: showSavedOnly
      });
      setPapers(data || []);
      setSavedIds(researchService.getSavedPaperIds());
    } catch (err) {
      setError('Unable to load scientific publications from research repository.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPapers();
  }, [searchQuery, selectedCategory, selectedType, sortBy, showSavedOnly]);

  const handleToggleSave = async (id) => {
    const res = await researchService.toggleSavePaper(id);
    setSavedIds(res.savedIds || []);
    if (showSavedOnly) {
      loadPapers();
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-brand-950 to-purple-950 text-white p-6 sm:p-8 rounded-3xl shadow-elevated relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-indigo-200">
              <BookOpen className="w-3.5 h-3.5 text-indigo-300" />
              <span>Peer-Reviewed Literature & Clinical Guidelines</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Research & Medical Knowledge Hub
            </h1>
            <p className="text-sm text-indigo-200 leading-relaxed">
              Dynamically retrieved from our central scientific database. Every article includes DOIs, PMIDs, journal citations, and evidence classifications to support informed shared decision-making.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/research/collections"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all backdrop-blur-md"
            >
              <Layers className="w-4 h-4 text-brand-300" />
              <span>Editorial Collections</span>
            </Link>

            <button
              type="button"
              onClick={() => setAiAssistantOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-brand-500 hover:from-indigo-600 hover:to-brand-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-card transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask Research AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-3xl border border-lavender-200/80 shadow-soft space-y-3">
        
        {/* Search */}
        <div className="relative max-w-lg">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search papers by keyword, author, or finding (e.g. Laparoscopy, Teede, Ferritin)..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-lavender-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm bg-white"
          />
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-lavender-200 text-xs font-medium text-charcoal-700 bg-white"
            >
              {RESEARCH_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-lavender-200 text-xs font-medium text-charcoal-700 bg-white"
            >
              {PUBLICATION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-lavender-200 text-xs font-medium text-charcoal-700 bg-white"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
              <option value="popular">Sort: Most Saved</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => setShowSavedOnly(!showSavedOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              showSavedOnly
                ? 'bg-brand-600 text-white border-brand-600 shadow-xs'
                : 'bg-white text-charcoal-700 border-lavender-200 hover:bg-lavender-50'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${showSavedOnly ? 'fill-white' : ''}`} />
            <span>Saved Papers ({savedIds.length})</span>
          </button>

        </div>

      </div>

      {/* Main Papers Grid */}
      {loading ? (
        <LoadingState message="Querying scientific publication database..." rows={3} />
      ) : error ? (
        <ErrorState message={error} onRetry={loadPapers} />
      ) : papers.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No research publications found"
          description="Try broadening your category filter or resetting the search keywords."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchQuery('');
            setSelectedCategory('All Categories');
            setSelectedType('All Types');
            setShowSavedOnly(false);
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {papers.map((paper) => (
            <ResearchCard
              key={paper.id}
              paper={paper}
              isSaved={savedIds.includes(paper.id)}
              onToggleSave={handleToggleSave}
            />
          ))}
        </div>
      )}

      {/* Scientific Transparency Disclaimer */}
      <MedicalDisclaimer
        title="Scientific Evidence & Source Attribution"
        message="Research summaries in this hub are extracted from peer-reviewed scientific journals and clinical consensus guidelines. An observational association does not establish clinical causality. Always discuss research findings with your physician."
      />

      {/* AI Assistant Modal */}
      <AiResearchAssistantModal
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
      />

    </div>
  );
};

export default ResearchHub;
