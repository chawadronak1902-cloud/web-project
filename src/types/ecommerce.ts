export interface ColorVariant {
  id: string;
  name: string;
  hex: string;
  image: string;
  inStock: boolean;
}

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL';

export interface Product {
  id: string;
  name: string;
  category: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  cashbackOffered: number;
  isBestseller?: boolean;
  rating: number;
  reviewsCount: number;
  colors: ColorVariant[];
  sizes: ProductSize[];
  description: string;
  fabricDetails: string[];
  features: string[];
  careInstructions: string[];
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  name: string;
  category: string;
  price: number;
  cashbackOffered: number;
  selectedColor: ColorVariant;
  selectedSize: ProductSize;
  quantity: number;
}

export interface CashbackTransaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  timestamp: number;
  orderId?: string;
  expiryDate?: string;
}

export interface Order {
  id: string;
  timestamp: number;
  items: CartItem[];
  subtotal: number;
  cashbackRedeemed: number;
  cashbackEarned: number;
  total: number;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
}

export interface GA4EventRecord {
  id: string;
  timestamp: string;
  event: string;
  payload: Record<string, any>;
}
