import React from 'react';
import { PromptItem } from '../types/prompt';
import { PromptCard } from './PromptCard';

interface RelatedPromptsProps {
  prompts: PromptItem[];
}

export const RelatedPrompts: React.FC<RelatedPromptsProps> = ({ prompts }) => {
  if (!prompts || prompts.length === 0) return null;

  return (
    <section className="space-y-4 pt-8">
      <h2 className="font-editorial text-xl font-bold text-ink">
        Suggestions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {prompts.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>
    </section>
  );
};
