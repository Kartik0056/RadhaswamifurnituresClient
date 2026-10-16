import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Award } from 'lucide-react';
import ProductCard from '../products/ProductCard';
import { getBestsellerProducts, getNewArrivalProducts } from '../../services/productService';

export default function CuratedTabs() {
  const [activeTab, setActiveTab] = useState('bestsellers');
  const bestsellers = getBestsellerProducts(4);
  const newArrivals = getNewArrivalProducts(4);

  const displayedProducts = activeTab === 'bestsellers' ? bestsellers : newArrivals;

  return (
    <section className="section-padding bg-[var(--color-ivory)]">
      <div className="container-luxury">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] font-semibold">
              Client Favourites & Latest Additions
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[var(--color-espresso)] mt-1">
              Curated Collections
            </h2>
            <div className="w-16 h-0.5 bg-[var(--color-gold)] mt-2" />
          </div>

          {/* Tab Switcher */}
          <div className="inline-flex p-1 bg-[var(--color-sand)]/50 rounded border border-[var(--color-sand)] self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('bestsellers')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'bestsellers'
                  ? 'bg-[var(--color-espresso)] text-[var(--color-ivory)] shadow-sm'
                  : 'text-[var(--color-stone)] hover:text-[var(--color-espresso)]'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-[var(--color-gold)]" />
              Best Sellers
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('newArrivals')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'newArrivals'
                  ? 'bg-[var(--color-espresso)] text-[var(--color-ivory)] shadow-sm'
                  : 'text-[var(--color-stone)] hover:text-[var(--color-espresso)]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--color-gold)]" />
              New Arrivals
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            to={activeTab === 'bestsellers' ? '/shop?tag=bestseller' : '/shop?tag=newArrival'}
            className="btn-secondary text-xs uppercase tracking-wider inline-flex items-center gap-2"
          >
            <span>View All {activeTab === 'bestsellers' ? 'Best Sellers' : 'New Arrivals'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
