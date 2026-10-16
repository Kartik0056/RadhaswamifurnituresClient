import { motion } from 'framer-motion';
import SEO from '../components/common/SEO';
import HeroSlider from '../components/home/HeroSlider';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedProducts from '../components/home/FeaturedProducts';
import BrandIntroduction from '../components/home/BrandIntroduction';
import FeaturedCollectionBanner from '../components/home/FeaturedCollectionBanner';
import CuratedTabs from '../components/home/CuratedTabs';
import BrandBenefits from '../components/home/BrandBenefits';
import EditorialInspiration from '../components/home/EditorialInspiration';
import Testimonials from '../components/home/Testimonials';
import NewsletterSection from '../components/home/NewsletterSection';
import ClosingCta from '../components/home/ClosingCta';
import siteConfig from '../config/siteConfig';

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <SEO
        title="Radha Swami Furnitures — Handcrafted Luxury Furniture"
        description={siteConfig.brand.description}
      />

      {/* A. Hero Slider */}
      <HeroSlider />

      {/* B. Category Collection */}
      <CategoryGrid />

      {/* C. Featured Products */}
      <FeaturedProducts />

      {/* D. Brand Introduction */}
      <BrandIntroduction />

      {/* E. Featured Collection */}
      <FeaturedCollectionBanner />

      {/* F. Best Sellers / New Arrivals */}
      <CuratedTabs />

      {/* G. Brand Benefits */}
      <BrandBenefits />

      {/* H. Editorial Inspiration */}
      <EditorialInspiration />

      {/* I. Customer Testimonials */}
      <Testimonials />

      {/* J. Newsletter */}
      <NewsletterSection />

      {/* K. Final CTA */}
      <ClosingCta />
    </motion.div>
  );
}
