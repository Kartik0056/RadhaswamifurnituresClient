/**
 * Site Configuration
 * ==================
 * Central configuration file for Radha Swami Furnitures.
 * Edit this file to update brand name, contact details, social links,
 * announcement bar text, and other business information.
 *
 * All components read from this file — no hardcoding in UI components.
 */

const siteConfig = {
  // ─── Brand Identity ───────────────────────────────────────────────
  brand: {
    name: 'Radha Swami Furnitures',
    primaryText: 'RADHA SWAMI',
    subText: 'FURNITURES',
    tagline: 'Furniture That Makes a House Feel Like Home',
    heroHeadline: 'Furniture That Makes a House Feel Like Home.',
    heroSubheadline:
      'Discover thoughtfully designed furniture that brings comfort, character, and timeless elegance to your living spaces.',
    primaryCta: 'Explore Our Collection',
    secondaryCta: 'Enquire Now',
    description:
      'Discover thoughtfully designed furniture that brings comfort, character, and timeless elegance to your living spaces.',
    logoImage: null, // Path to image logo if provided later, or null for typographic wordmark
  },

  // ─── Contact Information (Editable Defaults) ──────────────────────
  contact: {
    phone: '+91 98765 43210',
    phoneRaw: '919876543210', // Used for WhatsApp links (country code + number, no + or spaces)
    email: 'contact@radhaswamifurnitures.com',
    whatsappEnabled: true,
    whatsappNumber: '919876543210', // WhatsApp business number
    whatsappDefaultMessage:
      'Hello Radha Swami Furnitures! I am interested in your furniture collection and would like more information.',
  },

  // ─── Business Address & Showroom (Editable Defaults) ──────────────
  address: {
    enabled: true,
    showroomName: 'Radha Swami Furnitures Showroom',
    line1: 'Ferozepur Road (Near Model Town)',
    line2: 'Ludhiana, Punjab 141001',
    city: 'Ludhiana',
    state: 'Punjab',
    country: 'India',
    pincode: '141001',
    mapEmbedUrl: '', // Optional Google Maps embed URL
  },

  // ─── Business Hours ───────────────────────────────────────────────
  businessHours: {
    enabled: true,
    hours: [
      { days: 'Monday – Saturday', time: '10:00 AM – 8:00 PM' },
      { days: 'Sunday', time: '11:00 AM – 6:00 PM' },
    ],
  },

  // ─── Social Links ─────────────────────────────────────────────────
  social: {
    instagram: 'https://instagram.com/radhaswamifurnitures',
    facebook: 'https://facebook.com/radhaswamifurnitures',
    pinterest: 'https://pinterest.com/radhaswamifurnitures',
    youtube: '',
    twitter: '',
  },

  // ─── Announcement Bar ─────────────────────────────────────────────
  announcement: {
    enabled: true,
    text: 'Bespoke Custom Orders & In-Store Consultations Available — Visit Us Today',
    link: '/contact',
    linkText: 'Enquire Now',
  },

  // ─── Newsletter ───────────────────────────────────────────────────
  newsletter: {
    enabled: false, // Set to true when an email subscription service is configured
    placeholderMode: true, // Non-submitting UI with clear disclosure
  },

  // ─── SEO & Meta ───────────────────────────────────────────────────
  seo: {
    siteUrl: 'https://radhaswamifurnitures.com',
    defaultTitle: 'Radha Swami Furnitures — Premium Handcrafted Furniture',
    defaultDescription:
      'Discover thoughtfully designed handcrafted furniture that brings comfort, character, and timeless elegance to your living spaces.',
    ogImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80',
    twitterHandle: '',
  },

  // ─── Currency ─────────────────────────────────────────────────────
  currency: {
    code: 'INR',
    symbol: '₹',
    locale: 'en-IN',
  },

  // ─── Legal Pages ──────────────────────────────────────────────────
  legal: {
    privacyPolicy: '/contact',
    termsOfService: '/contact',
    careGuide: '/about#craftsmanship',
  },

  // ─── Footer Navigation ───────────────────────────────────────────
  footerNav: {
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Philosophy', href: '/about#philosophy' },
      { label: 'Craftsmanship & Materials', href: '/about#craftsmanship' },
      { label: 'Contact Showroom', href: '/contact' },
    ],
    support: [
      { label: 'Frequently Asked Questions', href: '/contact#faq' },
      { label: 'Custom Furniture Enquiries', href: '/contact' },
      { label: 'Showroom Timings', href: '/contact#showroom' },
      { label: 'Care Instructions', href: '/about#care' },
    ],
  },

  // ─── Brand Benefits (Homepage) ────────────────────────────────────
  benefits: [
    {
      icon: 'Hammer',
      title: 'Artisanal Craftsmanship',
      description:
        'Each piece is shaped by master woodworkers using traditional joinery and rigorous attention to detail.',
    },
    {
      icon: 'Leaf',
      title: 'Solid Hardwood & Quality Materials',
      description:
        'Sustainably sourced Sheesham, Teak, and Mango woods, paired with high-grade hardware and upholstery.',
    },
    {
      icon: 'Sparkles',
      title: 'Timeless Contemporary Design',
      description:
        'Balancing editorial warmth with everyday ergonomic comfort, crafted to remain timeless through eras.',
    },
    {
      icon: 'ShieldCheck',
      title: 'Direct Showroom Consultation',
      description:
        'Consult directly with our furniture specialists for tailored dimensions, finishes, and custom configurations.',
    },
  ],

  // ─── Testimonials (Clearly labeled demo/sample feedback) ─────────
  testimonials: [
    {
      id: 1,
      name: 'Ananya S.',
      location: 'Ludhiana',
      text: 'The Sheesham dining table transformed our family dining room. The wood grain is magnificent, and the finish is silky smooth.',
      rating: 5,
      isSampleData: true,
    },
    {
      id: 2,
      name: 'Rajesh M.',
      location: 'Chandigarh',
      text: 'Finding handcrafted furniture with this level of structural integrity and comfort is rare. The team made the whole consultation effortless.',
      rating: 5,
      isSampleData: true,
    },
    {
      id: 3,
      name: 'Priya K.',
      location: 'Jalandhar',
      text: 'The wardrobe joinery and sliding mechanism are whisper quiet. It brings real architectural warmth to our bedroom sanctuary.',
      rating: 5,
      isSampleData: true,
    },
  ],

  // ─── FAQ Data ─────────────────────────────────────────────────────
  faq: [
    {
      question: 'Do you create bespoke custom furniture?',
      answer:
        'Yes. We specialise in custom dimensions, bespoke wood finishes, and tailored upholstery fabrics. Send us your requirements or visit our showroom for a design consultation.',
    },
    {
      question: 'What types of wood do you craft with?',
      answer:
        'Our primary collection is made from solid Sheesham (Indian Rosewood), Teak, and seasoned Mango Wood, renowned for their grain richness and generational durability.',
    },
    {
      question: 'Can I visit the Radha Swami Furnitures showroom?',
      answer:
        'Yes, our showroom is open Monday through Saturday from 10:00 AM to 8:00 PM and Sunday from 11:00 AM to 6:00 PM. We welcome walk-ins and scheduled consultations.',
    },
    {
      question: 'How do I place an enquiry or order?',
      answer:
        'You can click “Enquire Now” on any product to initiate a WhatsApp or form enquiry with prefilled product details. Our team responds promptly with pricing, delivery details, and customization options.',
    },
    {
      question: 'What are your delivery services and areas?',
      answer:
        'We offer white-glove delivery and on-site assembly across Ludhiana, Punjab, and the Tricity region, and can coordinate secure transport to destinations across India. Specific timelines and arrangements are provided during order enquiry.',
    },
    {
      question: 'How should I care for solid wood furniture?',
      answer:
        'Dust regularly with a dry microfibre cloth, protect surfaces from direct thermal contact with coasters, and apply quality natural beeswax or wood polish periodically to nourish the wood grain.',
    },
  ],
};

export default siteConfig;
