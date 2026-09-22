import React from 'react';
import { Sparkles, Image as ImageIcon, MessageCircle, Truck } from 'lucide-react';

interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const WorkflowSteps: React.FC = () => {
  const steps: Step[] = [
    {
      number: '01',
      title: 'Pick a Style or Photo',
      description: 'Browse our AI style prompts for inspiration, or grab any favourite photo directly from your camera roll.',
      icon: <Sparkles className="w-5 h-5 text-indigo-primary" />,
    },
    {
      number: '02',
      title: 'Generate or Prepare',
      description: 'Generate with Gemini, ChatGPT, or Midjourney, or simply select your personal photo ready for print.',
      icon: <ImageIcon className="w-5 h-5 text-indigo-primary" />,
    },
    {
      number: '03',
      title: 'Send on WhatsApp',
      description: 'Click "Print Sticker" to message us on WhatsApp (+91 85907 97107). Send 3 items: 1. Image, 2. Size & Qty, and 3. Delivery Address.',
      icon: <MessageCircle className="w-5 h-5 text-indigo-primary" />,
    },
    {
      number: '04',
      title: 'Confirm, Pay & Receive',
      description: 'We review your details and send a secure payment link (UPI/Card). Once paid, your stickers arrive within 7–12 business days!',
      icon: <Truck className="w-5 h-5 text-indigo-primary" />,
    },
  ];

  return (
    <section id="how-it-works" className="bg-surface rounded-card border border-border-subtle p-6 sm:p-8 shadow-subtle space-y-6">
      <div>
        <span className="text-xs uppercase tracking-widest font-semibold text-indigo-primary">
          Step-By-Step Workflow
        </span>
        <h2 className="font-editorial text-2xl font-bold text-ink mt-1">
          How to create and print
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((step, idx) => (
          <div
            key={step.number}
            className="relative bg-canvas p-5 rounded-card border border-border-subtle flex flex-col justify-between space-y-4 hover:border-indigo-primary/30 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-primary bg-indigo-light px-2.5 py-1 rounded-md">
                {step.number}
              </span>
              <div className="p-2 rounded-control bg-surface shadow-sm">
                {step.icon}
              </div>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-bold text-base text-ink">{step.title}</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
