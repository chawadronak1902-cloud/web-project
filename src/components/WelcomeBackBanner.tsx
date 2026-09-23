import React, { useEffect } from 'react';
import { Sparkles, ArrowRight, Wallet } from 'lucide-react';
import { useEcommerce } from '../context/EcommerceContext';
import { analytics } from '../utils/analytics';

export const WelcomeBackBanner: React.FC = () => {
  const { isReturningVisitor, walletBalance, setIsWalletModalOpen } = useEcommerce();

  // Fire GA4 welcome_back_banner_view when rendered
  useEffect(() => {
    if (isReturningVisitor) {
      analytics.welcomeBackBannerView({
        user_type: 'returning',
        current_balance: walletBalance,
      });
    }
  }, [isReturningVisitor, walletBalance]);

  if (!isReturningVisitor) {
    return null;
  }

  const handleBannerClick = () => {
    analytics.welcomeBackBannerClick({
      user_type: 'returning',
      current_balance: walletBalance,
      cta_target: '#featured-hoodie',
    });

    const el = document.getElementById('featured-hoodie');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-to-r from-amber-900 via-stone-900 to-neutral-950 text-white py-3 px-4 border-b border-amber-800/30">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="font-bold text-sm tracking-tight font-display text-white">
                👋 Welcome Back!
              </span>
              {walletBalance > 0 ? (
                <span className="text-xs bg-amber-400/20 text-amber-200 border border-amber-400/30 font-semibold px-2 py-0.5 rounded-full">
                  Your ${walletBalance.toFixed(2)} cashback is waiting!
                </span>
              ) : (
                <span className="text-xs text-amber-200 font-medium">
                  Exclusive member perks active for this session.
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-300 mt-0.5">
              Good to see you again. Apply your stored balance at checkout or earn another $5 on your next purchase.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {walletBalance > 0 && (
            <button
              onClick={() => setIsWalletModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-amber-200 border border-white/10 transition-colors"
            >
              <Wallet className="w-3.5 h-3.5 text-amber-300" />
              View Wallet (${walletBalance.toFixed(2)})
            </button>
          )}

          <button
            onClick={handleBannerClick}
            className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 transition-all shadow-xs"
          >
            Claim on Hoodie
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
