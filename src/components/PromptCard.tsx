import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PromptItem } from '../types/prompt';
import { Sparkles, ShoppingBag, Heart } from 'lucide-react';

interface PromptCardProps {
  prompt: PromptItem;
}

export const PromptCard: React.FC<PromptCardProps> = ({ prompt }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1);
  const navigate = useNavigate();

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleBuyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/prompt/${prompt.slug}#print`);
  };

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

        {/* Hover State Overlay - Always visible on mobile, hover-activated on desktop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-2.5 sm:p-4 pointer-events-none">
          
          {/* Top Row: Price Tag & Like Button */}
          <div className="flex items-center justify-between gap-1 transform translate-y-0 sm:-translate-y-2 sm:group-hover:translate-y-0 transition-transform duration-300 pointer-events-auto">
            <span className="bg-black/60 backdrop-blur-md text-white/90 text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg sm:rounded-xl border border-white/15 shadow-sm whitespace-nowrap shrink-0">
              From $2.99
            </span>
            
            <button 
              onClick={handleLike}
              className={`flex items-center gap-1 sm:gap-1.5 bg-black/60 backdrop-blur-md text-white px-2 py-0.5 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl border border-white/15 hover:bg-black/80 transition-colors shrink-0 ${
                isLiked ? 'text-red-400 border-red-500/30' : ''
              }`}
            >
              <Heart className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isLiked ? 'fill-red-400 stroke-red-400' : ''}`} />
              <span className="text-[11px] sm:text-xs font-semibold">{likeCount}</span>
            </button>
          </div>

          {/* Bottom Row: Category, Title & E-Commerce Buy Button */}
          <div className="flex items-end justify-between gap-1.5 sm:gap-2.5 transform translate-y-0 sm:translate-y-2 sm:group-hover:translate-y-0 transition-transform duration-300">
            <div className="space-y-0.5 min-w-0 flex-1">
              <div className="text-white/80 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider truncate">
                {prompt.category}
              </div>
              <h3 className="text-white font-editorial text-xs sm:text-base lg:text-lg font-bold leading-snug sm:leading-tight line-clamp-2 drop-shadow-md">
                {prompt.title}
              </h3>
            </div>

            {/* E-Commerce Button */}
            <button
              onClick={handleBuyClick}
              className="shrink-0 flex items-center justify-center gap-1.5 bg-white text-black p-2 sm:px-3 sm:py-1.5 rounded-full text-xs font-bold hover:bg-neutral-100 hover:scale-105 active:scale-95 transition-all shadow-lg pointer-events-auto"
              title="Get Sticker"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-black" />
              <span className="hidden sm:inline">Get Sticker</span>
            </button>
          </div>
        </div>

      </div>
    </Link>
  );
};

