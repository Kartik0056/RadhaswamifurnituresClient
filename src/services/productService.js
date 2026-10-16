/**
 * Product Service — Data Access Layer
 * =====================================
 * All product data access goes through this module.
 * Currently backed by local JS data files.
 *
 * To integrate with an API later, create a new implementation
 * (e.g. productService.api.js) with the same exported functions,
 * then swap the import in this file — no UI changes required.
 */

import products from '../data/products';
import categories from '../data/categories';
import collections from '../data/collections';

// ─── Products ────────────────────────────────────────────────────────

/**
 * Get all products, optionally filtered & sorted.
 * @param {Object} options
 * @param {string} options.categoryId
 * @param {string} options.search
 * @param {string} options.sortBy - 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'newest'
 * @param {number} options.minPrice
 * @param {number} options.maxPrice
 * @param {string} options.material
 * @param {string} options.colour
 * @param {string} options.availability
 * @param {string[]} options.tags
 * @param {number} options.page
 * @param {number} options.limit
 * @returns {{ products: Array, total: number, page: number, totalPages: number }}
 */
export function getProducts(options = {}) {
  let result = [...products];

  // Category filter
  if (options.categoryId) {
    result = result.filter((p) => p.categoryId === options.categoryId);
  }

  // Search
  if (options.search) {
    const q = options.search.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(q))) ||
        (p.material && p.material.toLowerCase().includes(q))
    );
  }

  // Price range
  if (options.minPrice != null) {
    result = result.filter((p) => p.price >= options.minPrice);
  }
  if (options.maxPrice != null) {
    result = result.filter((p) => p.price <= options.maxPrice);
  }

  // Material filter
  if (options.material) {
    const mat = options.material.toLowerCase();
    result = result.filter(
      (p) => p.material && p.material.toLowerCase().includes(mat)
    );
  }

  // Colour filter
  if (options.colour) {
    const col = options.colour.toLowerCase();
    result = result.filter(
      (p) =>
        p.colours &&
        p.colours.some((c) => c.name.toLowerCase().includes(col))
    );
  }

  // Availability filter
  if (options.availability) {
    result = result.filter((p) => p.availability === options.availability);
  }

  // Tags filter
  if (options.tags && options.tags.length > 0) {
    result = result.filter(
      (p) => p.tags && options.tags.some((t) => p.tags.includes(t))
    );
  }

  // Sort
  const sortBy = options.sortBy || 'newest';
  switch (sortBy) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      result.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'newest':
    default:
      result.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      break;
  }

  // Pagination
  const page = options.page || 1;
  const limit = options.limit || 12;
  const total = result.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paginatedProducts = result.slice(start, start + limit);

  return { products: paginatedProducts, total, page, totalPages };
}

/**
 * Get a single product by slug.
 */
export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug) || null;
}

/**
 * Get a single product by ID.
 */
export function getProductById(id) {
  return products.find((p) => p.id === id) || null;
}

/**
 * Get products by category.
 */
export function getProductsByCategory(categoryId, limit) {
  let result = products.filter((p) => p.categoryId === categoryId);
  if (limit) result = result.slice(0, limit);
  return result;
}

/**
 * Search products by query.
 */
export function searchProducts(query, limit = 10) {
  if (!query || !query.trim()) return [];
  const q = query.toLowerCase().trim();
  return products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(q))) ||
        (p.material && p.material.toLowerCase().includes(q))
    )
    .slice(0, limit);
}

/**
 * Get featured products.
 */
export function getFeaturedProducts(limit = 8) {
  return products.filter((p) => p.featured).slice(0, limit);
}

/**
 * Get bestsellers.
 */
export function getBestsellerProducts(limit = 8) {
  return products.filter((p) => p.bestseller).slice(0, limit);
}

/**
 * Get new arrivals.
 */
export function getNewArrivalProducts(limit = 8) {
  return products.filter((p) => p.newArrival).slice(0, limit);
}

/**
 * Get related products (same category, excluding current product).
 */
export function getRelatedProducts(productId, limit = 4) {
  const product = getProductById(productId);
  if (!product) return [];
  return products
    .filter((p) => p.categoryId === product.categoryId && p.id !== productId)
    .slice(0, limit);
}

/**
 * Get unique materials from the product catalogue.
 */
export function getAvailableMaterials() {
  const materials = new Set();
  products.forEach((p) => {
    if (p.material) materials.add(p.material);
  });
  return Array.from(materials).sort();
}

/**
 * Get unique colours from the product catalogue.
 */
export function getAvailableColours() {
  const colours = new Map();
  products.forEach((p) => {
    if (p.colours) {
      p.colours.forEach((c) => {
        if (!colours.has(c.name)) {
          colours.set(c.name, c);
        }
      });
    }
  });
  return Array.from(colours.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

/**
 * Get price range across all products.
 */
export function getPriceRange() {
  if (products.length === 0) return { min: 0, max: 0 };
  const prices = products.map((p) => p.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

// ─── Categories ──────────────────────────────────────────────────────

/**
 * Get all categories.
 */
export function getCategories() {
  return categories
    .map((cat) => ({
      ...cat,
      productCount: products.filter((p) => p.categoryId === cat.id).length,
    }))
    .sort((a, b) => a.order - b.order);
}

/**
 * Get a single category by slug.
 */
export function getCategoryBySlug(slug) {
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return null;
  return {
    ...cat,
    productCount: products.filter((p) => p.categoryId === cat.id).length,
  };
}

/**
 * Get featured categories.
 */
export function getFeaturedCategories(limit = 10) {
  return getCategories()
    .filter((c) => c.featured)
    .slice(0, limit);
}

// ─── Collections ─────────────────────────────────────────────────────

/**
 * Get all collections.
 */
export function getCollections() {
  return collections;
}

/**
 * Get a single collection by slug.
 */
export function getCollectionBySlug(slug) {
  return collections.find((c) => c.slug === slug) || null;
}

/**
 * Get the featured collection.
 */
export function getFeaturedCollection() {
  return collections.find((c) => c.featured) || collections[0] || null;
}

/**
 * Get products in a collection.
 */
export function getCollectionProducts(collectionId) {
  const collection = collections.find((c) => c.id === collectionId);
  if (!collection) return [];
  return collection.productIds
    .map((id) => getProductById(id))
    .filter(Boolean);
}
