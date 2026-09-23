import React from 'react';
import { X, Wallet, Clock, ArrowRight, CheckCircle2, History, Sparkles, ShieldCheck } from 'lucide-react';
import { useEcommerce } from '../context/EcommerceContext';

export const WalletModal: React.FC = () => {
  const {
    isWalletModalOpen,
    setIsWalletModalOpen,
    walletBalance,
    walletTransactions,
    walletExpiryDays,
    cart,
    setIsCartOpen,
  } = useEcommerce();

  if (!isWalletModalOpen) return null;

  const expiryDate = new Date(Date.now() + 86400000 * walletExpiryDays).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const handleContinueShopping = () => {
    setIsWalletModalOpen(false);
    const el = document.getElementById('featured-hoodie');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewCart = () => {
    setIsWalletModalOpen(false);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWalletModalOpen(false)}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-[#FAF9F6]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 font-display">AURA Cashback Wallet</h3>
              <p className="text-xs text-neutral-500">Your rewards & store balance</p>
            </div>
          </div>
          <button
            onClick={() => setIsWalletModalOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Balance Card */}
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-100">
                Available Cashback Balance
              </span>
              <div className="flex items-center gap-1 text-[11px] bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full font-medium">
                <Clock className="w-3 h-3" />
                <span>Expires {expiryDate}</span>
              </div>
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-extrabold font-mono tracking-tight">
                ${walletBalance.toFixed(2)}
              </span>
              <span className="text-xs text-amber-100 font-medium">USD Available</span>
            </div>

            <p className="text-xs text-amber-100/90 mt-2">
              Use anytime at checkout. 1 reward dollar = $1 USD discount on any apparel.
            </p>
          </div>

          {/* Quick Action if items are in cart */}
          {cart.length > 0 && walletBalance > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-center justify-between">
              <div className="text-xs text-amber-950">
                <span className="font-bold block">You have {cart.length} item(s) in your bag</span>
                <span>Apply your ${walletBalance.toFixed(2)} cashback now!</span>
              </div>
              <button
                onClick={handleViewCart}
                className="px-3 py-1.5 bg-neutral-900 text-white text-xs font-bold rounded-lg hover:bg-neutral-800 transition-colors shrink-0"
              >
                Apply in Bag
              </button>
            </div>
          )}

          {/* How Cashback Works */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Welcome Back Cashback Rules
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 block">Automatic Earnings</strong>
                  Orders over $50 earn $5 cashback credited instantly upon checkout.
                </div>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 block">No Minimum Spend</strong>
                  Redeem your full balance against your next apparel purchase.
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Ledger */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-neutral-400" />
              Wallet Activity Ledger
            </h4>

            <div className="divide-y divide-neutral-100 rounded-xl border border-neutral-200 overflow-hidden">
              {walletTransactions.length === 0 ? (
                <div className="p-4 text-center text-xs text-neutral-400">
                  No previous wallet activity. Complete a purchase to earn your first reward!
                </div>
              ) : (
                walletTransactions.slice(0, 5).map((tx) => (
                  <div key={tx.id} className="p-3 bg-white flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-neutral-900 block">{tx.description}</span>
                      <span className="text-[11px] text-neutral-400">
                        {new Date(tx.timestamp).toLocaleDateString()} · ID: {tx.id.substring(0, 10)}
                      </span>
                    </div>
                    <span
                      className={`font-mono font-bold text-sm ${
                        tx.type === 'credit' ? 'text-emerald-600' : 'text-neutral-900'
                      }`}
                    >
                      {tx.type === 'credit' ? `+$${tx.amount.toFixed(2)}` : `-$${tx.amount.toFixed(2)}`}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-neutral-400 justify-center">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Encrypted wallet session with local browser persistence</span>
          </div>
        </div>

        {/* PRD MANDATED: "Continue Shopping" CTA */}
        <div className="px-6 py-4 border-t border-neutral-100 bg-[#FAF9F6] flex items-center justify-between">
          <span className="text-xs text-neutral-500">
            Current balance: <strong className="text-neutral-900">${walletBalance.toFixed(2)}</strong>
          </span>
          <button
            onClick={handleContinueShopping}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
