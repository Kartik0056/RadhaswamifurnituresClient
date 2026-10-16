import { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  Search,
  RotateCcw,
  PackageX,
  ChevronRight,
  Filter,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import ProductCard from '../components/products/ProductCard';
import {
  getProducts,
  getCategories,
  getCategoryBySlug,
  getAvailableMaterials,
  getAvailableColours,
} from '../services/productService';
import siteConfig from '../config/siteConfig';
import { useBodyScrollLock } from '../hooks/useAccessibility';

export default function ShopPage() {
  const { categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useBodyScrollLock(mobileFilterOpen);

  // Read URL query parameters
  const currentCategory = categorySlug ? getCategoryBySlug(categorySlug) : null;
  const currentCategoryId = currentCategory?.id || searchParams.get('category') || '';
  const searchQuery = searchParams.get('q') || '';
  const currentSort = searchParams.get('sort') || 'newest';
  const currentMaterial = searchParams.get('material') || '';
  const currentColours = searchParams.get('colour') || '';
  const currentAvailability = searchParams.get('availability') || '';
  const currentTag = searchParams.get('tag') || '';
  const minPriceParam = searchParams.get('minPrice');
  const maxPriceParam = searchParams.get('maxPrice');
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const categories = getCategories();
  const materials = getAvailableMaterials();
  const colours = getAvailableColours();

  // Helper to update query params
  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.delete('page'); // Reset page on filter change
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    const newParams = new URLSearchParams();
    if (categorySlug) {
      // Stay in current category route
    }
    setSearchParams(newParams);
  };

  const hasActiveFilters = Boolean(
    searchQuery ||
    currentMaterial ||
    currentColours ||
    currentAvailability ||
    currentTag ||
    minPriceParam ||
    maxPriceParam ||
    (!categorySlug && currentCategoryId)
  );

  // Fetch filtered products
  const { products, total, totalPages } = useMemo(() => {
    return getProducts({
      categoryId: currentCategoryId || undefined,
      search: searchQuery || undefined,
      sortBy: currentSort,
      material: currentMaterial || undefined,
      colour: currentColours || undefined,
      availability: currentAvailability || undefined,
      tags: currentTag ? [currentTag] : undefined,
      minPrice: minPriceParam ? parseInt(minPriceParam, 10) : undefined,
      maxPrice: maxPriceParam ? parseInt(maxPriceParam, 10) : undefined,
      page: currentPage,
      limit: 12,
    });
  }, [
    currentCategoryId,
    searchQuery,
    currentSort,
    currentMaterial,
    currentColours,
    currentAvailability,
    currentTag,
    minPriceParam,
    maxPriceParam,
    currentPage,
  ]);

  // Page title & description
  const pageTitle = currentCategory
    ? `${currentCategory.name} — Luxury Handcrafted Collection`
    : currentTag === 'bestseller'
    ? 'Best Selling Furniture'
    : currentTag === 'newArrival'
    ? 'New Furniture Arrivals'
    : searchQuery
    ? `Search Results for “${searchQuery}”`
    : 'Shop Handcrafted Furniture Collection';

  const pageDescription = currentCategory
    ? currentCategory.description
    : `Explore all solid wood furniture from ${siteConfig.brand.name}. Handcrafted beds, sofas, dining tables, wardrobes, and accent pieces.`;

  // Breadcrumbs
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Shop', url: '/shop' },
  ];
  if (currentCategory) {
    breadcrumbs.push({
      name: currentCategory.name,
      url: `/shop/${currentCategory.slug}`,
    });
  }

  // Filter Sidebar UI
  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category List */}
      <div>
        <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[var(--color-espresso)] mb-3">
          Categories
        </h4>
        <ul className="space-y-1.5 text-xs">
          <li>
            <Link
              to="/shop"
              className={`block py-1 hover:text-[var(--color-gold)] transition-colors ${
                !currentCategoryId && !categorySlug
                  ? 'font-bold text-[var(--color-espresso)] underline'
                  : 'text-[var(--color-stone)]'
              }`}
            >
              All Categories ({categories.reduce((acc, c) => acc + c.productCount, 0)})
            </Link>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link
                to={`/shop/${cat.slug}`}
                className={`flex items-center justify-between py-1 hover:text-[var(--color-gold)] transition-colors ${
                  categorySlug === cat.slug || currentCategoryId === cat.id
                    ? 'font-bold text-[var(--color-espresso)] underline'
                    : 'text-[var(--color-stone)]'
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-[0.7rem] text-[var(--color-taupe)]">
                  {cat.productCount}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Material Filter */}
      <div className="border-t border-[var(--color-sand)] pt-5">
        <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[var(--color-espresso)] mb-3">
          Material & Wood
        </h4>
        <div className="space-y-1.5 text-xs">
          <button
            type="button"
            onClick={() => updateParam('material', '')}
            className={`block text-left w-full py-0.5 ${
              !currentMaterial
                ? 'font-semibold text-[var(--color-espresso)]'
                : 'text-[var(--color-stone)] hover:text-[var(--color-espresso)]'
            }`}
          >
            All Materials
          </button>
          {materials.map((mat) => (
            <button
              key={mat}
              type="button"
              onClick={() => updateParam('material', currentMaterial === mat ? '' : mat)}
              className={`block text-left w-full py-0.5 truncate ${
                currentMaterial === mat
                  ? 'font-semibold text-[var(--color-espresso)] text-[var(--color-gold)]'
                  : 'text-[var(--color-stone)] hover:text-[var(--color-espresso)]'
              }`}
            >
              {mat}
            </button>
          ))}
        </div>
      </div>

      {/* Availability Filter */}
      <div className="border-t border-[var(--color-sand)] pt-5">
        <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[var(--color-espresso)] mb-3">
          Availability
        </h4>
        <div className="space-y-1.5 text-xs">
          {[
            { label: 'All Statuses', value: '' },
            { label: 'In Stock', value: 'in-stock' },
            { label: 'Made to Order', value: 'made-to-order' },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => updateParam('availability', item.value)}
              className={`block text-left w-full py-0.5 ${
                currentAvailability === item.value
                  ? 'font-semibold text-[var(--color-espresso)]'
                  : 'text-[var(--color-stone)] hover:text-[var(--color-espresso)]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Special Highlights Filter */}
      <div className="border-t border-[var(--color-sand)] pt-5">
        <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[var(--color-espresso)] mb-3">
          Highlights
        </h4>
        <div className="space-y-1.5 text-xs">
          <button
            type="button"
            onClick={() => updateParam('tag', currentTag === 'newArrival' ? '' : 'newArrival')}
            className={`block text-left w-full py-0.5 ${
              currentTag === 'newArrival'
                ? 'font-semibold text-[var(--color-gold)]'
                : 'text-[var(--color-stone)] hover:text-[var(--color-espresso)]'
            }`}
          >
            ✨ New Arrivals
          </button>
          <button
            type="button"
            onClick={() => updateParam('tag', currentTag === 'bestseller' ? '' : 'bestseller')}
            className={`block text-left w-full py-0.5 ${
              currentTag === 'bestseller'
                ? 'font-semibold text-[var(--color-gold)]'
                : 'text-[var(--color-stone)] hover:text-[var(--color-espresso)]'
            }`}
          >
            ⭐ Best Sellers
          </button>
        </div>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <div className="border-t border-[var(--color-sand)] pt-5">
          <button
            type="button"
            onClick={clearAllFilters}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs uppercase tracking-wider font-semibold text-[var(--color-espresso)] bg-[var(--color-sand)]/60 hover:bg-[var(--color-sand)] rounded transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full bg-[var(--color-ivory)]">
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonical={categorySlug ? `/shop/${categorySlug}` : '/shop'}
        breadcrumbs={breadcrumbs}
      />

      {/* Header Banner */}
      <div className="bg-[var(--color-cream)] border-b border-[var(--color-sand)] py-10 sm:py-14">
        <div className="container-luxury">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-[var(--color-stone)] mb-3">
            <Link to="/" className="hover:text-[var(--color-espresso)]">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[var(--color-taupe)]" />
            <Link to="/shop" className="hover:text-[var(--color-espresso)]">
              Shop All
            </Link>
            {currentCategory && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-[var(--color-taupe)]" />
                <span className="font-semibold text-[var(--color-espresso)]">
                  {currentCategory.name}
                </span>
              </>
            )}
          </nav>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--color-espresso)]">
            {currentCategory?.name || 'Handcrafted Furniture'}
          </h1>
          <p className="text-sm sm:text-base text-[var(--color-stone)] mt-2 max-w-2xl">
            {pageDescription}
          </p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="border-b border-[var(--color-sand)] bg-[var(--color-ivory)] sticky top-[69px] z-20 backdrop-blur-md bg-[var(--color-ivory)]/95">
        <div className="container-luxury py-3 flex flex-wrap items-center justify-between gap-4">
          {/* Count & Mobile Filter Trigger */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[var(--color-sand)] bg-white text-xs font-semibold uppercase tracking-wider text-[var(--color-espresso)] hover:bg-[var(--color-cream)]"
            >
              <Filter className="w-3.5 h-3.5 text-[var(--color-gold)]" />
              <span>Filters {hasActiveFilters && '•'}</span>
            </button>

            <span className="text-xs text-[var(--color-stone)]">
              Showing <strong className="text-[var(--color-espresso)]">{products.length}</strong> of{' '}
              <strong className="text-[var(--color-espresso)]">{total}</strong> furniture pieces
            </span>
          </div>

          {/* Active filter badges */}
          <div className="hidden md:flex items-center gap-2 flex-wrap text-xs">
            {currentMaterial && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[var(--color-sand)]/60 text-[var(--color-espresso)] rounded text-[0.72rem]">
                Material: {currentMaterial}
                <button
                  type="button"
                  onClick={() => updateParam('material', '')}
                  className="hover:text-red-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {currentAvailability && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[var(--color-sand)]/60 text-[var(--color-espresso)] rounded text-[0.72rem]">
                Status: {currentAvailability}
                <button
                  type="button"
                  onClick={() => updateParam('availability', '')}
                  className="hover:text-red-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs text-[var(--color-gold)] hover:underline ml-2"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[var(--color-stone)] hidden sm:inline">Sort By:</span>
            <select
              value={currentSort}
              onChange={(e) => updateParam('sort', e.target.value)}
              className="px-3 py-1.5 bg-white border border-[var(--color-sand)] rounded text-xs text-[var(--color-espresso)] focus:outline-none focus:border-[var(--color-gold)]"
            >
              <option value="newest">Newest Additions</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Area: Sidebar + Grid */}
      <div className="container-luxury py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-10 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 p-5 rounded-md bg-[var(--color-cream)]/50 border border-[var(--color-sand)] sticky top-36">
            <FilterContent />
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3">
            {products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12 pt-8 border-t border-[var(--color-sand)]">
                    {[...Array(totalPages)].map((_, i) => {
                      const pageNum = i + 1;
                      const isActive = pageNum === currentPage;
                      return (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => updateParam('page', pageNum.toString())}
                          className={`w-9 h-9 rounded text-xs font-semibold flex items-center justify-center transition-colors ${
                            isActive
                              ? 'bg-[var(--color-espresso)] text-[var(--color-ivory)]'
                              : 'bg-white border border-[var(--color-sand)] text-[var(--color-espresso)] hover:bg-[var(--color-cream)]'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="text-center py-16 px-4 bg-[var(--color-cream)]/40 rounded-lg border border-[var(--color-sand)]">
                <PackageX className="w-12 h-12 text-[var(--color-stone)] mx-auto mb-3" />
                <h3 className="font-serif text-xl text-[var(--color-espresso)] mb-2">
                  No furniture pieces match your criteria
                </h3>
                <p className="text-sm text-[var(--color-stone)] max-w-sm mx-auto mb-6">
                  Try clearing some of your filters or searching for alternative wood finishes or categories.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="btn-primary text-xs uppercase tracking-wider inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileFilterOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 right-0 w-full max-w-xs bg-[var(--color-ivory)] shadow-2xl p-6 overflow-y-auto flex flex-col justify-between border-l border-[var(--color-sand)]"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[var(--color-sand)] mb-6">
                  <h3 className="font-serif text-lg text-[var(--color-espresso)] font-semibold">
                    Filter Collection
                  </h3>
                  <button
                    type="button"
                    onClick={() => setMobileFilterOpen(false)}
                    className="p-1 rounded text-[var(--color-stone)] hover:text-[var(--color-espresso)]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FilterContent />
              </div>

              <div className="pt-6 mt-6 border-t border-[var(--color-sand)]">
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full btn-primary text-xs py-3 text-center"
                >
                  View {total} Results
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
