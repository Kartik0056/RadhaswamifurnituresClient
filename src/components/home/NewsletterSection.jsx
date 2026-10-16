import { useState } from 'react';
import { Mail, Info } from 'lucide-react';
import siteConfig from '../../config/siteConfig';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [notice, setNotice] = useState('');

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setNotice(
      'Note: Email subscription service is currently being configured for Radha Swami Furnitures. For instant updates, please visit our showroom or contact us directly on WhatsApp.'
    );
  };

  return (
    <section className="py-16 sm:py-20 bg-[var(--color-ivory)] border-b border-[var(--color-sand)]">
      <div className="container-luxury max-w-4xl text-center">
        <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] font-semibold">
          Stay Connected
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[var(--color-espresso)] mt-2">
          Design Notes & New Arrivals
        </h2>
        <div className="section-divider" />
        <p className="text-sm text-[var(--color-stone)] max-w-lg mx-auto mb-6">
          Be the first to view our seasonal furniture releases, bespoke woodwork highlights, and showroom event invitations.
        </p>

        {/* Form with honest disclosure */}
        <form onSubmit={handleDemoSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Mail className="w-4 h-4 text-[var(--color-stone)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full pl-10 pr-4 py-3 bg-white rounded border border-[var(--color-sand)] text-sm text-[var(--color-espresso)] focus:outline-none focus:border-[var(--color-gold)]"
            />
          </div>
          <button
            type="submit"
            className="btn-primary text-xs uppercase tracking-wider py-3 px-6 whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>

        {notice ? (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs flex items-center justify-center gap-2 max-w-lg mx-auto">
            <Info className="w-4 h-4 flex-shrink-0 text-amber-700" />
            <span>{notice}</span>
          </div>
        ) : (
          <p className="text-[0.68rem] text-[var(--color-stone)] mt-3">
            Service preview mode. We respect your privacy. No unsolicited correspondence.
          </p>
        )}
      </div>
    </section>
  );
}
