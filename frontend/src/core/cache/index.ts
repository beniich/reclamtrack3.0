// Exemple de Result-Cache simple In-Memory pour démarrer.
// A remplacer par ioredis en production pour du cache distribué dans un cluster serverless type Vercel.

const memoryCache = new Map<string, { value: any; expiresAt: number }>();

export const cache = {
  get: async <T>(key: string): Promise<T | null> => {
    const item = memoryCache.get(key);
    if (!item) return null;
    if (Date.now() > item.expiresAt) {
      memoryCache.delete(key);
      return null;
    }
    return item.value as T;
  },

  set: async <T>(key: string, value: T, ttlSeconds: number = 60): Promise<T> => {
    memoryCache.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
    return value;
  },

  invalidate: async (pattern: string): Promise<void> => {
    for (const key of memoryCache.keys()) {
      if (key.includes(pattern)) {
        memoryCache.delete(key);
      }
    }
  }
};
