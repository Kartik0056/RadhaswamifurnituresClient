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
}) {
  const fullTitle = title
    ? `${title} | ${siteConfig.brand.name}`
    : siteConfig.seo.defaultTitle;
  const metaDescription = description || siteConfig.seo.defaultDescription;
  const canonicalUrl = canonical
    ? `${siteConfig.seo.siteUrl}${canonical}`
    : siteConfig.seo.siteUrl;
  const shareImage = ogImage || siteConfig.seo.ogImage;

  // JSON-LD structured data
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeGoodsStore',
    name: siteConfig.brand.name,
    description: siteConfig.brand.description,
    url: siteConfig.seo.siteUrl,
    telephone: siteConfig.contact.phone,
    priceRange: '₹₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.line1,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.pincode,
      addressCountry: 'IN',
    },
  };

  let structuredData = [baseSchema];

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

  if (productSchema) {
    const productLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: productSchema.name,
      image: productSchema.images,
      description: productSchema.description,
      sku: productSchema.sku,
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
      },
    };
    structuredData.push(productLd);
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={shareImage} />
      <meta property="og:site_name" content={siteConfig.brand.name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={shareImage} />

      {/* JSON-LD Schema */}
      {structuredData.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
