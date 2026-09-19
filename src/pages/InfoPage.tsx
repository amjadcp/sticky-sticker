import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { WorkflowSteps } from '../components/WorkflowSteps';
import { PricingTable } from '../components/PricingTable';
import { PrintCTA } from '../components/PrintCTA';
import { siteConfig } from '../config/siteConfig';

export const InfoPage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = `How It Works & Pricing — ${siteConfig.brandName}`;

    // Determine target element ID from hash or pathname
    let targetId = '';
    if (location.hash) {
      targetId = location.hash.replace('#', '');
    } else if (location.pathname === '/pricing') {
      targetId = 'pricing';
    } else if (location.pathname === '/how-it-works') {
      targetId = 'how-it-works';
    }

    if (targetId) {
      const timer = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <Header />

      <main className="flex-1 container-custom py-10 space-y-16">
        
        {/* Section 1: How it Works */}
        <section id="how-it-works" className="scroll-mt-24">
          <WorkflowSteps />
        </section>

        {/* Section 2: Pricing & Formats */}
        <section id="pricing" className="scroll-mt-24">
          <PricingTable />
        </section>

        {/* Bottom CTA */}
        <section className="pt-4">
          <PrintCTA />
        </section>

      </main>

      <Footer />
    </div>
  );
};
