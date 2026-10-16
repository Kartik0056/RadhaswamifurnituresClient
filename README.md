# Radha Swami Furnitures — Frontend (Client)

React 19 + Vite frontend application for Radha Swami Furnitures.

## Technology Stack
- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 + Custom Warm Luxury Design System tokens
- **Routing**: React Router DOM v7
- **Motion & Transitions**: Framer Motion
- **Carousels**: Swiper.js
- **Icons**: Lucide React
- **SEO & Social Sharing**: React Helmet Async + JSON-LD Schemas
- **Validation**: Zod + React Hook Form

## Development Commands

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Preview production bundle
npm run preview
```

## Adding New Furniture Products

To add a new furniture product, edit `src/data/products.js`:

```javascript
{
  id: 'prod-017',
  slug: 'new-teak-dining-chair',
  name: 'New Teak Dining Chair',
  sku: 'RSF-CHR-003',
  categoryId: 'chairs',
  shortDescription: 'Ergonomic dining chair in solid seasoned Teak.',
  description: 'Detailed description of joinery, dimensions, and craftsmanship...',
  price: 14500,
  originalPrice: 16500,
  currency: 'INR',
  images: [
    'https://images.unsplash.com/...',
  ],
  thumbnail: 'https://images.unsplash.com/...',
  material: 'Solid Teak Wood',
  finish: 'Honey Teak',
  colours: [{ name: 'Honey Teak', hex: '#B8860B' }],
  dimensions: { length: '50 cm', width: '52 cm', height: '85 cm', unit: 'cm' },
  specifications: [
    { label: 'Wood', value: 'Seasoned Teak' },
    { label: 'Max Load', value: '120 kg' },
  ],
  availability: 'in-stock', // 'in-stock' | 'made-to-order' | 'out-of-stock'
  featured: false,
  bestseller: false,
  newArrival: true,
  tags: ['chair', 'teak', 'dining'],
  careInstructions: 'Dust with a clean microfibre cloth.',
  createdAt: '2026-10-16',
}
```
