import React from 'react';
import { PRICING_TIERS } from '../data/pricing';
import { useOrderModal } from '../context/OrderModalContext';
import { UploadCloud } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const PricingTable: React.FC = () => {
  const { openOrderModal } = useOrderModal();

  return (
    <section id="pricing" className="bg-surface rounded-card border border-border-subtle p-6 sm:p-8 shadow-subtle space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-indigo-primary">
            Sticker Dimensions & Formats
          </span>
          <h2 className="font-editorial text-2xl font-bold text-ink mt-1">
            Pricing & Formats
          </h2>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto border border-border-subtle rounded-card">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-canvas border-b border-border-subtle text-xs uppercase tracking-wider text-ink-muted">
              <th className="py-3.5 px-5 font-semibold">Format Size</th>
              <th className="py-3.5 px-5 font-semibold">Starting Price</th>
              <th className="py-3.5 px-5 font-semibold">Positioning</th>
              <th className="py-3.5 px-5 font-semibold">Recommended Use</th>
            </tr>
          </thead>
          <tbody className="divide-y border-border-subtle text-sm">
            {PRICING_TIERS.map((tier) => (
              <tr key={tier.id} className="hover:bg-canvas/60 transition-colors">
                <td className="py-4 px-5 font-bold text-ink font-mono">{tier.dimensions}</td>
                <td className="py-4 px-5 font-semibold text-indigo-primary">{tier.priceINR}</td>
                <td className="py-4 px-5 text-ink-muted font-medium">{tier.positioning}</td>
                <td className="py-4 px-5 text-ink-muted text-xs">{tier.recommendedFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards View */}
      <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PRICING_TIERS.map((tier) => (
          <div
            key={tier.id}
            className="p-4 rounded-control bg-canvas border border-border-subtle flex items-center justify-between"
          >
            <div>
              <span className="font-bold text-base font-mono text-ink block">{tier.dimensions}</span>
              <span className="text-xs text-ink-muted block">{tier.positioning}</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-indigo-primary block">{tier.priceINR}</span>
              <span className="text-[10px] text-ink-muted">Starting at</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Notes & CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-border-subtle">
        <p className="text-xs text-ink-muted text-center sm:text-left">
          💡 <strong>Simple WhatsApp Ordering:</strong> Share 1) Image, 2) Size &amp; Quantity, and 3) Delivery Address directly to our WhatsApp ({siteConfig.whatsappDisplayNumber}). We print your exact image on durable vinyl sheets with clean cuts. Secure payment link sent after review; delivered within 7–12 business days.
        </p>
        <button
          onClick={() => openOrderModal()}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-primary hover:bg-indigo-dark text-white font-bold text-xs shrink-0 shadow-indigo-glow flex items-center justify-center gap-1.5 transition-all active:scale-95"
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Order Custom Sticker</span>
        </button>
      </div>
    </section>
  );
};
