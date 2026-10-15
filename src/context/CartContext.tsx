'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, CustomerDetails, ColorSwatch, SizeOption, getProductArticleCode } from '@/types/product';
import { BRAND_CONFIG } from '@/config/brand';
import productsData from '@/data/products.json';

export interface DirectOrderInfo {
  product: Product;
  selectedSize: SizeOption;
  selectedColor?: ColorSwatch;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: string[];
  formatPrice: (priceInPKR: number) => string;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  checkoutStep: 'cart' | 'checkout';
  setCheckoutStep: (step: 'cart' | 'checkout') => void;
  directOrder: DirectOrderInfo | null;
  openDirectOrder: (product: Product, size?: SizeOption, color?: ColorSwatch, quantity?: number) => void;
  closeDirectOrder: () => void;
  addToCart: (product: Product, size?: SizeOption, color?: ColorSwatch, quantity?: number) => void;
  openCheckoutWithProduct: (product: Product, size?: SizeOption, color?: ColorSwatch, quantity?: number) => void;
  removeFromCart: (productId: string, size?: SizeOption) => void;
  updateQuantity: (productId: string, size: SizeOption, quantity: number) => void;
  clearCart: () => void;
  clearWishlist: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  totalItems: number;
  subtotal: number;
  generateWhatsAppOrderUrl: (customerDetails: CustomerDetails) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout'>('cart');
  const [directOrder, setDirectOrder] = useState<DirectOrderInfo | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const validProductIds = new Set((productsData as Product[]).map((p) => p.id));

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('ruaan_cart');
      const savedWishlist = localStorage.getItem('ruaan_wishlist');
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) {
        const parsed: string[] = JSON.parse(savedWishlist);
        const validOnly = parsed.filter((id) => validProductIds.has(id));
        setWishlist(validOnly);
      }
    } catch (e) {
      console.error('Error loading state:', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('ruaan_cart', JSON.stringify(cart));
      localStorage.setItem('ruaan_wishlist', JSON.stringify(wishlist));
    }
  }, [cart, wishlist, isInitialized]);

  const formatPrice = (price: number): string => {
    return `${BRAND_CONFIG.currencySymbol} ${price.toLocaleString()}`;
  };

  const addToCart = (product: Product, size?: SizeOption, color?: ColorSwatch, quantity = 1) => {
    const selectedSize = size || (product.availableSizes ? product.availableSizes[0] : 'Unstitched');
    const selectedColor = color || (product.colorSwatches && product.colorSwatches[0]);
    
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        if (selectedColor) updated[existingIndex].selectedColor = selectedColor;
        return updated;
      } else {
        return [...prevCart, { product, selectedSize, selectedColor, quantity }];
      }
    });
    setIsCartOpen(true);
  };

  const openCheckoutWithProduct = (
    product: Product,
    size?: SizeOption,
    color?: ColorSwatch,
    quantity = 1
  ) => {
    const selectedSize = size || (product.availableSizes ? product.availableSizes[0] : 'Unstitched');
    const selectedColor = color || (product.colorSwatches && product.colorSwatches[0]);

    // Direct Single-Suit WhatsApp Buy: Isolate to just this suit so old test items don't mix in
    setCart([{ product, selectedSize, selectedColor, quantity }]);
    setCheckoutStep('checkout');
    setIsCartOpen(true);
  };

  const openDirectOrder = (
    product: Product,
    size?: SizeOption,
    color?: ColorSwatch,
    quantity = 1
  ) => {
    const selectedSize = size || (product.availableSizes ? product.availableSizes[0] : 'Unstitched');
    const selectedColor = color || (product.colorSwatches && product.colorSwatches[0]);
    // Does NOT touch cart at all! Cart remains completely intact!
    setDirectOrder({ product, selectedSize, selectedColor, quantity });
  };

  const closeDirectOrder = () => {
    setDirectOrder(null);
  };

  const removeFromCart = (productId: string, size?: SizeOption) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && (!size || item.selectedSize === size)))
    );
  };

  const updateQuantity = (productId: string, size: SizeOption, quantity: number) => {
    // Minimum quantity is 1; product will never disappear by clicking minus. Only trash icon removes it.
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedSize === size
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('ruaan_cart');
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem('ruaan_wishlist');
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const next = prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId];
      localStorage.setItem('ruaan_wishlist', JSON.stringify(next));
      return next;
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const generateWhatsAppOrderUrl = (customerDetails: CustomerDetails) => {
    const orderId = `RU-${Math.floor(1000 + Math.random() * 9000)}`;
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://ruaan.pk';

    let message = `✦ NEW ORDER - ${BRAND_CONFIG.name}\n`;
    message += `Order ID: *#${orderId}*\n\n`;

    message += `Customer Details:\n`;
    message += `✦ Name: ${customerDetails.fullName}\n`;
    message += `✦ Phone: ${customerDetails.phone}\n`;
    message += `✦ Address: ${customerDetails.address}${customerDetails.city ? ', ' + customerDetails.city : ''}\n`;

    if (customerDetails.notes) {
      message += `✦ Notes: ${customerDetails.notes}\n`;
    }

    message += `\nSuits Ordered (${totalItems} items):\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;

    cart.forEach((item, index) => {
      const colorStr = item.selectedColor ? ` | Color: ${item.selectedColor.name}` : '';
      const photoUrl = `${origin}${item.selectedColor?.image || item.product.mainImage}`;
      const articleCode = getProductArticleCode(item.product, item.selectedColor);
      message += `${index + 1}. *${item.product.title}*\n`;
      message += `   • Design Code: *${articleCode}*\n`;
      message += `   • Fabric: ${item.product.fabric} (${item.product.stitchType})\n`;
      message += `   • Available Sizes: *${item.selectedSize}*${colorStr}\n`;
      message += `   • Quantity: ${item.quantity} x ${formatPrice(item.product.price)}\n`;
      message += `   • Suit Photo: ${photoUrl}\n\n`;
    });

    const isFreeShipping = subtotal >= BRAND_CONFIG.shippingThresholdFree;
    const shippingCost = isFreeShipping ? 0 : 250;

    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `Subtotal: ${formatPrice(subtotal)}\n`;
    message += `Delivery: ${isFreeShipping ? 'FREE Delivery' : formatPrice(shippingCost)}\n`;
    message += `*Grand Total: ${formatPrice(subtotal + shippingCost)}*\n\n`;
    message += `Please confirm my order and share delivery timeline. Thank you!`;

    // Persist order into merchant local records
    try {
      if (typeof window !== 'undefined') {
        const newOrder = {
          orderId,
          date: new Date().toISOString(),
          customer: customerDetails,
          items: cart.map((item) => ({
            id: item.product.id,
            designCode: getProductArticleCode(item.product, item.selectedColor),
            title: item.product.title,
            fabric: item.product.fabric,
            stitchType: item.product.stitchType,
            size: item.selectedSize,
            color: item.selectedColor?.name,
            quantity: item.quantity,
            price: item.product.price,
            image: item.selectedColor?.image || item.product.mainImage,
          })),
          total: subtotal + shippingCost,
          isFreeShipping,
        };
        const existingOrders = JSON.parse(localStorage.getItem('ruaan_placed_orders') || '[]');
        localStorage.setItem('ruaan_placed_orders', JSON.stringify([newOrder, ...existingOrders]));
      }
    } catch (e) {
      console.error('Could not save order record:', e);
    }

    const cleanedPhone = BRAND_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        formatPrice,
        isCartOpen,
        setIsCartOpen,
        checkoutStep,
        setCheckoutStep,
        directOrder,
        openDirectOrder,
        closeDirectOrder,
        addToCart,
        openCheckoutWithProduct,
        removeFromCart,
        updateQuantity,
        clearCart,
        clearWishlist,
        toggleWishlist,
        isInWishlist,
        totalItems,
        subtotal,
        generateWhatsAppOrderUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
