import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, MapPin } from 'lucide-react';
import siteConfig from '../../config/siteConfig';

export default function ClosingCta() {
  return (
    <section className="relative py-20 sm:py-24 bg-[var(--color-espresso)] text-[var(--color-ivory)] overflow-hidden">
      <div className="absolute inset-0 opacity-15">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative container-luxury text-center max-w-3xl space-y-6">
        <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-gold-muted)] font-semibold">
          Begin Your Furniture Journey
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[var(--color-ivory)] font-medium leading-tight">
          Ready to Elevate Your Living Spaces?
        </h2>

        <p className="text-sm sm:text-base text-[var(--color-sand)]/90 font-light leading-relaxed max-w-xl mx-auto">
          Visit the Radha Swami Furnitures showroom to experience our solid wood finishes, bespoke craftsmanship, and personalized design consultation.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/shop"
            className="btn-gold text-xs sm:text-sm px-7 py-3.5 shadow-lg group inline-flex items-center gap-2"
          >
            <span>Explore All Furniture</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[var(--color-ivory)] border border-[var(--color-sand)]/40 hover:border-white hover:bg-white/10 rounded-sm transition-all"
          >
            <MapPin className="w-4 h-4 text-[var(--color-gold)]" />
            <span>Showroom & Directions</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
