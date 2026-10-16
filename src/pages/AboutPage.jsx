import { Link } from 'react-router-dom';
import { ArrowRight, Hammer, Leaf, Sparkles, HeartHandshake, CheckCircle2 } from 'lucide-react';
import SEO from '../components/common/SEO';
import siteConfig from '../config/siteConfig';

export default function AboutPage() {
  const values = [
    {
      icon: Hammer,
      title: 'Artisanal Integrity',
      desc: 'We uphold traditional woodworking joinery — mortise and tenon, hand-turned legs, and dovetail joints built to withstand decades of family life.',
    },
    {
      icon: Leaf,
      title: 'Conscious Material Sourcing',
      desc: 'We select seasoned solid hardwoods including Sheesham, Teak, and Mango Wood from ethical timber suppliers with sustainable forest stewardship.',
    },
    {
      icon: Sparkles,
      title: 'Warm Editorial Aesthetics',
      desc: 'Our designs reflect contemporary international sophistication while honouring the organic warmth, rich grain, and soul of natural timber.',
    },
    {
      icon: HeartHandshake,
      title: 'Dedicated Consultation',
      desc: 'Every home is unique. We work closely with homeowners and interior designers to recommend exact dimensions, fabrics, and custom finishes.',
    },
  ];

  return (
    <div className="w-full bg-[var(--color-ivory)]">
      <SEO
        title="About Our Craft — Radha Swami Furnitures"
        description="Discover the story, craftsmanship philosophy, and solid hardwood heritage behind Radha Swami Furnitures."
        canonical="/about"
      />

      {/* Hero Header */}
      <section className="relative py-20 sm:py-28 bg-[var(--color-espresso)] text-[var(--color-ivory)] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container-luxury text-center max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-gold-muted)] font-semibold">
            Our Heritage & Philosophy
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[var(--color-ivory)] font-medium leading-tight">
            Furniture That Makes a House Feel Like Home
          </h1>
          <p className="text-sm sm:text-base text-[var(--color-sand)] font-light max-w-xl mx-auto leading-relaxed pt-2">
            The story of {siteConfig.brand.name} is shaped by passion for raw timber, time-honoured woodworking, and the belief that everyday living deserves beauty.
          </p>
        </div>
      </section>

      {/* Brand Story Editorial Section */}
      <section id="our-story" className="section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] font-semibold">
                Our Genesis
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-espresso)] leading-tight">
                Rooted in Craftsmanship, Designed for Living
              </h2>
              <div className="w-16 h-0.5 bg-[var(--color-gold)]" />

              <p className="text-sm sm:text-base text-[var(--color-stone)] leading-relaxed">
                {siteConfig.brand.name} was born out of a simple observation: modern mass-manufactured furniture too often prioritises disposable speed over enduring soul. We envisioned a different path — one where every bed, dining table, and wardrobe is crafted with the patience and reverence of traditional master artisans.
              </p>

              <p className="text-sm text-[var(--color-stone)] leading-relaxed">
                Working with solid Sheesham (Indian Rosewood), Teak, and Mango Wood, our workshop transforms raw timber into sculptural centerpieces. We celebrate natural knots, flowing grain patterns, and warm honey undertones rather than hiding them under artificial synthetic veneers.
              </p>

              <div className="pt-2">
                <Link to="/shop" className="btn-primary text-xs uppercase tracking-wider">
                  <span>Explore Our Creations</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&q=80"
                  alt="Living room sofa craftsmanship"
                  className="rounded-lg shadow-md aspect-[4/5] object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=700&q=80"
                  alt="Cane accent chair"
                  className="rounded-lg shadow-md aspect-square object-cover"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1617806118233-18e1de247200?w=700&q=80"
                  alt="Solid Sheesham dining table"
                  className="rounded-lg shadow-md aspect-square object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=700&q=80"
                  alt="Bedroom suite"
                  className="rounded-lg shadow-md aspect-[4/5] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Materials & Craftsmanship Section */}
      <section id="craftsmanship" className="section-padding bg-[var(--color-cream)]/70 border-y border-[var(--color-sand)]">
        <div className="container-luxury">
          <div className="section-heading">
            <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] font-semibold">
              Material Transparency
            </span>
            <h2>Timber, Joinery & Finishes</h2>
            <div className="section-divider" />
            <p>
              We believe true luxury comes from an uncompromising respect for natural raw materials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-[var(--color-ivory)] rounded-lg border border-[var(--color-sand)] space-y-4">
              <div className="w-10 h-10 rounded-full bg-[var(--color-espresso)] text-[var(--color-gold)] flex items-center justify-center font-serif text-lg font-bold">
                01
              </div>
              <h3 className="font-serif text-xl text-[var(--color-espresso)] font-semibold">
                Sheesham (Indian Rosewood)
              </h3>
              <p className="text-xs text-[var(--color-stone)] leading-relaxed">
                Celebrated for its contrasting dark and golden grains, high tensile density, and exceptional durability against wear. Ideal for heavy dining tables and structural bed frames.
              </p>
            </div>

            <div className="p-8 bg-[var(--color-ivory)] rounded-lg border border-[var(--color-sand)] space-y-4">
              <div className="w-10 h-10 rounded-full bg-[var(--color-espresso)] text-[var(--color-gold)] flex items-center justify-center font-serif text-lg font-bold">
                02
              </div>
              <h3 className="font-serif text-xl text-[var(--color-espresso)] font-semibold">
                Solid Seasoned Teak
              </h3>
              <p className="text-xs text-[var(--color-stone)] leading-relaxed">
                Rich in natural protective oils that resist moisture, pests, and climatic expansion. Its subtle honey hue ages into a stunning warm patina over decades.
              </p>
            </div>

            <div className="p-8 bg-[var(--color-ivory)] rounded-lg border border-[var(--color-sand)] space-y-4">
              <div className="w-10 h-10 rounded-full bg-[var(--color-espresso)] text-[var(--color-gold)] flex items-center justify-center font-serif text-lg font-bold">
                03
              </div>
              <h3 className="font-serif text-xl text-[var(--color-espresso)] font-semibold">
                Mango Wood & Natural Cane
              </h3>
              <p className="text-xs text-[var(--color-stone)] leading-relaxed">
                A sustainable fast-growing hardwood with unique multi-tonal streaks, paired with hand-woven rattan cane panels for airy tropical modernism.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="section-heading">
            <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] font-semibold">
              What Guides Us
            </span>
            <h2>Our Core Values</h2>
            <div className="section-divider" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="p-6 bg-[var(--color-cream)]/50 rounded-lg border border-[var(--color-sand)] space-y-3"
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--color-espresso)] text-[var(--color-gold)] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-lg text-[var(--color-espresso)] font-semibold">
                    {v.title}
                  </h4>
                  <p className="text-xs text-[var(--color-stone)] leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-16 bg-[var(--color-espresso)] text-white text-center">
        <div className="container-luxury max-w-2xl space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl text-[var(--color-ivory)]">
            Experience Our Craftsmanship In Person
          </h3>
          <p className="text-xs sm:text-sm text-[var(--color-sand)] font-light leading-relaxed">
            Visit our showroom or connect with our team on WhatsApp to discuss bespoke dimensions and curated sets for your home.
          </p>
          <div className="pt-2 flex items-center justify-center gap-4">
            <Link to="/contact" className="btn-gold text-xs uppercase tracking-wider">
              Visit Showroom
            </Link>
            <Link
              to="/shop"
              className="text-xs uppercase tracking-wider text-[var(--color-ivory)] underline underline-offset-4 hover:text-[var(--color-gold)]"
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
