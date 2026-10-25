'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { MarqueeBanner } from '@/components/MarqueeBanner';
import { HeroBanner } from '@/components/HeroBanner';
import { CategoryCards } from '@/components/CategoryCards';
import { MidPromoBanner } from '@/components/MidPromoBanner';
import { ProductCatalog } from '@/components/ProductCatalog';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { EditorialSplit } from '@/components/EditorialSplit';
import { BestSellers } from '@/components/BestSellers';
import { DiscountSplitBanner } from '@/components/DiscountSplitBanner';
import { Testimonials } from '@/components/Testimonials';
import { NewsletterBanner } from '@/components/NewsletterBanner';
import { Footer } from '@/components/Footer';
import { ProductModal } from '@/components/ProductModal';
import { SizeChartModal } from '@/components/SizeChartModal';
import { FabricCareGuide } from '@/components/FabricCareGuide';
import { CartDrawer } from '@/components/CartDrawer';
import { DirectOrderModal } from '@/components/DirectOrderModal';
import { WishlistDrawer } from '@/components/WishlistDrawer';
import { SocialProofToast } from '@/components/SocialProofToast';
import { OrdersModal } from '@/components/OrdersModal';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { Product } from '@/types/product';

export default function Home() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [isCareGuideOpen, setIsCareGuideOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isOrdersLogOpen, setIsOrdersLogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFabric, setSelectedFabric] = useState<string>('All');

  const handleSelectCategory = (fabric: string) => {
    setSelectedFabric(fabric);
  };

  return (
    <main className="min-h-screen bg-white flex flex-col font-sans selection:bg-brand-nude selection:text-white relative pb-16 md:pb-0">
      {/* 1. Header / Navbar with Sticky Announcement & Search */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCareGuide={() => setIsCareGuideOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Luxury Marquee Ticker */}
      <MarqueeBanner />

      {/* 2. Hero Section (Reference: Left Headline & Badges, Right Model Cutout with Script Tag) */}
      <HeroBanner />

      {/* 3. Shop by Category (Reference: Rounded Pastel Cards) */}
      <CategoryCards onSelectCategory={handleSelectCategory} />

      {/* 4. Mid Promo Banner (Reference: Dark Contrast Banner with Model Arch) */}
      <MidPromoBanner />

      {/* 5. Featured Collection (Reference: 4-Column Grid, Discount Badges, Star Ratings) */}
      <ProductCatalog
        searchQuery={searchQuery}
        selectedFabric={selectedFabric}
        onSelectFabric={setSelectedFabric}
        onQuickView={(product) => setQuickViewProduct(product)}
      />

      {/* 6. Why Choose Us? (Reference: 4 Icon Feature Columns with Botanical Motifs) */}
      <WhyChooseUs />

      {/* 7. Editorial Split Feature (Reference: Casual Looks For Everyday / Effortless Style) */}
      <EditorialSplit />

      {/* 8. Best Sellers (Reference: 4-Suit Row Loved by Thousands of Women) */}
      <BestSellers onQuickView={(product) => setQuickViewProduct(product)} />

      {/* 9. Special Discount Split Banner (Reference: Up To 30% OFF) */}
      <DiscountSplitBanner />

      {/* 10. Customer Reviews (Reference: What Our Customers Say - 3 Cards with Avatars & Stars) */}
      <Testimonials />

      {/* 11. Newsletter Signup Box (Reference: Be the First to Know with Arched Photo) */}
      <NewsletterBanner />

      {/* 12. Rich Dark Luxury Footer (Reference: Socials, Quick Links, Customer Care, Contact & Payment Badges) */}
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

      {/* Modern App-Like Sticky Mobile Bottom Navigation Bar */}
      <MobileBottomNav onOpenWishlist={() => setIsWishlistOpen(true)} />
    </main>
  );
}
