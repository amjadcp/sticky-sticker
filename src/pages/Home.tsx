import React, { useState, useEffect, useMemo } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { DualPathSection } from '../components/DualPathSection';
import { TrustBadges } from '../components/TrustBadges';
import { CategoryFilters } from '../components/CategoryFilters';
import { PromptGallery } from '../components/PromptGallery';
import { Footer } from '../components/Footer';
import { PrintCTA } from '../components/PrintCTA';
import { PROMPTS } from '../data/prompts';
import { Category } from '../types/prompt';
import { siteConfig } from '../config/siteConfig';
import { trackEvent } from '../utils/analytics';

const CATEGORIES: Category[] = [
  'All',
  'Cinematic',
  'Cartoon',
  'Anime-Inspired',
  'Clay & 3D',
  'Comic',
  'Poster',
  'Photo Effects',
];

export const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Update SEO Title & Meta Tag
  useEffect(() => {
    document.title = siteConfig.defaultMetaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', siteConfig.defaultMetaDescription);
    }
  }, []);

  const handleSelectCategory = (category: Category | string) => {
    const validCat = category as Category;
    setSelectedCategory(validCat);
    trackEvent('category_select', { category: validCat });
  };

  const filteredPrompts = useMemo(() => {
    let list = selectedCategory === 'All'
      ? PROMPTS.filter((p) => p.published !== false)
      : PROMPTS.filter((p) => p.category === selectedCategory && p.published !== false);

    if (sortBy === 'newest') {
      list = [...list].reverse();
    } else if (sortBy === 'popular') {
      list = [...list].sort((a, b) => (b.isPremium ? 1 : 0) - (a.isPremium ? 1 : 0));
    }

    return list;
  }, [selectedCategory, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <Header />

      {/* Main Content */}
      <main className="flex-1 space-y-4 sm:space-y-6">
        
        {/* Full-Bleed 4-Column Hero Banner */}
        <Hero onSelectCategory={handleSelectCategory} />

        {/* Two Clear Ways to Order (AI Prompts or Direct Photo Upload) */}
        <DualPathSection />

        {/* Prompt Gallery & Filters Container */}
        <section id="designs" className="container-custom py-2 space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pt-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-primary">
                AI Inspiration Gallery
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-ink mt-0.5">
                Popular Design Styles
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-ink-muted">
              Pick a style to generate in Gemini/ChatGPT, then print with us from ₹49.
            </p>
          </div>

          {/* Category Filter Pills & Sort Bar */}
          <CategoryFilters
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {/* 5-Column Masonry Prompt Gallery */}
          <PromptGallery prompts={filteredPrompts} />
        </section>

        {/* E-Commerce Trust Badges */}
        <TrustBadges />

        {/* Bottom CTA Section */}
        <section className="container-custom pb-6">
          <PrintCTA />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
