import { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import siteConfig from '../config/siteConfig';
import { generateWhatsAppUrl } from '../utils/helpers';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Furniture Enquiry',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name';
    if (!formData.phone.trim()) {
      errs.phone = 'Please provide your phone number';
    } else if (!/^[0-9+()-\s]{8,18}$/.test(formData.phone)) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please enter your message or enquiry details';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    // Build WhatsApp message for direct connection
    let msg = `Hello Radha Swami Furnitures! I am reaching out via your website contact form:\n\n`;
    msg += `Name: ${formData.name}\n`;
    msg += `Phone: ${formData.phone}\n`;
    if (formData.email) msg += `Email: ${formData.email}\n`;
    msg += `Subject: ${formData.subject}\n`;
    msg += `Message: ${formData.message}\n`;

    const whatsappUrl = generateWhatsAppUrl(msg);

    setSubmitted(true);

    // If WhatsApp is configured, open WhatsApp in a new tab
    if (whatsappUrl) {
      setTimeout(() => {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }, 700);
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const whatsappGeneralUrl = generateWhatsAppUrl(
    siteConfig.contact.whatsappDefaultMessage
  );

  return (
    <div className="w-full bg-[var(--color-ivory)]">
      <SEO
        title="Contact Showroom & Custom Enquiries — Radha Swami Furnitures"
        description="Connect with Radha Swami Furnitures for custom furniture consultations, showroom visits, and pricing enquiries."
        canonical="/contact"
      />

      {/* Header Banner */}
      <section className="bg-[var(--color-cream)] border-b border-[var(--color-sand)] py-14 sm:py-20">
        <div className="container-luxury text-center max-w-2xl space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] font-semibold">
            Connect With Us
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[var(--color-espresso)] font-medium">
            Showroom & Custom Enquiries
          </h1>
          <div className="section-divider" />
          <p className="text-sm text-[var(--color-stone)] leading-relaxed">
            Whether you desire a bespoke dining table, custom upholstery, or want to explore our physical showroom, our team is at your service.
          </p>
        </div>
      </section>

      {/* Main Grid: Info + Form */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Showroom Details Column */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-gold)] font-semibold">
                  Visit & Consult
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[var(--color-espresso)] mt-1">
                  Our Showroom
                </h2>
                <div className="w-12 h-0.5 bg-[var(--color-gold)] mt-2" />
              </div>

              {/* Showroom Cards */}
              <div className="space-y-4">
                {siteConfig.address.enabled && (
                  <div className="p-5 rounded-lg bg-[var(--color-cream)]/70 border border-[var(--color-sand)] flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-espresso)] text-[var(--color-gold)] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-semibold text-[var(--color-espresso)]">
                        {siteConfig.address.showroomName}
                      </h4>
                      <p className="text-xs text-[var(--color-stone)] mt-1 leading-relaxed">
                        {siteConfig.address.line1}
                        <br />
                        {siteConfig.address.line2}
                      </p>
                    </div>
                  </div>
                )}

                {siteConfig.contact.phone && (
                  <div className="p-5 rounded-lg bg-[var(--color-cream)]/70 border border-[var(--color-sand)] flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-espresso)] text-[var(--color-gold)] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-semibold text-[var(--color-espresso)]">
                        Telephone
                      </h4>
                      <a
                        href={`tel:${siteConfig.contact.phoneRaw}`}
                        className="text-xs text-[var(--color-stone)] hover:text-[var(--color-espresso)] mt-1 inline-block"
                      >
                        {siteConfig.contact.phone}
                      </a>
                    </div>
                  </div>
                )}

                {siteConfig.contact.email && (
                  <div className="p-5 rounded-lg bg-[var(--color-cream)]/70 border border-[var(--color-sand)] flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-espresso)] text-[var(--color-gold)] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-semibold text-[var(--color-espresso)]">
                        Email Inquiries
                      </h4>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="text-xs text-[var(--color-stone)] hover:text-[var(--color-espresso)] mt-1 inline-block"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>
                )}

                {siteConfig.businessHours.enabled && (
                  <div className="p-5 rounded-lg bg-[var(--color-cream)]/70 border border-[var(--color-sand)] flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-espresso)] text-[var(--color-gold)] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-semibold text-[var(--color-espresso)]">
                        Showroom Hours
                      </h4>
                      <div className="text-xs text-[var(--color-stone)] mt-1 space-y-0.5">
                        {siteConfig.businessHours.hours.map((h, i) => (
                          <p key={i}>
                            <strong>{h.days}:</strong> {h.time}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Direct WhatsApp Pill */}
              {siteConfig.contact.whatsappEnabled && whatsappGeneralUrl && (
                <div className="p-6 rounded-lg bg-emerald-900 text-white space-y-3">
                  <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                    <MessageCircle className="w-4 h-4" />
                    <span>Instant Consultation</span>
                  </div>
                  <h4 className="font-serif text-lg text-white">
                    Prefer WhatsApp Chat?
                  </h4>
                  <p className="text-xs text-emerald-100/80 leading-relaxed">
                    Message our furniture specialists directly to send photos of your floor plans or ask for immediate estimates.
                  </p>
                  <a
                    href={whatsappGeneralUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Start WhatsApp Chat
                  </a>
                </div>
              )}
            </div>

            {/* Contact Form Column */}
            <div className="lg:col-span-7 bg-[var(--color-ivory)] p-8 sm:p-10 rounded-xl border border-[var(--color-sand)] shadow-sm">
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-gold)] font-semibold">
                Send A Message
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[var(--color-espresso)] mt-1 mb-6">
                Tell Us About Your Space
              </h3>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl text-[var(--color-espresso)]">
                    Enquiry Prepared!
                  </h4>
                  <p className="text-xs text-[var(--color-stone)] max-w-sm mx-auto leading-relaxed">
                    Thank you, {formData.name}. We are transferring your enquiry to our WhatsApp consultation channel for immediate assistance.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-[var(--color-espresso)] hover:underline pt-2 inline-block font-semibold"
                  >
                    Send another enquiry →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-espresso)] mb-1">
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rajesh Malhotra"
                      className={`w-full px-3.5 py-2.5 bg-white rounded border text-sm text-[var(--color-espresso)] focus:outline-none focus:border-[var(--color-gold)] ${
                        errors.name ? 'border-red-400 bg-red-50/20' : 'border-[var(--color-sand)]'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[0.7rem] text-red-600 mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-espresso)] mb-1">
                        Phone Number <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className={`w-full px-3.5 py-2.5 bg-white rounded border text-sm text-[var(--color-espresso)] focus:outline-none focus:border-[var(--color-gold)] ${
                          errors.phone ? 'border-red-400 bg-red-50/20' : 'border-[var(--color-sand)]'
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
                        placeholder="name@domain.com"
                        className={`w-full px-3.5 py-2.5 bg-white rounded border text-sm text-[var(--color-espresso)] focus:outline-none focus:border-[var(--color-gold)] ${
                          errors.email ? 'border-red-400 bg-red-50/20' : 'border-[var(--color-sand)]'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[0.7rem] text-red-600 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-espresso)] mb-1">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-white rounded border border-[var(--color-sand)] text-sm text-[var(--color-espresso)] focus:outline-none focus:border-[var(--color-gold)]"
                    >
                      <option value="General Furniture Enquiry">General Furniture Enquiry</option>
                      <option value="Custom Furniture Order">Custom Dimensions / Bespoke Order</option>
                      <option value="Showroom Visit Schedule">Showroom Consultation Visit</option>
                      <option value="Bulk / Architect Collaboration">Bulk / Interior Designer Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-espresso)] mb-1">
                      Message & Requirements <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share details about the room, preferred timber, dimensions, or questions..."
                      className={`w-full px-3.5 py-2.5 bg-white rounded border text-sm text-[var(--color-espresso)] focus:outline-none focus:border-[var(--color-gold)] resize-none ${
                        errors.message ? 'border-red-400 bg-red-50/20' : 'border-[var(--color-sand)]'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[0.7rem] text-red-600 mt-1">{errors.message}</p>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full btn-primary py-3.5 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                      Submit Consultation Request
                    </button>
                  </div>

                  <p className="text-[0.68rem] text-center text-[var(--color-stone)] pt-2">
                    Direct enquiry flow via WhatsApp / showroom specialists. Your personal details are protected and never shared.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="section-padding bg-[var(--color-cream)]/60 border-t border-[var(--color-sand)]">
        <div className="container-luxury max-w-3xl">
          <div className="section-heading">
            <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] font-semibold">
              Help & Information
            </span>
            <h2>Frequently Asked Questions</h2>
            <div className="section-divider" />
          </div>

          <div className="space-y-3">
            {siteConfig.faq.map((item, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="bg-[var(--color-ivory)] rounded-md border border-[var(--color-sand)] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 focus-visible:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-base font-semibold text-[var(--color-espresso)]">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[var(--color-stone)] transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? 'rotate-180 text-[var(--color-gold)]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-[var(--color-stone)] leading-relaxed border-t border-[var(--color-sand)]/40 pt-3">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
