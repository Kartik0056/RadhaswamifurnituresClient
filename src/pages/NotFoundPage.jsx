import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Compass } from 'lucide-react';
import SEO from '../components/common/SEO';

export default function NotFoundPage() {
  return (
    <div className="container-luxury py-24 sm:py-32 text-center max-w-xl mx-auto space-y-6">
      <SEO
        title="Page Not Found (404) — Radha Swami Furnitures"
        description="The page you requested could not be found."
      />

      <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-gold)] font-semibold">
        Error 404
      </span>

      <h1 className="font-serif text-4xl sm:text-5xl text-[var(--color-espresso)] font-medium">
        Page Not Found
      </h1>

      <div className="section-divider" />

      <p className="text-sm sm:text-base text-[var(--color-stone)] leading-relaxed">
        The architectural page you were searching for does not exist or has been relocated within our catalog.
      </p>

      <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="btn-primary text-xs uppercase tracking-wider inline-flex items-center gap-2"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Return to Homepage</span>
        </Link>
        <Link
          to="/shop"
          className="btn-secondary text-xs uppercase tracking-wider inline-flex items-center gap-2"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Explore All Furniture</span>
        </Link>
      </div>
    </div>
  );
}
