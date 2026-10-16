import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import AnnouncementBar from './AnnouncementBar';
import Header from './Header';
import Footer from './Footer';
import siteConfig from '../../config/siteConfig';
import { generateWhatsAppUrl } from '../../utils/helpers';

export default function Layout({ children }) {
  const { pathname, search } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, search]);

  const whatsappUrl = generateWhatsAppUrl(
    siteConfig.contact.whatsappDefaultMessage
  );

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-ivory)] text-[var(--color-charcoal)] antialiased selection:bg-[var(--color-gold)]/20 selection:text-[var(--color-espresso)]">
      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Main Header */}
      <Header />

      {/* Main Page Content */}
      <main className="flex-1 w-full">{children}</main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Quick Enquiry Button */}
      {siteConfig.contact.whatsappEnabled && whatsappUrl && (
        <aside aria-label="Quick contact" className="fixed bottom-6 right-6 z-40">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105"
            aria-label="Direct WhatsApp Enquiry"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span className="text-xs font-semibold tracking-wider uppercase pr-1 hidden sm:inline">
              WhatsApp Enquiry
            </span>
          </a>
        </aside>
      )}
    </div>
  );
}
