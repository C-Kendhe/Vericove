import React, { useState } from 'react';
import { X, Users, Tag, AlertCircle, Send } from 'lucide-react';
import { COMMUNITY_CATEGORIES } from '../../data/demoPosts';

export const CreatePostModal = ({ isOpen, onClose, onSubmit, authorPseudonym = 'SunflowerGlow22' }) => {
  const [formData, setFormData] = useState({
    category: 'Endometriosis Experiences',
    title: '',
    content: '',
    tags: []
  });

  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const clean = tagInput.trim().replace(/^#/, '');
      if (!formData.tags.includes(clean)) {
        setFormData(prev => ({ ...prev, tags: [...prev.tags, clean] }));
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Please provide both a discussion title and content.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await onSubmit({
        ...formData,
        authorPseudonym
      });
      onClose();
    } catch (err) {
      setError(err?.message || 'Failed to publish post.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-elevated border border-lavender-200 animate-in fade-in zoom-in-95 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-lavender-100 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-charcoal-900">Start Anonymous Discussion</h2>
              <p className="text-xs text-charcoal-500">
                Posting anonymously as <strong className="text-brand-800">@{authorPseudonym}</strong>
              </p>
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
          
          {/* Category */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1">
              Select Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-lavender-300 text-sm bg-white"
            >
              {COMMUNITY_CATEGORIES.filter(c => c !== 'All').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1">
              Post Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. How did you navigate an inconclusive MRI with severe symptoms?"
              className="w-full px-4 py-2.5 rounded-xl border border-lavender-300 text-sm font-semibold text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1">
              Your Experience / Question *
            </label>
            <textarea
              rows={5}
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Describe your situation, what advice you are seeking, or what supportive insights you would like to share with peers..."
              className="w-full p-3.5 rounded-xl border border-lavender-300 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1">
              Tags (Optional)
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {formData.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-lavender-100 text-brand-800 border border-lavender-200"
                >
                  #{tag}
                  <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-rose-600">×</button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Type tag and press Enter (e.g. Laparoscopy, Supplements)..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-lavender-200"
            />
          </div>

          <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-100 text-xs text-charcoal-600">
            <strong>Community Guidelines:</strong> Be respectful and supportive. Community threads are peer experiences and should never be taken as medical advice.
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
              className="px-6 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-bold hover:bg-brand-700 transition-colors shadow-card flex items-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Publishing...' : 'Publish Anonymously'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default CreatePostModal;
