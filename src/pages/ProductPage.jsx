import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  MessageSquare,
  MessageCircle,
  ShieldCheck,
  Truck,
  Sparkles,
  Share2,
  Check,
  Ruler,
  Clock,
  ArrowRight,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import ProductCard from '../components/products/ProductCard';
import ProductEnquiryModal from '../components/products/ProductEnquiryModal';
import {
  getProductBySlug,
  getRelatedProducts,
  getCategoryBySlug,
} from '../services/productService';
import {
  formatPrice,
  getDiscountPercent,
  getAvailabilityInfo,
  buildProductEnquiryMessage,
  generateWhatsAppUrl,
} from '../utils/helpers';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import siteConfig from '../config/siteConfig';

export default function ProductPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColour, setSelectedColour] = useState(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const { recentlyViewed, addProduct } = useRecentlyViewed();

  // Reset image index when slug changes and track recently viewed
  useEffect(() => {
    if (product) {
      setSelectedImageIndex(0);
      if (product.colours && product.colours.length > 0) {
        setSelectedColour(product.colours[0]);
      }
      addProduct(product);
    }
  }, [slug, product, addProduct]);

  if (!product) {
    return (
      <div className="container-luxury py-24 text-center">
        <h1 className="font-serif text-3xl text-[var(--color-espresso)] mb-4">
          Furniture Piece Not Found
        </h1>
        <p className="text-sm text-[var(--color-stone)] mb-6">
          The item you are looking for may have been retired or moved.
        </p>
        <Link to="/shop" className="btn-primary text-xs uppercase tracking-wider">
          Browse All Furniture
        </Link>
      </div>
    );
  }

  const category = getCategoryBySlug(product.categoryId);
  const relatedProducts = getRelatedProducts(product.id, 4);
  const discount = getDiscountPercent(product.originalPrice, product.price);
  const availability = getAvailabilityInfo(product.availability);
  const currentImage = product.images?.[selectedImageIndex] || product.thumbnail;

  const whatsappMessage = buildProductEnquiryMessage(product);
  const whatsappUrl = generateWhatsAppUrl(whatsappMessage);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product.name} — Radha Swami Furnitures`,
          text: product.shortDescription,
          url: window.location.href,
        });
      } catch {
        // Fallback to clipboard
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Shop', url: '/shop' },
  ];
  if (category) {
    breadcrumbs.push({ name: category.name, url: `/shop/${category.slug}` });
  }
  breadcrumbs.push({ name: product.name, url: `/product/${product.slug}` });

  return (
    <div className="w-full bg-[var(--color-ivory)]">
      <SEO
        title={product.name}
        description={product.shortDescription || product.description}
        canonical={`/product/${product.slug}`}
        ogImage={currentImage}
        ogType="product"
        productSchema={product}
        breadcrumbs={breadcrumbs}
      />

      {/* Breadcrumb Bar */}
      <div className="border-b border-[var(--color-sand)] bg-[var(--color-cream)]/50 py-3">
        <div className="container-luxury">
          <nav className="flex items-center gap-1.5 text-xs text-[var(--color-stone)] flex-wrap">
            <Link to="/" className="hover:text-[var(--color-espresso)]">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[var(--color-taupe)]" />
            <Link to="/shop" className="hover:text-[var(--color-espresso)]">
              Shop All
            </Link>
            {category && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-[var(--color-taupe)]" />
                <Link to={`/shop/${category.slug}`} className="hover:text-[var(--color-espresso)]">
                  {category.name}
                </Link>
              </>
            )}
            <ChevronRight className="w-3.5 h-3.5 text-[var(--color-taupe)]" />
            <span className="font-semibold text-[var(--color-espresso)] truncate max-w-xs">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Product Showcase */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Gallery Column (7 cols on desktop) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Main Image View */}
              <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-lg overflow-hidden bg-[var(--color-cream)] border border-[var(--color-sand)] shadow-sm">
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                  {product.newArrival && (
                    <span className="badge badge-new shadow-sm">New Addition</span>
                  )}
                  {product.bestseller && (
                    <span className="badge badge-bestseller shadow-sm">Bestseller</span>
                  )}
                  {discount > 0 && (
                    <span className="badge badge-sale shadow-sm">Save {discount}%</span>
                  )}
                </div>

                {/* Share Button */}
                <button
                  type="button"
                  onClick={handleShare}
                  className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white text-[var(--color-espresso)] rounded-full shadow-md transition-colors"
                  title="Share this product"
                  aria-label="Share product"
                >
                  {copiedShare ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative aspect-square rounded overflow-hidden border-2 transition-all ${
                        selectedImageIndex === idx
                          ? 'border-[var(--color-gold)] scale-95 shadow-sm'
                          : 'border-transparent opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Meta & Actions (5 cols on desktop) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Header Details */}
              <div>
                <div className="flex items-center justify-between gap-2 text-xs uppercase tracking-wider text-[var(--color-stone)] mb-2">
                  <span className="font-semibold text-[var(--color-gold)]">
                    {category?.name || 'Handcrafted Luxury'}
                  </span>
                  <span className="font-mono text-[var(--color-taupe)]">
                    SKU: {product.sku}
                  </span>
                </div>

                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--color-espresso)] font-medium leading-tight">
                  {product.name}
                </h1>

                {/* Pricing & Availability */}
                <div className="flex items-center gap-4 mt-3">
                  <span className="font-serif text-2xl sm:text-3xl font-semibold text-[var(--color-espresso)]">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-[var(--color-stone)] line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  <span
                    className={`text-[0.7rem] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded ${availability.colorClass}`}
                  >
                    {availability.label}
                  </span>
                </div>
              </div>

              {/* Short Description */}
              <p className="text-sm text-[var(--color-stone)] leading-relaxed border-t border-[var(--color-sand)] pt-4">
                {product.shortDescription || product.description}
              </p>

              {/* Material & Finish */}
              <div className="space-y-3 py-2 border-y border-[var(--color-sand)] text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-stone)] font-medium uppercase tracking-wider">
                    Primary Material
                  </span>
                  <span className="font-semibold text-[var(--color-espresso)]">
                    {product.material}
                  </span>
                </div>
                {product.finish && (
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--color-stone)] font-medium uppercase tracking-wider">
                      Finish
                    </span>
                    <span className="font-semibold text-[var(--color-espresso)]">
                      {product.finish}
                    </span>
                  </div>
                )}
                {product.weight && (
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--color-stone)] font-medium uppercase tracking-wider">
                      Approximate Weight
                    </span>
                    <span className="font-semibold text-[var(--color-espresso)]">
                      {product.weight}
                    </span>
                  </div>
                )}
              </div>

              {/* Colour Options */}
              {product.colours && product.colours.length > 0 && (
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--color-espresso)] mb-2">
                    Finish / Fabric Options:{' '}
                    <span className="font-normal text-[var(--color-stone)]">
                      {selectedColour?.name || product.colours[0]?.name}
                    </span>
                  </label>
                  <div className="flex items-center gap-2">
                    {product.colours.map((col, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedColour(col)}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          (selectedColour?.name || product.colours[0]?.name) === col.name
                            ? 'border-[var(--color-espresso)] scale-110 shadow-sm'
                            : 'border-white hover:scale-105'
                        }`}
                        style={{ backgroundColor: col.hex }}
                        title={col.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Dimensions */}
              {product.dimensions && (
                <div className="p-4 bg-[var(--color-cream)]/70 rounded border border-[var(--color-sand)]">
                  <h4 className="font-serif text-xs uppercase tracking-wider font-semibold text-[var(--color-espresso)] flex items-center gap-1.5 mb-2">
                    <Ruler className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                    Standard Dimensions
                  </h4>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 bg-white rounded border border-[var(--color-sand)]/60">
                      <span className="text-[0.65rem] text-[var(--color-stone)] block uppercase">
                        Length
                      </span>
                      <strong className="text-[var(--color-espresso)]">
                        {product.dimensions.length}
                      </strong>
                    </div>
                    <div className="p-2 bg-white rounded border border-[var(--color-sand)]/60">
                      <span className="text-[0.65rem] text-[var(--color-stone)] block uppercase">
                        Width
                      </span>
                      <strong className="text-[var(--color-espresso)]">
                        {product.dimensions.width}
                      </strong>
                    </div>
                    <div className="p-2 bg-white rounded border border-[var(--color-sand)]/60">
                      <span className="text-[0.65rem] text-[var(--color-stone)] block uppercase">
                        Height
                      </span>
                      <strong className="text-[var(--color-espresso)]">
                        {product.dimensions.height}
                      </strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons: Enquiry Modal & WhatsApp */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEnquiryModalOpen(true)}
                  className="w-full btn-primary py-3.5 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageSquare className="w-4 h-4 text-[var(--color-gold)]" />
                  <span>Enquire About This Product</span>
                </button>

                {siteConfig.contact.whatsappEnabled && whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded border border-emerald-700/40 text-emerald-800 hover:bg-emerald-50 text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-700" />
                    <span>Instant WhatsApp Consultation</span>
                  </a>
                )}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[var(--color-sand)] text-[0.72rem] text-[var(--color-stone)]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[var(--color-gold)] flex-shrink-0" />
                  <span>Bespoke Solid Hardwood</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[var(--color-gold)] flex-shrink-0" />
                  <span>Custom Dimension Options</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[var(--color-gold)] flex-shrink-0" />
                  <span>White-Glove Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[var(--color-gold)] flex-shrink-0" />
                  <span>Generational Durability</span>
                </div>
              </div>
            </div>
          </div>

          {/* Full Specifications & Care Tabs */}
          <div className="mt-16 sm:mt-20 pt-12 border-t border-[var(--color-sand)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-gold)] font-semibold">
                    Craft & Engineering
                  </span>
                  <h3 className="font-serif text-2xl text-[var(--color-espresso)] mt-1">
                    Detailed Product Description
                  </h3>
                </div>
                <p className="text-sm text-[var(--color-stone)] leading-relaxed">
                  {product.description}
                </p>

                {/* Specifications List */}
                {product.specifications && product.specifications.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-serif text-base font-semibold text-[var(--color-espresso)] mb-3">
                      Technical Specifications
                    </h4>
                    <div className="divide-y divide-[var(--color-sand)]/60 border-y border-[var(--color-sand)]/60 text-xs">
                      {product.specifications.map((spec, idx) => (
                        <div key={idx} className="py-2.5 flex items-center justify-between">
                          <span className="text-[var(--color-stone)]">{spec.label}</span>
                          <span className="font-medium text-[var(--color-espresso)] text-right">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Care & Maintenance */}
              <div className="lg:col-span-5 bg-[var(--color-cream)] p-6 sm:p-8 rounded-lg border border-[var(--color-sand)] space-y-4">
                <span className="text-[0.68rem] uppercase tracking-wider text-[var(--color-gold)] font-semibold">
                  Care Guide
                </span>
                <h4 className="font-serif text-xl text-[var(--color-espresso)]">
                  Preserving Your Furniture
                </h4>
                <p className="text-xs text-[var(--color-stone)] leading-relaxed">
                  {product.careInstructions ||
                    'Dust with a soft, clean microfibre cloth. Avoid direct thermal contact with hot objects and keep away from moisture to protect natural grain finishes.'}
                </p>
                <div className="pt-2">
                  <Link
                    to="/contact"
                    className="text-xs text-[var(--color-espresso)] hover:text-[var(--color-gold)] font-semibold underline underline-offset-4"
                  >
                    Need Custom Maintenance Advice? Contact Us →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-20 pt-12 border-t border-[var(--color-sand)]">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-gold)] font-semibold">
                    Complete The Space
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[var(--color-espresso)] mt-1">
                    Related Handcrafted Creations
                  </h3>
                </div>
                {category && (
                  <Link
                    to={`/shop/${category.slug}`}
                    className="text-xs uppercase tracking-wider font-semibold text-[var(--color-gold)] hover:underline inline-flex items-center gap-1"
                  >
                    View All {category.name} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}

          {/* Recently Viewed Products */}
          {recentlyViewed.length > 1 && (
            <div className="mt-16 pt-12 border-t border-[var(--color-sand)]">
              <h4 className="font-serif text-lg text-[var(--color-espresso)] mb-6">
                Recently Viewed
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                {recentlyViewed
                  .filter((item) => item.id !== product.id)
                  .slice(0, 6)
                  .map((item) => (
                    <Link
                      key={item.id}
                      to={`/product/${item.slug}`}
                      className="group block p-2 rounded bg-[var(--color-cream)]/50 border border-[var(--color-sand)] hover:shadow transition-all"
                    >
                      <div className="aspect-square rounded overflow-hidden mb-2 bg-[var(--color-sand)]">
                        <img
                          src={item.thumbnail}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <p className="font-serif text-xs text-[var(--color-espresso)] truncate group-hover:text-[var(--color-gold)]">
                        {item.name}
                      </p>
                      <p className="text-[0.7rem] text-[var(--color-stone)] mt-0.5">
                        {formatPrice(item.price)}
                      </p>
                    </Link>
                  ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enquiry Modal */}
      <ProductEnquiryModal
        product={product}
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
      />
    </div>
  );
}
