import React, { useState, useEffect } from 'react';
import {
  Star,
  Ruler,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ShoppingBag,
  Info,
} from 'lucide-react';
import { FEATURED_HOODIE } from '../data/products';
import { ColorVariant, ProductSize } from '../types/ecommerce';
import { useEcommerce } from '../context/EcommerceContext';
import { analytics } from '../utils/analytics';

export const FeaturedHoodieHero: React.FC = () => {
  const { addToCart, setIsSizeChartOpen, walletBalance, isReturningVisitor } = useEcommerce();

  const [selectedColor, setSelectedColor] = useState<ColorVariant>(FEATURED_HOODIE.colors[0]);
  const [selectedSize, setSelectedSize] = useState<ProductSize>('L');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'fabric' | 'features' | 'care'>('fabric');
  const [isAddedAnimation, setIsAddedAnimation] = useState(false);

  // Push view_item on mount for the hoodie
  useEffect(() => {
    analytics.viewItem({
      item_name: FEATURED_HOODIE.name,
      item_category: FEATURED_HOODIE.category,
      price: FEATURED_HOODIE.price,
      cashback_offered: FEATURED_HOODIE.cashbackOffered,
    });
  }, []);

  const handleAddToCart = () => {
    addToCart(FEATURED_HOODIE, selectedColor, selectedSize, quantity);
    setIsAddedAnimation(true);
    setTimeout(() => setIsAddedAnimation(false), 1200);
  };

  return (
    <section id="featured-hoodie" className="py-12 lg:py-16 bg-[#FAF9F6] border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Indicator */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-widest">
            <span>Featured Spotlight</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-700 font-bold">Campaign Hero</span>
          </div>
          {isReturningVisitor && walletBalance > 0 && (
            <div className="text-xs font-semibold text-amber-900 bg-amber-100/90 border border-amber-300/80 px-2.5 py-1 rounded-full">
              Your ${walletBalance.toFixed(2)} wallet balance can be applied here!
            </div>
          )}
        </div>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Product Gallery (7 cols on desktop) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Image Viewport */}
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/90 shadow-xs group">
              <img
                src={selectedColor.image}
                alt={`${FEATURED_HOODIE.name} in ${selectedColor.name}`}
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Bestseller Badge */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900/90 backdrop-blur-md text-white text-xs font-bold shadow-md">
                  <span>🔥</span>
                  <span>Bestseller</span>
                </div>
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/95 backdrop-blur-md text-neutral-950 text-xs font-extrabold shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Earn ${FEATURED_HOODIE.cashbackOffered.toFixed(2)} Cashback</span>
                </div>
              </div>

              {/* Quick Image Color Switch Indicator */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-700 bg-white/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/50">
                <span className="font-semibold text-neutral-900">
                  Showing: <span className="font-bold text-amber-950">{selectedColor.name}</span>
                </span>
                <span className="text-neutral-500">520 GSM French Terry Fleece</span>
              </div>
            </div>

            {/* Color Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {FEATURED_HOODIE.colors.map((color) => {
                const isSelected = color.id === selectedColor.id;
                return (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    className={`relative aspect-4/3 rounded-xl overflow-hidden border-2 transition-all p-0.5 bg-neutral-100 ${
                      isSelected
                        ? 'border-amber-600 ring-2 ring-amber-500/30'
                        : 'border-transparent hover:border-neutral-300 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={color.image}
                      alt={color.name}
                      className="w-full h-full object-cover rounded-lg"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-1 left-1 bg-black/70 backdrop-blur-xs text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
                      {color.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Purchase Control Module (5 cols on desktop) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/90 shadow-sm space-y-6">
            {/* Title & Rating */}
            <div>
              <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
                <span>{FEATURED_HOODIE.category}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">STYLE #HD-520</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 font-display">
                {FEATURED_HOODIE.name}
              </h1>
              <p className="text-sm text-neutral-600 mt-1">
                {FEATURED_HOODIE.subtitle}
              </p>

              {/* Review Stars */}
              <div className="flex items-center gap-2 mt-2.5">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-neutral-900 font-mono">
                  {FEATURED_HOODIE.rating}
                </span>
                <span className="text-xs text-neutral-500">
                  ({FEATURED_HOODIE.reviewsCount} verified reviews)
                </span>
              </div>
            </div>

            {/* Price & Primary Cashback Banner (Directly under price as mandated by PRD) */}
            <div className="pt-2 pb-1 border-y border-neutral-100 space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-neutral-900 font-mono tracking-tight">
                  ${FEATURED_HOODIE.price.toFixed(2)}
                </span>
                {FEATURED_HOODIE.originalPrice && (
                  <span className="text-base text-neutral-400 line-through font-mono">
                    ${FEATURED_HOODIE.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Save 27%
                </span>
              </div>

              {/* PRD MANDATED: "Earn $5 Cashback" directly under the price */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50/70 border border-amber-200 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">
                    $5
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-amber-950 block">
                      Earn $5.00 Cashback on this item
                    </span>
                    <span className="text-[11px] text-amber-800">
                      Auto-credited to your AURA Wallet upon order completion
                    </span>
                  </div>
                </div>
              </div>

              {/* Existing Wallet balance hint */}
              {walletBalance > 0 && (
                <div className="text-[11px] text-neutral-600 flex items-center gap-1.5 px-1 pt-0.5">
                  <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>
                    You have <strong className="text-amber-900">${walletBalance.toFixed(2)}</strong> in your wallet. You can apply it at checkout to get this for <strong>${(FEATURED_HOODIE.price - Math.min(walletBalance, FEATURED_HOODIE.price)).toFixed(2)}</strong>!
                  </span>
                </div>
              )}
            </div>

            {/* Proper Colour Option */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-800">
                  Color: <span className="font-normal text-neutral-600">{selectedColor.name}</span>
                </span>
                <span className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1">
                  <Check className="w-3 h-3" /> In Stock & Ready to Ship
                </span>
              </div>

              <div className="flex items-center gap-3">
                {FEATURED_HOODIE.colors.map((color) => {
                  const isSelected = color.id === selectedColor.id;
                  return (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color)}
                      className={`relative group flex flex-col items-center gap-1.5 p-1 rounded-xl transition-all ${
                        isSelected ? 'scale-105' : 'opacity-80 hover:opacity-100'
                      }`}
                      aria-label={`Select color ${color.name}`}
                    >
                      <span
                        className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center shadow-xs ${
                          isSelected
                            ? 'border-neutral-900 ring-2 ring-amber-500/50'
                            : 'border-white hover:border-neutral-400'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      >
                        {isSelected && (
                          <Check
                            className={`w-4 h-4 ${
                              color.hex === '#FAF9F6' || color.hex === '#D7CEC7' || color.hex === '#9A9CA1'
                                ? 'text-neutral-900'
                                : 'text-white'
                            }`}
                          />
                        )}
                      </span>
                      <span className="text-[10px] font-medium text-neutral-600 group-hover:text-neutral-900">
                        {color.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Proper Size Chart & Size Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-800">
                  Select Size: <span className="font-mono text-amber-900 font-bold">{selectedSize}</span>
                </span>

                {/* Size Chart Trigger */}
                <button
                  type="button"
                  onClick={() => setIsSizeChartOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-950 underline underline-offset-2 decoration-amber-400 cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5 text-amber-600" />
                  View Size Chart & Measurements
                </button>
              </div>

              {/* Size Buttons Grid */}
              <div className="grid grid-cols-6 gap-2">
                {FEATURED_HOODIE.sizes.map((sz) => {
                  const isSelected = sz === selectedSize;
                  return (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`h-11 rounded-xl text-xs font-bold font-mono transition-all flex items-center justify-center border ${
                        isSelected
                          ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                          : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400 hover:bg-neutral-100'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-neutral-500">
                Boxy relaxed streetwear cut. Size down if you prefer a fitted silhouette.
              </p>
            </div>

            {/* Quantity and Add to Cart Action */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-neutral-200 rounded-xl bg-neutral-50 p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-600 hover:bg-white hover:text-neutral-900 disabled:opacity-30 transition-colors font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono text-sm font-bold text-neutral-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-600 hover:bg-white hover:text-neutral-900 transition-colors font-bold text-sm"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                    isAddedAnimation
                      ? 'bg-emerald-700 text-white scale-98'
                      : 'bg-neutral-900 hover:bg-neutral-800 text-white active:scale-98'
                  }`}
                >
                  {isAddedAnimation ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-amber-400" />
                      <span>Add to Cart · Earn $5 Cashback</span>
                    </>
                  )}
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-neutral-100 text-[11px] text-neutral-600 text-center">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-neutral-500" />
                  <span>Free Express Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RotateCcw className="w-4 h-4 text-neutral-500" />
                  <span>30-Day Easy Returns</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-neutral-500" />
                  <span>GOTS Organic Cotton</span>
                </div>
              </div>
            </div>

            {/* Spec Tabs */}
            <div className="pt-2 border-t border-neutral-100">
              <div className="flex items-center gap-2 border-b border-neutral-200 pb-2 text-xs">
                <button
                  onClick={() => setActiveTab('fabric')}
                  className={`pb-1 font-semibold transition-colors ${
                    activeTab === 'fabric'
                      ? 'text-neutral-900 border-b-2 border-neutral-900'
                      : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  Fabric & Weight
                </button>
                <button
                  onClick={() => setActiveTab('features')}
                  className={`pb-1 font-semibold transition-colors ${
                    activeTab === 'features'
                      ? 'text-neutral-900 border-b-2 border-neutral-900'
                      : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  Key Details
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`pb-1 font-semibold transition-colors ${
                    activeTab === 'care'
                      ? 'text-neutral-900 border-b-2 border-neutral-900'
                      : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  Care Guide
                </button>
              </div>

              <div className="pt-3 text-xs text-neutral-600 leading-relaxed">
                {activeTab === 'fabric' && (
                  <ul className="space-y-1.5 list-disc pl-4">
                    {FEATURED_HOODIE.fabricDetails.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
                {activeTab === 'features' && (
                  <ul className="space-y-1.5 list-disc pl-4">
                    {FEATURED_HOODIE.features.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
                {activeTab === 'care' && (
                  <ul className="space-y-1.5 list-disc pl-4">
                    {FEATURED_HOODIE.careInstructions.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
