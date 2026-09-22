import React from 'react';
import { PRICING_TIERS } from '../data/pricing';

export const StickerSizes: React.FC = () => {
  return (
    <section className="container-custom py-1">
      <div className="bg-surface rounded-card border border-border-subtle p-3.5 sm:p-4 shadow-subtle flex flex-col md:flex-row md:items-center gap-3">
        {/* Header Label */}
        <div className="shrink-0 md:pr-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-primary block">
            Available Sizes:
          </span>
        </div>

        {/* Structured Grid Layout for Perfect Alignment */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-y-2.5 gap-x-4 text-xs sm:text-sm text-ink flex-1">
          {PRICING_TIERS.map((tier) => {
            const shortDim = tier.dimensions.replace(/\s*×\s*/g, 'x').replace(/\s*in$/g, '');
            return (
              <div key={tier.id} className="flex items-center gap-1.5 min-w-0">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-primary shrink-0" />
                <span className="font-semibold text-ink truncate">{tier.positioning}</span>
                <span className="text-indigo-primary font-mono text-[11px] sm:text-xs font-medium shrink-0">
                  ({shortDim})
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
