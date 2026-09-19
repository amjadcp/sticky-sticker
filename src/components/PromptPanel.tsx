import React, { useState } from 'react';
import { copyToClipboard } from '../utils/clipboard';
import { trackEvent } from '../utils/analytics';
import { siteConfig } from '../config/siteConfig';
import { Copy, Check, Heart, Share2, Printer, MoreVertical, Sparkles } from 'lucide-react';
import { useOrderModal } from '../context/OrderModalContext';

interface PromptPanelProps {
  promptText: string;
  promptId: string;
  promptTitle: string;
  category?: string;
  copiesCount?: number;
  likesCount?: number;
}

export const PromptPanel: React.FC<PromptPanelProps> = ({
  promptText,
  promptId,
  promptTitle,
  copiesCount = 155,
  likesCount = 1,
}) => {
  const { openOrderModal } = useOrderModal();
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(likesCount);
  const [shared, setShared] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(promptText);
    if (success) {
      setCopied(true);
      trackEvent('prompt_copy', { prompt_id: promptId });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
    trackEvent('prompt_like', { prompt_id: promptId, is_liked: !liked });
  };

  const handleShare = async () => {
    const success = await copyToClipboard(window.location.href);
    if (success) {
      setShared(true);
      trackEvent('prompt_share', { prompt_id: promptId });
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Title & Actions Bar */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-ink leading-tight">
            {promptTitle}
          </h1>
          <button className="text-ink-muted hover:text-ink p-1 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-6 text-sm font-semibold text-ink-muted">
          {/* Copies count */}
          <div className="flex items-center gap-2">
            <Copy className="w-4 h-4" />
            <span>{copiesCount}</span>
          </div>

          {/* Likes count */}
          <button 
            onClick={handleLike} 
            className={`flex items-center gap-2 hover:text-red-500 transition-colors ${liked ? 'text-red-500' : ''}`}
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-red-500' : ''}`} />
            <span>{likes}</span>
          </button>

          {/* Share button */}
          <button 
            onClick={handleShare} 
            className="flex items-center gap-2 hover:text-ink transition-colors relative"
            title="Share Prompt"
          >
            <Share2 className="w-4 h-4" />
            {shared && (
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-ink text-white text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap">
                Link copied!
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Prompt Card */}
      <div className="bg-[#f8f8fa] border border-border-subtle rounded-2xl p-4 sm:p-5 space-y-4 shadow-subtle">
        
        {/* Card Header: Label + AI Icons */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-ink tracking-wide">
            Prompt
          </span>
          <div className="flex items-center gap-1.5">
            {/* Custom AI Icons representation */}
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-pink-500 flex items-center justify-center p-0.5 text-white">
              <Sparkles className="w-3 h-3 fill-white" />
            </div>
            <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
              G
            </div>
          </div>
        </div>

        {/* Code / Prompt Text Box */}
        <div className="bg-white border border-gray-200/80 rounded-xl p-4 max-h-[320px] overflow-y-auto no-scrollbar shadow-inner">
          <p className="font-mono text-xs sm:text-sm leading-relaxed text-gray-800 select-all whitespace-pre-wrap">
            {promptText}
          </p>
        </div>

        {/* Action Buttons Stack */}
        <div className="space-y-3 pt-1">
          
          {/* Button 1: Copy Prompt */}
          <button
            onClick={handleCopy}
            className="w-full py-3.5 px-4 bg-white hover:bg-gray-50 border border-gray-200 text-ink rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] focus:outline-none"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                <span className="text-emerald-700">Copied to clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy the prompt</span>
              </>
            )}
          </button>

          {/* Button 2: Print Your Sticker */}
          <button
            onClick={() => openOrderModal({ promptTitle, promptId })}
            className="w-full py-3.5 px-4 bg-indigo-primary hover:bg-indigo-dark text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-indigo-glow transition-all active:scale-[0.99] focus:outline-none"
          >
            <Printer className="w-4 h-4 text-white" />
            <span>Print Your Sticker</span>
          </button>

          <p className="text-[11px] text-center text-ink-muted pt-1">
            ✨ Direct print on waterproof vinyl sheets • Delivery in 7–12 business days.
          </p>

        </div>

      </div>

    </div>
  );
};
