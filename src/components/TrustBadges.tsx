import React from 'react';
import { Droplets, CheckCircle2, Truck, ShieldCheck } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: <Droplets className="w-5 h-5 text-indigo-primary" />,
      title: 'Waterproof Vinyl',
      description: 'Durable, scratch-resistant, & waterproof premium sticker finish.',
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-indigo-primary" />,
      title: 'Printed As Uploaded',
      description: 'We print your exact image on high-grade sheets with neat, clean cuts.',
    },
    {
      icon: <Truck className="w-5 h-5 text-indigo-primary" />,
      title: '7–12 Days Delivery',
      description: 'Carefully printed, packaged, and delivered within 7–12 business days.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-indigo-primary" />,
      title: 'Transparent Payment',
      description: 'Pay securely via payment link only after order details are confirmed.',
    },
  ];

  return (
    <section className="container-custom py-6" aria-label="Product Guarantees">
      <div className="bg-surface rounded-2xl border border-border-subtle p-6 sm:p-8 shadow-subtle">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <div key={index} className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-canvas border border-border-subtle shrink-0 shadow-sm">
                {badge.icon}
              </div>
              <div className="space-y-1 text-xs">
                <h4 className="font-bold text-ink text-sm">{badge.title}</h4>
                <p className="text-ink-muted leading-relaxed">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
