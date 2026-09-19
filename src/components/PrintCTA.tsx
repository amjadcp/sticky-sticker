import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { trackEvent } from '../utils/analytics';
import { Printer, ExternalLink, AlertTriangle, X } from 'lucide-react';

interface PrintCTAProps {
  promptId?: string;
  promptTitle?: string;
}

export const PrintCTA: React.FC<PrintCTAProps> = ({ promptId, promptTitle }) => {
  const [showMissingUrlModal, setShowMissingUrlModal] = useState(false);

  const handlePrintClick = () => {
    trackEvent('print_cta_click', { prompt_id: promptId, prompt_title: promptTitle });

    const targetUrl = siteConfig.googleFormUrl;

    if (targetUrl && targetUrl.trim() !== '') {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } else {
      setShowMissingUrlModal(true);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-indigo-primary to-indigo-deep text-white rounded-card p-6 sm:p-8 shadow-indigo-glow space-y-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl">
          <span className="text-xs uppercase tracking-widest font-semibold text-white/80">
            Physical Sticker Order
          </span>
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white leading-tight">
            Ready to bring your artwork to life?
          </h3>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Already generated your image with Gemini? Send it to us through our order form and we&apos;ll print and ship your custom sticker.
          </p>
        </div>

        <button
          onClick={handlePrintClick}
          className="w-full sm:w-auto px-8 py-4 rounded-control bg-surface text-ink font-bold text-base hover:bg-white active:scale-[0.98] transition-all duration-200 shadow-elevated flex items-center justify-center gap-2.5 min-h-[44px] flex-shrink-0 group"
        >
          <Printer className="w-5 h-5 text-indigo-primary group-hover:scale-110 transition-transform" />
          <span>Print with {siteConfig.brandName}</span>
          <ExternalLink className="w-4 h-4 text-ink-muted ml-0.5" />
        </button>
      </div>

      {/* Missing URL Fallback Modal */}
      {showMissingUrlModal && (
        <div className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-surface rounded-card p-6 max-w-md w-full shadow-2xl border border-border-subtle space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
              <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
                <AlertTriangle className="w-5 h-5" />
                <span>Google Form Link Not Configured</span>
              </div>
              <button
                onClick={() => setShowMissingUrlModal(false)}
                className="p-1 text-ink-muted hover:text-ink rounded-md focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
              The Google Form URL configuration is missing. Please make sure <code className="bg-canvas px-1.5 py-0.5 rounded text-ink font-mono">VITE_GOOGLE_FORM_URL</code> is defined in your environment configuration file.
            </p>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowMissingUrlModal(false)}
                className="px-4 py-2 bg-indigo-primary text-white text-xs font-semibold rounded-control"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
