import type { GiftItem } from '../types/gift';

/**
 * Имитация задержки сети
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock данные для Telegram-подарков
 */
const mockGifts: GiftItem[] = [
  {
    id: '1',
    name: 'Delicious Cake',
    description: 'Праздничный торт для особых случаев',
    prices: {
      tonnel: 2500,
      portals: 2800,
      mrkt: 2350
    },
    imageUrl: 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=100',
    rarity: 'common',
    inStock: true,
    rating: 4.5,
    tags: ['торт', 'праздник', 'сладости'],
    brand: 'Sweet Dreams',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '2',
    name: 'Green Star',
    description: 'Редкая зеленая звезда с особым эффектом',
    prices: {
      tonnel: 15000,
      portals: 18500,
      mrkt: 14200
    },
    imageUrl: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=100',
    rarity: 'rare',
    inStock: true,
    rating: 4.8,
    tags: ['звезда', 'эффект', 'зеленый'],
    brand: 'Stellar Collection',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: '3',
    name: 'Blue Star',
    description: 'Эпическая синяя звезда с анимацией',
    prices: {
      tonnel: 45000,
      portals: 52000,
      mrkt: 43500
    },
    imageUrl: 'https://images.pexels.com/photos/1205301/pexels-photo-1205301.jpeg?auto=compress&cs=tinysrgb&w=100',
    rarity: 'epic',
    inStock: true,
    rating: 4.9,
    tags: ['звезда', 'анимация', 'синий', 'эпик'],
    brand: 'Stellar Collection',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '4',
    name: 'Red Star',
    description: 'Легендарная красная звезда с уникальными эффектами',
    prices: {
      tonnel: 125000,
      portals: 135000,
      mrkt: 118000
    },
    imageUrl: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=100',
    rarity: 'legendary',
    inStock: true,
    rating: 5.0,
    tags: ['звезда', 'легендарный', 'красный', 'уникальный'],
    brand: 'Stellar Collection',
    discount: 10,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-12')
  },
  {
    id: '5',
    name: 'Crystal Heart',
    description: 'Обычное кристальное сердце',
    prices: {
      tonnel: 3200,
      portals: 3500,
      mrkt: 2950
    },
    imageUrl: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=100',
    rarity: 'common',
    inStock: true,
    rating: 4.2,
    tags: ['сердце', 'кристалл', 'любовь'],
    brand: 'Crystal Dreams',
    colors: [
      { name: 'Прозрачный', hex: '#ffffff' },
      { name: 'Розовый', hex: '#ff69b4' }
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: '6',
    name: 'Golden Crown',
    description: 'Роскошная золотая корона для особых персон',
    prices: {
      tonnel: 85000,
      portals: 92000,
      mrkt: 81500
    },
    imageUrl: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=100',
    rarity: 'epic',
    inStock: true,
    rating: 4.7,
    tags: ['корона', 'золото', 'роскошь', 'власть'],
    brand: 'Royal Collection',
    material: 'Золото 24к',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-22')
  },
  {
    id: '7',
    name: 'Magic Wand',
    description: 'Волшебная палочка с мерцающими звездами',
    prices: {
      tonnel: 12500,
      portals: 14200,
      mrkt: 11800
    },
    imageUrl: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=100',
    rarity: 'rare',
    inStock: true,
    rating: 4.6,
    tags: ['магия', 'палочка', 'звезды', 'волшебство'],
    brand: 'Mystic Arts',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-19')
  },
  {
    id: '8',
    name: 'Rainbow Butterfly',
    description: 'Радужная бабочка с переливающимися крыльями',
    prices: {
      tonnel: 8500,
      portals: 9200,
      mrkt: 7900
    },
    imageUrl: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=100',
    rarity: 'rare',
    inStock: true,
    rating: 4.4,
    tags: ['бабочка', 'радуга', 'крылья', 'природа'],
    brand: 'Nature\'s Beauty',
    colors: [
      { name: 'Радужный', hex: '#ff0000' },
      { name: 'Голубой', hex: '#00bfff' }
    ],
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-21')
  }
];

/**
 * Функция для получения списка подарков (имитация API запроса)
 * @param filters - опциональные фильтры для поиска
 * @returns Promise с массивом подарков
 */
export const fetchGifts = async (filters?: {
  rarity?: string;
  minPrice?: number;
  maxPrice?: number;
  searchQuery?: string;
}): Promise<GiftItem[]> => {
  // Имитируем задержку сети
  await delay(Math.random() * 1000 + 500);

  let filteredGifts = [...mockGifts];

  // Применяем фильтры если они переданы
  if (filters) {
    if (filters.rarity && filters.rarity !== 'all') {
      filteredGifts = filteredGifts.filter(gift => gift.rarity === filters.rarity);
    }

    if (filters.minPrice !== undefined) {
      filteredGifts = filteredGifts.filter(gift => {
        const minPrice = Math.min(gift.prices.tonnel, gift.prices.portals, gift.prices.mrkt);
        return minPrice >= filters.minPrice!;
      });
    }

    if (filters.maxPrice !== undefined) {
      filteredGifts = filteredGifts.filter(gift => {
        const maxPrice = Math.max(gift.prices.tonnel, gift.prices.portals, gift.prices.mrkt);
        return maxPrice <= filters.maxPrice!;
      });
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filteredGifts = filteredGifts.filter(gift =>
        gift.name.toLowerCase().includes(query) ||
        gift.description.toLowerCase().includes(query) ||
        gift.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
  }

  return filteredGifts;
};

/**
 * Функция для получения подарка по ID
 * @param id - идентификатор подарка
 * @returns Promise с подарком или null если не найден
 */
export const fetchGiftById = async (id: string): Promise<GiftItem | null> => {
  await delay(Math.random() * 500 + 200);
  
  const gift = mockGifts.find(g => g.id === id);
  return gift || null;
};

/**
 * Функция для получения статистики по подаркам
 * @returns Promise со статистикой
 */
export const fetchGiftStats = async () => {
  await delay(300);
  
  const totalGifts = mockGifts.length;
  const averageSavings = mockGifts.reduce((acc, gift) => {
    const prices = Object.values(gift.prices);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const savings = min > 0 ? ((max - min) / min) * 100 : 0;
    return acc + savings;
  }, 0) / totalGifts;

  const platformStats = mockGifts.reduce((acc, gift) => {
    const prices = Object.entries(gift.prices);
    const cheapest = prices.reduce((min, current) => 
      current[1] < min[1] ? current : min
    )[0];
    
    acc[cheapest] = (acc[cheapest] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const bestPlatform = Object.entries(platformStats)
    .sort(([,a], [,b]) => b - a)[0]?.[0]?.toUpperCase() || 'N/A';

  return {
    totalGifts,
    averageSavings: parseFloat(averageSavings.toFixed(1)),
    bestPlatform,
    platformStats
  };
};