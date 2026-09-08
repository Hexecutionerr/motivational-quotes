const NodeCache = require('node-cache');

// Cache TTL: 1 hour for quotes, 5 minutes for trending
const cache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });

const cacheService = {
  get(key) {
    return cache.get(key);
  },

  set(key, value, ttl) {
    return cache.set(key, value, ttl);
  },

  del(key) {
    return cache.del(key);
  },

  flush() {
    return cache.flushAll();
  },

  // Middleware for route caching
  cacheMiddleware(duration = 3600) {
    return (req, res, next) => {
      const key = `__cache__${req.originalUrl}`;
      const cached = cache.get(key);

      if (cached) {
        return res.status(200).json(cached);
      }

      // Override res.json to cache the response
      const originalJson = res.json.bind(res);
      res.json = (body) => {
        if (res.statusCode === 200) {
          cache.set(key, body, duration);
        }
        return originalJson(body);
      };

      next();
    };
  }
};

module.exports = cacheService;
