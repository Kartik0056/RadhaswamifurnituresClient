import { useState, useEffect, useCallback } from 'react';

/**
 * Track recently viewed products in localStorage.
 */
const STORAGE_KEY = 'rsf_recently_viewed';
const MAX_ITEMS = 10;

export function useRecentlyViewed() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // Silent — localStorage may be unavailable
    }
  }, []);

  const addProduct = useCallback((product) => {
    setItems((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      const updated = [
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          thumbnail: product.thumbnail,
          price: product.price,
        },
        ...filtered,
      ].slice(0, MAX_ITEMS);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Silent
      }

      return updated;
    });
  }, []);

  return { recentlyViewed: items, addProduct };
}
