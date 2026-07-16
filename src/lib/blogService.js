/**
 * Devdoot Blog Service
 * Fetches blogs from https://api.devdoot.org/v1/api/blogs
 * Only shows blogs where publishTo includes "new_site"
 */

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`;

// Site identifier — only show posts published to "new_site"
const SITE = 'new_site';

export const BLOG_ENDPOINTS = {
  GET_ALL: BASE_URL,
  GET_BY_SLUG: (slug) => `${BASE_URL}/slug/${slug}`,
  GET_BY_CATEGORY: (category) => `${BASE_URL}/category/${encodeURIComponent(category)}`,
  GET_CATEGORIES: `${BASE_URL}/categories`,
};

/** Convert a category name to a URL-safe slug */
function nameToSlug(name) {
  return name
    .toLowerCase()
    .replace(/[&]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-{2,}/g, '-');
}

export const blogService = {
  getAllBlogs: async (page = 1, limit = 12, category = null) => {
    try {
      let url = `${BLOG_ENDPOINTS.GET_ALL}?site=${SITE}&page=${page}&limit=${limit}`;
      if (category) {
        url += `&category=${encodeURIComponent(category)}`;
      }
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch blogs');
      return await response.json();
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  },

  getBlogBySlug: async (slug) => {
    try {
      const response = await fetch(`${BLOG_ENDPOINTS.GET_BY_SLUG(slug)}?site=${SITE}`);
      if (!response.ok) throw new Error('Blog not found');
      return await response.json();
    } catch (error) {
      console.error('Error fetching blog:', error);
      throw error;
    }
  },

  getBlogsByCategory: async (category, page = 1, limit = 50) => {
    try {
      const url = `${BLOG_ENDPOINTS.GET_BY_CATEGORY(category)}?site=${SITE}&page=${page}&limit=${limit}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch blogs by category');
      return await response.json();
    } catch (error) {
      console.error('Error fetching blogs by category:', error);
      throw error;
    }
  },

  getAllCategories: async () => {
    try {
      const response = await fetch(`${BLOG_ENDPOINTS.GET_CATEGORIES}?site=${SITE}`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        const mapped = result.data.map((item) => {
          if (typeof item === 'string') {
            return {
              name: item,
              slug: nameToSlug(item),
              id: nameToSlug(item),
              image: null,
              description: '',
            };
          }
          return {
            ...item,
            id: item.id || item._id,
            slug: item.slug || nameToSlug(item.name),
          };
        });
        return mapped.sort((a, b) => a.name.localeCompare(b.name));
      }
      return [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },
};
