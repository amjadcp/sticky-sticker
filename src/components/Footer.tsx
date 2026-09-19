import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-canvas border-t border-border-subtle py-8 mt-16">
      <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Side: Brand & Tagline */}
        <div className="flex items-center gap-3 text-sm">
          <span className="font-bold text-ink">
            {siteConfig.brandName}
          </span>
          <span className="text-ink-muted">
            {siteConfig.tagline}
          </span>
        </div>

        {/* Right Side: Horizontal Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-ink-muted">
          <Link to="/how-it-works#how-it-works" className="hover:text-ink transition-colors">
            About
          </Link>
          <span className="hover:text-ink transition-colors cursor-pointer" title="Licence info">
            Licence
          </span>
          <span className="hover:text-ink transition-colors cursor-pointer" title="Privacy Policy">
            Privacy Policy
          </span>
          <span className="hover:text-ink transition-colors cursor-pointer" title="Terms of Service">
            Terms of Service
          </span>
          <span className="hover:text-ink transition-colors cursor-pointer" title="Refund Policy">
            Refund Policy
          </span>
        </div>

      </div>
    </footer>
  );
};
