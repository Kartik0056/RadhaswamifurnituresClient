import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import siteConfig from '../../config/siteConfig';

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  const { announcement } = siteConfig;

  if (!announcement?.enabled || dismissed) return null;

  return (
    <div className="bg-[var(--color-espresso)] text-[var(--color-cream)] text-xs py-2 px-4 relative z-50 border-b border-[var(--color-walnut)]/40">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center gap-2 pr-6 sm:pr-0">
        <span className="font-light tracking-wide">
          {announcement.text}
        </span>
        {announcement.link && announcement.linkText && (
          <Link
            to={announcement.link}
            className="inline-flex items-center gap-1 font-medium text-[var(--color-gold)] hover:text-[var(--color-gold-muted)] underline underline-offset-2 transition-colors ml-1"
          >
            {announcement.linkText}
            <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-sand)] hover:text-white transition-colors p-1"
        aria-label="Dismiss announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
