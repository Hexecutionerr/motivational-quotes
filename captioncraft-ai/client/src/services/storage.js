// Reusable LocalStorage helper to persist user activity (favorites, recently used tools)

const KEYS = {
  LAST_USED_TOOLS: 'contentforge_last_used_tools',
  FAVORITES: 'contentforge_favorites',
  RECENT_GENERATIONS: 'contentforge_recent_generations'
};

export const storage = {
  // --- LAST USED TOOLS ---
  getLastUsedTools: () => {
    try {
      const data = localStorage.getItem(KEYS.LAST_USED_TOOLS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  addLastUsedTool: (slug) => {
    try {
      let list = storage.getLastUsedTools();
      // Remove if already exists to bring to front
      list = list.filter(item => item !== slug);
      list.unshift(slug);
      // Limit to 3 tools
      list = list.slice(0, 3);
      localStorage.setItem(KEYS.LAST_USED_TOOLS, JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }
  },

  // --- FAVORITES ---
  getFavorites: () => {
    try {
      const data = localStorage.getItem(KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  addFavorite: (toolSlug, toolTitle, prompt, text) => {
    try {
      const favorites = storage.getFavorites();
      const newFav = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        toolSlug,
        toolTitle,
        prompt,
        text,
        timestamp: new Date().toISOString()
      };
      favorites.unshift(newFav);
      localStorage.setItem(KEYS.FAVORITES, JSON.stringify(favorites));
      return newFav;
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  removeFavorite: (id) => {
    try {
      let favorites = storage.getFavorites();
      favorites = favorites.filter(fav => fav.id !== id);
      localStorage.setItem(KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  },

  isFavorite: (text) => {
    if (!text) return false;
    const favorites = storage.getFavorites();
    return favorites.some(fav => fav.text.trim() === text.trim());
  },

  removeFavoriteByText: (text) => {
    if (!text) return;
    try {
      let favorites = storage.getFavorites();
      favorites = favorites.filter(fav => fav.text.trim() !== text.trim());
      localStorage.setItem(KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  },

  // --- RECENT GENERATIONS ---
  getRecentGenerations: () => {
    try {
      const data = localStorage.getItem(KEYS.RECENT_GENERATIONS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  addRecentGeneration: (toolSlug, toolTitle, text) => {
    try {
      let recents = storage.getRecentGenerations();
      const newRecent = {
        id: `${Date.now()}`,
        toolSlug,
        toolTitle,
        text,
        timestamp: new Date().toISOString()
      };
      recents.unshift(newRecent);
      // Keep last 10 generations
      recents = recents.slice(0, 10);
      localStorage.setItem(KEYS.RECENT_GENERATIONS, JSON.stringify(recents));
      return newRecent;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
};
