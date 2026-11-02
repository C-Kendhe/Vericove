import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Bookmark, ExternalLink, FileText, 
  ShieldCheck, ArrowRight, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { EvidenceBadge, Badge } from '../common/Badge';

export const ResearchCard = ({ 
  paper, 
  isSaved = false, 
  onToggleSave 
}) => {
  return (
    <div className="bg-white rounded-3xl border border-lavender-200/80 p-6 shadow-soft hover:shadow-card transition-all flex flex-col justify-between group">
      
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge size="sm" variant="evidence">{paper.category}</Badge>
            <span className="text-[11px] font-semibold text-charcoal-500 bg-lavender-50 px-2 py-0.5 rounded-full border border-lavender-100">
              {paper.publicationType}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onToggleSave(paper.id)}
            className={`p-1.5 rounded-xl transition-colors ${
              isSaved
                ? 'bg-brand-100 text-brand-700'
                : 'text-charcoal-400 hover:text-brand-600 hover:bg-lavender-50'
            }`}
            title={isSaved ? "Saved to your research references" : "Save/Bookmark paper"}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-brand-600' : ''}`} />
          </button>
        </div>

        {/* Paper Title */}
        <Link
          to={`/research/${paper.id}`}
          className="font-bold text-base sm:text-lg text-charcoal-900 group-hover:text-brand-700 transition-colors line-clamp-2 leading-snug mb-2"
        >
          {paper.title}
        </Link>

        {/* Authors & Journal */}
        <p className="text-xs text-charcoal-500 mb-1 truncate">
          <strong>Authors:</strong> {paper.authors?.slice(0, 3).join(', ')}{paper.authors?.length > 3 ? ' et al.' : ''}
        </p>
        <p className="text-xs text-brand-800 font-semibold italic mb-3">
          {paper.journal} • {paper.year}
        </p>

        {/* Short Summary */}
        <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed line-clamp-3 mb-4">
          {paper.shortSummary || paper.abstract}
        </p>

        {/* Key Findings Preview */}
        {paper.keyFindings && paper.keyFindings.length > 0 && (
          <div className="bg-lavender-50/50 p-3 rounded-2xl border border-lavender-100 mb-4 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 block">
              Key Scientific Finding
            </span>
            <p className="text-xs text-charcoal-700 leading-normal line-clamp-2">
              • {paper.keyFindings[0]}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Citations & Actions Strip */}
      <div className="pt-4 border-t border-lavender-100 space-y-3">
        
        <div className="flex flex-wrap items-center justify-between text-[11px] text-charcoal-400 font-mono gap-2">
          {paper.doi && (
            <span className="truncate max-w-[200px]">
              DOI: {paper.doi}
            </span>
          )}
          {paper.pmid && (
            <span>PMID: {paper.pmid}</span>
          )}
        </div>

        <div className="flex items-center justify-between gap-2">
          <EvidenceBadge classification={paper.evidenceClassification || 'Reviewed'} />

          <div className="flex items-center gap-2">
            {paper.pdfUrl && (
              <a
                href={paper.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-lg text-xs font-semibold text-charcoal-700 bg-lavender-100 hover:bg-lavender-200 transition-colors flex items-center gap-1"
                title="Access PDF Full Text"
              >
                <FileText className="w-3.5 h-3.5 text-brand-600" />
                <span>PDF</span>
              </a>
            )}

            <Link
              to={`/research/${paper.id}`}
              className="px-3 py-1 rounded-xl bg-brand-600 text-white font-bold text-xs hover:bg-brand-700 transition-colors shadow-xs flex items-center gap-1"
            >
              <span>View Study</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};

export default ResearchCard;
