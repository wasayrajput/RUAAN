import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { BRAND_CONFIG } from '@/config/brand';

export const metadata: Metadata = {
  metadataBase: new URL('https://ruaan.pk'),
  title: `${BRAND_CONFIG.name} | Luxury Ladies Suits & Ethnic Couture`,
  description: 'Shop luxury doria linen, stone linen, digital viscose, dhanak, karandi, and khaddar unstitched & stitched ladies suits from RUAAN. Direct WhatsApp ordering.',
  keywords: ['Ruaan Suits', 'Ladies Suit Brand', 'Doria Linen Stitched', 'Stone Linen', 'Viscose Suits Pakistan', 'Khaddar Suits', 'Dhanak Suits', 'Karandi Suits', 'Unstitched Suits', 'Boutique Clothing'],
  openGraph: {
    title: `${BRAND_CONFIG.name} — Luxury Ethnic & Everyday Suits`,
    description: 'High-speed Jamstack Store for RUAAN Ladies Suit Label.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-brand-nude selection:text-white">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
