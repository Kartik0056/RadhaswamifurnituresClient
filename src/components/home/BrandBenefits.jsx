import { Hammer, Leaf, Sparkles, ShieldCheck, Truck, Paintbrush } from 'lucide-react';
import siteConfig from '../../config/siteConfig';

const iconMap = {
  Hammer,
  Leaf,
  Sparkles,
  ShieldCheck,
  Truck,
  Paintbrush,
};

export default function BrandBenefits() {
  const { benefits } = siteConfig;
  if (!benefits || benefits.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-[var(--color-cream)] border-y border-[var(--color-sand)]">
      <div className="container-luxury">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon] || Sparkles;
            return (
              <div
                key={index}
                className="flex flex-col items-start p-6 bg-[var(--color-ivory)]/70 rounded border border-[var(--color-sand)]/60 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--color-espresso)] text-[var(--color-gold)] flex items-center justify-center mb-4 shadow-sm">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg text-[var(--color-espresso)] font-semibold mb-2">
                  {benefit.title}
                </h3>
                <p className="text-xs text-[var(--color-stone)] leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
