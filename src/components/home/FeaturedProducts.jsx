import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../products/ProductCard';
import { getFeaturedProducts } from '../../services/productService';

export default function FeaturedProducts() {
  const featured = getFeaturedProducts(8);

  return (
    <section className="section-padding bg-[var(--color-cream)]/50 border-y border-[var(--color-sand)]/60">
      <div className="container-luxury">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] font-semibold">
              Signature Pieces
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[var(--color-espresso)] mt-1">
              Featured Creations
            </h2>
            <div className="w-16 h-0.5 bg-[var(--color-gold)] mt-2" />
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[var(--color-espresso)] hover:text-[var(--color-gold)] transition-colors group"
          >
            <span>Explore Entire Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
