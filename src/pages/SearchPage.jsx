import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, X, PackageX, ChevronRight } from 'lucide-react';
import SEO from '../components/common/SEO';
import ProductCard from '../components/products/ProductCard';
import { searchProducts } from '../services/productService';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [results, setResults] = useState([]);

  useEffect(() => {
    setSearchTerm(queryParam);
    if (queryParam.trim()) {
      const found = searchProducts(queryParam, 50);
      setResults(found);
    } else {
      setResults([]);
    }
  }, [queryParam]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setSearchParams({});
  };

  return (
    <div className="w-full bg-[var(--color-ivory)] min-h-[75vh]">
      <SEO
        title={queryParam ? `Search: “${queryParam}”` : 'Search Furniture Catalog'}
        description={`Search handcrafted solid wood furniture by Radha Swami Furnitures.`}
        canonical="/search"
      />

      {/* Header */}
      <div className="bg-[var(--color-cream)] border-b border-[var(--color-sand)] py-10 sm:py-14">
        <div className="container-luxury max-w-3xl text-center space-y-4">
          <nav className="flex items-center justify-center gap-1.5 text-xs text-[var(--color-stone)] mb-2">
            <Link to="/" className="hover:text-[var(--color-espresso)]">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[var(--color-taupe)]" />
            <Link to="/shop" className="hover:text-[var(--color-espresso)]">
              Shop
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[var(--color-taupe)]" />
            <span className="font-semibold text-[var(--color-espresso)]">Search</span>
          </nav>

          <h1 className="font-serif text-3xl sm:text-4xl text-[var(--color-espresso)]">
            Search Furniture
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-stone)]">
            Search by piece name, wood species (Sheesham, Teak, Mango), category, or SKU.
          </p>

          {/* Search Bar Input */}
          <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto pt-2">
            <SearchIcon className="w-5 h-5 text-[var(--color-stone)] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search e.g. King Bed, Chesterfield, Live-Edge Dining..."
              className="w-full pl-12 pr-24 py-3.5 bg-white rounded border border-[var(--color-sand)] text-sm text-[var(--color-espresso)] focus:outline-none focus:border-[var(--color-gold)] shadow-sm"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-20 top-1/2 -translate-y-1/2 text-[var(--color-stone)] hover:text-[var(--color-espresso)] p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[var(--color-espresso)] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-[var(--color-walnut)] transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Results Section */}
      <div className="container-luxury py-12">
        {queryParam ? (
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--color-sand)]">
              <p className="text-xs sm:text-sm text-[var(--color-stone)]">
                Showing{' '}
                <strong className="text-[var(--color-espresso)]">{results.length}</strong>{' '}
                results for “<span className="text-[var(--color-espresso)] font-semibold">{queryParam}</span>”
              </p>
              {results.length > 0 && (
                <Link
                  to="/shop"
                  className="text-xs font-semibold text-[var(--color-gold)] hover:underline uppercase tracking-wider"
                >
                  View All Furniture →
                </Link>
              )}
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {results.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-4 bg-[var(--color-cream)]/40 rounded-lg border border-[var(--color-sand)] max-w-lg mx-auto">
                <PackageX className="w-12 h-12 text-[var(--color-stone)] mx-auto mb-3" />
                <h3 className="font-serif text-xl text-[var(--color-espresso)] mb-2">
                  No products matched your search
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-stone)] mb-6">
                  Check your spelling or try searching for generic categories like “Beds”, “Sofas”, “Dining Tables”, or “Coffee Tables”.
                </p>
                <Link to="/shop" className="btn-primary text-xs uppercase tracking-wider">
                  Browse All Collections
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 max-w-md mx-auto">
            <h3 className="font-serif text-xl text-[var(--color-espresso)] mb-2">
              Popular Searches
            </h3>
            <div className="flex flex-wrap gap-2 justify-center pt-3">
              {[
                'Sheesham',
                'King Bed',
                'Chesterfield',
                'Dining Table',
                'Marble Coffee Table',
                'Teak Wood',
                'Wardrobe',
                'Bar Cabinet',
              ].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setSearchParams({ q: term })}
                  className="px-3 py-1.5 rounded bg-[var(--color-cream)] hover:bg-[var(--color-sand)] border border-[var(--color-sand)] text-xs text-[var(--color-espresso)] font-medium transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
