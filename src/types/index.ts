
export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoUrl?: string;
  role: 'user' | 'admin';
  createdAt: Date;
  lastLogin: Date;
  purchasedAudiobooksRefs: string[]; // DocumentReference to Audiobooks
  currentSubscriptionRef?: string; // DocumentReference to UserSubscriptions
  subscriptionEndDate?: Date;
  isActive: boolean;
}

export interface Audiobook {
  audiobookId: string;
  title: string;
  author: string;
  narrator?: string;
  description: string;
  coverImageUrl: string;
  fullAudioUrl: string;
  previewAudioUrl: string;
  price: number;
  currency: string; // e.g., "SAR", "USD"
  categoryRef: string; // DocumentReference to Categories
  isFeatured: boolean;
  totalDuration: string; // e.g., "3 ساعات و 15 دقيقة"
  releaseDate: Date;
  createdAt: Date;
}

export interface Category {
  categoryId: string;
  name: string;
  iconUrl?: string;
  description?: string; // Added for potential use in CategoryCard
}

export interface SubscriptionPlan {
  subscriptionId: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  durationDays: number; // e.g., 30
  features?: string[];
  isActive: boolean;
}

export interface UserSubscription {
  userSubscriptionId: string;
  userRef: string; // DocumentReference to Users
  subscriptionPlanRef: string; // DocumentReference to Subscriptions
  startDate: Date;
  endDate: Date;
  status: 'active' | 'expired' | 'cancelled';
  paymentMethod?: string;
  transactionRef?: string; // DocumentReference to Transactions
}

export interface Transaction {
  transactionId: string;
  userRef: string; // DocumentReference to Users
  type: 'audiobook_purchase' | 'subscription_payment' | 'renewal';
  itemRef: string; // DocumentReference to Audiobooks or UserSubscriptions
  amount: number;
  currency: string;
  paymentMethod: 'PayPal' | 'Visa' | 'MasterCard' | 'Apple Pay' | 'Google Pay' | string; // Allow other strings
  paymentGatewayResponse?: Record<string, any>;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  timestamp: Date;
}

// Helper type for mock data
export type MockAudiobook = Omit<Audiobook, 'createdAt' | 'releaseDate'> & {
  createdAt: string;
  releaseDate: string;
};
export type MockCategory = Category;
export type MockSubscriptionPlan = SubscriptionPlan;
