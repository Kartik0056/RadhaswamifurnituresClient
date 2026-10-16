import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X, ArrowRight } from 'lucide-react';
import { searchProducts } from '../../services/productService';
import { formatPrice } from '../../utils/helpers';
import { useBodyScrollLock } from '../../hooks/useAccessibility';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(() => {
      const matched = searchProducts(query, 6);
      setResults(matched);
    }, 150);
    return () => clearTimeout(timer);
  }, [query]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleProductClick = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-[var(--color-espresso)]/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Search Container */}
          <div className="relative min-h-screen px-4 pt-16 pb-20 sm:p-0 flex items-start justify-center">
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl mt-12 sm:mt-20 bg-[var(--color-ivory)] rounded-lg shadow-2xl border border-[var(--color-sand)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Input Form */}
              <form
                onSubmit={handleSubmit}
                className="relative flex items-center border-b border-[var(--color-sand)] px-4 py-3"
              >
                <SearchIcon className="w-5 h-5 text-[var(--color-stone)] mr-3 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search furniture by name, material, SKU, or category..."
                  className="w-full bg-transparent text-[var(--color-espresso)] placeholder-[var(--color-stone)] text-base sm:text-lg focus:outline-none font-sans"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="p-1 text-[var(--color-stone)] hover:text-[var(--color-espresso)] mr-2"
                    aria-label="Clear query"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-[var(--color-sand)]/60 text-[var(--color-stone)] hover:text-[var(--color-espresso)] transition-colors"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </form>

              {/* Suggestions / Results */}
              <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 divide-y divide-[var(--color-sand)]/60">
                {query.trim() === '' ? (
                  <div className="py-6 text-center text-sm text-[var(--color-stone)]">
                    <p className="font-serif text-base text-[var(--color-espresso)] mb-1">
                      Search Radha Swami Furnitures
                    </p>
                    <p>Try searching for: “Sheesham”, “Dining Table”, “Chesterfield”, “Teak Bed”, or “Marble”</p>
                  </div>
                ) : results.length > 0 ? (
                  <div>
                    <div className="flex items-center justify-between mb-3 text-xs uppercase tracking-wider text-[var(--color-stone)] font-medium">
                      <span>Matching Pieces ({results.length})</span>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="text-[var(--color-gold)] hover:underline inline-flex items-center gap-1"
                      >
                        View all results <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {results.map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.slug}`}
                          onClick={handleProductClick}
                          className="flex items-center gap-4 p-2.5 rounded-md hover:bg-[var(--color-cream)] transition-colors group"
                        >
                          <img
                            src={product.thumbnail || product.images[0]}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded bg-[var(--color-sand)] flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-serif text-base text-[var(--color-espresso)] group-hover:text-[var(--color-walnut)] transition-colors truncate">
                              {product.name}
                            </h4>
                            <p className="text-xs text-[var(--color-stone)] truncate">
                              {product.material} • SKU: {product.sku}
                            </p>
                            <p className="text-sm font-medium text-[var(--color-espresso)] mt-0.5">
                              {formatPrice(product.price)}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-[var(--color-stone)] group-hover:text-[var(--color-espresso)] group-hover:translate-x-1 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="font-serif text-lg text-[var(--color-espresso)] mb-1">
                      No matching furniture found
                    </p>
                    <p className="text-sm text-[var(--color-stone)] max-w-sm mx-auto">
                      We couldn't find anything matching “{query}”. Try adjusting your spelling or browsing our categories.
                    </p>
                    <Link
                      to="/shop"
                      onClick={onClose}
                      className="inline-block mt-4 text-xs font-semibold uppercase tracking-wider text-[var(--color-espresso)] hover:text-[var(--color-gold)] underline"
                    >
                      Browse All Collections
                    </Link>
                  </div>
                )}
              </div>

              {/* Footer hint */}
              <div className="px-4 py-2.5 bg-[var(--color-cream)]/70 text-right text-[0.7rem] text-[var(--color-stone)] border-t border-[var(--color-sand)] flex items-center justify-between">
                <span>Press <kbd className="px-1.5 py-0.5 bg-white rounded border border-[var(--color-sand)] text-xs">ESC</kbd> to exit</span>
                {query.trim() && (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="font-medium text-[var(--color-espresso)] hover:text-[var(--color-gold)]"
                  >
                    Press <kbd className="px-1.5 py-0.5 bg-white rounded border border-[var(--color-sand)] text-xs">Enter</kbd> to view full results
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
