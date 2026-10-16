import { useState, useEffect, useCallback } from 'react';

/**
 * Secure local tracking for recently viewed products.
 * Includes schema validation and sanitize guards to prevent corrupted or malicious localStorage payloads.
 */
const STORAGE_KEY = 'rsf_recently_viewed';
const MAX_ITEMS = 8;

function validateRecentlyViewedItem(item) {
  return (
    item &&
    typeof item === 'object' &&
    typeof item.id === 'string' &&
    typeof item.slug === 'string' &&
    typeof item.name === 'string' &&
    typeof item.price === 'number' &&
    (!item.thumbnail || typeof item.thumbnail === 'string')
  );
}

export function useRecentlyViewed() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Strictly validate every item to prevent stored XSS or corrupt states
          const sanitized = parsed.filter(validateRecentlyViewedItem).slice(0, MAX_ITEMS);
          setItems(sanitized);
        }
      }
    } catch {
      // Clear corrupt entry
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Silent
      }
    }
  }, []);

  const addProduct = useCallback((product) => {
    if (!product || !product.id || !product.slug) return;

    setItems((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      const cleanItem = {
        id: String(product.id).trim(),
        slug: String(product.slug).trim(),
        name: String(product.name).slice(0, 100),
        thumbnail: product.thumbnail || product.images?.[0] || '',
        price: Number(product.price) || 0,
      };

      const updated = [cleanItem, ...filtered].slice(0, MAX_ITEMS);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // LocalStorage quota exceeded or disabled
      }

      return updated;
    });
  }, []);

  return { recentlyViewed: items, addProduct };
}
