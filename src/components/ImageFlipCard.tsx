import React, { useState } from 'react';
import { RotateCw, Sparkles, Camera, Eye } from 'lucide-react';

interface ImageFlipCardProps {
  resultImage: string;
  referenceImage: string;
  altText: string;
  aspectRatio?: string;
  onFlipToggle?: (isFlipped: boolean) => void;
}

export const ImageFlipCard: React.FC<ImageFlipCardProps> = ({
  resultImage,
  referenceImage,
  altText,
  aspectRatio = 'portrait',
  onFlipToggle,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [frontLoaded, setFrontLoaded] = useState(false);
  const [backLoaded, setBackLoaded] = useState(false);

  const handleFlip = () => {
    const nextFlipped = !isFlipped;
    setIsFlipped(nextFlipped);
    if (onFlipToggle) {
      onFlipToggle(nextFlipped);
    }
  };

  return (
    <div className="relative group w-full select-none">
      {/* 3D Flip Container */}
      <div
        className="w-full relative cursor-pointer"
        style={{ perspective: '1200px' }}
        onClick={handleFlip}
      >
        <div
          className="w-full relative transition-transform duration-700 ease-in-out transform-gpu"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* FRONT SIDE: Generated AI Result */}
          <div
            className="w-full aspect-[2/3] rounded-2xl overflow-hidden bg-slate-950 border border-border-subtle shadow-elevated relative flex items-center justify-center"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Front Loading Animation Overlay */}
            {!frontLoaded && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center gap-3 z-20 transition-opacity duration-300">
                <div className="relative flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                  <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse absolute" />
                </div>
                <span className="text-xs font-semibold text-slate-300 tracking-wide font-sans animate-pulse">
                  Loading AI Result...
                </span>
              </div>
            )}

            {/* Ambient Ambient Blur Layer for visual depth */}
            <img
              src={resultImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-110 pointer-events-none"
            />

            {/* AI Result Image - Full Uncut Display */}
            <img
              src={resultImage}
              alt={`${altText} - AI Result`}
              onLoad={() => setFrontLoaded(true)}
              className={`relative z-0 w-full h-full object-contain block transition-opacity duration-300 ${
                frontLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Front Top Overlay Bar (No Collision / Flex Container) */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none z-10">
              <div className="bg-black/80 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold px-2.5 py-1.2 sm:px-3 sm:py-1.5 rounded-full border border-white/20 flex items-center gap-1.5 shadow-md shrink-0 pointer-events-auto">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 animate-pulse shrink-0" />
                <span className="whitespace-nowrap">AI Result</span>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFlip();
                }}
                className="bg-white/95 hover:bg-white text-ink font-semibold text-[11px] sm:text-xs px-2.5 py-1.2 sm:px-3 sm:py-1.5 rounded-full border border-border-subtle shadow-lg flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 shrink-0 pointer-events-auto"
                title="Click to flip and see reference image"
              >
                <RotateCw className="w-3.5 h-3.5 text-indigo-primary shrink-0" />
                <span className="font-semibold text-indigo-primary whitespace-nowrap">See Reference</span>
              </button>
            </div>

            {/* Bottom Floating Hint Overlay */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 max-w-[90%] bg-black/75 backdrop-blur-md text-white/90 text-[11px] font-medium px-3.5 py-1.5 rounded-full border border-white/15 opacity-90 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1.5 shadow-sm whitespace-nowrap z-10">
              <Eye className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
              <span className="truncate">Click image to flip card</span>
            </div>
          </div>

          {/* BACK SIDE: Original Reference Photo */}
          <div
            className="w-full aspect-[2/3] rounded-2xl overflow-hidden bg-slate-950 border border-border-subtle shadow-elevated absolute inset-0 flex items-center justify-center"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            {/* Back Loading Animation Overlay */}
            {!backLoaded && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center gap-3 z-20 transition-opacity duration-300">
                <div className="relative flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                  <Camera className="w-5 h-5 text-indigo-400 animate-pulse absolute" />
                </div>
                <span className="text-xs font-semibold text-slate-300 tracking-wide font-sans animate-pulse">
                  Loading Reference...
                </span>
              </div>
            )}

            {/* Ambient Ambient Blur Layer for visual depth */}
            <img
              src={referenceImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-110 pointer-events-none"
            />

            {/* Reference Image - Full Uncut Display */}
            <img
              src={referenceImage}
              alt={`${altText} - Original Reference`}
              onLoad={() => setBackLoaded(true)}
              className={`relative z-0 w-full h-full object-contain block transition-opacity duration-300 ${
                backLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Back Top Overlay Bar (No Collision / Flex Container) */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none z-10">
              <div className="bg-indigo-primary/95 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold px-2.5 py-1.2 sm:px-3 sm:py-1.5 rounded-full border border-white/20 flex items-center gap-1.5 shadow-md shrink-0 pointer-events-auto">
                <Camera className="w-3.5 h-3.5 text-white shrink-0" />
                <span className="whitespace-nowrap">Original Photo</span>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFlip();
                }}
                className="bg-white/95 hover:bg-white text-ink font-semibold text-[11px] sm:text-xs px-2.5 py-1.2 sm:px-3 sm:py-1.5 rounded-full border border-border-subtle shadow-lg flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 shrink-0 pointer-events-auto"
                title="Click to flip back to sticker"
              >
                <RotateCw className="w-3.5 h-3.5 text-indigo-primary shrink-0" />
                <span className="font-semibold text-indigo-primary whitespace-nowrap">See Sticker</span>
              </button>
            </div>

            {/* Bottom Floating Hint Overlay */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 max-w-[90%] bg-black/80 backdrop-blur-md text-white/90 text-[11px] font-medium px-3.5 py-1.5 rounded-full border border-white/15 pointer-events-none flex items-center gap-1.5 shadow-sm whitespace-nowrap z-10">
              <Camera className="w-3.5 h-3.5 text-indigo-300 shrink-0" />
              <span className="truncate">Uploaded reference photo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Helper Bar Below Card */}
      <div className="mt-2.5 flex items-center justify-between gap-2 text-xs text-ink-muted px-0.5">
        <div className="flex items-center gap-1.5 font-medium shrink-0 min-w-0">
          <span className={`w-2 h-2 rounded-full ${isFlipped ? 'bg-amber-500' : 'bg-emerald-500'} shrink-0 animate-pulse`}></span>
          <span className="truncate text-[11px] sm:text-xs">
            {isFlipped ? 'Viewing: Original Reference' : 'Viewing: AI Result'}
          </span>
        </div>
        <button
          type="button"
          onClick={handleFlip}
          className="font-semibold text-indigo-primary hover:text-indigo-deep hover:underline flex items-center gap-1 transition-colors text-[11px] sm:text-xs shrink-0 whitespace-nowrap"
        >
          <RotateCw className="w-3.5 h-3.5 shrink-0" />
          <span>{isFlipped ? 'Flip to Sticker' : 'Flip to Reference'}</span>
        </button>
      </div>
    </div>
  );
};
