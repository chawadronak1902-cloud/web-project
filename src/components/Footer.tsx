import React from 'react';
import { ShieldCheck, RotateCcw, Truck, Sparkles } from 'lucide-react';
import { useEcommerce } from '../context/EcommerceContext';

export const Footer: React.FC = () => {
  const { setIsWalletModalOpen, setIsSizeChartOpen, setIsGA4InspectorOpen, resetPrototypeState } = useEcommerce();

  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-16 pb-12 border-t border-neutral-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Value Props Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-neutral-800">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white block">Instant Cashback</span>
              <p className="text-neutral-400 mt-0.5">Credited directly to your wallet on qualifying purchases.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-amber-400 shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white block">Complimentary Shipping</span>
              <p className="text-neutral-400 mt-0.5">Express climate-neutral dispatch on all orders over $40.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-amber-400 shrink-0">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white block">30-Day Guaranteed Returns</span>
              <p className="text-neutral-400 mt-0.5">Prepaid return labels included inside every delivery box.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white block">GOTS Organic Cotton</span>
              <p className="text-neutral-400 mt-0.5">520 GSM heavyweight fabrics built for a decade of wear.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <span className="text-lg font-black text-white font-display">AURA STUDIO</span>
            <p className="text-neutral-400 leading-relaxed">
              Engineered luxury loungewear and heavy fleece architectural staples. Built with zero compromises on weight or craftsmanship.
            </p>
          </div>

          <div>
            <span className="font-bold text-white uppercase tracking-wider text-[11px] block mb-3">
              Shop & Explore
            </span>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <a href="#featured-hoodie" className="hover:text-white transition-colors">
                  Heavyweight Studio Hoodie
                </a>
              </li>
              <li>
                <a href="#recommended-collection" className="hover:text-white transition-colors">
                  Relaxed Crewneck
                </a>
              </li>
              <li>
                <a href="#recommended-collection" className="hover:text-white transition-colors">
                  Drop-Shoulder Boxy Tee
                </a>
              </li>
              <li>
                <a href="#recommended-collection" className="hover:text-white transition-colors">
                  Thermal Cargo Sweatpants
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-bold text-white uppercase tracking-wider text-[11px] block mb-3">
              Rewards & Customer Care
            </span>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button
                  onClick={() => setIsWalletModalOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Check Wallet Balance
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsSizeChartOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Apparel Size & Fit Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsGA4InspectorOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer text-amber-400"
                >
                  GA4 dataLayer Tracking Plan
                </button>
              </li>
              <li>
                <button
                  onClick={resetPrototypeState}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                  title="Reset localStorage prototype state back to initial $5 balance"
                >
                  Reset Prototype Session
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="font-bold text-white uppercase tracking-wider text-[11px] block">
              Cashback Terms
            </span>
            <p className="text-neutral-400 leading-relaxed">
              Cashback is issued in store rewards credit. Credits are valid for 60 days from issuance and can be redeemed toward any future orders.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} AURA Studio Inc. All rights reserved. Welcome Back Cashback Campaign.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-neutral-400 transition-colors">Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-neutral-400 transition-colors">Terms of Service</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-neutral-400 transition-colors">Loyalty Rules</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
