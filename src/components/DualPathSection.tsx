import React from 'react';
import { useOrderModal } from '../context/OrderModalContext';
import { Sparkles, UploadCloud, ArrowRight } from 'lucide-react';

export const DualPathSection: React.FC = () => {
  const { openOrderModal } = useOrderModal();

  const scrollToGallery = () => {
    const el = document.getElementById('designs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="container-custom py-4" aria-label="Two Ways to Order">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        
        {/* Track 1: Create with AI */}
        <div className="bg-surface rounded-2xl border border-border-subtle p-6 sm:p-7 shadow-subtle flex flex-col justify-between hover:border-indigo-primary/40 transition-all group">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-primary bg-indigo-light px-2.5 py-1 rounded-full flex items-center gap-1.5 shrink-0 whitespace-nowrap">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>Option A • Create with AI</span>
              </span>
              <span className="text-xs font-semibold text-ink-muted shrink-0 whitespace-nowrap">Ready Prompts</span>
            </div>

            <h3 className="font-editorial text-xl sm:text-2xl font-bold text-ink group-hover:text-indigo-primary transition-colors">
              Browse AI Styles & Prompts
            </h3>

            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
              Explore curated prompt aesthetics (cinematic, 3D clay, cartoon, vintage). Copy the prompt into <strong>Gemini, ChatGPT, or Midjourney</strong> with your photo to generate custom artwork, then send it to us to print.
            </p>
          </div>

          <div className="pt-6">
            <button
              onClick={scrollToGallery}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-canvas hover:bg-softGray border border-border-subtle text-ink font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 group/btn transition-colors"
            >
              <span>Explore AI Styles</span>
              <ArrowRight className="w-4 h-4 text-ink-muted group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Track 2: Direct Photo Upload */}
        <div className="bg-gradient-to-br from-surface to-indigo-50/40 rounded-2xl border border-indigo-primary/25 p-6 sm:p-7 shadow-subtle flex flex-col justify-between hover:border-indigo-primary transition-all group relative overflow-hidden">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1.5 shrink-0 whitespace-nowrap">
                <UploadCloud className="w-3.5 h-3.5 shrink-0" />
                <span>Option B • Direct Upload</span>
              </span>
              <span className="text-xs font-semibold text-indigo-primary font-mono shrink-0 whitespace-nowrap">From ₹49</span>
            </div>

            <h3 className="font-editorial text-xl sm:text-2xl font-bold text-ink group-hover:text-indigo-primary transition-colors">
              Already Have a Photo or Art?
            </h3>

            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
              Skip the AI completely. Have a picture of your pet, friends, family portrait, or personal photo? Send your details (Image, Size &amp; Qty, Delivery Address) directly to our WhatsApp (+91 89215 86866). We print your exact file onto durable sticker sheets with clean cuts.
            </p>
          </div>

          <div className="pt-6">
            <button
              onClick={() => openOrderModal()}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-primary hover:bg-indigo-dark text-white font-bold text-xs sm:text-sm shadow-indigo-glow inline-flex items-center justify-center gap-2 group/btn transition-all duration-200 active:scale-[0.98]"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Print Your Photo Now</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
