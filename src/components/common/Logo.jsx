import { Link } from 'react-router-dom';
import siteConfig from '../../config/siteConfig';

export default function Logo({ variant = 'default', className = '' }) {
  const { brand } = siteConfig;

  // If an image logo is configured, display it
  if (brand.logoImage) {
    return (
      <Link
        to="/"
        className={`inline-flex items-center focus-visible:outline-none ${className}`}
        aria-label={`${brand.name} - Home`}
      >
        <img
          src={brand.logoImage}
          alt={brand.name}
          className="h-10 md:h-12 w-auto object-contain"
        />
      </Link>
    );
  }

  // Premium Typographic Wordmark
  const isLight = variant === 'light';

  return (
    <Link
      to="/"
      className={`inline-flex flex-col items-start leading-none group focus-visible:outline-none select-none ${className}`}
      aria-label={`${brand.name} - Home`}
    >
      <span
        className={`font-serif tracking-[0.18em] uppercase transition-colors duration-300 font-medium text-lg sm:text-xl md:text-2xl ${
          isLight
            ? 'text-[var(--color-ivory)] group-hover:text-[var(--color-gold-muted)]'
            : 'text-[var(--color-espresso)] group-hover:text-[var(--color-walnut)]'
        }`}
      >
        {brand.primaryText || 'RADHA SWAMI'}
      </span>
      <span
        className={`text-[0.62rem] sm:text-[0.68rem] font-sans font-medium uppercase tracking-[0.38em] transition-colors duration-300 -mt-0.5 sm:-mt-1 ${
          isLight
            ? 'text-[var(--color-gold-muted)]'
            : 'text-[var(--color-gold)]'
        }`}
      >
        {brand.subText || 'FURNITURES'}
      </span>
    </Link>
  );
}
