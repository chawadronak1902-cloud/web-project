import React from 'react';
import { CheckCircle, Sparkles, ArrowRight, Wallet, ShoppingBag, X } from 'lucide-react';
import { useEcommerce } from '../context/EcommerceContext';
import { RECOMMENDED_PRODUCTS } from '../data/products';

export const PostPurchaseScreen: React.FC = () => {
  const {
    isPostPurchaseOpen,
    setIsPostPurchaseOpen,
    completedOrder,
    walletBalance,
    addToCart,
    setIsWalletModalOpen,
  } = useEcommerce();

  if (!isPostPurchaseOpen || !completedOrder) return null;

  const handleShopAgain = () => {
    setIsPostPurchaseOpen(false);
    const el = document.getElementById('featured-hoodie');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsPostPurchaseOpen(false)}
      />

      {/* Confirmation Window */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden z-10 flex flex-col max-h-[92vh] my-auto">
        {/* Top Celebration Banner */}
        <div className="bg-gradient-to-r from-neutral-950 via-stone-900 to-amber-950 p-6 sm:p-8 text-white relative">
          <button
            onClick={() => setIsPostPurchaseOpen(false)}
            className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <CheckCircle className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                Order Confirmed #{completedOrder.id}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white mt-0.5">
                🎉 You&apos;ve earned ${completedOrder.cashbackEarned.toFixed(2)} cashback!
              </h2>
            </div>
          </div>

          {/* PRD requirement headline & subtext */}
          <div className="mt-4 p-4 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-neutral-950 flex items-center justify-center shrink-0 font-extrabold">
                <Sparkles className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-amber-200">
                Use it on your next purchase! Your updated wallet balance is now{' '}
                <strong className="text-white font-mono font-black underline decoration-amber-400">
                  ${walletBalance.toFixed(2)}
                </strong>
                .
              </p>
            </div>

            <button
              onClick={() => {
                setIsPostPurchaseOpen(false);
                setIsWalletModalOpen(true);
              }}
              className="text-xs font-bold px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 rounded-lg shrink-0 transition-colors"
            >
              View Wallet
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Order Snapshot */}
          <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200/80 space-y-3 text-xs">
            <div className="flex justify-between items-center text-neutral-500 pb-2 border-b border-neutral-200">
              <span>Customer: <strong className="text-neutral-900">{completedOrder.customerName}</strong></span>
              <span className="font-mono">Total Paid: ${completedOrder.total.toFixed(2)}</span>
            </div>

            <div className="space-y-1.5">
              {completedOrder.items.map((it) => (
                <div key={it.cartItemId} className="flex justify-between text-neutral-700">
                  <span>
                    {it.name} ({it.selectedColor.name}, {it.selectedSize}) × {it.quantity}
                  </span>
                  <span className="font-mono font-medium">${(it.price * it.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {completedOrder.cashbackRedeemed > 0 && (
              <div className="pt-2 border-t border-neutral-200 flex justify-between text-emerald-700 font-semibold">
                <span>Wallet Discount Applied</span>
                <span className="font-mono">-${completedOrder.cashbackRedeemed.toFixed(2)}</span>
              </div>
            )}
          </div>

          {/* Repeat Visit Prompt & Recommendations as required by PRD */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-neutral-900 font-display">
                  Recommended for your next order
                </h3>
                <p className="text-xs text-neutral-500">
                  Apply your new ${walletBalance.toFixed(2)} wallet credit right away:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {RECOMMENDED_PRODUCTS.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-xl border border-neutral-200 p-3 flex flex-col justify-between hover:border-amber-400 transition-colors shadow-2xs"
                >
                  <img
                    src={prod.colors[0].image}
                    alt={prod.name}
                    className="w-full aspect-4/3 object-cover rounded-lg bg-neutral-100 mb-2"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900 truncate font-display">
                      {prod.name}
                    </h4>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className="text-xs font-bold font-mono text-neutral-900">
                        ${prod.price.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-amber-800 font-medium">
                        (With reward: ${(prod.price - Math.min(walletBalance, prod.price)).toFixed(2)})
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(prod, prod.colors[0], prod.sizes[0], 1);
                      setIsPostPurchaseOpen(false);
                    }}
                    className="mt-3 w-full py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                  >
                    <ShoppingBag className="w-3 h-3 text-amber-400" />
                    <span>Buy with Reward</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 bg-[#FAF9F6] border-t border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-neutral-600">
            <Wallet className="w-4 h-4 text-amber-600" />
            <span>Active Reward Balance: <strong>${walletBalance.toFixed(2)}</strong></span>
          </div>

          <button
            onClick={handleShopAgain}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
