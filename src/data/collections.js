/**
 * Collections Data
 * =================
 * Curated product collections for featured banners and special groupings.
 */

const collections = [
  {
    id: 'living-room-essentials',
    name: 'Living Room Essentials',
    slug: 'living-room-essentials',
    tagline: 'Where Comfort Meets Character',
    description:
      'Curated sofas, coffee tables, and accent pieces designed to transform your living space into a haven of warmth and style.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=80',
    productIds: ['prod-003', 'prod-004', 'prod-009', 'prod-008', 'prod-016'],
    featured: true,
  },
  {
    id: 'bedroom-sanctuary',
    name: 'Bedroom Sanctuary',
    slug: 'bedroom-sanctuary',
    tagline: 'Rest, Reimagined',
    description:
      'Premium beds, wardrobes, and bedside accents crafted for a bedroom that feels like a five-star retreat.',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1400&q=80',
    productIds: ['prod-001', 'prod-002', 'prod-015', 'prod-007'],
    featured: false,
  },
  {
    id: 'dining-experience',
    name: 'The Dining Experience',
    slug: 'dining-experience',
    tagline: 'Gather Around Greatness',
    description:
      'Dining tables and chairs that elevate every meal into an occasion worth savouring.',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1400&q=80',
    productIds: ['prod-005', 'prod-006'],
    featured: false,
  },
];

export default collections;
