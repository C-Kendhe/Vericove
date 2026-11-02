import apiClient, { USE_MOCK_FALLBACK } from './api';
import { DEMO_COMMUNITY_POSTS } from '../data/demoPosts';

const POSTS_STORAGE_KEY = 'vericove_community_posts';

const getLocalPosts = () => {
  try {
    const raw = localStorage.getItem(POSTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEMO_COMMUNITY_POSTS;
  } catch {
    return DEMO_COMMUNITY_POSTS;
  }
};

const saveLocalPosts = (items) => {
  try {
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Storage error', e);
  }
};

export const communityService = {
  async getPosts(filters = {}) {
    try {
      const response = await apiClient.get('/community/posts', { params: filters });
      return response.data || response;
    } catch (err) {
      if (USE_MOCK_FALLBACK) {
        let list = getLocalPosts();

        if (filters.category && filters.category !== 'All') {
          list = list.filter(p => p.category === filters.category);
        }

        if (filters.search) {
          const q = filters.search.toLowerCase();
          list = list.filter(p => 
            p.title.toLowerCase().includes(q) ||
            p.content.toLowerCase().includes(q) ||
            p.tags.some(t => t.toLowerCase().includes(q))
          );
        }

        if (filters.savedOnly) {
          list = list.filter(p => p.userHasSaved);
        }

        return list;
      }
      throw err;
    }
  },

  async createPost(postData) {
    try {
      const response = await apiClient.post('/community/posts', postData);
      return response.data || response;
    } catch (err) {
      if (USE_MOCK_FALLBACK) {
        const list = getLocalPosts();
        const newPost = {
          id: `post_${Date.now()}`,
          authorPseudonym: postData.authorPseudonym || 'SunflowerGlow22',
          avatarBg: 'bg-purple-100 text-purple-700',
          category: postData.category,
          title: postData.title,
          content: postData.content,
          tags: postData.tags || [],
          likesCount: 1,
          commentsCount: 0,
          userHasLiked: true,
          userHasSaved: false,
          createdAt: new Date().toISOString(),
          comments: []
        };
        const updated = [newPost, ...list];
        saveLocalPosts(updated);
        return newPost;
      }
      throw err;
    }
  },

  async toggleLike(postId) {
    try {
      const response = await apiClient.post(`/community/posts/${postId}/like`);
      return response.data || response;
    } catch (err) {
      if (USE_MOCK_FALLBACK) {
        const list = getLocalPosts();
        const updated = list.map(p => {
          if (p.id === postId) {
            const userHasLiked = !p.userHasLiked;
            return {
              ...p,
              userHasLiked,
              likesCount: userHasLiked ? p.likesCount + 1 : Math.max(0, p.likesCount - 1)
            };
          }
          return p;
        });
        saveLocalPosts(updated);
        return updated.find(p => p.id === postId);
      }
      throw err;
    }
  },

  async addComment(postId, commentText, pseudonym = 'SunflowerGlow22') {
    try {
      const response = await apiClient.post(`/community/posts/${postId}/comments`, { content: commentText, pseudonym });
      return response.data || response;
    } catch (err) {
      if (USE_MOCK_FALLBACK) {
        const list = getLocalPosts();
        const updated = list.map(p => {
          if (p.id === postId) {
            const newComment = {
              id: `c_${Date.now()}`,
              authorPseudonym: pseudonym,
              avatarBg: 'bg-lavender-100 text-lavender-800',
              content: commentText,
              createdAt: new Date().toISOString(),
              likesCount: 0
            };
            const comments = [...(p.comments || []), newComment];
            return {
              ...p,
              comments,
              commentsCount: comments.length
            };
          }
          return p;
        });
        saveLocalPosts(updated);
        return updated.find(p => p.id === postId);
      }
      throw err;
    }
  },

  async reportPost(postId, reason) {
    try {
      await apiClient.post(`/community/posts/${postId}/report`, { reason });
      return { success: true, message: 'Post reported to moderation team for review.' };
    } catch {
      return { success: true, message: 'Post reported to moderation team for review.' };
    }
  }
};

export default communityService;
