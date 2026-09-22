import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { trackEvent } from '../utils/analytics';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.301-.15-1.781-.879-2.057-.979-.276-.1-.477-.15-.678.15s-.778.979-.954 1.18-.352.226-.653.075c-.301-.15-1.272-.469-2.423-1.496-.895-.798-1.5-1.784-1.675-2.085-.176-.301-.019-.464.132-.614.135-.135.301-.351.451-.527.151-.176.201-.301.301-.502.101-.201.05-.377-.025-.528-.075-.15-.678-1.633-.929-2.235-.245-.586-.494-.507-.678-.516l-.578-.01c-.201 0-.528.075-.804.377s-1.055 1.03-1.055 2.511 1.08 2.912 1.231 3.113c.151.201 2.125 3.245 5.15 4.552.72.311 1.282.497 1.72.636.724.23 1.383.198 1.904.12.58-.088 1.781-.728 2.032-1.431.251-.703.251-1.306.176-1.431-.075-.126-.276-.201-.577-.351zM12.04 2C6.54 2 2.08 6.46 2.08 11.96c0 1.93.55 3.73 1.5 5.26L2 22l4.92-1.54a9.92 9.92 0 0 0 5.12 1.5c5.5 0 9.96-4.46 9.96-9.96C22 6.46 17.54 2 12.04 2zm0 18.26c-1.68 0-3.24-.49-4.57-1.34l-.33-.21-3.03.95.97-2.95-.23-.34a8.21 8.21 0 0 1-1.32-4.41c0-4.55 3.7-8.26 8.26-8.26 4.55 0 8.26 3.7 8.26 8.26 0 4.56-3.71 8.26-8.26 8.26z" />
  </svg>
);

export const WhatsAppFloatingButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    trackEvent('order_whatsapp_click');
    const defaultMessage = `Hi ${siteConfig.brandName}, I need some help/have a question about my custom stickers.`;

    const cleanNumber = siteConfig.whatsappCleanNumber || '918590797107';
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed bottom-5 left-5 z-50 flex items-center gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating Button */}
      <button
        onClick={handleClick}
        aria-label="Contact us on WhatsApp"
        className="relative group p-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg shadow-emerald-600/30 transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
      >
        {/* Subtle Pulse Animation */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-25 group-hover:opacity-0 pointer-events-none" />

        <WhatsAppIcon className="w-6 h-6 fill-white relative z-10" />
      </button>

      {/* Label Tag on Desktop */}
      <span
        className={`hidden sm:inline-block bg-surface border border-border-subtle text-ink font-semibold text-xs py-1.5 px-3 rounded-full shadow-md transition-all duration-200 pointer-events-none ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-90 translate-x-1'
        }`}
      >
        Customer Care
      </span>
    </div>
  );
};
