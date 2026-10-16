/**
 * Products Data
 * ==============
 * Sample product catalogue. All products are clearly sample/demo data.
 * Replace images with real product photography before going live.
 *
 * Schema: id, slug, name, sku, categoryId, shortDescription, description,
 *         price, originalPrice, currency, images, thumbnail, material,
 *         finish, colours, dimensions, weight, specifications, availability,
 *         featured, bestseller, newArrival, tags, careInstructions,
 *         createdAt, seo
 */

const products = [
  // ──────────────── BEDS ────────────────
  {
    id: 'prod-001',
    slug: 'aurora-sheesham-king-bed',
    name: 'Aurora Sheesham King Bed',
    sku: 'RSF-BED-001',
    categoryId: 'beds',
    shortDescription:
      'A majestic king-size bed frame in natural Sheesham with a curved headboard and brass-finished hardware.',
    description:
      'The Aurora King Bed is the centrepiece of any master bedroom. Crafted from solid Sheesham wood, it features a gracefully curved headboard with subtle grain-matched panels and brushed brass hardware. The slatted base ensures optimal mattress ventilation without the need for a box spring. Built to last generations.',
    price: 68500,
    originalPrice: 78000,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80',
    ],
    thumbnail:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80',
    material: 'Solid Sheesham Wood',
    finish: 'Natural Honey',
    colours: [
      { name: 'Natural Honey', hex: '#C6943A' },
      { name: 'Walnut Brown', hex: '#5C4033' },
    ],
    dimensions: { length: '210 cm', width: '195 cm', height: '110 cm', unit: 'cm' },
    weight: '85 kg',
    specifications: [
      { label: 'Wood Type', value: 'Sheesham (Indian Rosewood)' },
      { label: 'Headboard Height', value: '110 cm' },
      { label: 'Mattress Size', value: 'King (190 × 180 cm)' },
      { label: 'Slat System', value: 'Solid wood slats included' },
      { label: 'Assembly', value: 'Easy bolt assembly, hardware included' },
    ],
    availability: 'in-stock',
    featured: true,
    bestseller: true,
    newArrival: false,
    tags: ['king-bed', 'sheesham', 'bedroom', 'premium'],
    careInstructions:
      'Dust regularly with a soft cloth. Apply furniture polish every 3–6 months. Avoid direct sunlight and excessive moisture.',
    createdAt: '2026-08-15',
    seo: {
      title: 'Aurora Sheesham King Bed — Radha Swami Furnitures',
      description:
        'Handcrafted king-size bed in solid Sheesham wood with curved headboard and brass hardware. Premium bedroom furniture.',
    },
  },
  {
    id: 'prod-002',
    slug: 'eclipse-teak-queen-bed',
    name: 'Eclipse Teak Queen Bed',
    sku: 'RSF-BED-002',
    categoryId: 'beds',
    shortDescription:
      'Contemporary queen-size bed with clean lines and a floating base design in premium Teak.',
    description:
      'The Eclipse Queen Bed brings a sense of calm modernity to your bedroom. Its floating platform design creates an illusion of weightlessness, while the solid Teak construction provides enduring strength. The low-profile headboard features hand-finished bevelled edges.',
    price: 55000,
    originalPrice: null,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80',
    ],
    thumbnail:
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80',
    material: 'Solid Teak Wood',
    finish: 'Warm Teak',
    colours: [
      { name: 'Warm Teak', hex: '#B8860B' },
      { name: 'Dark Espresso', hex: '#3C1414' },
    ],
    dimensions: { length: '200 cm', width: '165 cm', height: '90 cm', unit: 'cm' },
    weight: '72 kg',
    specifications: [
      { label: 'Wood Type', value: 'Teak' },
      { label: 'Design', value: 'Floating platform' },
      { label: 'Mattress Size', value: 'Queen (190 × 150 cm)' },
      { label: 'Assembly', value: 'Professional assembly recommended' },
    ],
    availability: 'in-stock',
    featured: false,
    bestseller: false,
    newArrival: true,
    tags: ['queen-bed', 'teak', 'bedroom', 'modern'],
    careInstructions:
      'Wipe with a damp cloth followed by a dry cloth. Use Teak oil annually to maintain lustre.',
    createdAt: '2026-09-20',
    seo: {
      title: 'Eclipse Teak Queen Bed — Radha Swami Furnitures',
      description:
        'Modern floating platform queen bed in solid Teak wood. Clean lines, bevelled headboard, built to last.',
    },
  },

  // ──────────────── SOFAS ────────────────
  {
    id: 'prod-003',
    slug: 'windsor-chesterfield-sofa',
    name: 'Windsor Chesterfield 3-Seater Sofa',
    sku: 'RSF-SOF-001',
    categoryId: 'sofas',
    shortDescription:
      'Classic Chesterfield design with hand-tufted leatherette upholstery and rolled arms.',
    description:
      'The Windsor Chesterfield is a timeless statement piece. Featuring deep diamond tufting, generously padded rolled arms, and a kiln-dried hardwood frame, it delivers unparalleled comfort with old-world charm. The premium leatherette is easy to maintain and ages beautifully.',
    price: 52000,
    originalPrice: 62000,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&q=80',
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=1200&q=80',
    ],
    thumbnail:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    material: 'Kiln-Dried Hardwood Frame, Leatherette Upholstery',
    finish: 'Cognac Brown',
    colours: [
      { name: 'Cognac Brown', hex: '#8B4513' },
      { name: 'Forest Green', hex: '#2E4A3E' },
      { name: 'Midnight Blue', hex: '#191970' },
    ],
    dimensions: { length: '220 cm', width: '90 cm', height: '78 cm', unit: 'cm' },
    weight: '65 kg',
    specifications: [
      { label: 'Seating Capacity', value: '3 Seater' },
      { label: 'Cushion Fill', value: 'High-density foam + fibre wrap' },
      { label: 'Frame', value: 'Kiln-dried hardwood' },
      { label: 'Upholstery', value: 'Premium leatherette' },
      { label: 'Leg Material', value: 'Solid wood, turned legs' },
    ],
    availability: 'in-stock',
    featured: true,
    bestseller: true,
    newArrival: false,
    tags: ['chesterfield', 'sofa', 'living-room', 'premium', 'leatherette'],
    careInstructions:
      'Clean spills immediately with a damp cloth. Use leather conditioner every 6 months. Keep away from direct heat sources.',
    createdAt: '2026-07-01',
    seo: {
      title: 'Windsor Chesterfield 3-Seater Sofa — Radha Swami Furnitures',
      description:
        'Classic hand-tufted Chesterfield sofa in premium leatherette with a kiln-dried hardwood frame. Timeless elegance for your living room.',
    },
  },
  {
    id: 'prod-004',
    slug: 'oslo-fabric-sectional-sofa',
    name: 'Oslo L-Shape Fabric Sectional',
    sku: 'RSF-SOF-002',
    categoryId: 'sofas',
    shortDescription:
      'Modern L-shape sectional in soft woven fabric with reversible chaise and storage.',
    description:
      'The Oslo Sectional is designed for families who value comfort without compromising on style. The reversible chaise lets you configure it to fit your space, while the hidden storage compartment under the chaise adds practical utility. Upholstered in a durable, pet-friendly woven fabric.',
    price: 72000,
    originalPrice: 85000,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
    ],
    thumbnail:
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80',
    material: 'Engineered Wood Frame, Woven Fabric Upholstery',
    finish: 'Dove Grey',
    colours: [
      { name: 'Dove Grey', hex: '#A9A9A9' },
      { name: 'Warm Beige', hex: '#D2B48C' },
    ],
    dimensions: { length: '280 cm', width: '170 cm', height: '85 cm', unit: 'cm' },
    weight: '90 kg',
    specifications: [
      { label: 'Configuration', value: 'L-Shape, reversible chaise' },
      { label: 'Seating Capacity', value: '5–6 Seater' },
      { label: 'Storage', value: 'Under-chaise storage' },
      { label: 'Cushion Fill', value: 'High-resilience foam' },
    ],
    availability: 'in-stock',
    featured: true,
    bestseller: false,
    newArrival: true,
    tags: ['sectional', 'sofa', 'living-room', 'fabric', 'l-shape'],
    careInstructions:
      'Vacuum fabric regularly. Spot clean with a mild upholstery cleaner. Professional cleaning recommended annually.',
    createdAt: '2026-09-10',
    seo: {
      title: 'Oslo L-Shape Sectional Sofa — Radha Swami Furnitures',
      description:
        'Modern L-shape sectional with reversible chaise and hidden storage. Soft woven fabric, built for family comfort.',
    },
  },

  // ──────────────── DINING TABLES ────────────────
  {
    id: 'prod-005',
    slug: 'regent-sheesham-dining-table-6-seater',
    name: 'Regent Sheesham 6-Seater Dining Table',
    sku: 'RSF-DIN-001',
    categoryId: 'dining-tables',
    shortDescription:
      'A commanding 6-seater dining table with a live-edge slab and solid steel legs.',
    description:
      'The Regent Dining Table celebrates the natural beauty of Sheesham wood with a live-edge design that makes each piece truly unique. The thick solid slab sits on powder-coated steel legs for an industrial-meets-organic aesthetic. Perfect for dinner parties and daily family meals alike.',
    price: 48000,
    originalPrice: null,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&q=80',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&q=80',
    ],
    thumbnail:
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80',
    material: 'Solid Sheesham Wood, Powder-Coated Steel',
    finish: 'Natural with Matte Clear Coat',
    colours: [{ name: 'Natural', hex: '#A0785A' }],
    dimensions: { length: '180 cm', width: '90 cm', height: '76 cm', unit: 'cm' },
    weight: '55 kg',
    specifications: [
      { label: 'Seating Capacity', value: '6 Seater' },
      { label: 'Edge Style', value: 'Live edge' },
      { label: 'Leg Material', value: 'Powder-coated steel' },
      { label: 'Top Thickness', value: '4 cm solid slab' },
    ],
    availability: 'in-stock',
    featured: true,
    bestseller: true,
    newArrival: false,
    tags: ['dining-table', 'sheesham', 'live-edge', '6-seater'],
    careInstructions:
      'Use coasters to prevent heat marks. Wipe with a dry cloth after meals. Re-oil the surface every 6–12 months.',
    createdAt: '2026-06-01',
    seo: {
      title: 'Regent Sheesham 6-Seater Dining Table — Radha Swami Furnitures',
      description:
        'Live-edge 6-seater dining table in solid Sheesham with powder-coated steel legs. Each piece is one-of-a-kind.',
    },
  },
  {
    id: 'prod-006',
    slug: 'classique-marble-top-dining-set',
    name: 'Classique Marble Top 4-Seater Dining Set',
    sku: 'RSF-DIN-002',
    categoryId: 'dining-tables',
    shortDescription:
      'Elegant marble-top dining table with four matching upholstered chairs.',
    description:
      'The Classique Dining Set marries the luxury of Italian marble with the warmth of solid Mango Wood legs. The set includes four ergonomically designed chairs with padded linen seats. An elegant addition to compact dining spaces.',
    price: 62000,
    originalPrice: 72000,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&q=80',
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&q=80',
    ],
    thumbnail:
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80',
    material: 'Italian Marble Top, Solid Mango Wood Legs',
    finish: 'White Marble with Walnut Legs',
    colours: [{ name: 'White Marble / Walnut', hex: '#F5F5F0' }],
    dimensions: { length: '120 cm', width: '80 cm', height: '76 cm', unit: 'cm' },
    weight: '70 kg',
    specifications: [
      { label: 'Seating Capacity', value: '4 Seater (chairs included)' },
      { label: 'Table Top', value: 'Natural Italian marble' },
      { label: 'Chair Upholstery', value: 'Premium linen' },
      { label: 'Chair Frame', value: 'Solid Mango Wood' },
    ],
    availability: 'in-stock',
    featured: false,
    bestseller: false,
    newArrival: true,
    tags: ['dining-set', 'marble', 'mango-wood', '4-seater'],
    careInstructions:
      'Seal marble surface annually. Wipe spills immediately to avoid staining. Use placemats during meals.',
    createdAt: '2026-09-25',
    seo: {
      title: 'Classique Marble Top 4-Seater Dining Set — Radha Swami Furnitures',
      description:
        'Italian marble dining table with Mango Wood legs and four upholstered chairs. Elegant compact dining set.',
    },
  },

  // ──────────────── WARDROBES ────────────────
  {
    id: 'prod-007',
    slug: 'maison-sliding-door-wardrobe',
    name: 'Maison 3-Door Sliding Wardrobe',
    sku: 'RSF-WRD-001',
    categoryId: 'wardrobes',
    shortDescription:
      'Spacious 3-door sliding wardrobe with mirror panel and modular interiors.',
    description:
      'The Maison Wardrobe offers generous storage with a thoughtfully designed modular interior — long-hang, short-hang, shelves, and drawers. The centre mirror panel adds functionality while making your room feel more spacious. Soft-close tracks ensure silent operation.',
    price: 78000,
    originalPrice: 92000,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=1200&q=80',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&q=80',
    ],
    thumbnail:
      'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=600&q=80',
    material: 'Engineered Wood with Sheesham Veneer',
    finish: 'Classic Walnut',
    colours: [
      { name: 'Classic Walnut', hex: '#5C4033' },
      { name: 'Pearl White', hex: '#F0EAD6' },
    ],
    dimensions: { length: '240 cm', width: '65 cm', height: '220 cm', unit: 'cm' },
    weight: '120 kg',
    specifications: [
      { label: 'Doors', value: '3 sliding doors (centre mirror)' },
      { label: 'Interior', value: 'Modular — shelves, drawers, hanging rods' },
      { label: 'Track', value: 'Soft-close aluminium track' },
      { label: 'Mirror', value: 'Full-height centre panel' },
      { label: 'Assembly', value: 'Professional assembly included' },
    ],
    availability: 'made-to-order',
    featured: true,
    bestseller: false,
    newArrival: false,
    tags: ['wardrobe', 'sliding', 'mirror', 'bedroom', 'storage'],
    careInstructions:
      'Clean mirror with glass cleaner. Wipe wood surfaces with a damp cloth. Lubricate sliding tracks annually.',
    createdAt: '2026-05-15',
    seo: {
      title: 'Maison 3-Door Sliding Wardrobe — Radha Swami Furnitures',
      description:
        'Spacious 3-door sliding wardrobe with centre mirror, modular interiors, and soft-close tracks. Premium bedroom storage.',
    },
  },

  // ──────────────── CHAIRS ────────────────
  {
    id: 'prod-008',
    slug: 'vienna-cane-back-accent-chair',
    name: 'Vienna Cane-Back Accent Chair',
    sku: 'RSF-CHR-001',
    categoryId: 'chairs',
    shortDescription:
      'Mid-century inspired accent chair with natural rattan cane back and linen cushion.',
    description:
      'The Vienna Chair blends mid-century design with tropical materials. The hand-woven rattan cane backrest allows light to filter through, creating an airy, inviting presence. The solid Teak frame is paired with a removable linen seat cushion for effortless comfort.',
    price: 18500,
    originalPrice: null,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=1200&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
    ],
    thumbnail:
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80',
    material: 'Solid Teak, Natural Rattan Cane',
    finish: 'Light Oak',
    colours: [{ name: 'Light Oak', hex: '#C8AD7F' }],
    dimensions: { length: '62 cm', width: '60 cm', height: '82 cm', unit: 'cm' },
    weight: '8 kg',
    specifications: [
      { label: 'Frame', value: 'Solid Teak' },
      { label: 'Back', value: 'Hand-woven rattan cane' },
      { label: 'Cushion', value: 'Removable linen, wash separately' },
      { label: 'Max Load', value: '120 kg' },
    ],
    availability: 'in-stock',
    featured: false,
    bestseller: true,
    newArrival: false,
    tags: ['accent-chair', 'cane', 'rattan', 'mid-century', 'teak'],
    careInstructions:
      'Dust cane with a soft brush. Apply Teak oil to the frame every 6 months. Machine-wash cushion cover on gentle cycle.',
    createdAt: '2026-04-20',
    seo: {
      title: 'Vienna Cane-Back Accent Chair — Radha Swami Furnitures',
      description:
        'Mid-century Teak accent chair with hand-woven rattan cane back and removable linen cushion.',
    },
  },

  // ──────────────── COFFEE TABLES ────────────────
  {
    id: 'prod-009',
    slug: 'nebula-marble-coffee-table',
    name: 'Nebula Marble & Brass Coffee Table',
    sku: 'RSF-COF-001',
    categoryId: 'coffee-tables',
    shortDescription:
      'Statement round coffee table with white marble top and brushed brass base.',
    description:
      'The Nebula Coffee Table is an art piece disguised as furniture. The polished white marble top sits on a sculptural brushed brass base that catches light from every angle. Its compact round footprint makes it ideal for both spacious and cosy living rooms.',
    price: 32000,
    originalPrice: 38000,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=1200&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
    ],
    thumbnail:
      'https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=600&q=80',
    material: 'White Marble, Brushed Brass',
    finish: 'Polished Marble / Brushed Brass',
    colours: [{ name: 'White / Gold', hex: '#F5F5F0' }],
    dimensions: { length: '90 cm (diameter)', width: '90 cm', height: '42 cm', unit: 'cm' },
    weight: '35 kg',
    specifications: [
      { label: 'Shape', value: 'Round' },
      { label: 'Top Material', value: 'Natural white marble' },
      { label: 'Base', value: 'Brushed brass-finished steel' },
      { label: 'Anti-Slip', value: 'Felt pads included' },
    ],
    availability: 'in-stock',
    featured: true,
    bestseller: false,
    newArrival: true,
    tags: ['coffee-table', 'marble', 'brass', 'living-room', 'round'],
    careInstructions:
      'Seal marble every 6 months. Use coasters to prevent ring marks. Polish brass with a soft cloth.',
    createdAt: '2026-10-01',
    seo: {
      title: 'Nebula Marble & Brass Coffee Table — Radha Swami Furnitures',
      description:
        'Round white marble coffee table with sculptural brushed brass base. A statement centrepiece for any living room.',
    },
  },

  // ──────────────── TV UNITS ────────────────
  {
    id: 'prod-010',
    slug: 'horizon-floating-tv-unit',
    name: 'Horizon Floating TV Unit',
    sku: 'RSF-TV-001',
    categoryId: 'tv-units',
    shortDescription:
      'Wall-mounted floating TV unit with cable management and soft-close compartments.',
    description:
      'The Horizon TV Unit creates a clean, minimal look by floating off the floor. The concealed cable channels keep wires tidy, while the soft-close flap doors hide media devices. Available in two widths to suit TVs up to 65 inches.',
    price: 28000,
    originalPrice: null,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=1200&q=80',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&q=80',
    ],
    thumbnail:
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80',
    material: 'Engineered Wood with Laminate Finish',
    finish: 'Matte Charcoal',
    colours: [
      { name: 'Matte Charcoal', hex: '#36454F' },
      { name: 'Oak Woodgrain', hex: '#C8AD7F' },
    ],
    dimensions: { length: '160 cm', width: '35 cm', height: '35 cm', unit: 'cm' },
    weight: '25 kg',
    specifications: [
      { label: 'Mounting', value: 'Wall-mounted (hardware included)' },
      { label: 'TV Compatibility', value: 'Up to 65 inches' },
      { label: 'Storage', value: '2 flap-door compartments, 1 open shelf' },
      { label: 'Cable Management', value: 'Concealed rear channels' },
    ],
    availability: 'in-stock',
    featured: false,
    bestseller: false,
    newArrival: true,
    tags: ['tv-unit', 'floating', 'wall-mounted', 'living-room'],
    careInstructions:
      'Wipe with a damp cloth. Avoid abrasive cleaners on laminate surfaces.',
    createdAt: '2026-09-28',
    seo: {
      title: 'Horizon Floating TV Unit — Radha Swami Furnitures',
      description:
        'Wall-mounted floating TV unit with concealed cable management and soft-close storage. Modern minimalist design.',
    },
  },

  // ──────────────── STORAGE & CABINETS ────────────────
  {
    id: 'prod-011',
    slug: 'heritage-sheesham-bookshelf',
    name: 'Heritage Sheesham 5-Shelf Bookcase',
    sku: 'RSF-STO-001',
    categoryId: 'storage-cabinets',
    shortDescription:
      'Open-shelf Sheesham bookcase with a ladder-style design for books and décor.',
    description:
      'The Heritage Bookcase is a showpiece for your literary collection and curated objects. The progressively wider shelves create a graceful ladder silhouette, while the solid Sheesham construction ensures stability even when fully loaded.',
    price: 22000,
    originalPrice: 26000,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&q=80',
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=1200&q=80',
    ],
    thumbnail:
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80',
    material: 'Solid Sheesham Wood',
    finish: 'Warm Walnut',
    colours: [{ name: 'Warm Walnut', hex: '#5C4033' }],
    dimensions: { length: '90 cm', width: '35 cm', height: '180 cm', unit: 'cm' },
    weight: '32 kg',
    specifications: [
      { label: 'Shelves', value: '5 open shelves' },
      { label: 'Design', value: 'Ladder / A-frame' },
      { label: 'Load Capacity', value: '15 kg per shelf' },
      { label: 'Wall Anchor', value: 'Anti-tip bracket included' },
    ],
    availability: 'in-stock',
    featured: false,
    bestseller: true,
    newArrival: false,
    tags: ['bookshelf', 'sheesham', 'storage', 'study', 'ladder'],
    careInstructions:
      'Dust shelves weekly. Apply wood polish quarterly. Use the anti-tip bracket for safety.',
    createdAt: '2026-03-10',
    seo: {
      title: 'Heritage Sheesham 5-Shelf Bookcase — Radha Swami Furnitures',
      description:
        'Solid Sheesham ladder bookcase with 5 open shelves for books and décor. Timeless design, robust construction.',
    },
  },

  // ──────────────── OFFICE FURNITURE ────────────────
  {
    id: 'prod-012',
    slug: 'studio-mango-wood-desk',
    name: 'Studio Mango Wood Writing Desk',
    sku: 'RSF-OFF-001',
    categoryId: 'office-furniture',
    shortDescription:
      'Compact writing desk in solid Mango Wood with a built-in cable tray and single drawer.',
    description:
      'The Studio Desk is designed for focused work. The clean-lined solid Mango Wood surface pairs with a discreet cable management tray at the back to keep your workspace clutter-free. The soft-close drawer holds essentials within reach.',
    price: 24000,
    originalPrice: null,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1200&q=80',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&q=80',
    ],
    thumbnail:
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&q=80',
    material: 'Solid Mango Wood',
    finish: 'Natural Mango',
    colours: [
      { name: 'Natural Mango', hex: '#C19A6B' },
      { name: 'Dark Walnut', hex: '#5C4033' },
    ],
    dimensions: { length: '120 cm', width: '60 cm', height: '76 cm', unit: 'cm' },
    weight: '28 kg',
    specifications: [
      { label: 'Wood Type', value: 'Solid Mango Wood' },
      { label: 'Drawer', value: '1 soft-close drawer' },
      { label: 'Cable Management', value: 'Rear cable tray' },
      { label: 'Assembly', value: 'Bolt assembly, tools included' },
    ],
    availability: 'in-stock',
    featured: false,
    bestseller: false,
    newArrival: false,
    tags: ['desk', 'mango-wood', 'office', 'writing-desk', 'home-office'],
    careInstructions:
      'Use a desk mat to protect the surface. Wipe with a damp cloth and dry immediately. Avoid placing hot objects directly.',
    createdAt: '2026-07-15',
    seo: {
      title: 'Studio Mango Wood Writing Desk — Radha Swami Furnitures',
      description:
        'Compact solid Mango Wood writing desk with cable tray and soft-close drawer. Perfect for modern home offices.',
    },
  },

  // ──────────────── OTHER FURNITURE ────────────────
  {
    id: 'prod-013',
    slug: 'riviera-console-table',
    name: 'Riviera Sheesham Console Table',
    sku: 'RSF-OTH-001',
    categoryId: 'other-furniture',
    shortDescription:
      'Slim console table with open shelving for entryways and hallways.',
    description:
      'The Riviera Console Table makes a stylish first impression in your entryway. Its slim profile fits narrow hallways, while the lower shelf provides space for baskets, books, or decorative objects. Crafted from solid Sheesham with turned legs.',
    price: 15500,
    originalPrice: 18000,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&q=80',
    ],
    thumbnail:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    material: 'Solid Sheesham Wood',
    finish: 'Provincial Teak',
    colours: [{ name: 'Provincial Teak', hex: '#B8860B' }],
    dimensions: { length: '120 cm', width: '35 cm', height: '80 cm', unit: 'cm' },
    weight: '18 kg',
    specifications: [
      { label: 'Design', value: 'Open shelf, turned legs' },
      { label: 'Wood Type', value: 'Solid Sheesham' },
      { label: 'Shelf', value: '1 open lower shelf' },
    ],
    availability: 'in-stock',
    featured: false,
    bestseller: false,
    newArrival: false,
    tags: ['console-table', 'sheesham', 'entryway', 'hallway'],
    careInstructions:
      'Dust with a soft cloth. Apply furniture wax twice a year for added protection.',
    createdAt: '2026-02-01',
    seo: {
      title: 'Riviera Sheesham Console Table — Radha Swami Furnitures',
      description:
        'Slim Sheesham console table with open shelf for entryways and hallways. Classic turned-leg design.',
    },
  },
  {
    id: 'prod-014',
    slug: 'monarch-bar-cabinet',
    name: 'Monarch Bar Cabinet',
    sku: 'RSF-OTH-002',
    categoryId: 'other-furniture',
    shortDescription:
      'Art-deco inspired bar cabinet with wine rack, glass holders, and fluted door panels.',
    description:
      'The Monarch Bar Cabinet is designed for the entertainer. Behind the fluted glass doors, you\'ll find wine racks, glass hangers, and adjustable shelves for your spirits collection. The solid Mango Wood body features brass-finished handles and adjustable levelling feet.',
    price: 42000,
    originalPrice: null,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
    ],
    thumbnail:
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80',
    material: 'Solid Mango Wood, Fluted Glass',
    finish: 'Dark Espresso with Brass Hardware',
    colours: [{ name: 'Dark Espresso', hex: '#3C1414' }],
    dimensions: { length: '100 cm', width: '45 cm', height: '140 cm', unit: 'cm' },
    weight: '52 kg',
    specifications: [
      { label: 'Doors', value: '2 fluted glass doors' },
      { label: 'Wine Rack', value: 'Holds 8 bottles' },
      { label: 'Glass Hangers', value: '2 rows' },
      { label: 'Hardware', value: 'Brass-finished handles' },
      { label: 'Adjustable', value: 'Shelves and levelling feet' },
    ],
    availability: 'in-stock',
    featured: true,
    bestseller: false,
    newArrival: true,
    tags: ['bar-cabinet', 'mango-wood', 'entertaining', 'art-deco'],
    careInstructions:
      'Clean glass panels with glass cleaner. Wipe wood with a dry cloth. Keep brass hardware dry to prevent tarnishing.',
    createdAt: '2026-10-05',
    seo: {
      title: 'Monarch Bar Cabinet — Radha Swami Furnitures',
      description:
        'Art-deco bar cabinet in solid Mango Wood with fluted glass doors, wine rack, and brass hardware.',
    },
  },

  // ──────────────── ADDITIONAL PRODUCTS ────────────────
  {
    id: 'prod-015',
    slug: 'cambridge-upholstered-king-bed',
    name: 'Cambridge Upholstered King Bed',
    sku: 'RSF-BED-003',
    categoryId: 'beds',
    shortDescription:
      'Luxurious king bed with a tall channel-tufted headboard in premium velvet.',
    description:
      'The Cambridge King Bed exudes sophistication with its tall, channel-tufted headboard upholstered in plush velvet. The solid wood frame is hidden beneath the upholstery for a seamless, contemporary look. Under-bed clearance allows for storage.',
    price: 75000,
    originalPrice: 88000,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80',
    ],
    thumbnail:
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80',
    material: 'Solid Wood Frame, Velvet Upholstery',
    finish: 'Slate Grey Velvet',
    colours: [
      { name: 'Slate Grey', hex: '#708090' },
      { name: 'Ivory', hex: '#FFFFF0' },
      { name: 'Emerald', hex: '#2E5A4C' },
    ],
    dimensions: { length: '215 cm', width: '200 cm', height: '135 cm', unit: 'cm' },
    weight: '78 kg',
    specifications: [
      { label: 'Headboard Height', value: '135 cm' },
      { label: 'Upholstery', value: 'Premium velvet' },
      { label: 'Mattress Size', value: 'King (190 × 180 cm)' },
      { label: 'Under-Bed Clearance', value: '15 cm' },
    ],
    availability: 'in-stock',
    featured: false,
    bestseller: false,
    newArrival: true,
    tags: ['king-bed', 'upholstered', 'velvet', 'bedroom', 'channel-tufted'],
    careInstructions:
      'Vacuum velvet headboard monthly with a soft brush attachment. Spot clean stains with a fabric cleaner.',
    createdAt: '2026-10-10',
    seo: {
      title: 'Cambridge Upholstered King Bed — Radha Swami Furnitures',
      description:
        'Luxurious king bed with tall channel-tufted velvet headboard and solid wood frame. Premium bedroom centrepiece.',
    },
  },
  {
    id: 'prod-016',
    slug: 'henley-leather-recliner-chair',
    name: 'Henley Leather Recliner Chair',
    sku: 'RSF-CHR-002',
    categoryId: 'chairs',
    shortDescription:
      'Premium recliner in genuine top-grain leather with manual recline and swivel base.',
    description:
      'The Henley Recliner is the ultimate comfort chair. The top-grain leather develops a beautiful patina over time, while the high-density foam padding and wide armrests make it perfect for reading or relaxing. The manual recline mechanism is smooth and reliable.',
    price: 38000,
    originalPrice: 45000,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=1200&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
    ],
    thumbnail:
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80',
    material: 'Top-Grain Leather, Steel Frame',
    finish: 'Saddle Brown Leather',
    colours: [
      { name: 'Saddle Brown', hex: '#8B4513' },
      { name: 'Black', hex: '#1C1C1C' },
    ],
    dimensions: { length: '85 cm', width: '90 cm', height: '105 cm', unit: 'cm' },
    weight: '42 kg',
    specifications: [
      { label: 'Recline', value: 'Manual lever' },
      { label: 'Swivel', value: '360° swivel base' },
      { label: 'Leather', value: 'Top-grain, naturally tanned' },
      { label: 'Max Load', value: '130 kg' },
    ],
    availability: 'in-stock',
    featured: true,
    bestseller: false,
    newArrival: false,
    tags: ['recliner', 'leather', 'chair', 'living-room', 'swivel'],
    careInstructions:
      'Condition leather every 3–6 months. Avoid direct sunlight. Wipe spills with a dry cloth immediately.',
    createdAt: '2026-06-20',
    seo: {
      title: 'Henley Leather Recliner Chair — Radha Swami Furnitures',
      description:
        'Top-grain leather recliner with 360° swivel, manual recline, and wide padded armrests. Ultimate comfort chair.',
    },
  },
];

export default products;
