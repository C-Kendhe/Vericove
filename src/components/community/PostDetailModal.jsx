import React, { useState } from 'react';
import { X, Heart, MessageCircle, Send, Flag, CheckCircle2 } from 'lucide-react';
import { Badge } from '../common/Badge';

export const PostDetailModal = ({ 
  isOpen, 
  onClose, 
  post, 
  onLike, 
  onAddComment,
  currentUserPseudonym = 'SunflowerGlow22' 
}) => {
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !post) return null;

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setSubmitting(true);
    try {
      await onAddComment(post.id, commentText.trim(), currentUserPseudonym);
      setCommentText('');
    } finally {
      setSubmitting(false);
    }
  };

  const comments = post.comments || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-elevated border border-lavender-200 animate-in fade-in zoom-in-95 my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-lavender-100 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${post.avatarBg || 'bg-purple-100 text-purple-700'}`}>
              {post.authorPseudonym.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-xs font-bold text-charcoal-900">@{post.authorPseudonym}</p>
              <Badge size="sm" variant="secondary">{post.category}</Badge>
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

        {/* Scrollable Post Content & Thread */}
        <div className="flex-1 overflow-y-auto py-4 space-y-6">
          
          {/* Post Header */}
          <div>
            <h2 className="text-xl font-extrabold text-charcoal-900 mb-3">{post.title}</h2>
            <p className="text-sm text-charcoal-700 leading-relaxed whitespace-pre-line bg-lavender-50/40 p-4 rounded-2xl border border-lavender-100">
              {post.content}
            </p>
            {post.tags && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {post.tags.map(tag => (
                  <span key={tag} className="text-xs text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Upvote strip */}
          <div className="flex items-center gap-4 py-2 border-y border-lavender-100 text-xs text-charcoal-600">
            <button
              type="button"
              onClick={() => onLike(post.id)}
              className={`flex items-center gap-1.5 font-bold transition-colors ${
                post.userHasLiked ? 'text-rosebud-600' : 'hover:text-rosebud-600'
              }`}
            >
              <Heart className={`w-4 h-4 ${post.userHasLiked ? 'fill-rosebud-600' : ''}`} />
              <span>{post.likesCount} Helpful</span>
            </button>
            <span className="flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-brand-600" />
              <span>{comments.length} Responses</span>
            </span>
          </div>

          {/* Comments List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
              Community Responses ({comments.length})
            </h4>

            {comments.length === 0 ? (
              <p className="text-xs text-charcoal-400 py-4 text-center">
                No replies yet. Be the first to share your thoughts or encouragement!
              </p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="p-3.5 rounded-2xl bg-lavender-50/50 border border-lavender-100 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-brand-900">@{comment.authorPseudonym}</span>
                    <span className="text-[10px] text-charcoal-400">
                      {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              ))
            )}
          </div>

        </div>

        {/* Comment Input Footer */}
        <form onSubmit={handleCommentSubmit} className="pt-3 border-t border-lavender-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder={`Reply anonymously as @${currentUserPseudonym}...`}
              className="flex-1 px-4 py-2.5 rounded-xl border border-lavender-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs sm:text-sm bg-white"
            />
            <button
              type="submit"
              disabled={submitting || !commentText.trim()}
              className="px-4 py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-xs sm:text-sm hover:bg-brand-700 transition-colors shadow-xs flex items-center gap-1.5 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Reply</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default PostDetailModal;
