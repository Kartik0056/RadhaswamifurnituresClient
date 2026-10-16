import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ArrowUpRight } from 'lucide-react';
import { formatPrice, getDiscountPercent, getAvailabilityInfo } from '../../utils/helpers';
import ProductEnquiryModal from './ProductEnquiryModal';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  if (!product) return null;

  const discount = getDiscountPercent(product.originalPrice, product.price);
  const availability = getAvailabilityInfo(product.availability);
  const primaryImage = product.images?.[0] || product.thumbnail;
  const secondaryImage = product.images?.[1] || primaryImage;

  return (
    <>
      <div
        className="group flex flex-col bg-[var(--color-ivory)] rounded-md border border-[var(--color-sand)]/70 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[var(--color-sand)]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container with Badges */}
        <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden bg-[var(--color-cream)]">
          <Link to={`/product/${product.slug}`} className="block w-full h-full">
            <img
              src={isHovered && secondaryImage ? secondaryImage : primaryImage}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          </Link>

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
            {product.newArrival && (
              <span className="badge badge-new shadow-sm">New</span>
            )}
            {product.bestseller && (
              <span className="badge badge-bestseller shadow-sm">Bestseller</span>
            )}
            {discount > 0 && (
              <span className="badge badge-sale shadow-sm">-{discount}%</span>
            )}
            {!product.newArrival && !product.bestseller && product.featured && (
              <span className="badge badge-featured shadow-sm">Featured</span>
            )}
          </div>

          {/* Quick Action Overlay on Hover */}
          <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <Link
              to={`/product/${product.slug}`}
              className="flex-1 py-2 px-3 text-center text-xs font-semibold uppercase tracking-wider bg-[var(--color-ivory)]/95 hover:bg-[var(--color-espresso)] text-[var(--color-espresso)] hover:text-[var(--color-ivory)] rounded-sm shadow-md transition-colors"
            >
              View Details
            </Link>
            <button
              type="button"
              onClick={() => setEnquiryOpen(true)}
              className="p-2 bg-[var(--color-espresso)]/95 hover:bg-[var(--color-walnut)] text-[var(--color-gold)] rounded-sm shadow-md transition-colors"
              title="Enquire About This Product"
              aria-label={`Enquire about ${product.name}`}
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Material & SKU */}
            <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-wider text-[var(--color-stone)] mb-1.5">
              <span className="truncate">{product.material}</span>
              <span className="font-mono text-[0.65rem] text-[var(--color-taupe)]">
                {product.sku}
              </span>
            </div>

            {/* Product Title */}
            <h3 className="font-serif text-base sm:text-lg text-[var(--color-espresso)] group-hover:text-[var(--color-walnut)] transition-colors leading-snug line-clamp-2">
              <Link to={`/product/${product.slug}`}>
                {product.name}
              </Link>
            </h3>

            {/* Short Tagline / Dimensions */}
            {product.dimensions && (
              <p className="text-xs text-[var(--color-stone)] mt-1 truncate">
                {product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height}
              </p>
            )}
          </div>

          {/* Pricing & Footer Actions */}
          <div className="pt-4 mt-3 border-t border-[var(--color-sand)]/60 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-medium text-base sm:text-lg text-[var(--color-espresso)]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-[var(--color-stone)] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Colour swatches if configured */}
            {product.colours && product.colours.length > 0 && (
              <div className="flex items-center gap-1" title={`${product.colours.length} finish options`}>
                {product.colours.map((col, idx) => (
                  <span
                    key={idx}
                    className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block"
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      <ProductEnquiryModal
        product={product}
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
      />
    </>
  );
}
