import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PromptItem } from '../types/prompt';
import { Sparkles } from 'lucide-react';

interface PromptCardProps {
  prompt: PromptItem;
}

export const PromptCard: React.FC<PromptCardProps> = ({ prompt }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      to={`/prompt/${prompt.slug}`}
      className="group block relative rounded-[18px] overflow-hidden bg-softGray border border-border-subtle shadow-subtle hover:shadow-elevated transition-all duration-300 transform focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-primary"
    >
      <div className={`relative w-full h-full ${
        prompt.aspectRatio === 'tall' ? 'aspect-[3/4]' : prompt.aspectRatio === 'square' ? 'aspect-square' : 'aspect-[4/5]'
      }`}>
        
        {/* Skeleton Loader */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-softGray animate-pulse flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-ink-muted/30" />
          </div>
        )}

        {/* Image */}
        <img
          src={prompt.coverImage}
          alt={prompt.title}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />

        {/* Hover State Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-4 pointer-events-none">
          
          {/* Top Row: Like Button */}
          <div className="flex justify-end transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300 pointer-events-auto">
            <button className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-xl border border-white/10 hover:bg-black/80 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              <span className="text-xs font-semibold">1</span>
            </button>
          </div>

          {/* Bottom Row: Category & Title */}
          <div className="space-y-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <div className="text-white/80 text-[10px] font-bold uppercase tracking-wider">
              {prompt.category}
            </div>
            <h3 className="text-white font-editorial text-lg font-bold leading-tight line-clamp-2 drop-shadow-md">
              {prompt.title}
            </h3>
          </div>
        </div>


      </div>
    </Link>
  );
};
