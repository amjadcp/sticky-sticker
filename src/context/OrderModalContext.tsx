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

// WhatsApp Brand SVG Icon
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.301-.15-1.781-.879-2.057-.979-.276-.1-.477-.15-.678.15s-.778.979-.954 1.18-.352.226-.653.075c-.301-.15-1.272-.469-2.423-1.496-.895-.798-1.5-1.784-1.675-2.085-.176-.301-.019-.464.132-.614.135-.135.301-.351.451-.527.151-.176.201-.301.301-.502.101-.201.05-.377-.025-.528-.075-.15-.678-1.633-.929-2.235-.245-.586-.494-.507-.678-.516l-.578-.01c-.201 0-.528.075-.804.377s-1.055 1.03-1.055 2.511 1.08 2.912 1.231 3.113c.151.201 2.125 3.245 5.15 4.552.72.311 1.282.497 1.72.636.724.23 1.383.198 1.904.12.58-.088 1.781-.728 2.032-1.431.251-.703.251-1.306.176-1.431-.075-.126-.276-.201-.577-.351zM12.04 2C6.54 2 2.08 6.46 2.08 11.96c0 1.93.55 3.73 1.5 5.26L2 22l4.92-1.54a9.92 9.92 0 0 0 5.12 1.5c5.5 0 9.96-4.46 9.96-9.96C22 6.46 17.54 2 12.04 2zm0 18.26c-1.68 0-3.24-.49-4.57-1.34l-.33-.21-3.03.95.97-2.95-.23-.34a8.21 8.21 0 0 1-1.32-4.41c0-4.55 3.7-8.26 8.26-8.26 4.55 0 8.26 3.7 8.26 8.26 0 4.56-3.71 8.26-8.26 8.26z" />
  </svg>
);

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

  const handleProceedToWhatsApp = () => {
    trackEvent('order_whatsapp_click', {
      prompt_title: orderContext.promptTitle,
      prompt_id: orderContext.promptId,
    });

    const styleNote = orderContext.promptTitle
      ? ` using the "${orderContext.promptTitle}" style`
      : '';

    const message = [
      `Hi ${siteConfig.brandName}! I would like to order custom stickers${styleNote}.`,
      '',
      'Here are my order details:',
      '1. Image: [Attaching image with this message]',
      '2. Size of image & Quantity: [e.g. 3"x3", 5 pcs]',
      '3. Delivery Address: [Full address with pincode & phone number]',
    ].join('\n');

    const cleanNumber = siteConfig.whatsappCleanNumber || '918590797107';
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

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
                className="absolute top-3 right-3 sm:top-5 sm:right-5 p-2 rounded-full text-ink-muted hover:text-ink hover:bg-softGray transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-2.5">
                <WhatsAppIcon className="w-3.5 h-3.5 fill-emerald-700" />
                <span>Quick WhatsApp Order</span>
              </div>

              <h2 id="order-modal-title" className="font-editorial text-2xl sm:text-3xl font-bold text-ink leading-tight">
                Order Your Custom Sticker
              </h2>

              <p className="text-xs sm:text-sm text-ink-muted mt-1.5 leading-relaxed">
                Send your order directly to our WhatsApp at{' '}
                <strong className="text-ink font-semibold">{siteConfig.whatsappDisplayNumber}</strong>.
                We print your exact uploaded image on durable waterproof vinyl sheets with clean cuts.
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-7 space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                    Details needed on WhatsApp (3 Items)
                  </h3>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Pre-filled in chat
                  </span>
                </div>

                {/* Detail 1: Image */}
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-canvas border border-border-subtle/80">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-sm">
                    1
                  </div>
                  <div className="space-y-0.5 text-xs">
                    <span className="font-bold text-ink text-sm block">Image File</span>
                    <p className="text-ink-muted leading-relaxed">
                      Attach your final, ready-to-print photo or AI-generated artwork directly in WhatsApp chat. We print it 1:1 without edits.
                    </p>
                  </div>
                </div>

                {/* Detail 2: Size & Qty */}
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-canvas border border-border-subtle/80">
                  <div className="w-8 h-8 rounded-lg bg-surface border border-border-subtle text-ink flex items-center justify-center shrink-0 text-xs font-bold shadow-sm">
                    2
                  </div>
                  <div className="space-y-0.5 text-xs">
                    <span className="font-bold text-ink text-sm block">Size of Image &amp; Quantity</span>
                    <p className="text-ink-muted leading-relaxed">
                      Mention your desired sticker size (e.g., 2&quot;x2&quot;, 3&quot;x3&quot;, or 4&quot;x6&quot;) and the number of copies you need.
                    </p>
                  </div>
                </div>

                {/* Detail 3: Delivery Address */}
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-canvas border border-border-subtle/80">
                  <div className="w-8 h-8 rounded-lg bg-surface border border-border-subtle text-ink flex items-center justify-center shrink-0 text-xs font-bold shadow-sm">
                    3
                  </div>
                  <div className="space-y-0.5 text-xs">
                    <span className="font-bold text-ink text-sm block">Delivery Address</span>
                    <p className="text-ink-muted leading-relaxed">
                      Share your full shipping address along with PIN code and mobile number for doorstep delivery within 7–12 business days.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quality & Trust Highlights */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border-subtle text-center text-[11px] text-ink-muted">
                <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-softGray/50">
                  <Droplets className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-ink">Waterproof Vinyl</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-softGray/50">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-ink">Print As Uploaded</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-softGray/50">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-ink">7–12 Days Delivery</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 space-y-2.5">
                <button
                  onClick={handleProceedToWhatsApp}
                  className="w-full py-3.5 sm:py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2.5 group transition-all duration-200 active:scale-[0.99]"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
                  <span>Send Details on WhatsApp</span>
                  <ExternalLink className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={closeOrderModal}
                  className="w-full py-2 text-sm font-semibold text-ink-muted hover:text-ink underline underline-offset-4 transition-colors"
                >
                  Cancel and close
                </button>

                <p className="text-[11px] text-center text-ink-muted leading-relaxed">
                  💬 A pre-filled message template will open automatically in WhatsApp ({siteConfig.whatsappDisplayNumber}). We review and send payment link (UPI/Card).
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
