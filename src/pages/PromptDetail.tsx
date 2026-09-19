import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { PromptPanel } from '../components/PromptPanel';
import { RelatedPrompts } from '../components/RelatedPrompts';
import { PROMPTS } from '../data/prompts';
import { getRelatedPrompts } from '../utils/relatedPrompts';
import { siteConfig } from '../config/siteConfig';
import { trackEvent } from '../utils/analytics';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export const PromptDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const prompt = useMemo(() => {
    return PROMPTS.find((p) => p.slug === slug);
  }, [slug]);

  const relatedPrompts = useMemo(() => {
    if (!prompt) return [];
    return getRelatedPrompts(prompt, PROMPTS, 4);
  }, [prompt]);

  // Handle SEO & Event Tracking
  useEffect(() => {
    if (prompt) {
      document.title = `${prompt.title} — AI Prompt | ${siteConfig.brandName}`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          prompt.description || `Copy the ${prompt.title} AI prompt for Gemini and order custom stickers with ${siteConfig.brandName}.`
        );
      }
      trackEvent('prompt_open', { prompt_id: prompt.id, prompt_title: prompt.title });
    } else {
      document.title = `Design Not Found — ${siteConfig.brandName}`;
    }
    setSelectedImageIndex(0);
  }, [prompt, slug]);

  const galleryImages = useMemo(() => {
    if (!prompt) return [];
    if (prompt.referenceImages && prompt.referenceImages.length > 0) {
      return Array.from(new Set([prompt.coverImage, ...prompt.referenceImages]));
    }
    return [prompt.coverImage];
  }, [prompt]);

  if (!prompt) {
    return (
      <div className="min-h-screen flex flex-col bg-canvas text-ink">
        <Header />
        <main className="flex-1 container-custom py-20 flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-softGray text-ink-muted flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-indigo-primary" />
          </div>
          <h1 className="font-editorial text-3xl font-bold text-ink">Design Not Found</h1>
          <p className="text-sm text-ink-muted max-w-md">
            The requested prompt design could not be found or may have been updated.
          </p>
          <Link
            to="/"
            className="px-6 py-3 bg-indigo-primary text-white font-semibold text-sm rounded-control hover:bg-indigo-deep transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all designs</span>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f0f2] text-ink">
      <Header />

      <main className="flex-1 container-custom py-6 sm:py-8 space-y-8">
        
        {/* Back Link */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-ink-muted hover:text-indigo-primary transition-colors focus:outline-none"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to designs</span>
          </Link>
        </div>

        {/* Modal-Style Main Container Panel */}
        <div className="bg-white rounded-3xl p-4 sm:p-8 shadow-elevated border border-border-subtle">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT: Image Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative rounded-2xl overflow-hidden bg-softGray border border-border-subtle shadow-subtle">
                <img
                  src={galleryImages[selectedImageIndex] || prompt.coverImage}
                  alt={prompt.title}
                  className="w-full h-auto object-cover max-h-[580px] w-full"
                />
              </div>

              {/* Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
                  {galleryImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedImageIndex(idx);
                        trackEvent('reference_view', { prompt_id: prompt.id, image_index: idx });
                      }}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 focus:outline-none ${
                        selectedImageIndex === idx
                          ? 'border-indigo-primary ring-2 ring-indigo-primary/20 scale-105'
                          : 'border-border-subtle opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt={`Reference ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Prompt & Actions Column */}
            <div className="lg:col-span-6">
              <PromptPanel
                promptText={prompt.promptText}
                promptId={prompt.id}
                promptTitle={prompt.title}
                category={prompt.category}
              />
            </div>

          </div>

          {/* Suggestions Section inside/below the main card */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <RelatedPrompts prompts={relatedPrompts} />
          </div>
        </div>

        {/* Related Prompts */}
        <div className="mt-8">
          {/* Main Suggestions content */}
        </div>

      </main>

      <Footer />
    </div>
  );
};
