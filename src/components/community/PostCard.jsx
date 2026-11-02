import React, { useState } from 'react';
import { 
  Heart, MessageCircle, Bookmark, Share2, Flag, 
  MoreHorizontal, Tag, Clock, CheckCircle2 
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const PostCard = ({ 
  post, 
  onLike, 
  onCommentClick, 
  onReport,
  onSave 
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [reported, setReported] = useState(false);

  const handleReportClick = async () => {
    setShowOptions(false);
    if (window.confirm('Report this post to community moderators for review?')) {
      await onReport(post.id, 'Inappropriate or harmful content');
      setReported(true);
    }
  };

  return (
    <div className="bg-white p-5 sm:p-6 rounded-3xl border border-lavender-200/80 shadow-soft hover:shadow-card transition-all flex flex-col justify-between">
      
      <div>
        {/* Author info & category */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${post.avatarBg || 'bg-purple-100 text-purple-700'}`}>
              {post.authorPseudonym.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <span className="text-xs font-bold text-charcoal-900">@{post.authorPseudonym}</span>
              <span className="text-[10px] text-charcoal-400 block">
                {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge size="sm" variant="secondary">{post.category}</Badge>
            
            {/* Options Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowOptions(!showOptions)}
                className="p-1 rounded-lg text-charcoal-400 hover:text-charcoal-700 hover:bg-lavender-50"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
              {showOptions && (
                <div className="absolute right-0 mt-1 w-40 bg-white rounded-xl shadow-elevated border border-lavender-200 py-1 z-20 text-xs">
                  <button
                    type="button"
                    onClick={handleReportClick}
                    className="w-full text-left px-3 py-2 text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>Report Post</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onCommentClick(post)}
          className="text-base sm:text-lg font-bold text-charcoal-900 hover:text-brand-700 cursor-pointer transition-colors mb-2 leading-snug"
        >
          {post.title}
        </h3>

        {/* Content */}
        <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed line-clamp-3 mb-4">
          {post.content}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map(tag => (
              <span key={tag} className="text-[11px] text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md font-medium">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {reported && (
        <div className="mb-3 p-2 bg-amber-50 text-amber-800 rounded-lg text-xs flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
          <span>Reported for moderation review</span>
        </div>
      )}

      {/* Engagement Actions */}
      <div className="pt-3 border-t border-lavender-100 flex items-center justify-between text-xs text-charcoal-500">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => onLike(post.id)}
            className={`flex items-center gap-1.5 font-semibold transition-colors ${
              post.userHasLiked ? 'text-rosebud-600' : 'hover:text-rosebud-600'
            }`}
          >
            <Heart className={`w-4 h-4 ${post.userHasLiked ? 'fill-rosebud-600' : ''}`} />
            <span>{post.likesCount}</span>
          </button>

          <button
            type="button"
            onClick={() => onCommentClick(post)}
            className="flex items-center gap-1.5 font-semibold hover:text-brand-700 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{post.commentsCount || (post.comments?.length || 0)}</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => onCommentClick(post)}
          className="font-bold text-brand-700 hover:text-brand-900 text-xs"
        >
          Join Discussion →
        </button>
      </div>

    </div>
  );
};

export default PostCard;
