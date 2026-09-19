import React from 'react';
import { PromptItem } from '../types/prompt';
import { PromptCard } from './PromptCard';
import { ImageOff, Sparkles } from 'lucide-react';

interface PromptGalleryProps {
  prompts: PromptItem[];
  isLoading?: boolean;
}

export const PromptGallery: React.FC<PromptGalleryProps> = ({
  prompts,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="masonry-grid py-6">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="masonry-item rounded-card bg-surface p-3 space-y-3 border border-border-subtle animate-pulse">
            <div className="w-full h-56 bg-softGray rounded-card flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-ink-muted/20" />
            </div>
            <div className="h-4 bg-softGray rounded w-3/4" />
            <div className="h-3 bg-softGray rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (prompts.length === 0) {
    return (
      <div className="py-20 text-center bg-surface rounded-card border border-border-subtle my-8 max-w-lg mx-auto p-8 space-y-4">
        <div className="w-12 h-12 rounded-full bg-softGray text-ink-muted flex items-center justify-center mx-auto">
          <ImageOff className="w-6 h-6" />
        </div>
        <h3 className="font-editorial text-xl font-bold text-ink">No designs found in this category</h3>
        <p className="text-sm text-ink-muted">
          Try selecting another category or check back soon for newly published Gemini AI prompt concepts.
        </p>
      </div>
    );
  }

  return (
    <div className="masonry-grid py-6">
      {prompts.map((prompt) => (
        <div key={prompt.id} className="masonry-item">
          <PromptCard prompt={prompt} />
        </div>
      ))}
    </div>
  );
};
