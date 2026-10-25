'use client';

import React, { useState, useMemo, useEffect } from 'react';
import productsData from '@/data/products.json';
import { Product, FabricType } from '@/types/product';
import { ProductCard } from './ProductCard';
import { Filter, RotateCcw, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductCatalogProps {
  onQuickView: (product: Product) => void;
  searchQuery: string;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onQuickView,
  searchQuery,
}) => {
  const [selectedFabric, setSelectedFabric] = useState<string>('All');
  const [selectedStitch, setSelectedStitch] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'newest'>('featured');

  const fabrics: (FabricType | 'All')[] = [
    'All',
    'Doria Linen',
    'Stone Linen',
    'Plain Linen',
    'Viscose',
    'Khaddar',
    'Dhanak',
    'Karandi',
    'Viscose Linen'
  ];

  const filteredProducts = useMemo(() => {
    let result = (productsData as Product[]).filter((product) => {
      if (selectedFabric !== 'All' && product.fabric !== selectedFabric) return false;
      if (selectedStitch !== 'All' && !product.stitchType.includes(selectedStitch)) return false;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesFabric = product.fabric.toLowerCase().includes(query);
        const matchesCollection = product.collection.toLowerCase().includes(query);
        const matchesSubtitle = product.subtitle.toLowerCase().includes(query);
        return matchesTitle || matchesFabric || matchesCollection || matchesSubtitle;
      }
      return true;
    });

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }

    return result;
  }, [selectedFabric, selectedStitch, searchQuery, sortBy]);

  const ITEMS_PER_PAGE = 16;
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Reset to page 1 whenever filter or search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFabric, selectedStitch, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setSelectedFabric('All');
    setSelectedStitch('All');
    setSortBy('featured');
    setCurrentPage(1);
  };

  return (
    <section id="catalog" className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-semibold text-brand-nude uppercase tracking-widest">
            Handcrafted Ladies Suits
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-brand-charcoal">
            The Suit Collection
          </h2>
          <div className="w-16 h-0.5 bg-brand-nude mx-auto"></div>
        </div>

        {/* Filters Top Bar */}
        <div className="bg-brand-cream/70 border border-brand-nude/30 rounded-2xl p-3 sm:p-4 mb-6 sm:mb-8 backdrop-blur-xs">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
            
            {/* Left Fabric Filter Pills (Smooth Mobile Horizontal Scroll) */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 max-w-full no-scrollbar">
              <span className="text-[11px] sm:text-xs font-bold text-brand-charcoal uppercase tracking-wider flex items-center gap-1 mr-1 shrink-0">
                <Filter className="w-3.5 h-3.5 text-brand-nude" />
                Fabric:
              </span>
              {fabrics.map((fabric) => (
                <button
                  key={fabric}
                  onClick={() => setSelectedFabric(fabric)}
                  className={`px-3 py-1.5 text-[11px] sm:text-xs font-medium rounded-full transition whitespace-nowrap active:scale-95 shrink-0 ${
                    selectedFabric === fabric
                      ? 'bg-brand-charcoal text-brand-cream shadow-sm ring-1 ring-brand-charcoal'
                      : 'bg-white text-brand-charcoal border border-brand-nude/40 hover:border-brand-nude hover:bg-brand-cream/40'
                  }`}
                >
                  {fabric}
                </button>
              ))}
            </div>

            {/* Right Controls (Sort & Reset) */}
            <div className="flex items-center justify-between md:justify-end gap-2.5 pt-2 md:pt-0 border-t md:border-t-0 border-brand-nude/20">
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5 text-xs">
                <SlidersHorizontal className="w-3.5 h-3.5 text-brand-gray shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-brand-nude/40 rounded-lg px-2.5 py-1.5 text-[11px] sm:text-xs font-medium text-brand-charcoal focus:outline-none focus:ring-1 focus:ring-brand-nude"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>

              {/* Reset Button */}
              {(selectedFabric !== 'All' || selectedStitch !== 'All') && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-medium bg-white px-2.5 py-1.5 rounded-lg border border-rose-200 shadow-xs"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Catalog Count Indicator */}
        <div className="flex items-center justify-between text-[11px] sm:text-xs text-brand-gray mb-4 sm:mb-6">
          <p>
            Showing <strong className="text-brand-charcoal">{filteredProducts.length > 0 ? startIndex + 1 : 0}–{Math.min(endIndex, filteredProducts.length)}</strong> of <strong className="text-brand-charcoal">{filteredProducts.length}</strong> suits
          </p>
          {searchQuery && (
            <p>
              Results for &quot;<span className="text-brand-charcoal italic">{searchQuery}</span>&quot;
            </p>
          )}
        </div>

        {/* Product Grid (2-Column on Mobile, 4-Column on Desktop) */}
        {filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-6 lg:gap-8">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={onQuickView}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 pt-8 border-t border-brand-nude/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-brand-gray">
                  Page <strong className="text-brand-charcoal">{currentPage}</strong> of <strong className="text-brand-charcoal">{totalPages}</strong> (16 suits per page)
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 text-xs font-semibold rounded-xl border flex items-center gap-1 transition ${
                      currentPage === 1
                        ? 'opacity-30 cursor-not-allowed border-stone-200 text-stone-400 bg-stone-50'
                        : 'bg-white text-brand-charcoal border-brand-nude/40 hover:bg-brand-charcoal hover:text-white cursor-pointer shadow-xs'
                    }`}
                    aria-label="Previous Page"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-9 h-9 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center ${
                          currentPage === pageNum
                            ? 'bg-brand-charcoal text-white shadow-md'
                            : 'bg-white text-brand-charcoal border border-brand-nude/40 hover:bg-brand-cream'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 text-xs font-semibold rounded-xl border flex items-center gap-1 transition ${
                      currentPage === totalPages
                        ? 'opacity-30 cursor-not-allowed border-stone-200 text-stone-400 bg-stone-50'
                        : 'bg-white text-brand-charcoal border-brand-nude/40 hover:bg-brand-charcoal hover:text-white cursor-pointer shadow-xs'
                    }`}
                    aria-label="Next Page"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="py-20 text-center space-y-4 bg-brand-cream/30 rounded-3xl border border-dashed border-brand-nude/40">
            <p className="text-lg font-serif text-brand-charcoal">No suit matches your selected filters.</p>
            <p className="text-xs text-brand-gray">Try resetting your fabric or collection selection.</p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2 bg-brand-charcoal text-white text-xs font-semibold rounded-full hover:bg-brand-nude transition"
            >
              Clear All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
