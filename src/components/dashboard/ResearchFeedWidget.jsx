import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, ShieldCheck, Bookmark, ExternalLink } from 'lucide-react';
import { EvidenceBadge, Badge } from '../common/Badge';

export const ResearchFeedWidget = ({ papers = [] }) => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-lavender-200/80 shadow-soft flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-charcoal-900 text-base">Recently Added Research</h3>
              <p className="text-[11px] text-charcoal-500">Peer-reviewed studies & guidelines</p>
            </div>
          </div>
          <Link to="/research" className="text-xs font-semibold text-brand-700 hover:text-brand-900 flex items-center gap-1">
            <span>Library</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-3">
          {papers.slice(0, 3).map((paper) => (
            <div 
              key={paper.id} 
              className="p-3.5 rounded-2xl bg-indigo-50/30 hover:bg-indigo-50/60 border border-indigo-100 transition-colors"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <Badge size="sm" variant="evidence">{paper.category}</Badge>
                <span className="text-[11px] text-charcoal-400 font-mono">{paper.year}</span>
              </div>

              <Link 
                to={`/research/${paper.id}`} 
                className="font-bold text-xs text-charcoal-900 hover:text-brand-700 transition-colors line-clamp-2 leading-snug"
              >
                {paper.title}
              </Link>

              <p className="text-[11px] text-charcoal-500 mt-1 italic truncate">
                {paper.journal}
              </p>

              <div className="mt-2 pt-2 border-t border-indigo-100/70 flex items-center justify-between text-[11px]">
                <EvidenceBadge classification={paper.evidenceClassification || 'Peer-Reviewed'} className="text-[10px] py-0 px-2" />
                <Link to={`/research/${paper.id}`} className="font-semibold text-brand-700 hover:text-brand-900">
                  Read Abstract →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-lavender-100 flex items-center justify-between text-xs">
        <span className="text-charcoal-500">All papers cite DOIs & PMIDs</span>
        <Link to="/research/collections" className="font-semibold text-brand-700 hover:text-brand-900">
          Browse Collections →
        </Link>
      </div>
    </div>
  );
};

export default ResearchFeedWidget;
