import { PricingTier } from '../types/prompt';

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'price-2x2',
    dimensions: '2 × 2 in',
    priceINR: '₹48',
    positioning: 'Mini sticker',
    recommendedFor: 'Laptops, phone cases, small notebooks',
  },
  {
    id: 'price-2x3',
    dimensions: '2 × 3 in',
    priceINR: '₹48',
    positioning: 'Small portrait',
    recommendedFor: 'Water bottles, journals, phone covers',
  },
  {
    id: 'price-3x3',
    dimensions: '3 × 3 in',
    priceINR: '₹78',
    positioning: 'Square character',
    recommendedFor: 'Avatars, badges, laptop lid centers',
  },
  {
    id: 'price-3x4',
    dimensions: '3 × 4 in',
    priceINR: '₹78',
    positioning: 'Standard portrait',
    recommendedFor: 'Personalised portraits, art prints',
  },
  {
    id: 'price-4x4',
    dimensions: '4 × 4 in',
    priceINR: '₹98',
    positioning: 'Large square',
    recommendedFor: 'Vehicle windows, skateboards, wall accents',
  },
  {
    id: 'price-4x5',
    dimensions: '4 × 5 in',
    priceINR: '₹98',
    positioning: 'Large portrait',
    recommendedFor: 'Binder covers, wall decals',
  },
  {
    id: 'price-4x6',
    dimensions: '4 × 6 in',
    priceINR: '₹98',
    positioning: 'Poster-size sticker',
    recommendedFor: 'Frameable vinyl stickers, gift keepsakes',
  },
];
