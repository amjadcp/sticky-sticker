import React from 'react';
import { trackEvent } from '../utils/analytics';
import { Printer, UploadCloud, ArrowRight } from 'lucide-react';
import { useOrderModal } from '../context/OrderModalContext';
import { siteConfig } from '../config/siteConfig';

interface PrintCTAProps {
  promptId?: string;
  promptTitle?: string;
}

export const PrintCTA: React.FC<PrintCTAProps> = ({ promptId, promptTitle }) => {
  const { openOrderModal } = useOrderModal();

  const handlePrintClick = () => {
    trackEvent('print_cta_click', { prompt_id: promptId, prompt_title: promptTitle });
    openOrderModal({ promptId, promptTitle });
  };

  return (
    <div className="bg-gradient-to-r from-indigo-primary to-indigo-deep text-white rounded-2xl p-6 sm:p-10 shadow-indigo-glow space-y-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="space-y-2 max-w-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Physical Sticker Printing</span>
        </div>
        <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
          Ready to turn your photo into a sticker?
        </h3>
        <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
          Whether created with AI or chosen from your personal photos, order easily via WhatsApp ({siteConfig.whatsappDisplayNumber}). Just share: 1. Your image, 2. Size &amp; quantity, and 3. Delivery address. We print your exact file onto durable vinyl sheets and deliver within 7–12 business days.
        </p>
      </div>

      <button
        onClick={handlePrintClick}
        className="w-full sm:w-auto px-8 py-4 rounded-xl bg-surface text-ink font-bold text-sm sm:text-base hover:bg-white active:scale-[0.98] transition-all duration-200 shadow-elevated flex items-center justify-center gap-2.5 min-h-[48px] flex-shrink-0 group"
      >
        <Printer className="w-5 h-5 text-indigo-primary group-hover:scale-110 transition-transform" />
        <span>Order Custom Sticker</span>
        <ArrowRight className="w-4 h-4 text-ink-muted group-hover:translate-x-1 transition-transform ml-0.5" />
      </button>
    </div>
  );
};
