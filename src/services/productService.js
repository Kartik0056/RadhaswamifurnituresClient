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

import defaultProducts from '../data/products';
import categories from '../data/categories';
import collections from '../data/collections';
import apiClient from './apiClient';

const CATALOG_STORAGE_KEY = 'rsf_catalog_products';

function getActiveProducts() {
  try {
    const stored = localStorage.getItem(CATALOG_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(defaultProducts));
      return defaultProducts;
    }
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultProducts;
  } catch (err) {
    console.warn('Failed to parse catalog products from storage', err);
    return defaultProducts;
  }
}

function saveActiveProducts(prods) {
  try {
    localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(prods));
  } catch (err) {
    console.error('Failed to save catalog products to storage', err);
  }
}

// ─── Products ────────────────────────────────────────────────────────

/**
 * Get all products, optionally filtered & sorted.
 * @param {Object} options
 * @returns {{ products: Array, total: number, page: number, totalPages: number }}
 */
export function getProducts(options = {}) {
  let result = [...getActiveProducts()];

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
  const products = getActiveProducts();
  return products.find((p) => p.slug === slug) || null;
}

/**
 * Get a single product by ID.
 */
export function getProductById(id) {
  const products = getActiveProducts();
  return products.find((p) => p.id === id || p._id === id) || null;
}

/**
 * Get products by category.
 */
export function getProductsByCategory(categoryId, limit) {
  const products = getActiveProducts();
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
  const products = getActiveProducts();
  return products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku?.toLowerCase().includes(q) ||
        p.shortDescription?.toLowerCase().includes(q) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(q))) ||
        (p.material && p.material.toLowerCase().includes(q))
    )
    .slice(0, limit);
}

/**
 * Get featured products.
 */
export function getFeaturedProducts(limit = 8) {
  const products = getActiveProducts();
  return products.filter((p) => p.featured).slice(0, limit);
}

/**
 * Get bestsellers.
 */
export function getBestsellerProducts(limit = 8) {
  const products = getActiveProducts();
  return products.filter((p) => p.bestseller).slice(0, limit);
}

/**
 * Get new arrivals.
 */
export function getNewArrivalProducts(limit = 8) {
  const products = getActiveProducts();
  return products.filter((p) => p.newArrival).slice(0, limit);
}

/**
 * Get related products (same category, excluding current product).
 */
export function getRelatedProducts(productId, limit = 4) {
  const product = getProductById(productId);
  if (!product) return [];
  const products = getActiveProducts();
  return products
    .filter((p) => p.categoryId === product.categoryId && (p.id !== productId && p._id !== productId))
    .slice(0, limit);
}

/**
 * Get unique materials from the product catalogue.
 */
export function getAvailableMaterials() {
  const materials = new Set();
  const products = getActiveProducts();
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
  const products = getActiveProducts();
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

// ─── Dynamic CMS & Admin Integration ──────────────────────────────

/**
 * Add a new product to the catalog.
 * Saves locally in localStorage and attempts API creation if live API is enabled.
 */
export async function addProduct(productData) {
  const isLive = apiClient.isLiveApiEnabled();
  const slug =
    productData.slug ||
    productData.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '');

  const newProd = {
    ...productData,
    id: productData.id || `rsf-${Date.now()}`,
    slug,
    priceFormatted: `₹${Number(productData.price || 0).toLocaleString('en-IN')}`,
    createdAt: new Date().toISOString(),
  };

  if (isLive) {
    try {
      await apiClient.post('/products', newProd);
    } catch (err) {
      console.warn('Backend API product create failed, saving locally', err);
    }
  }

  const current = getActiveProducts();
  current.unshift(newProd);
  saveActiveProducts(current);
  return newProd;
}

/**
 * Update an existing product in the catalog.
 */
export async function updateProduct(id, updates) {
  const isLive = apiClient.isLiveApiEnabled();

  if (isLive) {
    try {
      await apiClient.put(`/products/${id}`, updates);
    } catch (err) {
      console.warn('Backend API product update failed, saving locally', err);
    }
  }

  const current = getActiveProducts();
  const index = current.findIndex((p) => p.id === id || p._id === id);
  if (index !== -1) {
    current[index] = {
      ...current[index],
      ...updates,
      ...(updates.price !== undefined
        ? { priceFormatted: `₹${Number(updates.price).toLocaleString('en-IN')}` }
        : {}),
      updatedAt: new Date().toISOString(),
    };
    saveActiveProducts(current);
    return current[index];
  }
  return null;
}

/**
 * Delete a product from the catalog.
 */
export async function deleteProduct(id) {
  const isLive = apiClient.isLiveApiEnabled();

  if (isLive) {
    try {
      await apiClient.delete(`/products/${id}`);
    } catch (err) {
      console.warn('Backend API product delete failed, updating locally', err);
    }
  }

  const current = getActiveProducts().filter((p) => p.id !== id && p._id !== id);
  saveActiveProducts(current);
  return true;
}

/**
 * Reset catalog back to original default showroom collection.
 */
export function resetCatalog() {
  localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(defaultProducts));
  return defaultProducts;
}

/**
 * Fetch products directly from backend REST API if online.
 */
export async function fetchProductsFromApi(params = {}) {
  try {
    const res = await apiClient.get('/products', params);
    if (Array.isArray(res)) return res;
    if (res?.data && Array.isArray(res.data)) return res.data;
    return [];
  } catch (err) {
    console.error('fetchProductsFromApi error:', err);
    throw err;
  }
}
