import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { researchService } from '../services/researchService';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import { Layers, ArrowRight, BookOpen, Sparkles, ArrowLeft } from 'lucide-react';

export const ResearchCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCollections = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await researchService.getCollections();
        setCollections(data || []);
      } catch (err) {
        setError('Unable to load editorial collections.');
      } finally {
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  if (loading) return <LoadingState message="Loading curated research collections..." />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Back button */}
      <Link
        to="/research"
        className="inline-flex items-center gap-2 text-xs font-semibold text-brand-700 hover:text-brand-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Research Library</span>
      </Link>

      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-lavender-200/80 shadow-soft">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-xs font-semibold text-brand-800 mb-2">
          <Layers className="w-3.5 h-3.5 text-brand-600" />
          <span>Curated Editorial Compendiums</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 tracking-tight">
          Research Collections
        </h1>
        <p className="text-sm text-charcoal-500 mt-1 max-w-3xl leading-relaxed">
          Thematic collections grouping peer-reviewed evidence, clinical guidelines, and biomarker discoveries. Configured dynamically through our central backend database.
        </p>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections.map((col) => (
          <div 
            key={col.id} 
            className="bg-white rounded-3xl border border-lavender-200/80 overflow-hidden shadow-soft hover:shadow-card transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Cover Image */}
              <div className="h-48 w-full relative overflow-hidden bg-charcoal-900">
                <img
                  src={col.featuredImage}
                  alt={col.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/90 text-charcoal-900 backdrop-blur-xs">
                  {col.category}
                </span>
              </div>

              {/* Text */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-charcoal-900 mb-2 group-hover:text-brand-700 transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed mb-4">
                  {col.description}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 pt-0 flex items-center justify-between border-t border-lavender-100 mt-2">
              <span className="text-xs text-charcoal-500 font-medium">
                {col.paperCount} Peer-Reviewed Studies
              </span>

              <Link
                to={`/research?collection=${col.slug}`}
                className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <span>Explore Studies</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ResearchCollections;
