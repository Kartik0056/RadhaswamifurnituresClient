import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getFeaturedCollection } from '../../services/productService';

export default function FeaturedCollectionBanner() {
  const collection = getFeaturedCollection();
  if (!collection) return null;

  return (
    <section className="relative w-full py-24 sm:py-32 bg-[var(--color-espresso)] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={collection.image}
          alt={collection.name}
          className="w-full h-full object-cover object-center filter brightness-[0.65] contrast-[1.05]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      <div className="relative container-luxury z-10 text-white">
        <div className="max-w-xl space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-gold-muted)] font-semibold">
            Curated Showcase
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[var(--color-ivory)] leading-tight">
            {collection.name}
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-sand)]/90 font-light leading-relaxed">
            {collection.description}
          </p>
          <div className="pt-4">
            <Link
              to="/shop"
              className="btn-gold text-xs uppercase tracking-wider inline-flex items-center gap-2 group"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
