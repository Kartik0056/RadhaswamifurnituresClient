import { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search as SearchIcon,
  Menu,
  X,
  ChevronDown,
  MessageSquare,
  ArrowRight,
  Phone,
} from 'lucide-react';
import Logo from '../common/Logo';
import SearchModal from '../search/SearchModal';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useBodyScrollLock } from '../../hooks/useAccessibility';
import { getCategories } from '../../services/productService';
import siteConfig from '../../config/siteConfig';

export default function Header() {
  const [isScrolled] = [useScrollPosition(20)];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const categories = getCategories();

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCategoriesOpen(false);
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCategoriesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useBodyScrollLock(mobileMenuOpen);

  const navLinkClass = ({ isActive }) =>
    `inline-flex items-center text-[11px] xl:text-[12.5px] font-medium tracking-[0.06em] uppercase whitespace-nowrap transition-colors duration-200 py-1.5 relative hover:text-[var(--color-espresso)] flex-shrink-0 select-none ${
      isActive
        ? 'text-[var(--color-espresso)] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[var(--color-gold)]'
        : 'text-[var(--color-stone)]'
    }`;

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[var(--color-ivory)]/95 backdrop-blur-md shadow-sm border-b border-[var(--color-sand)]/60 py-2.5 sm:py-3'
            : 'bg-[var(--color-ivory)] border-b border-[var(--color-sand)]/30 py-3 sm:py-4'
        }`}
      >
        <div className="container-luxury flex items-center justify-between gap-3 xl:gap-6">
          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 -ml-2 text-[var(--color-espresso)] hover:text-[var(--color-walnut)] focus-visible:outline-none"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Brand Logo Wordmark */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-5 2xl:gap-6 flex-shrink-0">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/shop" end className={navLinkClass}>
              Shop All
            </NavLink>

            {/* Categories Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className={`inline-flex items-center gap-1 text-[11px] xl:text-[12.5px] font-medium tracking-[0.06em] uppercase whitespace-nowrap transition-colors duration-200 py-1.5 flex-shrink-0 select-none ${
                  categoriesOpen || location.pathname.startsWith('/shop/')
                    ? 'text-[var(--color-espresso)] font-semibold'
                    : 'text-[var(--color-stone)] hover:text-[var(--color-espresso)]'
                }`}
                aria-expanded={categoriesOpen}
              >
                <span>Categories</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    categoriesOpen ? 'rotate-180 text-[var(--color-gold)]' : ''
                  }`}
                />
              </button>

              {/* Mega Dropdown Menu */}
              <AnimatePresence>
                {categoriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[520px] bg-[var(--color-ivory)] border border-[var(--color-sand)] shadow-xl rounded-md p-5 z-50"
                  >
                    <div className="flex items-center justify-between border-b border-[var(--color-sand)] pb-3 mb-3">
                      <span className="text-xs uppercase tracking-wider font-semibold text-[var(--color-espresso)]">
                        Explore Furniture Categories
                      </span>
                      <Link
                        to="/shop"
                        onClick={() => setCategoriesOpen(false)}
                        className="text-xs text-[var(--color-gold)] hover:underline flex items-center gap-1 font-medium"
                      >
                        All Products <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          to={`/shop/${category.slug}`}
                          onClick={() => setCategoriesOpen(false)}
                          className="flex items-center gap-3 p-2 rounded hover:bg-[var(--color-cream)] transition-colors group"
                        >
                          <img
                            src={category.image}
                            alt=""
                            className="w-10 h-10 object-cover rounded bg-[var(--color-sand)]"
                          />
                          <div>
                            <p className="text-sm font-medium text-[var(--color-espresso)] group-hover:text-[var(--color-walnut)]">
                              {category.name}
                            </p>
                            <p className="text-[0.7rem] text-[var(--color-stone)]">
                              {category.productCount} {category.productCount === 1 ? 'piece' : 'pieces'}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink to="/shop?tag=newArrival" className={navLinkClass}>
              New Arrivals
            </NavLink>
            <NavLink to="/shop?tag=bestseller" className={navLinkClass}>
              Best Sellers
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About Us
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </nav>

          {/* Right Header Utilities: Search, Enquire CTA */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="p-1.5 xl:p-2 text-[var(--color-espresso)] hover:text-[var(--color-walnut)] transition-colors rounded-full hover:bg-[var(--color-cream)]"
              aria-label="Search furniture catalog"
              title="Search"
            >
              <SearchIcon className="w-4 h-4 xl:w-5 xl:h-5" />
            </button>

            {/* Desktop Enquiry CTA */}
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 xl:px-4 xl:py-2 text-[11px] xl:text-xs font-semibold uppercase tracking-wider text-[var(--color-ivory)] bg-[var(--color-espresso)] hover:bg-[var(--color-walnut)] rounded-sm transition-all duration-300 shadow-sm hover:shadow whitespace-nowrap flex-shrink-0"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[var(--color-gold)]" />
              <span>Enquire</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Animated Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-[var(--color-espresso)]/60 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed inset-y-0 left-0 w-full max-w-xs bg-[var(--color-ivory)] shadow-2xl flex flex-col justify-between overflow-y-auto border-r border-[var(--color-sand)]"
            >
              {/* Drawer Header */}
              <div>
                <div className="flex items-center justify-between p-5 border-b border-[var(--color-sand)]">
                  <Logo />
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-full hover:bg-[var(--color-cream)] text-[var(--color-stone)] hover:text-[var(--color-espresso)]"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <div className="p-5 space-y-1">
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2.5 text-base font-serif text-[var(--color-espresso)] border-b border-[var(--color-sand)]/40"
                  >
                    Home
                  </Link>

                  <Link
                    to="/shop"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2.5 text-base font-serif text-[var(--color-espresso)] border-b border-[var(--color-sand)]/40"
                  >
                    Shop All Furniture
                  </Link>

                  {/* Accordion Categories */}
                  <div className="border-b border-[var(--color-sand)]/40 py-1">
                    <button
                      type="button"
                      onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                      className="w-full flex items-center justify-between py-2.5 text-base font-serif text-[var(--color-espresso)] text-left"
                    >
                      <span>Categories</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[var(--color-stone)] transition-transform ${
                          mobileCategoriesOpen ? 'rotate-180 text-[var(--color-gold)]' : ''
                        }`}
                      />
                    </button>

                    {mobileCategoriesOpen && (
                      <div className="pl-3 pb-3 pt-1 space-y-2">
                        {categories.map((category) => (
                          <Link
                            key={category.id}
                            to={`/shop/${category.slug}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-1 text-sm text-[var(--color-stone)] hover:text-[var(--color-espresso)]"
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  <Link
                    to="/shop?tag=newArrival"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2.5 text-base font-serif text-[var(--color-espresso)] border-b border-[var(--color-sand)]/40"
                  >
                    New Arrivals
                  </Link>

                  <Link
                    to="/shop?tag=bestseller"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2.5 text-base font-serif text-[var(--color-espresso)] border-b border-[var(--color-sand)]/40"
                  >
                    Best Sellers
                  </Link>

                  <Link
                    to="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2.5 text-base font-serif text-[var(--color-espresso)] border-b border-[var(--color-sand)]/40"
                  >
                    About Us
                  </Link>

                  <Link
                    to="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2.5 text-base font-serif text-[var(--color-espresso)]"
                  >
                    Contact Showroom
                  </Link>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-5 bg-[var(--color-cream)] border-t border-[var(--color-sand)] space-y-3">
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full btn-primary text-center text-xs py-3"
                >
                  <MessageSquare className="w-4 h-4 mr-1 text-[var(--color-gold)] inline" />
                  Enquire About Furniture
                </Link>

                {siteConfig.contact.phone && (
                  <a
                    href={`tel:${siteConfig.contact.phoneRaw}`}
                    className="flex items-center justify-center gap-2 text-xs text-[var(--color-stone)] hover:text-[var(--color-espresso)] py-1"
                  >
                    <Phone className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                    <span>{siteConfig.contact.phone}</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
