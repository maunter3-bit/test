'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { GiftItem } from '../types/gift';
import { calculateDifference, getMinMaxPrices, formatPrice } from '../utils/price';

// Mock данные для Telegram-подарков
const gifts: GiftItem[] = [
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
    rating: 4.5
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
    rating: 4.8
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
    rating: 4.9
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
    rating: 5.0
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
    rating: 4.2
  }
];

const rarityLabels = {
  common: 'Обычный',
  rare: 'Редкий',
  epic: 'Эпический',
  legendary: 'Легендарный'
};

const rarityColors = {
  common: 'bg-gray-100 text-gray-800',
  rare: 'bg-green-100 text-green-800',
  epic: 'bg-purple-100 text-purple-800',
  legendary: 'bg-orange-100 text-orange-800'
};

export default function Home() {
  const [selectedRarity, setSelectedRarity] = useState<string>('all');

  const filteredGifts = useMemo(() => {
    if (selectedRarity === 'all') return gifts;
    return gifts.filter(gift => gift.rarity === selectedRarity);
  }, [selectedRarity]);

  const renderPriceDifference = (prices: GiftItem['prices']) => {
    const { min, max } = getMinMaxPrices(prices);
    const difference = parseFloat(calculateDifference(min, max));
    
    if (difference === 0) {
      return (
        <div className="flex items-center text-gray-500">
          <Minus className="h-4 w-4 mr-1" />
          0.00%
        </div>
      );
    }
    
    return (
      <div className={`flex items-center ${difference > 0 ? 'text-red-600' : 'text-green-600'}`}>
        {difference > 0 ? (
          <TrendingUp className="h-4 w-4 mr-1" />
        ) : (
          <TrendingDown className="h-4 w-4 mr-1" />
        )}
        {Math.abs(difference).toFixed(2)}%
      </div>
    );
  };

  const getCheapestPlatform = (prices: GiftItem['prices']) => {
    const { min } = getMinMaxPrices(prices);
    const platforms = Object.entries(prices);
    return platforms.find(([, price]) => price === min)?.[0] || '';
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Сравнение цен на Telegram-подарки
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Сравните цены на подарки в Telegram на разных платформах и найдите лучшие предложения
        </p>
      </div>

      {/* Filter */}
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Фильтр по редкости</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedRarity} onValueChange={setSelectedRarity}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите редкость" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все подарки</SelectItem>
              <SelectItem value="common">Обычные</SelectItem>
              <SelectItem value="rare">Редкие</SelectItem>
              <SelectItem value="epic">Эпические</SelectItem>
              <SelectItem value="legendary">Легендарные</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Price Comparison Table */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Таблица сравнения цен</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[250px]">Подарок</TableHead>
                  <TableHead className="text-center">Tonnel</TableHead>
                  <TableHead className="text-center">Portals</TableHead>
                  <TableHead className="text-center">MRKT</TableHead>
                  <TableHead className="text-center">Разница</TableHead>
                  <TableHead className="text-center">Лучшая цена</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGifts.map((gift) => {
                  const cheapestPlatform = getCheapestPlatform(gift.prices);
                  
                  return (
                    <TableRow key={gift.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img 
                            src={gift.imageUrl} 
                            alt={gift.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-semibold">{gift.name}</div>
                            <Badge className={`text-xs ${rarityColors[gift.rarity]}`}>
                              {rarityLabels[gift.rarity]}
                            </Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className={`font-medium ${cheapestPlatform === 'tonnel' ? 'text-green-600 font-bold' : ''}`}>
                          {formatPrice(gift.prices.tonnel)} ⭐
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className={`font-medium ${cheapestPlatform === 'portals' ? 'text-green-600 font-bold' : ''}`}>
                          {formatPrice(gift.prices.portals)} ⭐
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className={`font-medium ${cheapestPlatform === 'mrkt' ? 'text-green-600 font-bold' : ''}`}>
                          {formatPrice(gift.prices.mrkt)} ⭐
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {renderPriceDifference(gift.prices)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          {cheapestPlatform.toUpperCase()}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          
          {filteredGifts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Подарки с выбранной редкостью не найдены
            </div>
          )}
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-lg">Всего подарков</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{filteredGifts.length}</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-lg">Средняя экономия</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {filteredGifts.length > 0 
                ? (filteredGifts.reduce((acc, gift) => {
                    const { min, max } = getMinMaxPrices(gift.prices);
                    return acc + parseFloat(calculateDifference(min, max));
                  }, 0) / filteredGifts.length).toFixed(1)
                : '0.0'
              }%
            </div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-lg">Лучшая платформа</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {filteredGifts.length > 0 
                ? Object.entries(
                    filteredGifts.reduce((acc, gift) => {
                      const cheapest = getCheapestPlatform(gift.prices);
                      acc[cheapest] = (acc[cheapest] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  ).sort(([,a], [,b]) => b - a)[0]?.[0]?.toUpperCase() || 'N/A'
                : 'N/A'
              }
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}