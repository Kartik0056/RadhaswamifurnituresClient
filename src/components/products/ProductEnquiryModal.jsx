import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { formatPrice, buildProductEnquiryMessage, generateWhatsAppUrl } from '../../utils/helpers';
import siteConfig from '../../config/siteConfig';
import { useBodyScrollLock } from '../../hooks/useAccessibility';
import enquiryService from '../../services/enquiryService';

export default function ProductEnquiryModal({ product, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    quantity: '1',
    message: '',
    preferredContact: 'WhatsApp',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useBodyScrollLock(isOpen);

  if (!product) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your full name';
    if (!formData.phone.trim()) {
      errs.phone = 'Please enter your contact phone number';
    } else if (!/^[0-9+()-\s]{8,18}$/.test(formData.phone)) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Persist lead directly into CRM system & backend API
    try {
      await enquiryService.submitEnquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        subject: `Product Enquiry: ${product?.name}`,
        message: formData.message || `Customer enquired about ${product?.name} (Qty: ${formData.quantity || 1})`,
        productId: product?.id || product?.slug,
        productName: product?.name,
        preferredContact: formData.preferredContact || 'WhatsApp',
        source: 'product_modal',
        priority: 'high',
        dealValue: Number(product?.price) || 0,
        timberPreference: product?.material || '',
      });
    } catch (err) {
      console.warn('CRM lead submission notice:', err);
    }

    // Build the prefilled WhatsApp message
    const whatsappMessage = buildProductEnquiryMessage(product, formData);
    const whatsappUrl = generateWhatsAppUrl(whatsappMessage);

    setIsSubmitted(true);

    // If preferred is WhatsApp, redirect directly
    if (formData.preferredContact === 'WhatsApp' && whatsappUrl) {
      setTimeout(() => {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }, 600);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      quantity: '1',
      message: '',
      preferredContact: 'WhatsApp',
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-[var(--color-espresso)]/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <div className="relative min-h-screen px-4 py-8 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-[var(--color-ivory)] rounded-lg shadow-2xl border border-[var(--color-sand)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-[var(--color-sand)] bg-[var(--color-cream)]">
                <div>
                  <span className="text-[0.68rem] uppercase tracking-wider text-[var(--color-gold)] font-semibold">
                    Product Consultation & Enquiry
                  </span>
                  <h3 className="font-serif text-lg text-[var(--color-espresso)]">
                    {siteConfig.brand.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1 rounded-full text-[var(--color-stone)] hover:text-[var(--color-espresso)] hover:bg-[var(--color-sand)]/50 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Product Summary Banner */}
              <div className="p-4 bg-[var(--color-sand)]/30 border-b border-[var(--color-sand)] flex items-center gap-3">
                <img
                  src={product.thumbnail || product.images[0]}
                  alt={product.name}
                  className="w-14 h-14 object-cover rounded bg-[var(--color-sand)] flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-serif text-sm font-semibold text-[var(--color-espresso)] truncate">
                    {product.name}
                  </h4>
                  <p className="text-xs text-[var(--color-stone)]">
                    SKU: {product.sku} • {product.material}
                  </p>
                  <p className="text-sm font-medium text-[var(--color-espresso)]">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </div>

              {/* Form Content / Success State */}
              <div className="p-6">
                {isSubmitted ? (
                  <div className="text-center py-6 space-y-4">
                    <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-serif text-xl text-[var(--color-espresso)] mb-1">
                        Enquiry Prepared!
                      </h4>
                      <p className="text-xs text-[var(--color-stone)] max-w-xs mx-auto leading-relaxed">
                        Thank you, {formData.name}. Your enquiry for <strong>{product.name}</strong> is ready to be delivered directly to the Radha Swami Furnitures team.
                      </p>
                    </div>

                    {formData.preferredContact === 'WhatsApp' ? (
                      <div className="p-3 bg-emerald-50 rounded border border-emerald-200 text-xs text-emerald-900">
                        Opening WhatsApp with your product details and message... If WhatsApp did not open automatically, click below.
                      </div>
                    ) : (
                      <div className="p-3 bg-[var(--color-cream)] rounded border border-[var(--color-sand)] text-xs text-[var(--color-stone)]">
                        Our furniture consultant will contact you via {formData.preferredContact} at {formData.phone}.
                      </div>
                    )}

                    <div className="flex flex-col gap-2 pt-2">
                      <a
                        href={generateWhatsAppUrl(buildProductEnquiryMessage(product, formData))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-xs py-2.5 flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-700"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Send via WhatsApp Now
                      </a>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="text-xs text-[var(--color-stone)] hover:text-[var(--color-espresso)] py-1"
                      >
                        Close & Return to Product
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-espresso)] mb-1">
                        Your Full Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Ananya Sharma"
                        className={`w-full px-3 py-2 bg-white rounded border text-sm text-[var(--color-espresso)] focus:outline-none focus:border-[var(--color-gold)] transition-colors ${
                          errors.name ? 'border-red-400 bg-red-50/30' : 'border-[var(--color-sand)]'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-[0.7rem] text-red-600 mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-espresso)] mb-1">
                          Phone Number <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 90128 32577"
                          className={`w-full px-3 py-2 bg-white rounded border text-sm text-[var(--color-espresso)] focus:outline-none focus:border-[var(--color-gold)] transition-colors ${
                            errors.phone ? 'border-red-400 bg-red-50/30' : 'border-[var(--color-sand)]'
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-[0.7rem] text-red-600 mt-1">{errors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-espresso)] mb-1">
                          Email Address <span className="text-[var(--color-stone)] font-normal text-[0.65rem]">(Optional)</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@example.com"
                          className={`w-full px-3 py-2 bg-white rounded border text-sm text-[var(--color-espresso)] focus:outline-none focus:border-[var(--color-gold)] transition-colors ${
                            errors.email ? 'border-red-400 bg-red-50/30' : 'border-[var(--color-sand)]'
                          }`}
                        />
                        {errors.email && (
                          <p className="text-[0.7rem] text-red-600 mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-espresso)] mb-1">
                          Quantity Needed
                        </label>
                        <select
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          className="w-full px-3 py-2 bg-white rounded border border-[var(--color-sand)] text-sm text-[var(--color-espresso)] focus:outline-none focus:border-[var(--color-gold)]"
                        >
                          <option value="1">1 Unit</option>
                          <option value="2">2 Units</option>
                          <option value="3">3 Units</option>
                          <option value="4+">4+ Units (Bulk / Project)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-espresso)] mb-1">
                          Preferred Contact
                        </label>
                        <select
                          name="preferredContact"
                          value={formData.preferredContact}
                          onChange={handleChange}
                          className="w-full px-3 py-2 bg-white rounded border border-[var(--color-sand)] text-sm text-[var(--color-espresso)] focus:outline-none focus:border-[var(--color-gold)]"
                        >
                          <option value="WhatsApp">WhatsApp Message</option>
                          <option value="Phone Call">Phone Call</option>
                          <option value="Email">Email</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-espresso)] mb-1">
                        Custom Requirements or Message <span className="text-[var(--color-stone)] font-normal text-[0.65rem]">(Optional)</span>
                      </label>
                      <textarea
                        name="message"
                        rows={2}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Inquire about custom wood polish, dimensions, delivery to your pin code, or showroom viewing..."
                        className="w-full px-3 py-2 bg-white rounded border border-[var(--color-sand)] text-sm text-[var(--color-espresso)] focus:outline-none focus:border-[var(--color-gold)] resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full btn-primary py-3 text-xs tracking-wider uppercase font-semibold flex items-center justify-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                        Send Product Enquiry
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 justify-center text-[0.68rem] text-[var(--color-stone)] pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Direct showroom consultation • No spam • Verified handcrafted furniture</span>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
