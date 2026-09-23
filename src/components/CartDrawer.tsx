import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, Check, Wallet } from 'lucide-react';
import { useEcommerce } from '../context/EcommerceContext';
import { analytics } from '../utils/analytics';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartTotalCashbackOffered,
    appliedCashback,
    applyMaxCashback,
    removeCashbackDiscount,
    walletBalance,
    setIsCheckoutOpen,
  } = useEcommerce();

  if (!isCartOpen) return null;

  const finalTotal = Math.max(0, cartSubtotal - appliedCashback);
  const cashbackEarnForecast = cartTotalCashbackOffered > 0 ? cartTotalCashbackOffered : 5.00;

  const handleProceedToCheckout = () => {
    // Fire begin_checkout event with GA4 items
    analytics.beginCheckout({
      items: cart.map((it) => ({
        item_name: it.name,
        item_category: it.category,
        price: it.price,
        quantity: it.quantity,
        cashback_offered: it.cashbackOffered,
      })),
      value: finalTotal,
      cashback_offered: cashbackEarnForecast,
    });

    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between bg-[#FAF9F6]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-neutral-900" />
              <h2 className="text-lg font-bold text-neutral-900 font-display">Shopping Bag</h2>
              <span className="text-xs font-mono text-neutral-500">
                ({cart.reduce((s, i) => s + i.quantity, 0)} items)
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cashback Earning Forecast Alert */}
          {cart.length > 0 && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200/80 px-6 py-3 flex items-center gap-3">
              <div className="w-7 h-7 rounded-md bg-amber-500 text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-xs text-amber-950">
                <span className="font-extrabold block">
                  🎉 Earning ${cashbackEarnForecast.toFixed(2)} Cashback on this order!
                </span>
                <span className="text-amber-800/80 text-[11px]">
                  Will be credited automatically to your AURA Wallet
                </span>
              </div>
            </div>
          )}

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 font-display text-base">Your bag is empty</h3>
                  <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                    Explore our best-selling heavyweight hoodie and get $5 cashback on your purchase today.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    const el = document.getElementById('featured-hoodie');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 bg-neutral-900 text-white text-xs font-bold rounded-xl hover:bg-neutral-800 transition-colors"
                >
                  Shop Featured Hoodie
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex gap-4 p-3 bg-neutral-50/80 rounded-xl border border-neutral-200/60 items-center"
                >
                  <img
                    src={item.selectedColor.image}
                    alt={item.name}
                    className="w-18 h-18 rounded-lg object-cover bg-neutral-100 shrink-0 border border-neutral-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-neutral-900 truncate font-display">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      {item.selectedColor.name} · Size {item.selectedSize}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1 text-[11px] text-amber-800 font-medium">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      <span>Earns ${item.cashbackOffered.toFixed(2)}</span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-neutral-200 rounded-md bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-neutral-600 hover:text-neutral-900"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-mono font-bold text-neutral-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-neutral-600 hover:text-neutral-900"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold font-mono text-neutral-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="p-1 text-neutral-400 hover:text-red-600 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-neutral-200 bg-[#FAF9F6] space-y-4">
              {/* Wallet Redemption Card */}
              {walletBalance > 0 && (
                <div className="bg-amber-50 border border-amber-200/90 rounded-xl p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-amber-700" />
                      <div>
                        <span className="text-xs font-bold text-amber-950 block">AURA Wallet Balance</span>
                        <span className="text-[11px] text-amber-800">
                          ${walletBalance.toFixed(2)} available
                        </span>
                      </div>
                    </div>

                    {appliedCashback > 0 ? (
                      <button
                        onClick={removeCashbackDiscount}
                        className="text-xs font-semibold text-red-600 hover:text-red-800 underline cursor-pointer"
                      >
                        Remove (${appliedCashback.toFixed(2)})
                      </button>
                    ) : (
                      <button
                        onClick={applyMaxCashback}
                        className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-xs rounded-lg transition-colors shadow-2xs cursor-pointer"
                      >
                        Apply ${Math.min(walletBalance, cartSubtotal).toFixed(2)}
                      </button>
                    )}
                  </div>
                  {appliedCashback > 0 && (
                    <div className="mt-2 text-[11px] text-emerald-800 flex items-center gap-1 font-semibold">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>${appliedCashback.toFixed(2)} wallet credit applied to order!</span>
                    </div>
                  )}
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-mono font-medium">${cartSubtotal.toFixed(2)}</span>
                </div>

                {appliedCashback > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Cashback Wallet Applied</span>
                    <span className="font-mono">-${appliedCashback.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-600">
                  <span>Shipping</span>
                  <span className="text-emerald-700 font-semibold">Free Express</span>
                </div>

                <div className="flex justify-between text-sm font-bold text-neutral-900 pt-2 border-t border-neutral-200">
                  <span>Total Due</span>
                  <span className="font-mono text-base">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center">
                <span className="text-[11px] text-neutral-500">
                  30-Day Returns · Free Shipping · 100% Secure Checkout
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
