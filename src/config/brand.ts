export interface Currency {
  code: 'PKR' | 'USD' | 'AED' | 'GBP';
  symbol: string;
  rate: number; // base PKR = 1
}

export const CURRENCIES: Record<string, Currency> = {
  PKR: { code: 'PKR', symbol: '₨', rate: 1 },
  USD: { code: 'USD', symbol: '$', rate: 0.0036 },
  AED: { code: 'AED', symbol: 'AED ', rate: 0.013 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.0028 }
};

export const BRAND_CONFIG = {
  name: "RUAAN",
  tagline: "Luxury Ethnic & Everyday Suits",
  whatsappNumber: "+923068972548",
  whatsappFormatted: "+92 306 8972548",
  email: "ruaan.pk@gmail.com",
  currencySymbol: "Rs",
  standardDeliveryFee: 150,
  shippingThresholdFree: 5000,
  logoPng: "/logo.png",
  logoJpg: "/logo.jpg",
  socials: {
    instagram: "https://www.instagram.com/ruaan.official?stkn=emlnNnJhbHpvdHNi",
    facebook: "https://www.facebook.com/share/14qZhP9sgZg/",
    whatsapp: "https://wa.me/923068972548"
  },
  marqueeItems: [
    "✦ RUAAN LUXURY DORIA & STONE LINEN '26 EDIT",
    "✦ FREE NATIONWIDE SHIPPING ON ORDERS OVER RS 5,000",
    "✦ EXPRESS NATIONWIDE DELIVERY",
    "✦ DIRECT WHATSAPP ORDER & CONCIERGE",
    "✦ 100% ORIGINAL FABRICS GUARANTEE"
  ]
};
