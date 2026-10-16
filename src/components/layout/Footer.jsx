import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import Logo from '../common/Logo';
import siteConfig from '../../config/siteConfig';
import { getCategories } from '../../services/productService';
import { generateWhatsAppUrl } from '../../utils/helpers';

export default function Footer() {
  const categories = getCategories().slice(0, 8);
  const currentYear = new Date().getFullYear();
  const whatsappUrl = generateWhatsAppUrl(
    'Hello Radha Swami Furnitures! I would like to enquire about your furniture collection.'
  );

  return (
    <footer className="bg-[var(--color-espresso)] text-[var(--color-sand)] border-t border-[var(--color-walnut)]/60 pt-16 pb-10">
      <div className="container-luxury">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[var(--color-walnut)]/40">
          {/* Brand Info & Wordmark */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" />
            <p className="text-sm font-light text-[var(--color-sand)]/80 leading-relaxed max-w-sm mt-3">
              {siteConfig.brand.tagline}. Discover handcrafted furniture designed with meticulous attention to detail, bringing enduring character and warmth to discerning homes.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {siteConfig.social.instagram && (
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[var(--color-walnut)]/50 hover:bg-[var(--color-gold)] text-[var(--color-ivory)] flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
              {siteConfig.social.facebook && (
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[var(--color-walnut)]/50 hover:bg-[var(--color-gold)] text-[var(--color-ivory)] flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {siteConfig.contact.whatsappEnabled && whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-emerald-700/70 hover:bg-emerald-600 text-[var(--color-ivory)] flex items-center justify-center transition-colors"
                  aria-label="WhatsApp Enquiry"
                  title="Enquire on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Furniture Categories */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-wider text-[var(--color-ivory)] font-medium mb-4">
              Collections
            </h4>
            <ul className="space-y-2 text-xs">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/shop/${cat.slug}`}
                    className="hover:text-[var(--color-gold)] transition-colors inline-block py-0.5"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/shop"
                  className="text-[var(--color-gold)] hover:underline inline-flex items-center gap-1 font-medium mt-1"
                >
                  View All Furniture →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-wider text-[var(--color-ivory)] font-medium mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              {siteConfig.footerNav.company.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.href}
                    className="hover:text-[var(--color-gold)] transition-colors inline-block py-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/contact#faq"
                  className="hover:text-[var(--color-gold)] transition-colors inline-block py-0.5"
                >
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Showroom & Contact */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-wider text-[var(--color-ivory)] font-medium mb-4">
              Showroom
            </h4>
            <div className="space-y-3 text-xs text-[var(--color-sand)]/80">
              {siteConfig.address.enabled && (
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[var(--color-gold)] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[var(--color-ivory)] font-medium">
                      {siteConfig.address.showroomName}
                    </p>
                    <p>{siteConfig.address.line1}</p>
                    <p>
                      {siteConfig.address.city}, {siteConfig.address.pincode}
                    </p>
                  </div>
                </div>
              )}

              {siteConfig.contact.phone && (
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[var(--color-gold)] flex-shrink-0" />
                  <a
                    href={`tel:${siteConfig.contact.phoneRaw}`}
                    className="hover:text-[var(--color-gold)] transition-colors"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
              )}

              {siteConfig.contact.email && (
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[var(--color-gold)] flex-shrink-0" />
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="hover:text-[var(--color-gold)] transition-colors truncate"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              )}

              {siteConfig.businessHours.enabled && (
                <div className="flex items-start gap-2.5 pt-1">
                  <Clock className="w-4 h-4 text-[var(--color-gold)] flex-shrink-0 mt-0.5" />
                  <div className="text-[0.7rem] space-y-0.5">
                    {siteConfig.businessHours.hours.map((bh, idx) => (
                      <p key={idx}>
                        <span className="text-[var(--color-sand)]">{bh.days}:</span> {bh.time}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--color-sand)]/60 gap-4">
          <p>
            © {currentYear} {siteConfig.brand.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[0.72rem]">
            <Link to="/about" className="hover:text-[var(--color-sand)] transition-colors">
              About Radha Swami Furnitures
            </Link>
            <Link to="/contact" className="hover:text-[var(--color-sand)] transition-colors">
              Custom Orders
            </Link>
            <Link to="/contact" className="hover:text-[var(--color-sand)] transition-colors">
              Showroom Visit
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
