import React, { useState, useEffect, useMemo } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
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
      {/* Header (No Search, No Join Now, No Notifications, No Profile) */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 space-y-6">
        
        {/* Full-Bleed 4-Column Hero Banner (Pixvu Style) */}
        <Hero onSelectCategory={handleSelectCategory} />

        {/* Prompt Gallery & Filters Container */}
        <section id="designs" className="container-custom py-2 space-y-4">
          
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

        {/* Bottom CTA Section */}
        <section className="container-custom pt-8 pb-4">
          <div className="space-y-3 text-center max-w-2xl mx-auto mb-8">
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-ink">
              Made for your photos.
            </h2>
            <p className="text-sm text-ink-muted leading-relaxed">
              Found your favourite prompt direction? Copy it, create your image in Gemini, then send it to {siteConfig.brandName} for high quality physical sticker printing.
            </p>
          </div>
          <PrintCTA />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
