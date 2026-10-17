import { Helmet } from 'react-helmet-async';
import siteConfig from '../../config/siteConfig';

export default function SEO({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  productSchema,
  breadcrumbs,
  categorySchema,
}) {
  const fullTitle = title
    ? `${title} | ${siteConfig.brand.name}`
    : `${siteConfig.brand.name} — Luxury Handcrafted Furniture in Ludhiana`;
  const metaDescription =
    description ||
    'Discover handcrafted solid Sheesham, Teak, and Mango wood luxury furniture at Radha Swami Furnitures, Ludhiana. Bespoke sofas, king beds, dining tables, and wardrobes.';
  const canonicalUrl = canonical
    ? `${siteConfig.seo.siteUrl}${canonical}`
    : siteConfig.seo.siteUrl;
  const shareImage = ogImage || siteConfig.seo.ogImage;

  // 1. Google Sitelinks Searchbox Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.brand.name,
    alternateName: ['Radha Swami Furniture', 'RSF Ludhiana'],
    url: siteConfig.seo.siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.seo.siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // 2. High-Precision LocalBusiness / FurnitureStore Schema for Google Maps & Local SEO
  const storeSchema = {
    '@context': 'https://schema.org',
    '@type': 'FurnitureStore',
    '@id': `${siteConfig.seo.siteUrl}/#store`,
    name: siteConfig.brand.name,
    image: [
      shareImage,
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80',
    ],
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    url: siteConfig.seo.siteUrl,
    priceRange: '₹₹₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Credit Card, UPI, Net Banking',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.901,
      longitude: 75.8573,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '10:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '11:00',
        closes: '18:00',
      },
    ],
    areaServed: [
      { '@type': 'City', name: 'Ludhiana' },
      { '@type': 'City', name: 'Chandigarh' },
      { '@type': 'City', name: 'Jalandhar' },
      { '@type': 'AdministrativeArea', name: 'Punjab' },
    ],
  };

  let structuredData = [websiteSchema, storeSchema];

  // 3. BreadcrumbList Schema
  if (breadcrumbs && breadcrumbs.length > 0) {
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: crumb.name,
        item: `${siteConfig.seo.siteUrl}${crumb.url}`,
      })),
    };
    structuredData.push(breadcrumbSchema);
  }

  // 4. Product Rich Snippets Schema (Reviews, Offer, SKU, Material)
  if (productSchema) {
    const productLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: productSchema.name,
      image: productSchema.images || [shareImage],
      description: productSchema.shortDescription || productSchema.description,
      sku: productSchema.sku,
      mpn: productSchema.sku,
      category: productSchema.categoryId,
      material: productSchema.material,
      color: productSchema.colours?.map((c) => c.name).join(', '),
      brand: {
        '@type': 'Brand',
        name: siteConfig.brand.name,
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: productSchema.currency || 'INR',
        price: productSchema.price,
        itemCondition: 'https://schema.org/NewCondition',
        availability:
          productSchema.availability === 'in-stock'
            ? 'https://schema.org/InStock'
            : 'https://schema.org/PreOrder',
        url: canonicalUrl,
        seller: {
          '@type': 'Organization',
          name: siteConfig.brand.name,
        },
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '24',
      },
    };
    structuredData.push(productLd);
  }

  // 5. CollectionPage Schema for categories
  if (categorySchema) {
    const collectionLd = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: categorySchema.name,
      description: categorySchema.description,
      url: canonicalUrl,
    };
    structuredData.push(collectionLd);
  }

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="IN-PB" />
      <meta name="geo.placename" content="Ludhiana" />
      <meta name="geo.position" content="30.9010;75.8573" />
      <meta name="ICBM" content="30.9010, 75.8573" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={shareImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="800" />
      <meta property="og:site_name" content={siteConfig.brand.name} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={shareImage} />

      {/* JSON-LD Schemas */}
      {structuredData.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
