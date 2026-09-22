import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../config/siteConfig';
import { Sparkles, UploadCloud, ChevronLeft, ChevronRight, CheckCircle2, LayoutTemplate, Maximize2, X } from 'lucide-react';
import { useOrderModal } from '../context/OrderModalContext';

interface HeroSlide {
  id: string;
  number: string;
  type: 'intro' | 'image';
  title: string;
  category?: string;
  description?: string;
  image?: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'intro-slide',
    number: '01',
    type: 'intro',
    title: 'Custom Stickers & AI Art',
    category: 'Intro',
  },
  {
    id: 'sample-4',
    number: '02',
    type: 'image',
    title: 'GTA 3D Character Print',
    category: '3D Photo Style',
    image: '/samples/sample-4.png',
  },
  {
    id: 'sample-1',
    number: '03',
    type: 'image',
    title: 'Single Waterproof 4x6 Print',
    category: 'Anime & Character',
    image: '/samples/sample-1.png',
  },
  {
    id: 'sample-2',
    number: '04',
    type: 'image',
    title: 'Multi-Sticker Fan Pack',
    category: 'Variant Pack',
    image: '/samples/sample-2.jpg',
  },
  {
    id: 'sample-3',
    number: '05',
    type: 'image',
    title: 'Workspace & Desk Showcase',
    category: 'Vinyl Cutouts',
    image: '/samples/sample-3.jpg',
  },
];

interface HeroProps {
  onSelectCategory?: (category: string) => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const { openOrderModal } = useOrderModal();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  useEffect(() => {
    if (!isPaused) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isPaused, activeIndex]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    }
    if (distance < -minSwipeDistance) {
      prevSlide();
    }
    
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="w-full bg-canvas pb-4 pt-2 select-none">
      <div className="container-custom px-0 sm:px-4">
        
        {/* Full-Bleed Animated Hero Slide Showcase */}
        <div
          className="relative w-full overflow-hidden rounded-2xl shadow-elevated bg-slate-950 border border-border-subtle min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] flex flex-col justify-between group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* SLIDE LAYERS */}
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                idx === activeIndex
                  ? 'opacity-100 scale-100 z-10 pointer-events-auto'
                  : 'opacity-0 scale-105 z-0 pointer-events-none'
              }`}
            >
              {slide.type === 'intro' ? (
                /* SLIDE 1: Purple / Indigo Intro Banner */
                <div className="w-full h-full bg-indigo-primary text-white p-6 sm:p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden">
                  
                  {/* Ambient Glow */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="space-y-4 sm:space-y-6 relative z-10 max-w-2xl">
                    {/* Eyebrow */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold tracking-widest uppercase text-white/90 font-mono">
                        {siteConfig.brandName} / CUSTOM STICKERS
                      </span>
                      <div className="h-px w-8 bg-white/40" />
                    </div>

                    {/* Main Display Headline */}
                    <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.12] tracking-tight">
                      Turn your photos &amp; AI art into <br />
                      <span className="font-bold italic">custom stickers.</span>
                    </h1>

                    {/* Supporting Copy */}
                    <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-lg font-normal">
                      {siteConfig.heroSubheadline}
                    </p>

                    {/* Feature Badges */}
                    <div className="pt-1 flex flex-wrap gap-2 text-xs font-medium text-white/95">
                      <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5 shadow-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                        <span>Waterproof Vinyl</span>
                      </span>
                      <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5 shadow-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                        <span>Max 4x6 Inch Size</span>
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                /* SLIDE 2, 3, 4, 5: Image Showcase Slides */
                <div className="w-full h-full relative group/slide">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  
                  {/* Minimal Title Bar for Image Slides (No top badge for maximum photo visibility) */}
                  <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20 max-w-lg pointer-events-none">
                    <h2 className="text-white font-editorial text-xl sm:text-3xl font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                      {slide.title}
                    </h2>
                  </div>

                  {/* Fullscreen Button */}
                  <button
                    onClick={() => setFullScreenImage(slide.image || null)}
                    className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 p-2 sm:p-2.5 bg-black/40 hover:bg-black/70 text-white rounded-full backdrop-blur-sm border border-white/20 transition-all opacity-100 sm:opacity-0 sm:group-hover/slide:opacity-100 pointer-events-auto shadow-lg"
                    title="View Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Vertically Centered Left / Right Navigation Chevrons */}
          <div className="absolute inset-y-0 left-0 right-0 z-30 px-2 sm:px-4 flex items-center justify-between pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity">
            <button
              onClick={prevSlide}
              className="pointer-events-auto bg-black/50 hover:bg-indigo-primary text-white p-1.5 sm:p-2 rounded-full border border-white/20 shadow-lg backdrop-blur-md transition-all hover:scale-110 active:scale-95 focus:outline-none"
              title="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={nextSlide}
              className="pointer-events-auto bg-black/50 hover:bg-indigo-primary text-white p-1.5 sm:p-2 rounded-full border border-white/20 shadow-lg backdrop-blur-md transition-all hover:scale-110 active:scale-95 focus:outline-none"
              title="Next Slide"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* PERSISTENT BOTTOM BAR: Action Buttons (Left) & Thumbnail Strips (Right) */}
          <div className="relative z-30 p-2.5 sm:p-5 mt-auto flex flex-col md:flex-row md:items-end justify-between gap-2.5 sm:gap-3 pointer-events-none">
            
            {/* PERSISTENT ACTION BUTTONS (STRICT SINGLE HORIZONTAL LINE / ROW) */}
            <div className="flex flex-row flex-nowrap items-center gap-1.5 sm:gap-2.5 pointer-events-auto shrink-0">
              <button
                onClick={() => openOrderModal()}
                className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white text-ink font-bold text-[11px] sm:text-xs shadow-xl hover:bg-white/90 active:scale-[0.98] transition-all duration-200 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 min-h-[36px] sm:min-h-[40px]"
              >
                <UploadCloud className="w-3.5 h-3.5 text-indigo-primary shrink-0" />
                <span>Order Custom Sticker</span>
              </button>

              <button
                onClick={() => scrollToSection('designs')}
                className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white font-semibold text-[11px] sm:text-xs border border-white/25 transition-all duration-200 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 min-h-[36px] sm:min-h-[40px] shadow-lg"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span>Explore AI Styles</span>
              </button>
            </div>

            {/* REDUCED SIZE INTERACTIVE THUMBNAIL SLIDE STRIPS */}
            <div className="flex items-center gap-1 pointer-events-auto bg-black/40 backdrop-blur-md p-1 sm:p-1.5 rounded-xl border border-white/15 shadow-xl shrink-0">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden border transition-all duration-300 shrink-0 flex items-center justify-center ${
                    idx === activeIndex
                      ? 'border-indigo-primary ring-2 ring-indigo-primary/60 scale-105 z-10 shadow-lg'
                      : 'border-white/20 opacity-60 hover:opacity-100 hover:border-white/50'
                  }`}
                  title={slide.title}
                >
                  {slide.type === 'intro' ? (
                    <div className="w-full h-full bg-indigo-primary flex flex-col items-center justify-center text-white">
                      <LayoutTemplate className="w-3 h-3 text-white" />
                      <span className="text-[7px] font-mono font-bold mt-0.5">01</span>
                    </div>
                  ) : (
                    <>
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30" />
                      <span className="absolute bottom-0.5 left-1 text-[7px] font-mono font-bold text-white drop-shadow">
                        {slide.number}
                      </span>
                    </>
                  )}
                </button>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {fullScreenImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-8"
          onClick={() => setFullScreenImage(null)}
        >
          <button
            onClick={() => setFullScreenImage(null)}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/10 shadow-lg"
            title="Close Fullscreen"
          >
            <X className="w-6 h-6" />
          </button>
          
          <img 
            src={fullScreenImage} 
            alt="Fullscreen View" 
            className="w-full h-full max-w-7xl max-h-[90vh] object-contain rounded-lg shadow-2xl drop-shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};


