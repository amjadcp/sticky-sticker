import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import { Menu, X, UploadCloud } from 'lucide-react';
import { useOrderModal } from '../context/OrderModalContext';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openOrderModal } = useOrderModal();

  const isHome = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 bg-canvas/90 backdrop-blur-md border-b border-border-subtle/80 transition-all">
      <div className="container-custom h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-primary rounded-lg p-1"
          aria-label={`${siteConfig.brandName} Home`}
        >
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-indigo-glow group-hover:scale-105 transition-transform duration-200 bg-indigo-primary flex items-center justify-center">
            <img 
              src="/brand-icon.png" 
              alt={`${siteConfig.brandName} Icon`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-editorial text-2xl font-bold tracking-tight text-ink group-hover:text-indigo-primary transition-colors">
              {siteConfig.brandName}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-indigo-primary ${
              isHome ? 'text-indigo-primary font-semibold' : 'text-ink/80'
            }`}
          >
            Home
          </Link>
          <Link
            to="/how-it-works#how-it-works"
            className={`text-sm font-medium transition-colors hover:text-indigo-primary ${
              location.pathname === '/how-it-works' ? 'text-indigo-primary font-semibold' : 'text-ink/80'
            }`}
          >
            How It Works
          </Link>
          <Link
            to="/pricing#pricing"
            className={`text-sm font-medium transition-colors hover:text-indigo-primary ${
              location.pathname === '/pricing' ? 'text-indigo-primary font-semibold' : 'text-ink/80'
            }`}
          >
            Pricing
          </Link>

          {/* Primary Header CTA */}
          <button
            onClick={() => openOrderModal()}
            className="px-4 py-2 rounded-full bg-indigo-primary hover:bg-indigo-dark text-white font-bold text-xs shadow-indigo-glow transition-all duration-200 inline-flex items-center gap-1.5 active:scale-95"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Print Sticker</span>
          </button>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-control text-ink hover:bg-softGray transition-colors"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border-subtle bg-surface px-6 py-4 animate-fade-in shadow-subtle">
          <nav className="flex flex-col gap-4">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-base font-medium text-ink hover:text-indigo-primary transition-colors"
            >
              Home
            </Link>
            <Link
              to="/how-it-works#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-left text-base font-medium text-ink hover:text-indigo-primary transition-colors"
            >
              How It Works
            </Link>
            <Link
              to="/pricing#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-left text-base font-medium text-ink hover:text-indigo-primary transition-colors"
            >
              Pricing
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openOrderModal();
              }}
              className="mt-2 w-full py-3 px-4 rounded-xl bg-indigo-primary text-white font-bold text-sm flex items-center justify-center gap-2 shadow-indigo-glow"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Order Custom Sticker</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
