/**
 * Utility helpers
 */
import siteConfig from '../config/siteConfig';

/**
 * Format a price in the configured currency.
 */
export function formatPrice(amount) {
  if (amount == null) return '';
  const { code, locale } = siteConfig.currency;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate discount percentage.
 */
export function getDiscountPercent(originalPrice, price) {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

/**
 * Generate a WhatsApp URL with a prefilled message.
 */
export function generateWhatsAppUrl(message, number) {
  const phone = number || siteConfig.contact.whatsappNumber;
  if (!phone) return null;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

/**
 * Build a WhatsApp enquiry message for a specific product.
 */
export function buildProductEnquiryMessage(product, formData = {}) {
  const productUrl = `${siteConfig.seo.siteUrl}/product/${product.slug}`;
  let msg = `Hi! I'm interested in the following product:\n\n`;
  msg += `*${product.name}*\n`;
  msg += `SKU: ${product.sku}\n`;
  msg += `Price: ${formatPrice(product.price)}\n`;
  msg += `Link: ${productUrl}\n`;

  if (formData.name) msg += `\nName: ${formData.name}`;
  if (formData.phone) msg += `\nPhone: ${formData.phone}`;
  if (formData.email) msg += `\nEmail: ${formData.email}`;
  if (formData.quantity) msg += `\nQuantity: ${formData.quantity}`;
  if (formData.message) msg += `\nMessage: ${formData.message}`;
  if (formData.preferredContact)
    msg += `\nPreferred Contact: ${formData.preferredContact}`;

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
  return text
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
