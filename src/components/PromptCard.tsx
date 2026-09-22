import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PromptItem } from '../types/prompt';
import { Sparkles, Printer, Heart } from 'lucide-react';
import { useOrderModal } from '../context/OrderModalContext';

interface PromptCardProps {
  prompt: PromptItem;
}

export const PromptCard: React.FC<PromptCardProps> = ({ prompt }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1);
  const navigate = useNavigate();
  const { openOrderModal } = useOrderModal();

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <Link
      to={`/prompt/${prompt.slug}`}
      className="group block relative rounded-[18px] overflow-hidden bg-softGray border border-border-subtle shadow-subtle hover:shadow-elevated transition-all duration-300 transform focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-primary"
    >
      <div className={`relative w-full h-full bg-slate-950 flex items-center justify-center overflow-hidden ${
        prompt.aspectRatio === 'square' ? 'aspect-square' : 'aspect-[2/3]'
      }`}>
        
        {/* Loading Animation Overlay */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center gap-2 z-10 transition-opacity duration-300">
            <div className="relative flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
              <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse absolute" />
            </div>
            <span className="text-[10px] font-semibold text-slate-300 tracking-wider uppercase animate-pulse">
              Loading...
            </span>
          </div>
        )}

        {/* Ambient Blur Layer for zero-cut card container */}
        <img
          src={prompt.coverImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-110 pointer-events-none"
        />

        {/* Full Uncut Cover Image */}
        <img
          src={prompt.coverImage}
          alt={prompt.title}
          onLoad={() => setImageLoaded(true)}
          className={`relative z-0 w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03] ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />

        {/* Hover State Overlay - Always visible on mobile, hover-activated on desktop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-2.5 sm:p-4 pointer-events-none">
          
          {/* Top Row: Price Tag & Like Button */}
          <div className="flex items-center justify-between gap-1 transform translate-y-0 sm:-translate-y-2 sm:group-hover:translate-y-0 transition-transform duration-300 pointer-events-auto">
            <span className="bg-black/60 backdrop-blur-md text-white/95 text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg sm:rounded-xl border border-white/15 shadow-sm whitespace-nowrap shrink-0 font-mono">
              From ₹48
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
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openOrderModal({ promptTitle: prompt.title, promptId: prompt.id });
              }}
              className="shrink-0 flex items-center justify-center gap-1.5 bg-white text-black p-2 sm:px-3 sm:py-1.5 rounded-full text-xs font-bold hover:bg-neutral-100 hover:scale-105 active:scale-95 transition-all shadow-lg pointer-events-auto"
              title="Print Sticker in this Style"
            >
              <Printer className="w-3.5 h-3.5 text-indigo-primary" />
              <span className="hidden sm:inline">Print Sticker</span>
            </button>
          </div>
        </div>

      </div>
    </Link>
  );
};

