import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function EditorialInspiration() {
  const lookbooks = [
    {
      id: 1,
      title: 'The Calm Living Room',
      subtitle: 'Earth Tones & Solid Wood Harmony',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
      link: '/shop/sofas',
      category: 'Living Room',
      gridSpan: 'md:col-span-8',
    },
    {
      id: 2,
      title: 'The Solitary Reader',
      subtitle: 'Cane Back Seating & Ambient Light',
      image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80',
      link: '/shop/chairs',
      category: 'Accent Seating',
      gridSpan: 'md:col-span-4',
    },
    {
      id: 3,
      title: 'The Intimate Dining Table',
      subtitle: 'Where Meaningful Conversations Happen',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80',
      link: '/shop/dining-tables',
      category: 'Dining',
      gridSpan: 'md:col-span-4',
    },
    {
      id: 4,
      title: 'The Restful Bedroom',
      subtitle: 'Clean Geometric Headboards & Soft Linen',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
      link: '/shop/beds',
      category: 'Bedroom',
      gridSpan: 'md:col-span-8',
    },
  ];

  return (
    <section className="section-padding bg-[var(--color-ivory)]">
      <div className="container-luxury">
        <div className="section-heading">
          <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] font-semibold">
            Interior Inspiration
          </span>
          <h2>Spaces Styled With Intention</h2>
          <div className="section-divider" />
          <p>
            Explore how Radha Swami furniture pieces harmonize within modern interiors to create warm, welcoming environments.
          </p>
        </div>

        {/* Lookbook Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {lookbooks.map((item) => (
            <div
              key={item.id}
              className={`${item.gridSpan} group relative rounded-lg overflow-hidden aspect-[16/10] sm:aspect-[16/9] md:aspect-auto md:min-h-[340px] bg-[var(--color-cream)] border border-[var(--color-sand)]`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white">
                <span className="text-[0.65rem] sm:text-xs uppercase tracking-[0.2em] text-[var(--color-gold-muted)] font-medium">
                  {item.category}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[var(--color-ivory)] mt-1 font-medium group-hover:text-[var(--color-gold-muted)] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-sand)] font-light mt-0.5 max-w-md">
                  {item.subtitle}
                </p>

                <div className="pt-3">
                  <Link
                    to={item.link}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-ivory)] hover:text-[var(--color-gold)] transition-colors"
                  >
                    <span>View Collection</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
