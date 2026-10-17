import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout.jsx';
import LoadingSpinner from './components/common/LoadingSpinner.jsx';

// Lazy-loaded pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const ShopPage = lazy(() => import('./pages/ShopPage.jsx'));
const ProductPage = lazy(() => import('./pages/ProductPage.jsx'));
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const SearchPage = lazy(() => import('./pages/SearchPage.jsx'));
const AdminPage = lazy(() => import('./pages/AdminPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

function App() {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingSpinner />} key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/:categorySlug" element={<ShopPage />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </Layout>
  );
}

export default App;
