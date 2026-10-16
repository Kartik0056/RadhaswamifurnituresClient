import { Link } from 'react-router-dom';
import { ArrowRight, Hammer, Sparkles, ShieldCheck } from 'lucide-react';
import siteConfig from '../../config/siteConfig';

export default function BrandIntroduction() {
  return (
    <section className="section-padding bg-[var(--color-ivory)] overflow-hidden">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Lifestyle Visuals */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-lg overflow-hidden shadow-xl aspect-[4/5] bg-[var(--color-cream)]">
              <img
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1000&q=80"
                alt="Radha Swami Furnitures artisan living room interior"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Overlapping Callout Card */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-[var(--color-cream)] border border-[var(--color-sand)] p-6 rounded-md shadow-lg max-w-xs z-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-full bg-[var(--color-espresso)] text-[var(--color-gold)] flex items-center justify-center">
                  <Hammer className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-serif text-sm font-semibold text-[var(--color-espresso)]">
                    Solid Hardwood
                  </p>
                  <p className="text-[0.7rem] text-[var(--color-stone)]">
                    Sheesham • Teak • Mango
                  </p>
                </div>
              </div>
              <p className="text-xs text-[var(--color-stone)] leading-relaxed">
                Every joint, bevel, and surface is hand-finished by dedicated craftsmen.
              </p>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] font-semibold">
                The Radha Swami Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--color-espresso)] mt-2 leading-tight">
                Furniture That Makes a House Feel Like Home
              </h2>
              <div className="w-16 h-0.5 bg-[var(--color-gold)] mt-3" />
            </div>

            <p className="text-base text-[var(--color-stone)] leading-relaxed">
              At {siteConfig.brand.name}, we believe that fine furniture is not just an aesthetic addition to an interior — it is the quiet foundation of your daily memories. From morning coffee shared over a solid Sheesham table to quiet evenings in an ergonomically tufted armchair, every piece is thoughtfully engineered for enduring comfort and grace.
            </p>

            <p className="text-sm text-[var(--color-stone)] leading-relaxed">
              We blend traditional joinery techniques with clean contemporary silhouettes. We choose solid natural woods for their unique grain patterns, warmth, and resilience, ensuring that what you welcome into your home today becomes an heirloom for tomorrow.
            </p>

            {/* Value Highlights */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[var(--color-sand)]">
              <div>
                <h4 className="font-serif text-sm font-semibold text-[var(--color-espresso)] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[var(--color-gold)]" />
                  Custom Finishing
                </h4>
                <p className="text-xs text-[var(--color-stone)] mt-1">
                  Tailored wood stains and upholstery fabrics to match your home interior palette.
                </p>
              </div>

              <div>
                <h4 className="font-serif text-sm font-semibold text-[var(--color-espresso)] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[var(--color-gold)]" />
                  Material Integrity
                </h4>
                <p className="text-xs text-[var(--color-stone)] mt-1">
                  Carefully seasoned timber to resist warping, paired with durable hardware.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link to="/about" className="btn-primary text-xs tracking-wider uppercase">
                <span>Discover Our Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link to="/contact" className="btn-secondary text-xs tracking-wider uppercase">
                <span>Showroom & Enquiries</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
