import { GA4EventRecord } from '../types/ecommerce';

// Augment Window interface to include dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Ensure dataLayer exists
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || [];
}

type EventListener = (event: GA4EventRecord) => void;
const eventListeners: Set<EventListener> = new Set();
const eventHistory: GA4EventRecord[] = [];

export function subscribeToGA4Events(listener: EventListener): () => void {
  eventListeners.add(listener);
  return () => {
    eventListeners.delete(listener);
  };
}

export function getGA4EventHistory(): GA4EventRecord[] {
  return [...eventHistory];
}

export function clearGA4EventHistory(): void {
  eventHistory.length = 0;
}

export function trackGA4Event(eventName: string, payload: Record<string, any>): void {
  const eventRecord: GA4EventRecord = {
    id: 'evt_' + Math.random().toString(36).substring(2, 9),
    timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 }),
    event: eventName,
    payload: {
      event: eventName,
      ...payload,
    },
  };

  // Push to official window.dataLayer
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...payload,
    });
  }

  // Store in memory for debugging panel
  eventHistory.unshift(eventRecord);
  if (eventHistory.length > 50) {
    eventHistory.pop();
  }

  // Notify listeners
  eventListeners.forEach((listener) => listener(eventRecord));
}

// PRD-specific event helpers
export const analytics = {
  // Push view_item event
  viewItem: (params: {
    item_name: string;
    item_category: string;
    price: number;
    cashback_offered: number;
  }) => {
    trackGA4Event('view_item', {
      ecommerce: {
        currency: 'USD',
        value: params.price,
        items: [
          {
            item_name: params.item_name,
            item_category: params.item_category,
            price: params.price,
            cashback_offered: params.cashback_offered,
          },
        ],
      },
      item_name: params.item_name,
      item_category: params.item_category,
      price: params.price,
      cashback_offered: params.cashback_offered,
    });
  },

  // Push add_to_cart event
  addToCart: (params: {
    item_name: string;
    item_category: string;
    price: number;
    cashback_offered: number;
    quantity: number;
    variant_color?: string;
    variant_size?: string;
  }) => {
    trackGA4Event('add_to_cart', {
      ecommerce: {
        currency: 'USD',
        value: params.price * params.quantity,
        items: [
          {
            item_name: params.item_name,
            item_category: params.item_category,
            price: params.price,
            quantity: params.quantity,
            item_variant: `${params.variant_color || ''} / ${params.variant_size || ''}`.trim(),
            cashback_offered: params.cashback_offered,
          },
        ],
      },
      item_name: params.item_name,
      item_category: params.item_category,
      price: params.price,
      quantity: params.quantity,
      cashback_offered: params.cashback_offered,
    });
  },

  // Push begin_checkout event
  beginCheckout: (params: {
    items: Array<{
      item_name: string;
      item_category: string;
      price: number;
      quantity: number;
      cashback_offered: number;
    }>;
    value: number;
    cashback_offered: number;
  }) => {
    trackGA4Event('begin_checkout', {
      ecommerce: {
        currency: 'USD',
        value: params.value,
        items: params.items.map((it) => ({
          item_name: it.item_name,
          item_category: it.item_category,
          price: it.price,
          quantity: it.quantity,
          cashback_offered: it.cashback_offered,
        })),
      },
      value: params.value,
      currency: 'USD',
      cashback_offered: params.cashback_offered,
    });
  },

  // Push purchase event
  purchase: (params: {
    transaction_id: string;
    value: number;
    currency: 'USD';
    items: Array<{
      item_name: string;
      item_category: string;
      price: number;
      quantity: number;
      cashback_offered: number;
    }>;
    cashback_earned: number;
  }) => {
    trackGA4Event('purchase', {
      ecommerce: {
        transaction_id: params.transaction_id,
        value: params.value,
        currency: params.currency,
        items: params.items,
      },
      transaction_id: params.transaction_id,
      value: params.value,
      currency: params.currency,
      items: params.items,
      cashback_earned: params.cashback_earned,
    });
  },

  // Push custom event cashback_earned
  cashbackEarned: (params: {
    amount: number;
    order_value: number;
    user_type: 'returning' | 'new';
  }) => {
    trackGA4Event('cashback_earned', {
      amount: params.amount,
      order_value: params.order_value,
      user_type: params.user_type,
    });
  },

  // Push custom event cashback_redeemed
  cashbackRedeemed: (params: {
    amount_redeemed: number;
    remaining_balance: number;
  }) => {
    trackGA4Event('cashback_redeemed', {
      amount_redeemed: params.amount_redeemed,
      remaining_balance: params.remaining_balance,
    });
  },

  // Push welcome_back_banner_view
  welcomeBackBannerView: (params: { user_type: string; current_balance: number }) => {
    trackGA4Event('welcome_back_banner_view', {
      user_type: params.user_type,
      current_balance: params.current_balance,
    });
  },

  // Push welcome_back_banner_click
  welcomeBackBannerClick: (params: { user_type: string; current_balance: number; cta_target: string }) => {
    trackGA4Event('welcome_back_banner_click', {
      user_type: params.user_type,
      current_balance: params.current_balance,
      cta_target: params.cta_target,
    });
  },
};
