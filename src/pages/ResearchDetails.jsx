import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { researchService } from '../services/researchService';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import { EvidenceBadge, Badge } from '../components/common/Badge';
import { 
  ArrowLeft, BookOpen, ExternalLink, FileText, Bookmark, 
  Calendar, ShieldCheck, CheckCircle2, AlertCircle, Quote 
} from 'lucide-react';
import MedicalDisclaimer from '../components/common/MedicalDisclaimer';

export const ResearchDetails = () => {
  const { id } = useParams();
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchPaper = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await researchService.getResearchById(id);
        setPaper(data);
        const savedIds = researchService.getSavedPaperIds();
        setIsSaved(savedIds.includes(id));
      } catch (err) {
        setError('Research paper record not found in repository.');
      } finally {
        setLoading(false);
      }
    };
    fetchPaper();
  }, [id]);

  const handleToggleSave = async () => {
    if (!paper) return;
    const res = await researchService.toggleSavePaper(paper.id);
    setIsSaved(res.isSaved);
  };

  if (loading) return <LoadingState message="Loading scientific publication and methodology..." />;
  if (error || !paper) return <ErrorState message={error || 'Publication not found'} />;

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      
      {/* Back button */}
      <Link
        to="/research"
        className="inline-flex items-center gap-2 text-xs font-semibold text-brand-700 hover:text-brand-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Research Library</span>
      </Link>

      {/* Main Study Card */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-lavender-200/80 shadow-soft space-y-6">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="evidence">{paper.category}</Badge>
            <Badge variant="outline">{paper.publicationType}</Badge>
            <EvidenceBadge classification={paper.evidenceClassification || 'Peer-Reviewed'} />
          </div>

          <button
            type="button"
            onClick={handleToggleSave}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-all ${
              isSaved
                ? 'bg-brand-600 text-white border-brand-600 shadow-xs'
                : 'bg-lavender-50 text-brand-800 border-lavender-200 hover:bg-lavender-100'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
            <span>{isSaved ? 'Saved to References' : 'Save Reference'}</span>
          </button>
        </div>

        {/* Paper Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 leading-tight">
          {paper.title}
        </h1>

        {/* Authors, Journal, Date */}
        <div className="p-4 rounded-2xl bg-lavender-50/60 border border-lavender-100 space-y-2 text-xs text-charcoal-700">
          <p>
            <strong>Authors:</strong> {paper.authors?.join(', ')}
          </p>
          <p>
            <strong>Journal / Publication:</strong> <span className="font-semibold text-brand-900">{paper.journal}</span> ({paper.publicationDate})
          </p>
          <div className="flex flex-wrap gap-4 text-charcoal-500 font-mono text-[11px] pt-1 border-t border-lavender-200/60">
            {paper.doi && <span>DOI: {paper.doi}</span>}
            {paper.pmid && <span>PMID: {paper.pmid}</span>}
            {paper.lastReviewedDate && <span>Last Reviewed: {paper.lastReviewedDate}</span>}
          </div>
        </div>

        {/* Abstract */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal-500">Structured Abstract</h3>
          <p className="text-sm text-charcoal-800 leading-relaxed bg-white p-4 rounded-2xl border border-lavender-100">
            {paper.abstract}
          </p>
        </div>

        {/* Key Findings */}
        {paper.keyFindings && paper.keyFindings.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Key Scientific Findings</span>
            </h3>
            <div className="space-y-2">
              {paper.keyFindings.map((finding, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-emerald-50/40 border border-emerald-100 flex items-start gap-2.5 text-xs sm:text-sm text-charcoal-800">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed">{finding}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Research Methodology */}
        {paper.methodology && (
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal-500">Methodology & Cohort Design</h3>
            <div className="p-4 rounded-2xl bg-lavender-50/40 border border-lavender-100 text-xs sm:text-sm text-charcoal-700 leading-relaxed">
              {paper.methodology}
            </div>
          </div>
        )}

        {/* Limitations & Nuance */}
        {paper.limitations && (
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs text-amber-900 space-y-1">
            <h4 className="font-bold flex items-center gap-1.5 text-amber-800">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <span>Scientific Limitations & Interpretation Guidance</span>
            </h4>
            <p className="leading-relaxed">
              {paper.limitations}
            </p>
          </div>
        )}

        {/* External Access Buttons */}
        <div className="pt-6 border-t border-lavender-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {paper.url && (
              <a
                href={paper.url}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-lavender-100 hover:bg-lavender-200 text-brand-900 font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Original Publication Source</span>
              </a>
            )}

            {paper.pdfUrl && (
              <a
                href={paper.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Open Full PDF Document</span>
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(`${paper.title}. ${paper.authors?.[0]} et al. ${paper.journal} (${paper.year}). DOI: ${paper.doi}`);
              alert('Full citation copied to clipboard!');
            }}
            className="text-xs font-semibold text-charcoal-600 hover:text-charcoal-900 flex items-center gap-1"
          >
            <Quote className="w-3.5 h-3.5" />
            <span>Copy Citation</span>
          </button>
        </div>

      </div>

      <MedicalDisclaimer message="Scientific papers document research findings and should not be used as self-prescriptions or direct clinical directives." />

    </div>
  );
};

export default ResearchDetails;
