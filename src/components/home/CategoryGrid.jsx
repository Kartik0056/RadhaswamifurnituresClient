import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { getCategories } from '../../services/productService';

export default function CategoryGrid() {
  const categories = getCategories();

  return (
    <section className="section-padding bg-[var(--color-ivory)]">
      <div className="container-luxury">
        {/* Section Heading */}
        <div className="section-heading">
          <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] font-semibold">
            Curated Spaces
          </span>
          <h2>Explore By Category</h2>
          <div className="section-divider" />
          <p>
            From luxurious master suites to welcoming living areas, discover handcrafted solid wood furniture designed for every corner of your home.
          </p>
        </div>

        {/* Categories Grid (10 categories) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/shop/${category.slug}`}
              className="group relative flex flex-col rounded-md overflow-hidden bg-[var(--color-cream)] border border-[var(--color-sand)] hover:border-[var(--color-walnut)]/40 hover:shadow-lg transition-all duration-300"
            >
              {/* Category Thumbnail */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-sand)]/50">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Arrow indicator */}
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-[var(--color-gold)] transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>

                {/* Overlay text at bottom of image */}
                <div className="absolute inset-x-3 bottom-3 text-white">
                  <h3 className="font-serif text-base sm:text-lg font-medium text-[var(--color-ivory)] group-hover:text-[var(--color-gold-muted)] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-[0.7rem] text-[var(--color-sand)] line-clamp-1 opacity-90 font-light mt-0.5">
                    {category.shortDescription}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
