import { Star, Quote, Info } from 'lucide-react';
import siteConfig from '../../config/siteConfig';

export default function Testimonials() {
  const { testimonials } = siteConfig;
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="section-padding bg-[var(--color-cream)]/70 border-y border-[var(--color-sand)]">
      <div className="container-luxury">
        <div className="section-heading">
          <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] font-semibold">
            Client Impressions
          </span>
          <h2>Words From Our Patrons</h2>
          <div className="section-divider" />
          <p>
            Read sample feedback reflecting our commitment to solid wood joinery, personalized consultations, and exceptional living room creations.
          </p>

          {/* Sample Data Disclosure */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--color-sand)]/60 rounded text-[0.68rem] text-[var(--color-stone)] mt-3">
            <Info className="w-3.5 h-3.5 text-[var(--color-gold)]" />
            <span>Sample Client Testimonials (Demonstration Showcase)</span>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="relative p-6 sm:p-8 bg-[var(--color-ivory)] rounded-lg border border-[var(--color-sand)] shadow-sm flex flex-col justify-between"
            >
              <Quote className="w-8 h-8 text-[var(--color-gold-muted)]/40 mb-3" />

              <p className="font-serif italic text-sm sm:text-base text-[var(--color-espresso)] leading-relaxed mb-6">
                “{item.text}”
              </p>

              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < item.rating
                          ? 'text-[var(--color-gold)] fill-[var(--color-gold)]'
                          : 'text-[var(--color-sand)]'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-[var(--color-espresso)] font-serif">
                      {item.name}
                    </p>
                    <p className="text-[var(--color-stone)]">{item.location}</p>
                  </div>
                  <span className="text-[0.65rem] text-[var(--color-stone)] uppercase tracking-wider bg-[var(--color-cream)] px-2 py-0.5 rounded">
                    Demo Review
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
