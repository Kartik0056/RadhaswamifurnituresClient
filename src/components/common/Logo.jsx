import { Link } from 'react-router-dom';
import siteConfig from '../../config/siteConfig';

export default function Logo({ variant = 'default', className = '' }) {
  const { brand } = siteConfig;

  // If an image logo is configured, display it
  if (brand.logoImage) {
    const isLight = variant === 'light';
    const imageSrc = isLight ? (brand.logoImageLight || brand.logoImage) : brand.logoImage;

    return (
      <Link
        to="/"
        className={`inline-flex items-center focus-visible:outline-none transition-transform duration-200 hover:scale-[1.02] ${className}`}
        aria-label={`${brand.name} - Home`}
      >
        <img
          src={imageSrc}
          alt={brand.name}
          className="h-10 sm:h-11 md:h-12 w-auto object-contain drop-shadow-sm"
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
        className={`font-serif tracking-[0.15em] uppercase transition-colors duration-300 font-medium text-base sm:text-lg lg:text-xl whitespace-nowrap ${
          isLight
            ? 'text-[var(--color-ivory)] group-hover:text-[var(--color-gold-muted)]'
            : 'text-[var(--color-espresso)] group-hover:text-[var(--color-walnut)]'
        }`}
      >
        {brand.primaryText || 'RADHA SWAMI'}
      </span>
      <span
        className={`text-[0.55rem] sm:text-[0.62rem] font-sans font-medium uppercase tracking-[0.34em] transition-colors duration-300 -mt-0.5 whitespace-nowrap ${
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
