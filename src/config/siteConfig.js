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
    name: 'Radha Swami Furniture',
    primaryText: 'RADHA SWAMI',
    subText: 'FURNITURE',
    tagline: 'Deals In : All Types of Fancy Wooden Furniture',
    heroHeadline: 'All Types of Fancy Wooden Furniture.',
    heroSubheadline:
      'Discover handcrafted solid wood luxury furniture that brings comfort, character, and timeless elegance to your living spaces.',
    primaryCta: 'Explore Our Collection',
    secondaryCta: 'Enquire Now',
    description:
      'Deals in all types of fancy wooden furniture. Handcrafted sofas, luxury beds, dining sets, and bespoke woodwork in Ludhiana.',
    logoImage: '/logo.svg',
    logoImageLight: '/logo-light.svg',
    logoEmblem: '/logo.jpg',
  },

  // ─── Contact Information (Editable Defaults) ──────────────────────
  contact: {
    phone: '+91 90128 32577', // Primary contact number (upper number from card)
    phoneRaw: '+919012832577', // Used for tel: links
    phoneAlt: '+91 96753 34435', // Secondary contact number (lower number from card)
    phoneAltRaw: '+919675334435',
    email: 'contact@radhaswamifurniture.com',
    whatsappEnabled: true,
    whatsappNumber: '919012832577', // WhatsApp business number (upper number: 90128-32577)
    whatsappDefaultMessage:
      'Hello Radha Swami Furniture! I am interested in your fancy wooden furniture collection and would like more information.',
  },

  // ─── Business Address & Showroom (Editable Defaults) ──────────────
  address: {
    enabled: true,
    showroomName: 'Radha Swami Furniture Showroom',
    line1: 'Bachan Singh Marg, Main Market Jandu Enclave',
    line2: 'Vill. Baloke, Ludhiana, Punjab 141001',
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
    text: 'Deals In : All Types of Fancy Wooden Furniture — Showroom at Bachan Singh Marg, Ludhiana',
    link: '/contact',
    linkText: 'Visit & Enquire',
  },

  // ─── Newsletter ───────────────────────────────────────────────────
  newsletter: {
    enabled: false, // Set to true when an email subscription service is configured
    placeholderMode: true, // Non-submitting UI with clear disclosure
  },

  // ─── SEO & Meta ───────────────────────────────────────────────────
  seo: {
    siteUrl: 'https://radhaswamifurnitures.com',
    defaultTitle: 'Radha Swami Furniture — All Types of Fancy Wooden Furniture Ludhiana',
    defaultDescription:
      'Discover handcrafted fancy wooden furniture at Radha Swami Furniture, Bachan Singh Marg, Ludhiana. Solid Sheesham & Teak sofas, luxury beds, dining sets, and custom orders.',
    ogImage: '/logo.jpg',
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
      question: 'Can I visit the Radha Swami Furniture showroom?',
      answer:
        'Yes! Our showroom is located at Bachan Singh Marg, Main Market Jandu Enclave, Vill. Baloke, Ludhiana. We are open Monday through Saturday from 10:00 AM to 8:00 PM and Sunday from 11:00 AM to 6:00 PM. We welcome walk-ins and scheduled custom furniture consultations.',
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
