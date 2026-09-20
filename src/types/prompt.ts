export type Category =
  | 'All'
  | 'Cinematic'
  | 'Cartoon'
  | 'Anime-Inspired'
  | 'Clay & 3D'
  | 'Comic'
  | 'Poster'
  | 'Photo Effects'
  | 'Fantasy'
  | 'Couple'
  | 'Family'
  | 'Gaming-Inspired'
  | 'Retro';

export interface ImageVariant {
  id?: string;
  resultImage: string;
  referenceImage: string;
  label?: string;
}

export interface PromptItem {
  id: string;
  slug: string;
  title: string;
  category: Exclude<Category, 'All'>;
  coverImage: string;
  referenceImages?: string[];
  variants?: ImageVariant[];
  promptText: string;
  supportedTool: 'Gemini' | 'ChatGPT' | 'Midjourney' | 'Other';
  transformationType?: string;
  isPremium?: boolean;
  tags: string[];
  published?: boolean;
  sortOrder?: number;
  description?: string;
  aspectRatio?: string; // e.g. 'portrait', 'square', 'tall'
}

export interface PricingTier {
  id: string;
  dimensions: string; // e.g. "2 × 2 in"
  priceINR: string; // e.g. "₹49–59"
  positioning: string; // e.g. "Mini sticker"
  recommendedFor?: string;
}

export type AnalyticsEventType =
  | 'prompt_view'
  | 'prompt_open'
  | 'prompt_copy'
  | 'prompt_like'
  | 'prompt_share'
  | 'print_click'
  | 'print_cta_click'
  | 'category_select'
  | 'reference_view'
  | 'order_modal_open'
  | 'order_form_continue'
  | 'order_whatsapp_click';

export interface AnalyticsPayload {
  prompt_id?: string;
  category?: string;
  image_index?: number;
  prompt_title?: string;
  is_liked?: boolean;
}
