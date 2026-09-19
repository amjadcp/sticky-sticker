import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { ArrowRight } from 'lucide-react';

interface StripItem {
  number: string;
  category: string;
  label: string;
  image: string;
}

const HERO_STRIPS: StripItem[] = [
  {
    number: '01',
    category: 'Cinematic',
    label: '01 / CINEMATIC',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
  },
  {
    number: '02',
    category: 'Clay & 3D',
    label: '02 / CLAY & 3D',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
  },
  {
    number: '03',
    category: 'Cartoon',
    label: '03 / CARTOON',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
  },
];

interface HeroProps {
  onSelectCategory?: (category: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectCategory }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStripClick = (category: string) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    }
    scrollToSection('designs');
  };

  return (
    <section className="w-full bg-canvas pb-6 pt-2">
      <div className="container-custom px-0 sm:px-4">
        
        {/* 5-Column Full-Bleed Banner Grid (Pixvu Reference Style - Wider text column) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-1.5 sm:gap-2 rounded-2xl overflow-hidden shadow-elevated bg-ink">
          
          {/* Column 1 (Spans 2): Vivid Indigo Text Block */}
          <div className="lg:col-span-2 bg-indigo-primary text-white p-8 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[460px] lg:min-h-[540px]">
            <div className="space-y-6">
              
              {/* Eyebrow */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-widest uppercase text-white/90">
                  {siteConfig.brandName} / VISUAL DIRECTIONS
                </span>
                <div className="h-px w-8 bg-white/40" />
              </div>

              {/* Main Display Headline */}
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight">
                Find the <br />
                <span className="font-bold">look.</span> <br />
                <span className="italic">Make it yours.</span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-xs font-normal">
                {siteConfig.heroSubheadline}
              </p>
            </div>

            {/* Primary Action Pill Button */}
            <div className="pt-6">
              <button
                onClick={() => scrollToSection('designs')}
                className="px-6 py-3.5 rounded-full bg-white text-ink font-bold text-sm shadow-md hover:bg-white/90 active:scale-[0.98] transition-all duration-200 inline-flex items-center gap-2 group min-h-[44px]"
              >
                <span>View Designs</span>
                <ArrowRight className="w-4 h-4 text-ink group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Columns 2, 3, 4: Tall Vertical Visual Strips */}
          {HERO_STRIPS.map((strip) => (
            <div
              key={strip.number}
              onClick={() => handleStripClick(strip.category)}
              className="relative group cursor-pointer overflow-hidden min-h-[300px] sm:min-h-[380px] lg:min-h-[540px] bg-softGray"
            >
              <img
                src={strip.image}
                alt={strip.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
              />
              
              {/* Dark Gradient Overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              {/* Bottom Label Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded">
                  {strip.label}
                </span>
                <span className="text-xs font-medium text-white/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};
