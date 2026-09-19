import React, { createContext, useContext, useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { trackEvent } from '../utils/analytics';
import {
  X,
  ExternalLink,
  UploadCloud,
  ShieldCheck,
  CreditCard,
  Truck,
  Droplets,
  Scissors,
  Check,
  AlertTriangle,
} from 'lucide-react';

interface OrderModalContextType {
  isOrderModalOpen: boolean;
  openOrderModal: (data?: { promptTitle?: string; promptId?: string }) => void;
  closeOrderModal: () => void;
}

const OrderModalContext = createContext<OrderModalContextType | undefined>(undefined);

export const OrderModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [orderContext, setOrderContext] = useState<{ promptTitle?: string; promptId?: string }>({});

  const openOrderModal = (data?: { promptTitle?: string; promptId?: string }) => {
    if (data) {
      setOrderContext(data);
    } else {
      setOrderContext({});
    }
    setIsOpen(true);
    trackEvent('order_modal_open', {
      prompt_title: data?.promptTitle,
      prompt_id: data?.promptId,
    });
  };

  const closeOrderModal = () => {
    setIsOpen(false);
  };

  const handleProceedToForm = () => {
    trackEvent('order_form_continue', {
      prompt_title: orderContext.promptTitle,
      prompt_id: orderContext.promptId,
    });

    const targetUrl = siteConfig.googleFormUrl;
    if (targetUrl && targetUrl.trim() !== '') {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
      setIsOpen(false);
    }
  };

  const isFormConfigured = Boolean(siteConfig.googleFormUrl && siteConfig.googleFormUrl.trim() !== '');

  return (
    <OrderModalContext.Provider value={{ isOrderModalOpen: isOpen, openOrderModal, closeOrderModal }}>
      {children}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/75 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div
            className="bg-surface rounded-2xl border border-border-subtle shadow-elevated w-full max-w-lg overflow-hidden my-8 relative"
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-modal-title"
          >
            {/* Header Banner */}
            <div className="bg-canvas border-b border-border-subtle p-6 sm:p-7 relative">
              <button
                onClick={closeOrderModal}
                className="absolute top-5 right-5 p-2 rounded-full text-ink-muted hover:text-ink hover:bg-softGray transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-light text-indigo-primary text-[11px] font-bold uppercase tracking-wider mb-2.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Custom Print Intake</span>
              </div>

              <h2 id="order-modal-title" className="font-editorial text-2xl sm:text-3xl font-bold text-ink leading-tight">
                Order Your Custom Sticker
              </h2>

              <p className="text-xs sm:text-sm text-ink-muted mt-1.5 leading-relaxed">
                {orderContext.promptTitle ? (
                  <>
                    Generated your artwork using the <strong className="text-ink font-semibold">&ldquo;{orderContext.promptTitle}&rdquo;</strong> prompt? Upload your finished, ready-to-print image below.
                  </>
                ) : (
                  'Upload your finished image file (already generated AI artwork or personal photo) to print on waterproof vinyl sheets.'
                )}
              </p>
            </div>

            {/* Modal Body: The 3 Simple Steps */}
            <div className="p-6 sm:p-7 space-y-5">
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                  How Your Order Works (3 Simple Steps)
                </h3>

                {/* Step 1 */}
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-canvas border border-border-subtle/80">
                  <div className="w-8 h-8 rounded-lg bg-indigo-primary text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-sm">
                    1
                  </div>
                  <div className="space-y-0.5 text-xs">
                    <span className="font-bold text-ink text-sm block">Submit Your Ready Image</span>
                    <p className="text-ink-muted leading-relaxed">
                      Upload your final image, select your sticker size (from 2&quot;x2&quot; to 4&quot;x6&quot;), quantity, and delivery address.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-canvas border border-border-subtle/80">
                  <div className="w-8 h-8 rounded-lg bg-surface border border-border-subtle text-ink flex items-center justify-center shrink-0 text-xs font-bold shadow-sm">
                    2
                  </div>
                  <div className="space-y-0.5 text-xs">
                    <span className="font-bold text-ink text-sm block">Printed As Uploaded (No Edits)</span>
                    <p className="text-ink-muted leading-relaxed">
                      We print your exact uploaded image on premium vinyl sheets with clean, neat cuts. Please make sure your image is final.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-canvas border border-border-subtle/80">
                  <div className="w-8 h-8 rounded-lg bg-surface border border-border-subtle text-ink flex items-center justify-center shrink-0 text-xs font-bold shadow-sm">
                    3
                  </div>
                  <div className="space-y-0.5 text-xs">
                    <span className="font-bold text-ink text-sm block">Secure Payment &amp; Delivery</span>
                    <p className="text-ink-muted leading-relaxed">
                      We send a secure payment link (UPI / Card / NetBanking) to confirm. Once paid, your stickers arrive within 7–12 business days!
                    </p>
                  </div>
                </div>
              </div>

              {/* Quality & Trust Highlights */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border-subtle text-center text-[11px] text-ink-muted">
                <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-softGray/50">
                  <Droplets className="w-4 h-4 text-indigo-primary" />
                  <span className="font-semibold text-ink">Waterproof Vinyl</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-softGray/50">
                  <Check className="w-4 h-4 text-indigo-primary" />
                  <span className="font-semibold text-ink">Direct 1:1 Print</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-softGray/50">
                  <Truck className="w-4 h-4 text-indigo-primary" />
                  <span className="font-semibold text-ink">7–12 Days Delivery</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 space-y-2.5">
                {isFormConfigured ? (
                  <button
                    onClick={handleProceedToForm}
                    className="w-full py-3.5 sm:py-4 px-6 rounded-xl bg-indigo-primary hover:bg-indigo-dark text-white font-bold text-sm sm:text-base shadow-indigo-glow flex items-center justify-center gap-2 group transition-all duration-200 active:scale-[0.99]"
                  >
                    <span>Continue to Order Form</span>
                    <ExternalLink className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ) : (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-xs text-amber-800">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                    <span>Google Form URL is not configured yet in environment settings.</span>
                  </div>
                )}

                <p className="text-[11px] text-center text-ink-muted">
                  🔒 We print what you upload without edits. Payment is completed after order review.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </OrderModalContext.Provider>
  );
};

export const useOrderModal = () => {
  const context = useContext(OrderModalContext);
  if (!context) {
    throw new Error('useOrderModal must be used within an OrderModalProvider');
  }
  return context;
};
