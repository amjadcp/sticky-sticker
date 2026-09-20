import { PromptItem, ImageVariant } from '../types/prompt';

// High-quality stock portrait photos used as realistic customer reference photo fallbacks
const STOCK_REFERENCE_PHOTOS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80', // Woman portrait
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80', // Man portrait
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=80', // Woman smiling portrait
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80', // Man with glasses portrait
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80', // Young woman portrait
];

/**
 * Returns the list of image variants for a prompt.
 * Each variant contains a `resultImage` (AI Result output) and a `referenceImage` (original input photo).
 */
export function getPromptVariants(prompt: PromptItem): ImageVariant[] {
  if (prompt.variants && prompt.variants.length > 0) {
    return prompt.variants;
  }

  // Fallback: Build variant pairs from coverImage and referenceImages
  const resultImages: string[] = [prompt.coverImage];
  if (prompt.referenceImages && prompt.referenceImages.length > 0) {
    prompt.referenceImages.forEach((img) => {
      if (!resultImages.includes(img)) {
        resultImages.push(img);
      }
    });
  }

  return resultImages.map((resultImg, idx) => ({
    id: `variant-${idx + 1}`,
    resultImage: resultImg,
    referenceImage: STOCK_REFERENCE_PHOTOS[idx % STOCK_REFERENCE_PHOTOS.length],
    label: `Style Variant ${idx + 1}`,
  }));
}
