import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, CashbackTransaction, Order, Product, ColorVariant, ProductSize } from '../types/ecommerce';
import { analytics } from '../utils/analytics';

interface EcommerceContextType {
  isReturningVisitor: boolean;
  toggleVisitorMode: () => void;
  setVisitorMode: (isReturning: boolean) => void;
  walletBalance: number;
  walletTransactions: CashbackTransaction[];
  walletExpiryDays: number;
  cart: CartItem[];
  addToCart: (product: Product, color: ColorVariant, size: ProductSize, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartTotalCashbackOffered: number;
  cartCount: number;
  appliedCashback: number;
  setAppliedCashback: (amount: number) => void;
  applyMaxCashback: () => void;
  removeCashbackDiscount: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWalletModalOpen: boolean;
  setIsWalletModalOpen: (open: boolean) => void;
  isSizeChartOpen: boolean;
  setIsSizeChartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isPostPurchaseOpen: boolean;
  setIsPostPurchaseOpen: (open: boolean) => void;
  isGA4InspectorOpen: boolean;
  setIsGA4InspectorOpen: (open: boolean) => void;
  completedOrder: Order | null;
  completeCheckout: (customerInfo: { name: string; email: string; address: string }) => Order;
  resetPrototypeState: () => void;
}

const EcommerceContext = createContext<EcommerceContextType | undefined>(undefined);

const STORAGE_KEYS = {
  RETURNING: 'aura_session_returning_visitor',
  BALANCE: 'aura_cashback_wallet_balance',
  TRANSACTIONS: 'aura_cashback_transactions',
};

export const EcommerceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Visitor flag: Defaults to returning visitor (since campaign specifically targets returning visitors)
  const [isReturningVisitor, setIsReturningVisitor] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const stored = localStorage.getItem(STORAGE_KEYS.RETURNING);
    return stored !== null ? stored === 'true' : true;
  });

  // Wallet balance: default $5.00 for returning visitors, $0 for new visitors
  const [walletBalance, setWalletBalance] = useState<number>(() => {
    if (typeof window === 'undefined') return 5.00;
    const stored = localStorage.getItem(STORAGE_KEYS.BALANCE);
    if (stored !== null) {
      const parsed = parseFloat(stored);
      return isNaN(parsed) ? 5.00 : parsed;
    }
    return 5.00;
  });

  // Expiry rule: 60 days from now
  const walletExpiryDays = 60;

  // Transactions history
  const [walletTransactions, setWalletTransactions] = useState<CashbackTransaction[]>(() => {
    if (typeof window === 'undefined') {
      return [
        {
          id: 'tx-init-01',
          type: 'credit',
          amount: 5.00,
          description: 'Welcome Back VIP Cashback Credit',
          timestamp: Date.now() - 86400000 * 2,
          expiryDate: new Date(Date.now() + 86400000 * 60).toLocaleDateString(),
        },
      ];
    }
    const stored = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: 'tx-init-01',
        type: 'credit',
        amount: 5.00,
        description: 'Welcome Back VIP Cashback Credit',
        timestamp: Date.now() - 86400000 * 2,
        expiryDate: new Date(Date.now() + 86400000 * 60).toLocaleDateString(),
      },
    ];
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedCashback, setAppliedCashbackState] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPostPurchaseOpen, setIsPostPurchaseOpen] = useState(false);
  const [isGA4InspectorOpen, setIsGA4InspectorOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RETURNING, String(isReturningVisitor));
  }, [isReturningVisitor]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BALANCE, walletBalance.toFixed(2));
  }, [walletBalance]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(walletTransactions));
  }, [walletTransactions]);

  const toggleVisitorMode = () => {
    const nextState = !isReturningVisitor;
    setIsReturningVisitor(nextState);
    if (nextState) {
      // Returning visitor gets $5.00 if balance was 0
      if (walletBalance === 0) {
        setWalletBalance(5.00);
        setWalletTransactions((prev) => [
          {
            id: 'tx-' + Date.now(),
            type: 'credit',
            amount: 5.00,
            description: 'Welcome Back VIP Cashback Perk',
            timestamp: Date.now(),
            expiryDate: new Date(Date.now() + 86400000 * 60).toLocaleDateString(),
          },
          ...prev,
        ]);
      }
    } else {
      // New visitor starts with $0
      setWalletBalance(0);
      setAppliedCashbackState(0);
    }
  };

  const setVisitorMode = (isReturning: boolean) => {
    setIsReturningVisitor(isReturning);
    if (isReturning && walletBalance === 0) {
      setWalletBalance(5.00);
    } else if (!isReturning) {
      setWalletBalance(0);
      setAppliedCashbackState(0);
    }
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartTotalCashbackOffered = cart.reduce((sum, item) => sum + item.cashbackOffered * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product: Product, color: ColorVariant, size: ProductSize, quantity = 1) => {
    const cartItemId = `${product.id}-${color.id}-${size}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          productId: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          cashbackOffered: product.cashbackOffered,
          selectedColor: color,
          selectedSize: size,
          quantity,
        },
      ];
    });

    // GA4 Analytics event
    analytics.addToCart({
      item_name: product.name,
      item_category: product.category,
      price: product.price,
      cashback_offered: product.cashbackOffered,
      quantity,
      variant_color: color.name,
      variant_size: size,
    });

    // Open cart drawer for quick feedback
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((it) => it.cartItemId !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((it) => (it.cartItemId === cartItemId ? { ...it, quantity } : it))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCashbackState(0);
  };

  const applyMaxCashback = () => {
    if (walletBalance <= 0) return;
    const maxApplicable = Math.min(walletBalance, cartSubtotal);
    setAppliedCashbackState(maxApplicable);

    // Track redemption event
    analytics.cashbackRedeemed({
      amount_redeemed: maxApplicable,
      remaining_balance: Number((walletBalance - maxApplicable).toFixed(2)),
    });
  };

  const removeCashbackDiscount = () => {
    setAppliedCashbackState(0);
  };

  const setAppliedCashback = (amount: number) => {
    const sanitized = Math.max(0, Math.min(amount, walletBalance, cartSubtotal));
    setAppliedCashbackState(sanitized);

    if (sanitized > 0) {
      analytics.cashbackRedeemed({
        amount_redeemed: sanitized,
        remaining_balance: Number((walletBalance - sanitized).toFixed(2)),
      });
    }
  };

  const completeCheckout = (customerInfo: { name: string; email: string; address: string }): Order => {
    const transactionId = 'TX-' + Math.floor(100000 + Math.random() * 900000);
    const subtotal = cartSubtotal;
    const cashbackDiscount = appliedCashback;
    const finalTotal = Math.max(0, subtotal - cashbackDiscount);

    // Calculate newly earned cashback: $5 on $50+ order, or standard aggregate cashback offered
    const newlyEarned = cartTotalCashbackOffered > 0 ? cartTotalCashbackOffered : 5.00;

    // Remaining wallet balance after deduction
    const balanceAfterDeduction = Math.max(0, walletBalance - cashbackDiscount);
    const updatedWalletBalance = Number((balanceAfterDeduction + newlyEarned).toFixed(2));

    // Create new transaction records
    const newTransactions: CashbackTransaction[] = [];

    if (cashbackDiscount > 0) {
      newTransactions.push({
        id: 'tx-deb-' + Date.now(),
        type: 'debit',
        amount: cashbackDiscount,
        description: `Applied discount on Order #${transactionId}`,
        timestamp: Date.now(),
        orderId: transactionId,
      });
    }

    newTransactions.push({
      id: 'tx-cred-' + Date.now(),
      type: 'credit',
      amount: newlyEarned,
      description: `Welcome Back Cash Reward (${newlyEarned >= 5 ? 'Promo Bonus' : 'Standard Cashback'}) on Order #${transactionId}`,
      timestamp: Date.now() + 100,
      orderId: transactionId,
      expiryDate: new Date(Date.now() + 86400000 * 60).toLocaleDateString(),
    });

    // Update state & persist
    setWalletBalance(updatedWalletBalance);
    setWalletTransactions((prev) => [...newTransactions, ...prev]);

    // Ensure returning visitor status is true now that they've made an order
    setIsReturningVisitor(true);

    const orderRecord: Order = {
      id: transactionId,
      timestamp: Date.now(),
      items: [...cart],
      subtotal,
      cashbackRedeemed: cashbackDiscount,
      cashbackEarned: newlyEarned,
      total: finalTotal,
      customerName: customerInfo.name,
      customerEmail: customerInfo.email,
      shippingAddress: customerInfo.address,
    };

    setCompletedOrder(orderRecord);

    // 1. Push purchase event (GA4 standard)
    analytics.purchase({
      transaction_id: transactionId,
      value: finalTotal,
      currency: 'USD',
      items: cart.map((item) => ({
        item_name: item.name,
        item_category: item.category,
        price: item.price,
        quantity: item.quantity,
        cashback_offered: item.cashbackOffered,
      })),
      cashback_earned: newlyEarned,
    });

    // 2. Push custom event cashback_earned
    analytics.cashbackEarned({
      amount: newlyEarned,
      order_value: finalTotal,
      user_type: isReturningVisitor ? 'returning' : 'new',
    });

    // Clear cart
    clearCart();
    setIsCheckoutOpen(false);
    setIsPostPurchaseOpen(true);

    return orderRecord;
  };

  const resetPrototypeState = () => {
    localStorage.removeItem(STORAGE_KEYS.RETURNING);
    localStorage.removeItem(STORAGE_KEYS.BALANCE);
    localStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);
    setIsReturningVisitor(true);
    setWalletBalance(5.00);
    setAppliedCashbackState(0);
    setCart([]);
    setWalletTransactions([
      {
        id: 'tx-init-reset',
        type: 'credit',
        amount: 5.00,
        description: 'Welcome Back VIP Cashback Credit',
        timestamp: Date.now(),
        expiryDate: new Date(Date.now() + 86400000 * 60).toLocaleDateString(),
      },
    ]);
  };

  return (
    <EcommerceContext.Provider
      value={{
        isReturningVisitor,
        toggleVisitorMode,
        setVisitorMode,
        walletBalance,
        walletTransactions,
        walletExpiryDays,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartTotalCashbackOffered,
        cartCount,
        appliedCashback,
        setAppliedCashback,
        applyMaxCashback,
        removeCashbackDiscount,
        isCartOpen,
        setIsCartOpen,
        isWalletModalOpen,
        setIsWalletModalOpen,
        isSizeChartOpen,
        setIsSizeChartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isPostPurchaseOpen,
        setIsPostPurchaseOpen,
        isGA4InspectorOpen,
        setIsGA4InspectorOpen,
        completedOrder,
        completeCheckout,
        resetPrototypeState,
      }}
    >
      {children}
    </EcommerceContext.Provider>
  );
};

export const useEcommerce = (): EcommerceContextType => {
  const context = useContext(EcommerceContext);
  if (!context) {
    throw new Error('useEcommerce must be used within an EcommerceProvider');
  }
  return context;
};
