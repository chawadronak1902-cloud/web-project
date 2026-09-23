import React from 'react';
import { ShoppingBag, Wallet, ChevronDown, Activity, UserCheck, UserPlus } from 'lucide-react';
import { useEcommerce } from '../context/EcommerceContext';

export const Header: React.FC = () => {
  const {
    walletBalance,
    cartCount,
    setIsCartOpen,
    setIsWalletModalOpen,
    setIsSizeChartOpen,
    setIsGA4InspectorOpen,
    isReturningVisitor,
    toggleVisitorMode,
  } = useEcommerce();

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-neutral-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#"
          className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900 font-display hover:opacity-90 transition-opacity"
        >
          AURA STUDIO
        </a>

        {/* Zone 2: 4-6 Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600">
          <a href="#featured-hoodie" className="hover:text-neutral-950 transition-colors">
            Featured Hoodie
          </a>
          <a href="#recommended-collection" className="hover:text-neutral-950 transition-colors">
            Collection
          </a>
          <button
            onClick={() => setIsWalletModalOpen(true)}
            className="hover:text-neutral-950 transition-colors cursor-pointer"
          >
            Cashback Rewards
          </button>
          <button
            onClick={() => setIsSizeChartOpen(true)}
            className="hover:text-neutral-950 transition-colors cursor-pointer"
          >
            Size Chart
          </button>
          <button
            onClick={() => setIsGA4InspectorOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-950 bg-amber-100/60 px-2.5 py-1 rounded-md border border-amber-200/80 transition-colors"
          >
            <Activity className="w-3.5 h-3.5 text-amber-600" />
            GA4 Inspector
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Cashback Wallet Widget, Visitor Switcher, Cart) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Visitor Mode Quick Switcher (For easy PRD testing of Returning vs New Visitor state) */}
          <button
            onClick={toggleVisitorMode}
            title={
              isReturningVisitor
                ? 'Current mode: Returning Visitor ($5 balance). Click to simulate New Visitor.'
                : 'Current mode: New Visitor ($0 balance). Click to simulate Returning Visitor.'
            }
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              isReturningVisitor
                ? 'bg-neutral-100 border-neutral-200 text-neutral-700 hover:bg-neutral-200/80'
                : 'bg-white border-neutral-300 text-neutral-500 hover:text-neutral-800'
            }`}
          >
            {isReturningVisitor ? (
              <>
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-semibold text-neutral-800">Returning Visitor</span>
              </>
            ) : (
              <>
                <UserPlus className="w-3.5 h-3.5 text-neutral-400" />
                <span>New Visitor</span>
              </>
            )}
          </button>

          {/* Persistent Cashback Wallet Widget */}
          <button
            onClick={() => setIsWalletModalOpen(true)}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200/90 text-amber-950 transition-all shadow-xs"
            aria-label="View Cashback Wallet"
          >
            <div className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <Wallet className="w-3.5 h-3.5" />
            </div>
            <div className="text-left leading-none">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-800/80">Wallet</span>
              <span className="text-xs sm:text-sm font-extrabold text-amber-950 font-mono">
                ${walletBalance.toFixed(2)}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-amber-700 group-hover:translate-y-0.5 transition-transform" />
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 transition-colors shadow-xs"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 bg-amber-500 text-neutral-950 font-bold text-[11px] rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
