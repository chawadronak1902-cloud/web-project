import React from 'react';
import { Gift, ArrowRight } from 'lucide-react';

export const PromoBanner: React.FC = () => {
  const handleShopNow = () => {
    const el = document.getElementById('featured-hoodie');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-amber-100/70 border-b border-amber-200/90 text-amber-950 py-2.5 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2.5">
          <div className="w-6 h-6 rounded-md bg-amber-500 text-white flex items-center justify-center shrink-0">
            <Gift className="w-3.5 h-3.5" />
          </div>
          <p className="text-xs sm:text-sm font-semibold tracking-tight text-amber-950">
            🎁 Get $5 Cashback on Your Purchase
            <span className="hidden sm:inline font-normal text-amber-900/80 ml-2">
              · Credited directly to your AURA Wallet on orders over $50
            </span>
          </p>
        </div>

        <button
          onClick={handleShopNow}
          className="inline-flex items-center gap-1 text-xs font-bold text-amber-950 hover:text-amber-800 underline underline-offset-4 decoration-amber-500 hover:decoration-amber-700 transition-all cursor-pointer whitespace-nowrap"
        >
          Shop Now
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
