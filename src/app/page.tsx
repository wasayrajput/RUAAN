'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { MarqueeBanner } from '@/components/MarqueeBanner';
import { HeroBanner } from '@/components/HeroBanner';
import { SuitSlider } from '@/components/SuitSlider';
import { ProductCatalog } from '@/components/ProductCatalog';
import { Lookbook } from '@/components/Lookbook';
import { Testimonials } from '@/components/Testimonials';
import { Footer } from '@/components/Footer';
import { ProductModal } from '@/components/ProductModal';
import { SizeChartModal } from '@/components/SizeChartModal';
import { FabricCareGuide } from '@/components/FabricCareGuide';
import { CartDrawer } from '@/components/CartDrawer';
import { DirectOrderModal } from '@/components/DirectOrderModal';
import { WishlistDrawer } from '@/components/WishlistDrawer';
import { SocialProofToast } from '@/components/SocialProofToast';
import { OrdersModal } from '@/components/OrdersModal';
import { Product } from '@/types/product';

export default function Home() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [isCareGuideOpen, setIsCareGuideOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isOrdersLogOpen, setIsOrdersLogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <main className="min-h-screen bg-white flex flex-col font-sans selection:bg-brand-nude selection:text-white relative">
      {/* Navbar with Sticky Announcement & Search */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCareGuide={() => setIsCareGuideOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Infinite Luxury Marquee Banner */}
      <MarqueeBanner />

      {/* Hero Banner Presentation */}
      <HeroBanner />

      {/* Interactive Auto-Playing Suit Slide Showcase */}
      <SuitSlider onQuickView={(product) => setQuickViewProduct(product)} />

      {/* Product Showcase Catalog with Dynamic Filters */}
      <ProductCatalog
        searchQuery={searchQuery}
        onQuickView={(product) => setQuickViewProduct(product)}
      />

      {/* Editorial Campaign Lookbook Grid */}
      <Lookbook />

      {/* Verified Client Reviews & Ratings */}
      <Testimonials />

      {/* Footer */}
      <Footer
        onOpenCareGuide={() => setIsCareGuideOpen(true)}
        onOpenSizeChart={() => setIsSizeChartOpen(true)}
        onOpenOrders={() => setIsOrdersLogOpen(true)}
      />

      {/* Modals & Slide-Over Drawers */}
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onOpenSizeChart={() => setIsSizeChartOpen(true)}
        onOpenCareGuide={() => setIsCareGuideOpen(true)}
      />

      <SizeChartModal
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
      />

      <FabricCareGuide
        isOpen={isCareGuideOpen}
        onClose={() => setIsCareGuideOpen(false)}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        onQuickView={(product) => setQuickViewProduct(product)}
      />

      <CartDrawer />
      <DirectOrderModal />

      {/* Live Social Proof Order Notification Toast */}
      <SocialProofToast />

      {/* Store Owner Orders Log Modal */}
      <OrdersModal
        isOpen={isOrdersLogOpen}
        onClose={() => setIsOrdersLogOpen(false)}
      />
    </main>
  );
}
