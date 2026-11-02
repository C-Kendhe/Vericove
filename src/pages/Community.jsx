import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { communityService } from '../services/communityService';
import PostCard from '../components/community/PostCard';
import CreatePostModal from '../components/community/CreatePostModal';
import PostDetailModal from '../components/community/PostDetailModal';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import MedicalDisclaimer from '../components/common/MedicalDisclaimer';
import { COMMUNITY_CATEGORIES } from '../data/demoPosts';
import { 
  Users, Plus, Search, MessageSquareHeart, ShieldCheck, 
  Filter, Bookmark, Sparkles, Heart 
} from 'lucide-react';

export const Community = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [activePostForComments, setActivePostForComments] = useState(null);

  const pseudonym = user?.communityPseudonym || 'SunflowerGlow22';

  const loadPosts = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await communityService.getPosts({
        category: selectedCategory,
        search: searchQuery
      });
      setPosts(data || []);
    } catch (err) {
      setError('Unable to load community discussions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [selectedCategory, searchQuery]);

  const handleCreatePost = async (postData) => {
    await communityService.createPost(postData);
    await loadPosts();
  };

  const handleLike = async (postId) => {
    const updatedPost = await communityService.toggleLike(postId);
    setPosts(prev => prev.map(p => p.id === postId ? updatedPost : p));
    if (activePostForComments && activePostForComments.id === postId) {
      setActivePostForComments(updatedPost);
    }
  };

  const handleAddComment = async (postId, text, authorPseudonym) => {
    const updatedPost = await communityService.addComment(postId, text, authorPseudonym);
    setPosts(prev => prev.map(p => p.id === postId ? updatedPost : p));
    if (activePostForComments && activePostForComments.id === postId) {
      setActivePostForComments(updatedPost);
    }
  };

  const handleReport = async (postId, reason) => {
    await communityService.reportPost(postId, reason);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-lavender-200/80 shadow-soft">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rosebud-50 border border-rosebud-200 text-xs font-semibold text-rosebud-800 mb-2">
            <Users className="w-3.5 h-3.5 text-rosebud-600" />
            <span>100% Anonymous & Moderated Peer Support</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 tracking-tight">
            Anonymous Women's Health Community
          </h1>
          <p className="text-sm text-charcoal-500 mt-1 max-w-2xl">
            You are browsing and sharing as <strong className="text-brand-800 font-bold">@{pseudonym}</strong>. Real experiences shared without shame, stigma, or medical dismissals.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setCreateModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-card transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Anonymous Post</span>
        </button>
      </div>

      {/* Community Ethical Disclaimer */}
      <MedicalDisclaimer 
        compact 
        title="Peer Community Notice" 
        message="Community discussions are authentic patient peer accounts and do not represent verified medical advice or clinical guidelines. For medical care, consult our Verified Doctor Directory." 
      />

      {/* Search and Category Tabs */}
      <div className="space-y-3">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search discussions, symptoms, medications..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-lavender-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs sm:text-sm bg-white"
          />
        </div>

        {/* Categories scrollable pill bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {COMMUNITY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-white text-charcoal-600 border border-lavender-200 hover:bg-lavender-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Discussion Feed */}
      {loading ? (
        <LoadingState message="Loading community conversations..." rows={3} />
      ) : error ? (
        <ErrorState message={error} onRetry={loadPosts} />
      ) : posts.length === 0 ? (
        <EmptyState
          icon={MessageSquareHeart}
          title="No discussions found"
          description="Be the first to start a conversation in this category."
          actionLabel="Create Anonymous Post"
          onAction={() => setCreateModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={handleLike}
              onCommentClick={(p) => setActivePostForComments(p)}
              onReport={handleReport}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <CreatePostModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreatePost}
        authorPseudonym={pseudonym}
      />

      <PostDetailModal
        isOpen={!!activePostForComments}
        onClose={() => setActivePostForComments(null)}
        post={activePostForComments}
        onLike={handleLike}
        onAddComment={handleAddComment}
        currentUserPseudonym={pseudonym}
      />

    </div>
  );
};

export default Community;
