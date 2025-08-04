/**
 * Интерфейс для подарочного товара
 */
export interface GiftItem {
  /** Уникальный идентификатор товара */
  id: string;
  
  /** Название товара */
  name: string;
  
  /** Описание товара */
  description: string;
  
  /** Цены на разных платформах */
  prices: {
    tonnel: number;
    portals: number;
    mrkt: number;
  };
  
  /** URL изображения товара */
  imageUrl: string;
  
  /** Редкость подарка */
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  
  /** Наличие на складе */
  inStock: boolean;
  
  /** Рейтинг товара (от 1 до 5) */
  rating: number;
  
  /** Дополнительные изображения (опционально) */
  additionalImages?: string[];
  
  /** Теги для поиска (опционально) */
  tags?: string[];
  
  /** Размеры товара (опционально) */
  dimensions?: {
    width: number;
    height: number;
    depth: number;
    weight: number;
  };
  
  /** Цвета товара (опционально) */
  colors?: {
    name: string;
    hex: string;
  }[];
  
  /** Размеры одежды/обуви (опционально) */
  sizes?: string[];
  
  /** Скидка в процентах (опционально) */
  discount?: number;
  
  /** Бренд товара (опционально) */
  brand?: string;
  
  /** Материал изготовления (опционально) */
  material?: string;
  
  /** Страна производства (опционально) */
  countryOfOrigin?: string;
  
  /** Дата добавления товара */
  createdAt?: Date;
  
  /** Дата последнего обновления */
  updatedAt?: Date;
}

/**
 * Интерфейс для категории товаров
 */
export interface GiftCategory {
  /** Уникальный идентификатор категории */
  id: string;
  
  /** Название категории */
  name: string;
  
  /** Описание категории */
  description: string;
  
  /** URL изображения категории */
  imageUrl: string;
  
  /** Слаг для URL */
  slug: string;
  
  /** Родительская категория (опционально) */
  parentId?: string;
  
  /** Порядок сортировки */
  sortOrder: number;
  
  /** Активность категории */
  isActive: boolean;
}

/**
 * Интерфейс для корзины покупок
 */
export interface CartItem {
  /** Товар */
  gift: GiftItem;
  
  /** Количество товара */
  quantity: number;
  
  /** Выбранный цвет (опционально) */
  selectedColor?: string;
  
  /** Выбранный размер (опционально) */
  selectedSize?: string;
  
  /** Персонализация (опционально) */
  personalization?: {
    text?: string;
    font?: string;
    color?: string;
  };
}

/**
 * Интерфейс для избранных товаров
 */
export interface WishlistItem {
  /** Уникальный идентификатор записи */
  id: string;
  
  /** Товар */
  gift: GiftItem;
  
  /** Дата добавления в список желаний */
  addedAt: Date;
  
  /** Заметка пользователя (опционально) */
  note?: string;
}

/**
 * Интерфейс для фильтров товаров
 */
export interface GiftFilters {
  /** Категории */
  categories?: string[];
  
  /** Диапазон цен */
  priceRange?: {
    min: number;
    max: number;
  };
  
  /** Рейтинг от */
  minRating?: number;
  
  /** Только товары в наличии */
  inStockOnly?: boolean;
  
  /** Бренды */
  brands?: string[];
  
  /** Цвета */
  colors?: string[];
  
  /** Размеры */
  sizes?: string[];
  
  /** Теги */
  tags?: string[];
  
  /** Только товары со скидкой */
  onSaleOnly?: boolean;
  
  /** Поисковый запрос */
  searchQuery?: string;
}

/**
 * Типы сортировки товаров
 */
export type GiftSortType = 
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc'
  | 'name-asc'
  | 'name-desc'
  | 'newest'
  | 'popular';

/**
 * Интерфейс для результатов поиска
 */
export interface GiftSearchResult {
  /** Найденные товары */
  items: GiftItem[];
  
  /** Общее количество найденных товаров */
  totalCount: number;
  
  /** Текущая страница */
  currentPage: number;
  
  /** Размер страницы */
  pageSize: number;
  
  /** Общее количество страниц */
  totalPages: number;
  
  /** Примененные фильтры */
  appliedFilters: GiftFilters;
  
  /** Тип сортировки */
  sortType: GiftSortType;
}

/**
 * Интерфейс для отзыва о товаре
 */
export interface GiftReview {
  /** Уникальный идентификатор отзыва */
  id: string;
  
  /** ID товара */
  giftId: string;
  
  /** ID пользователя */
  userId: string;
  
  /** Имя пользователя */
  userName: string;
  
  /** Аватар пользователя (опционально) */
  userAvatar?: string;
  
  /** Рейтинг (от 1 до 5) */
  rating: number;
  
  /** Заголовок отзыва */
  title: string;
  
  /** Текст отзыва */
  content: string;
  
  /** Изображения к отзыву (опционально) */
  images?: string[];
  
  /** Дата создания отзыва */
  createdAt: Date;
  
  /** Было ли полезно (количество лайков) */
  helpful: number;
  
  /** Проверенная покупка */
  verified: boolean;
}