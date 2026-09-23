import React from 'react';
import { EcommerceProvider } from './context/EcommerceContext';
import { Header } from './components/Header';
import { WelcomeBackBanner } from './components/WelcomeBackBanner';
import { PromoBanner } from './components/PromoBanner';
import { FeaturedHoodieHero } from './components/FeaturedHoodieHero';
import { ProductGrid } from './components/ProductGrid';
import { WalletModal } from './components/WalletModal';
import { SizeChartModal } from './components/SizeChartModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { PostPurchaseScreen } from './components/PostPurchaseScreen';
import { GA4InspectorModal, FloatingInspectorTrigger } from './components/GA4InspectorModal';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <EcommerceProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-neutral-900 font-sans selection:bg-amber-100 selection:text-amber-950">
        {/* Top Header with persistent Cashback Wallet Widget (PRD Section 5) */}
        <Header />

        {/* PRD Section 1 & 7: Welcome Back Banner (shown only to returning visitors, highlighting "Your $5 cashback is waiting!") */}
        <WelcomeBackBanner />

        {/* PRD Section 2: Promo Banner ("🎁 Get $5 Cashback on Your Purchase" with "Shop Now" CTA) */}
        <PromoBanner />

        <main className="flex-1">
          {/* PRD Section 3: Featured Product Hero (Best-Selling Hoodie with color variants, size chart, $5 cashback under price) */}
          <FeaturedHoodieHero />

          {/* PRD Section 4: Product Grid (Recommended products, each showing "Earn $___ Cashback" under price) */}
          <ProductGrid />
        </main>

        {/* Global Drawers, Modals, and Overlays */}
        {/* PRD Section 5: Expandable Cashback Wallet view */}
        <WalletModal />

        {/* Proper Size Chart Modal */}
        <SizeChartModal />

        {/* Shopping Cart Slide-over with Wallet Balance Redemption */}
        <CartDrawer />

        {/* Checkout Modal */}
        <CheckoutModal />

        {/* PRD Section 6: Post-purchase confirmation screen */}
        <PostPurchaseScreen />

        {/* GA4 dataLayer Real-Time Inspector & Event Tracking Plan */}
        <GA4InspectorModal />
        <FloatingInspectorTrigger />

        {/* Modern clean footer */}
        <Footer />
      </div>
    </EcommerceProvider>
  );
}
