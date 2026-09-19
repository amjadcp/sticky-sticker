import React from 'react';
import { ArrowRight } from 'lucide-react';

interface TileData {
  number: string;
  category: string;
  title: string;
  description: string;
  image: string;
}

const TILES: TileData[] = [
  {
    number: '01',
    category: 'Cinematic',
    title: 'Cinematic Poster Art',
    description: 'Dramatic lighting, wide-angle depth, and movie poster transformations.',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
  },
  {
    number: '02',
    category: 'Clay & 3D',
    title: 'Clay & Dimensional',
    description: 'Handcrafted stop-motion clay textures and vinyl toy collectible vibes.',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
  },
  {
    number: '03',
    category: 'Cartoon',
    title: 'Expressive Cartoon',
    description: 'Vibrant pop illustrations and retro comic book character styles.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
  },
];

interface FeaturedTilesProps {
  onSelectCategory?: (category: string) => void;
}

export const FeaturedTiles: React.FC<FeaturedTilesProps> = ({ onSelectCategory }) => {
  const handleClick = (category: string) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    }
    const el = document.getElementById('designs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-canvas border-b border-border-subtle">
      <div className="container-custom">
        
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-primary">
              Curated Directions
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-ink mt-1">
              Featured Visual Strips
            </h2>
          </div>
          <p className="text-sm text-ink-muted max-w-sm">
            Explore popular artistic aesthetic styles tuned for Gemini image generation.
          </p>
        </div>

        {/* 3 Editorial Horizontal Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TILES.map((tile) => (
            <div
              key={tile.number}
              onClick={() => handleClick(tile.category)}
              className="group cursor-pointer rounded-card overflow-hidden bg-surface border border-border-subtle hover:border-indigo-primary/40 shadow-subtle hover:shadow-elevated transition-all duration-300 flex flex-col justify-between"
            >
              {/* Tile Image */}
              <div className="relative h-48 overflow-hidden bg-softGray">
                <img
                  src={tile.image}
                  alt={tile.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                {/* Tile Number Pill */}
                <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-ink shadow-sm">
                  {tile.number}
                </div>

                {/* Category Badge */}
                <div className="absolute bottom-4 left-4 bg-indigo-primary text-white text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md">
                  {tile.category}
                </div>
              </div>

              {/* Tile Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-editorial text-lg font-bold text-ink group-hover:text-indigo-primary transition-colors">
                    {tile.title}
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed mt-1">
                    {tile.description}
                  </p>
                </div>
                
                <div className="pt-2 flex items-center text-xs font-semibold text-indigo-primary group-hover:translate-x-1 transition-transform">
                  <span>Explore {tile.category}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
