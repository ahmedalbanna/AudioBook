
import type { MockAudiobook, MockCategory, MockSubscriptionPlan, User } from '@/types';

export const mockCategories: MockCategory[] = [
  { categoryId: '1', name: 'تنمية بشرية', iconUrl: 'https://placehold.co/50x50.png?text=💡' },
  { categoryId: '2', name: 'روايات', iconUrl: 'https://placehold.co/50x50.png?text=📚' },
  { categoryId: '3', name: 'تاريخ', iconUrl: 'https://placehold.co/50x50.png?text=📜' },
  { categoryId: '4', name: 'أعمال وريادة', iconUrl: 'https://placehold.co/50x50.png?text=💼' },
  { categoryId: '5', name: 'علوم وتكنولوجيا', iconUrl: 'https://placehold.co/50x50.png?text=🔬' },
];

export const mockAudiobooks: MockAudiobook[] = [
  {
    audiobookId: '101',
    title: 'فن اللامبالاة',
    author: 'مارك مانسون',
    narrator: 'أحمد الغندور',
    description: 'كتاب يتناول كيفية عيش حياة أكثر سعادة وهدوءًا من خلال التركيز على ما هو مهم حقًا.',
    coverImageUrl: 'https://placehold.co/400x600.png',
    fullAudioUrl: '/audio/placeholder-full.mp3',
    previewAudioUrl: '/audio/placeholder-preview.mp3',
    price: 49.99,
    currency: 'SAR',
    categoryRef: '1',
    isFeatured: true,
    totalDuration: '5 ساعات و 30 دقيقة',
    releaseDate: new Date(2023, 5, 15).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    audiobookId: '102',
    title: 'قوة العادات',
    author: 'تشارلز دويج',
    narrator: 'إبراهيم الفقي (خيال)',
    description: 'يكشف هذا الكتاب عن العلم وراء تكوين العادات وكيفية تغييرها لتحقيق النجاح.',
    coverImageUrl: 'https://placehold.co/400x600.png',
    fullAudioUrl: '/audio/placeholder-full.mp3',
    previewAudioUrl: '/audio/placeholder-preview.mp3',
    price: 55.00,
    currency: 'SAR',
    categoryRef: '1',
    isFeatured: true,
    totalDuration: '7 ساعات',
    releaseDate: new Date(2023, 2, 10).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    audiobookId: '201',
    title: '1984',
    author: 'جورج أورويل',
    narrator: 'أيمن زيدان',
    description: 'رواية ديستوبية كلاسيكية تحذر من مخاطر الشمولية والمراقبة الحكومية.',
    coverImageUrl: 'https://placehold.co/400x600.png',
    fullAudioUrl: '/audio/placeholder-full.mp3',
    previewAudioUrl: '/audio/placeholder-preview.mp3',
    price: 39.99,
    currency: 'SAR',
    categoryRef: '2',
    isFeatured: false,
    totalDuration: '11 ساعة و 15 دقيقة',
    releaseDate: new Date(2022, 10, 1).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    audiobookId: '301',
    title: 'مقدمة ابن خلدون',
    author: 'ابن خلدون',
    narrator: 'جهاد الأطرش',
    description: 'عمل تاريخي واجتماعي تأسيسي يناقش صعود وسقوط الحضارات.',
    coverImageUrl: 'https://placehold.co/400x600.png',
    fullAudioUrl: '/audio/placeholder-full.mp3',
    previewAudioUrl: '/audio/placeholder-preview.mp3',
    price: 70.00,
    currency: 'SAR',
    categoryRef: '3',
    isFeatured: true,
    totalDuration: '25 ساعة',
    releaseDate: new Date(2023, 0, 20).toISOString(),
    createdAt: new Date().toISOString(),
  },
   {
    audiobookId: '401',
    title: 'الأب الغني والأب الفقير',
    author: 'روبرت كيوساكي',
    narrator: 'خالد الجندي',
    description: 'يتحدى هذا الكتاب الطريقة التقليدية في التفكير حول المال والاستثمار.',
    coverImageUrl: 'https://placehold.co/400x600.png',
    fullAudioUrl: '/audio/placeholder-full.mp3',
    previewAudioUrl: '/audio/placeholder-preview.mp3',
    price: 60.00,
    currency: 'SAR',
    categoryRef: '4',
    isFeatured: false,
    totalDuration: '6 ساعات و 20 دقيقة',
    releaseDate: new Date(2022, 8, 5).toISOString(),
    createdAt: new Date().toISOString(),
  },
];

export const mockSubscriptionPlans: MockSubscriptionPlan[] = [
  {
    subscriptionId: 'plan_monthly_premium',
    name: 'الاشتراك الشهري المميز',
    description: 'وصول غير محدود لجميع الكتب الصوتية لمدة شهر.',
    price: 99.00,
    currency: 'SAR',
    durationDays: 30,
    features: ['وصول لجميع الكتب', 'استماع بدون إنترنت', 'بدون إعلانات'],
    isActive: true,
  },
  {
    subscriptionId: 'plan_annual_premium',
    name: 'الاشتراك السنوي المميز',
    description: 'وصول غير محدود لجميع الكتب الصوتية لمدة سنة كاملة بسعر مخفض.',
    price: 999.00,
    currency: 'SAR',
    durationDays: 365,
    features: ['توفير كبير', 'وصول لجميع الكتب', 'استماع بدون إنترنت', 'بدون إعلانات'],
    isActive: true,
  },
];

export const mockUser: User = {
  uid: 'mockUserId123',
  email: 'user@example.com',
  displayName: 'مستخدم تجريبي',
  photoUrl: 'https://placehold.co/100x100.png',
  role: 'user',
  createdAt: new Date(),
  lastLogin: new Date(),
  purchasedAudiobooksRefs: ['101'],
  currentSubscriptionRef: undefined, // 'userSub1_active'
  subscriptionEndDate: undefined, // new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  isActive: true,
};

export const mockAdminUser: User = {
  uid: 'mockAdminId789',
  email: 'admin@example.com',
  displayName: 'مدير النظام',
  photoUrl: 'https://placehold.co/100x100.png',
  role: 'admin',
  createdAt: new Date(),
  lastLogin: new Date(),
  purchasedAudiobooksRefs: [],
  currentSubscriptionRef: undefined,
  isActive: true,
};

export function getAudiobookById(id: string): MockAudiobook | undefined {
  return mockAudiobooks.find(ab => ab.audiobookId === id);
}

export function getCategoryById(id: string): MockCategory | undefined {
  return mockCategories.find(cat => cat.categoryId === id);
}
