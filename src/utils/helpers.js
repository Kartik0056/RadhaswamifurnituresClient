/**
 * Utility helpers
 * Hardened for security & performance
 */
import siteConfig from '../config/siteConfig';

/**
 * Format a price in the configured currency.
 */
export function formatPrice(amount) {
  if (amount == null || isNaN(Number(amount))) return '';
  const { code, locale } = siteConfig.currency;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(amount));
}

/**
 * Calculate discount percentage.
 */
export function getDiscountPercent(originalPrice, price) {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

/**
 * Clean & sanitize text for safe messaging
 */
function sanitizeText(str) {
  if (!str) return '';
  return String(str)
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, 500);
}

/**
 * Generate a WhatsApp URL with a prefilled message.
 * Strictly sanitizes telephone to numeric digits to prevent protocol smuggling.
 */
export function generateWhatsAppUrl(message, number) {
  const rawPhone = number || siteConfig.contact.whatsappNumber;
  if (!rawPhone) return null;

  // Enforce numbers only (E.164 format without +)
  const phone = String(rawPhone).replace(/[^0-9]/g, '');
  if (phone.length < 10) return null;

  const encoded = encodeURIComponent(String(message || '').slice(0, 1500));
  return `https://wa.me/${phone}?text=${encoded}`;
}

/**
 * Build a WhatsApp enquiry message for a specific product.
 */
export function buildProductEnquiryMessage(product, formData = {}) {
  if (!product) return '';
  const productUrl = `${siteConfig.seo.siteUrl}/product/${encodeURIComponent(product.slug)}`;

  let msg = `Hello Radha Swami Furnitures! I am interested in this handcrafted piece:\n\n`;
  msg += `*${sanitizeText(product.name)}*\n`;
  msg += `SKU: ${sanitizeText(product.sku)}\n`;
  msg += `Price: ${formatPrice(product.price)}\n`;
  msg += `Link: ${productUrl}\n`;

  if (formData.name) msg += `\nName: ${sanitizeText(formData.name)}`;
  if (formData.phone) msg += `\nPhone: ${sanitizeText(formData.phone)}`;
  if (formData.email) msg += `\nEmail: ${sanitizeText(formData.email)}`;
  if (formData.quantity) msg += `\nQuantity: ${sanitizeText(formData.quantity)}`;
  if (formData.message) msg += `\nRequirements: ${sanitizeText(formData.message)}`;
  if (formData.preferredContact)
    msg += `\nPreferred Contact: ${sanitizeText(formData.preferredContact)}`;

  return msg;
}

/**
 * Truncate text to a max length.
 */
export function truncate(str, maxLength = 100) {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength).trim() + '…';
}

/**
 * Create a URL-safe slug from a string.
 */
export function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Debounce a function.
 */
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Get availability label and colour class.
 */
export function getAvailabilityInfo(status) {
  switch (status) {
    case 'in-stock':
      return { label: 'In Stock', colorClass: 'text-green-700 bg-green-50' };
    case 'made-to-order':
      return {
        label: 'Made to Order',
        colorClass: 'text-amber-700 bg-amber-50',
      };
    case 'out-of-stock':
      return {
        label: 'Out of Stock',
        colorClass: 'text-red-700 bg-red-50',
      };
    case 'discontinued':
      return {
        label: 'Discontinued',
        colorClass: 'text-stone-500 bg-stone-100',
      };
    default:
      return { label: status || 'Unknown', colorClass: 'text-stone-500 bg-stone-100' };
  }
}

/**
 * Classname helper — join truthy classes.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
