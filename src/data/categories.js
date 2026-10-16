/**
 * Categories Data
 * ================
 * All furniture categories. Add, remove, or reorder categories here.
 * The images use Unsplash URLs — replace with your own product photography.
 */

const categories = [
  {
    id: 'beds',
    name: 'Beds',
    slug: 'beds',
    shortDescription: 'Handcrafted bed frames & headboards for restful luxury.',
    description:
      'Discover our collection of premium beds crafted from solid hardwoods. From minimalist platform beds to ornate traditional designs, each piece is built for lasting comfort and enduring style.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
    featured: true,
    order: 1,
    productCount: 0, // computed at runtime
    seo: {
      title: 'Premium Beds — Radha Swami Furnitures',
      description:
        'Explore our handcrafted beds — solid wood frames, designer headboards, and king-size platform beds built for lasting comfort.',
    },
  },
  {
    id: 'sofas',
    name: 'Sofas',
    slug: 'sofas',
    shortDescription: 'Luxurious sofas designed for comfort & conversation.',
    description:
      'Our sofas are upholstered in premium fabrics and leatherette, with kiln-dried hardwood frames for decades of use. Choose from sectionals, loveseats, chesterfields, and contemporary designs.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    featured: true,
    order: 2,
    productCount: 0,
    seo: {
      title: 'Luxury Sofas — Radha Swami Furnitures',
      description:
        'Browse our collection of premium sofas — from sectionals to chesterfields, crafted with solid frames and luxurious upholstery.',
    },
  },
  {
    id: 'dining-tables',
    name: 'Dining Tables',
    slug: 'dining-tables',
    shortDescription: 'Elegant tables where families gather & memories are made.',
    description:
      'Our dining tables are the centrepiece of your home. Handcrafted from Sheesham, Teak, and Mango Wood, available in 4-seater to 10-seater configurations with matching chairs.',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
    featured: true,
    order: 3,
    productCount: 0,
    seo: {
      title: 'Dining Tables — Radha Swami Furnitures',
      description:
        'Handcrafted dining tables in Sheesham, Teak & Mango Wood — 4 to 10 seater configurations for elegant gatherings.',
    },
  },
  {
    id: 'wardrobes',
    name: 'Wardrobes',
    slug: 'wardrobes',
    shortDescription: 'Spacious storage solutions with impeccable finishes.',
    description:
      'Maximise your storage with our solid wood wardrobes. Sliding door, hinged, and walk-in options with thoughtful interiors, soft-close drawers, and premium hardware.',
    image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&q=80',
    featured: true,
    order: 4,
    productCount: 0,
    seo: {
      title: 'Wardrobes — Radha Swami Furnitures',
      description:
        'Premium solid wood wardrobes with soft-close drawers, sliding doors, and designer finishes for modern bedrooms.',
    },
  },
  {
    id: 'chairs',
    name: 'Chairs',
    slug: 'chairs',
    shortDescription: 'Accent, dining & lounge chairs for every room.',
    description:
      'From dining chairs to statement accent pieces, our collection features ergonomic designs in solid wood, upholstered finishes, and cane-back heritage styles.',
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80',
    featured: false,
    order: 5,
    productCount: 0,
    seo: {
      title: 'Chairs — Radha Swami Furnitures',
      description:
        'Discover premium dining chairs, accent chairs & lounge seating crafted from solid wood with designer upholstery.',
    },
  },
  {
    id: 'coffee-tables',
    name: 'Coffee Tables',
    slug: 'coffee-tables',
    shortDescription: 'Statement centrepieces for your living spaces.',
    description:
      'Our coffee tables combine artistry with function. Available in solid wood, marble-top, and glass-top variants — each designed to anchor your living room with elegance.',
    image: 'https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=800&q=80',
    featured: false,
    order: 6,
    productCount: 0,
    seo: {
      title: 'Coffee Tables — Radha Swami Furnitures',
      description:
        'Premium coffee tables in solid wood, marble & glass — designed to be the centrepiece of your living room.',
    },
  },
  {
    id: 'tv-units',
    name: 'TV Units',
    slug: 'tv-units',
    shortDescription: 'Modern entertainment centres with smart storage.',
    description:
      'Sleek and functional TV units and entertainment centres with cable management, concealed storage, and premium finishes to complement your home theatre.',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80',
    featured: false,
    order: 7,
    productCount: 0,
    seo: {
      title: 'TV Units — Radha Swami Furnitures',
      description:
        'Modern TV units and entertainment centres with smart storage, cable management, and premium finishes.',
    },
  },
  {
    id: 'storage-cabinets',
    name: 'Storage & Cabinets',
    slug: 'storage-cabinets',
    shortDescription: 'Bookshelves, sideboards & display cabinets.',
    description:
      'Organise in style with our bookshelves, sideboards, crockery units, and display cabinets. Crafted from premium hardwoods with meticulous interior detailing.',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80',
    featured: false,
    order: 8,
    productCount: 0,
    seo: {
      title: 'Storage & Cabinets — Radha Swami Furnitures',
      description:
        'Bookshelves, sideboards, crockery units & display cabinets in premium solid wood with designer finishes.',
    },
  },
  {
    id: 'office-furniture',
    name: 'Office Furniture',
    slug: 'office-furniture',
    shortDescription: 'Desks & chairs for productive workspaces.',
    description:
      'Create an inspiring workspace with our solid wood desks, ergonomic chairs, and bookshelves designed for home offices and professional environments.',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80',
    featured: false,
    order: 9,
    productCount: 0,
    seo: {
      title: 'Office Furniture — Radha Swami Furnitures',
      description:
        'Premium office desks, ergonomic chairs & bookshelves crafted from solid wood for productive home offices.',
    },
  },
  {
    id: 'other-furniture',
    name: 'Other Furniture',
    slug: 'other-furniture',
    shortDescription: 'Unique pieces — console tables, shoe racks & more.',
    description:
      'Explore our curated selection of speciality furniture — console tables, shoe racks, dressing tables, bar cabinets, and more to complete every room.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    featured: false,
    order: 10,
    productCount: 0,
    seo: {
      title: 'Other Furniture — Radha Swami Furnitures',
      description:
        'Explore console tables, shoe racks, dressing tables, bar cabinets & more — unique furniture pieces for every room.',
    },
  },
];

export default categories;
