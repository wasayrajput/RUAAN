export type FabricType = 'Doria Linen' | 'Stone Linen' | 'Viscose' | 'Khaddar' | 'Dhanak' | 'Karandi' | 'Viscose Linen' | 'Plain Linen';

export type CollectionType = 'Doria Linen Stitched' | 'Stone Linen Stitched' | 'Doria Linen 3-Piece Stitched' | 'Digital Viscose Vol 1' | 'Khaddar Winter Vol 1' | 'Dhanak Allover' | 'Karandi Allover' | 'Viscose Linen Allover' | 'Plain Linen Stitched';

export type StitchType = 'Unstitched 3-Piece' | 'Unstitched 2-Piece' | 'Stitched Ready-to-Wear' | 'Stitched 2-Piece' | 'Stitched 3-Piece';

export type SizeOption = 'S' | 'M' | 'L' | 'XL' | 'Unstitched';

export interface ColorSwatch {
  name: string;
  hex: string;
  image: string;
  codeSuffix?: string;
}

export interface Product {
  id: string;
  designCode?: string;
  title: string;
  subtitle: string;
  price: number; // PKR
  originalPrice?: number;
  fabric: FabricType;
  collection: CollectionType;
  stitchType: StitchType;
  availableSizes: SizeOption[];
  colorSwatches?: ColorSwatch[];
  mainImage: string;
  galleryImages: string[];
  description: string;
  details: {
    shirt: string;
    dupatta: string;
    trouser: string;
  };
  careInstructions: string[];
  isNewArrival?: boolean;
  isBestseller?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: SizeOption;
  selectedColor?: ColorSwatch;
  quantity: number;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
}

export function getProductArticleCode(product: Product, swatch?: ColorSwatch): string {
  let code = (product.designCode || product.id).toUpperCase();
  // Strip any accidental file extensions like .jpeg, .png, .jpg, .webp
  code = code.replace(/\.(JPEG|JPG|PNG|WEBP)$/i, '').trim();
  if (swatch?.codeSuffix && product.colorSwatches && product.colorSwatches.length > 1) {
    return `${code}${swatch.codeSuffix}`;
  }
  return code;
}

