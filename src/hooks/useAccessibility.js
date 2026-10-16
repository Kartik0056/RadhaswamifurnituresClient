import { useEffect } from 'react';

/**
 * Check for prefers-reduced-motion media query.
 * Returns true when reduced motion is preferred.
 */
export function usePrefersReducedMotion() {
  // Check on the client side only
  if (typeof window === 'undefined') return false;
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  return query.matches;
}

/**
 * Lock body scroll (used for modals, mobile menu).
 */
export function useBodyScrollLock(isLocked) {
  useEffect(() => {
    if (isLocked) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isLocked]);
}
