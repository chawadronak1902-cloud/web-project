import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, Sparkles, Check } from 'lucide-react';
import { useEcommerce } from '../context/EcommerceContext';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    appliedCashback,
    cartTotalCashbackOffered,
    completeCheckout,
  } = useEcommerce();

  const [customerName, setCustomerName] = useState('Alex Rivera');
  const [customerEmail, setCustomerEmail] = useState('alex.rivera@example.com');
  const [customerAddress, setCustomerAddress] = useState('742 Evergreen Terrace, Springfield, OR 97477');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const finalTotal = Math.max(0, cartSubtotal - appliedCashback);
  const newlyEarned = cartTotalCashbackOffered > 0 ? cartTotalCashbackOffered : 5.00;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate short network completion
    setTimeout(() => {
      completeCheckout({
        name: customerName,
        email: customerEmail,
        address: customerAddress,
      });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => !isSubmitting && setIsCheckoutOpen(false)}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-[#FAF9F6]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <div>
              <h3 className="text-base font-bold text-neutral-900 font-display">Fast & Secure Checkout</h3>
              <p className="text-xs text-neutral-500">AURA Express Loyalty Order</p>
            </div>
          </div>
          <button
            onClick={() => !isSubmitting && setIsCheckoutOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
          {/* Cashback Reward Callout */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-xs text-amber-950">
              <span className="font-extrabold block">
                You will earn ${newlyEarned.toFixed(2)} cashback on this purchase!
              </span>
              <span className="text-amber-800">
                Credited directly to your wallet immediately upon order confirmation.
              </span>
            </div>
          </div>

          {/* Customer Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Shipping & Customer Information
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900 text-neutral-900"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Email for Receipt & Cashback Alerts</label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900 text-neutral-900"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Shipping Address</label>
                <input
                  type="text"
                  required
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900 text-neutral-900"
                />
              </div>
            </div>
          </div>

          {/* Payment simulation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Payment Method (Simulated)
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                  paymentMethod === 'card'
                    ? 'border-neutral-900 bg-neutral-50 font-bold ring-1 ring-neutral-900'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-neutral-700" />
                  <span>Card ending ••4242</span>
                </div>
                {paymentMethod === 'card' && <Check className="w-4 h-4 text-neutral-900" />}
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('apple_pay')}
                className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                  paymentMethod === 'apple_pay'
                    ? 'border-neutral-900 bg-neutral-50 font-bold ring-1 ring-neutral-900'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <span> Instant Pay</span>
                {paymentMethod === 'apple_pay' && <Check className="w-4 h-4 text-neutral-900" />}
              </button>
            </div>
          </div>

          {/* Order Summary & Pricing */}
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2 text-xs">
            <h4 className="font-bold text-neutral-800">Order Summary ({cart.length} item kinds)</h4>

            <div className="divide-y divide-neutral-200/60 pt-1">
              {cart.map((item) => (
                <div key={item.cartItemId} className="py-1.5 flex justify-between text-neutral-600">
                  <span>
                    {item.name} ({item.selectedColor.name}, {item.selectedSize}) × {item.quantity}
                  </span>
                  <span className="font-mono font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-neutral-200 space-y-1">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span className="font-mono">${cartSubtotal.toFixed(2)}</span>
              </div>
              {appliedCashback > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Cashback Redeemed</span>
                  <span className="font-mono">-${appliedCashback.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-600">
                <span>Shipping</span>
                <span className="text-emerald-700 font-semibold">Free</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-neutral-900 pt-1 border-t border-neutral-200">
                <span>Final Amount Charged</span>
                <span className="font-mono">${finalTotal.toFixed(2)} USD</span>
              </div>
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
          >
            {isSubmitting ? (
              <span>Processing Order...</span>
            ) : (
              <>
                <span>Complete Purchase (${finalTotal.toFixed(2)})</span>
                <span className="text-amber-400 font-mono">· Earn ${newlyEarned.toFixed(2)} Cashback</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
