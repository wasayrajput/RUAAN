import { BRAND_CONFIG } from '@/config/brand';

export type DeliveryZone = 'lahore' | 'punjab' | 'other';

export interface DeliveryRateInfo {
  zone: DeliveryZone;
  fee: number;
  originalFee: number;
  isFree: boolean;
  zoneLabel: string;
  badgeText: string;
}

export const DELIVERY_RATES = {
  lahore: 250,
  punjab: 350,
  other: 400,
} as const;

export const PROVINCE_ZONES = [
  { id: 'lahore' as DeliveryZone, label: 'Lahore (Rs. 250)', rate: 250 },
  { id: 'punjab' as DeliveryZone, label: 'Punjab — Other Cities (Rs. 350)', rate: 350 },
  { id: 'other' as DeliveryZone, label: 'Other Provinces (Sindh, KPK, Balochistan, Islamabad) (Rs. 400)', rate: 400 },
];

// Comprehensive list of Punjab cities / areas
const PUNJAB_CITIES: string[] = [
  'faisalabad', 'fsd',
  'rawalpindi', 'rwp',
  'multan', 'mux',
  'gujranwala', 'grw',
  'sialkot', 'skt',
  'sargodha',
  'bahawalpur', 'bwp',
  'sheikhupura', 'skp',
  'gujrat',
  'jhelum',
  'sahiwal',
  'kasur',
  'okara',
  'rahim yar khan', 'ryk',
  'dera ghazi khan', 'dg khan', 'd.g. khan',
  'muridke',
  'kamoke',
  'wazirabad',
  'chiniot',
  'hafizabad',
  'khanewal',
  'vehari',
  'muzaffargarh',
  'mandi bahauddin', 'mb din', 'm.b. din',
  'jhang',
  'toba tek singh', 'tts',
  'pakpattan',
  'bahawalnagar',
  'mianwali',
  'bhakkar',
  'chakwal',
  'attock',
  'layyah',
  'lodhran',
  'nankana sahib',
  'khushab',
  'narowal',
  'rajanpur',
  'burewala',
  'taxila',
  'gojra',
  'samundri',
  'jaranwala',
  'shorkot',
  'kot radha kishan',
  'chunian',
  'pattoki',
  'daska',
  'pasrur',
  'sambrial',
  'bhalwal',
  'kot addu',
  'taunsa',
  'ahmedpur east',
  'liaquatpur',
  'sadiqabad',
  'mian channu',
  'kabirwala',
  'arifwala',
  'chichawatni',
  'depalpur',
  'renala khurd',
  'haroonabad',
  'fort abbas',
  'chishtian',
  'hasilpur',
  'yazman',
  'jalalpur pirwala',
  'shujabad',
  'jahanian',
  'mailsi',
  'alipur',
  'jatoi',
  'fateh jang',
  'pindi gheb',
  'hasan abdal',
  'kallar kahar',
  'pind dadan khan',
  'dina',
  'sohawa',
  'kharian',
  'sarai alamgir',
  'phalia',
  'pindi bhattian',
  'nowshera virkan',
  'zafarwal',
  'shakargarh',
  'lalamusa',
  'wah cantt', 'wah',
];

// Top Pakistani cities for suggestions / autocomplete
export const POPULAR_CITIES = [
  { name: 'Lahore', zone: 'lahore' as DeliveryZone },
  { name: 'Karachi', zone: 'other' as DeliveryZone },
  { name: 'Islamabad', zone: 'other' as DeliveryZone },
  { name: 'Rawalpindi', zone: 'punjab' as DeliveryZone },
  { name: 'Faisalabad', zone: 'punjab' as DeliveryZone },
  { name: 'Multan', zone: 'punjab' as DeliveryZone },
  { name: 'Gujranwala', zone: 'punjab' as DeliveryZone },
  { name: 'Peshawar', zone: 'other' as DeliveryZone },
  { name: 'Quetta', zone: 'other' as DeliveryZone },
  { name: 'Sialkot', zone: 'punjab' as DeliveryZone },
  { name: 'Hyderabad', zone: 'other' as DeliveryZone },
  { name: 'Sargodha', zone: 'punjab' as DeliveryZone },
  { name: 'Bahawalpur', zone: 'punjab' as DeliveryZone },
  { name: 'Gujrat', zone: 'punjab' as DeliveryZone },
  { name: 'Sheikhupura', zone: 'punjab' as DeliveryZone },
  { name: 'Muridke', zone: 'punjab' as DeliveryZone },
  { name: 'Jhelum', zone: 'punjab' as DeliveryZone },
  { name: 'Sahiwal', zone: 'punjab' as DeliveryZone },
  { name: 'Kasur', zone: 'punjab' as DeliveryZone },
  { name: 'Okara', zone: 'punjab' as DeliveryZone },
  { name: 'Rahim Yar Khan', zone: 'punjab' as DeliveryZone },
  { name: 'Abbottabad', zone: 'other' as DeliveryZone },
  { name: 'Sukkur', zone: 'other' as DeliveryZone },
  { name: 'Wah Cantt', zone: 'punjab' as DeliveryZone },
  { name: 'Mardan', zone: 'other' as DeliveryZone },
  { name: 'Dera Ghazi Khan', zone: 'punjab' as DeliveryZone },
  { name: 'Chiniot', zone: 'punjab' as DeliveryZone },
  { name: 'Kamoke', zone: 'punjab' as DeliveryZone },
  { name: 'Wazirabad', zone: 'punjab' as DeliveryZone },
];

/**
 * Determine delivery zone from customer entered city or explicit province
 */
export function detectDeliveryZone(cityInput?: string, manualZone?: DeliveryZone): DeliveryZone {
  if (manualZone) {
    return manualZone;
  }

  if (!cityInput || typeof cityInput !== 'string') {
    return 'other';
  }

  const clean = cityInput.trim().toLowerCase();
  if (!clean) return 'other';

  // 1. Lahore Detection
  if (
    clean === 'lahore' ||
    clean === 'lhr' ||
    clean.includes('lahore') ||
    clean.startsWith('lhr')
  ) {
    return 'lahore';
  }

  // 2. Punjab Cities Detection
  // Check exact match or contains city name
  for (const city of PUNJAB_CITIES) {
    if (clean === city || clean.includes(city)) {
      return 'punjab';
    }
  }

  // Also check if user typed "punjab" anywhere in address or city
  if (clean.includes('punjab')) {
    return 'punjab';
  }

  // 3. Otherwise Default to Other Provinces
  return 'other';
}

/**
 * Calculate delivery fee based on city, zone, and subtotal (Free above Rs 5,000)
 */
export function calculateDeliveryRate(
  cityInput?: string,
  subtotal: number = 0,
  manualZone?: DeliveryZone
): DeliveryRateInfo {
  const zone = detectDeliveryZone(cityInput, manualZone);
  const originalFee = DELIVERY_RATES[zone];
  const isFree = subtotal >= BRAND_CONFIG.shippingThresholdFree;
  const fee = isFree ? 0 : originalFee;

  let zoneLabel = 'Other Provinces (Sindh, KPK, Balochistan, Islamabad)';
  let badgeText = 'Nationwide Delivery';

  if (zone === 'lahore') {
    zoneLabel = 'Lahore (Same City Delivery)';
    badgeText = 'Lahore Express';
  } else if (zone === 'punjab') {
    zoneLabel = 'Punjab (All Punjab Cities)';
    badgeText = 'Punjab Delivery';
  }

  return {
    zone,
    fee,
    originalFee,
    isFree,
    zoneLabel,
    badgeText,
  };
}
