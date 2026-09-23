import React, { useState } from 'react';
import { Star, ShoppingBag, Sparkles, Check } from 'lucide-react';
import { RECOMMENDED_PRODUCTS } from '../data/products';
import { Product, ColorVariant, ProductSize } from '../types/ecommerce';
import { useEcommerce } from '../context/EcommerceContext';
import { analytics } from '../utils/analytics';

export const ProductGrid: React.FC = () => {
  const { addToCart, setIsSizeChartOpen } = useEcommerce();

  return (
    <section id="recommended-collection" className="py-16 bg-[#FAF9F6] border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-1.5">
              <span>Complete The Look</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-700 font-bold">Reward Eligible</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 font-display">
              Recommended Styles
            </h2>
            <p className="text-sm text-neutral-600 mt-1 max-w-xl">
              Pair your hoodie with our signature organic cotton layers. Every item qualifies for instant cashback rewards credited to your wallet.
            </p>
          </div>

          <div className="text-xs text-neutral-500 flex items-center gap-2">
            <span>All items covered by 30-day wear guarantee</span>
          </div>
        </div>

        {/* 3-Column Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RECOMMENDED_PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onOpenSizeChart={() => setIsSizeChartOpen(true)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, color: ColorVariant, size: ProductSize, quantity?: number) => void;
  onOpenSizeChart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onOpenSizeChart }) => {
  const [selectedColor, setSelectedColor] = useState<ColorVariant>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[1] || product.sizes[0]);
  const [isAdded, setIsAdded] = useState(false);

  const handleCardClick = () => {
    analytics.viewItem({
      item_name: product.name,
      item_category: product.category,
      price: product.price,
      cashback_offered: product.cashbackOffered,
    });
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedColor, selectedSize, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
    >
      {/* Product Image Area */}
      <div className="relative aspect-4/3 overflow-hidden bg-neutral-100">
        <img
          src={selectedColor.image}
          alt={`${product.name} in ${selectedColor.name}`}
          className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {product.isBestseller && (
          <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-neutral-900/90 backdrop-blur-xs text-white text-[11px] font-bold shadow-xs">
            🔥 Bestseller
          </div>
        )}

        {/* Quick view of color active */}
        <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium">
          {selectedColor.name}
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
            <span>{product.category.split('/')[1] || product.category}</span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-neutral-800 font-mono">{product.rating}</span>
            </div>
          </div>

          <h3 className="text-base font-bold text-neutral-900 font-display group-hover:text-amber-950 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-neutral-600 line-clamp-2 mt-1">
            {product.subtitle}
          </p>

          {/* Pricing & Earn Cashback */}
          <div className="mt-3 pt-3 border-t border-neutral-100">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold font-mono text-neutral-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-neutral-400 line-through font-mono">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Earn $___ Cashback directly under price as requested by PRD */}
            <div className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-lg">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Earn ${product.cashbackOffered.toFixed(2)} Cashback</span>
            </div>
          </div>
        </div>

        {/* Interactive Controls (Colors & Sizes) */}
        <div className="space-y-3 pt-2">
          {/* Colors */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-neutral-500">Color</span>
            <div className="flex items-center gap-1.5">
              {product.colors.map((color) => {
                const isSelected = color.id === selectedColor.id;
                return (
                  <button
                    key={color.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedColor(color);
                    }}
                    title={color.name}
                    className={`w-5 h-5 rounded-full border transition-all ${
                      isSelected
                        ? 'border-neutral-900 ring-2 ring-amber-500/40 scale-110'
                        : 'border-white hover:border-neutral-400'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                );
              })}
            </div>
          </div>

          {/* Sizes */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-neutral-500">Size</span>
            <div className="flex items-center gap-1">
              {product.sizes.map((sz) => {
                const isSelected = sz === selectedSize;
                return (
                  <button
                    key={sz}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSize(sz);
                    }}
                    className={`w-7 h-6 rounded text-[10px] font-bold font-mono transition-colors ${
                      isSelected
                        ? 'bg-neutral-900 text-white'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAdd}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-neutral-900 hover:bg-neutral-800 text-white'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                <span>Add to Bag · Earn ${product.cashbackOffered.toFixed(2)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
