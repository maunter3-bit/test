'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, TrendingDown, Minus, Loader2 } from 'lucide-react';
import type { GiftItem } from '../types/gift';
import { calculateDifference, getMinMaxPrices, formatPrice } from '../utils/price';
import { fetchGifts, fetchGiftStats } from '../lib/mockApi';

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
  legendary: 'bg-yellow-100 text-yellow-800'
};

const getCheapestPlatform = (prices: GiftItem['prices']) => {
  const entries = Object.entries(prices);
  return entries.reduce((cheapest, [platform, price]) => 
    price < prices[cheapest] ? platform : cheapest, entries[0][0]
  );
};

export default function Home() {
  const [gifts, setGifts] = useState<GiftItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalGifts: 0,
    averageSavings: 0,
    bestPlatform: 'N/A'
  });
  const [selectedRarity, setSelectedRarity] = useState<string>('all');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [giftsData, statsData] = await Promise.all([
          fetchGifts(),
          fetchGiftStats()
        ]);
        setGifts(giftsData);
        setStats(statsData);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredGifts = useMemo(() => {
    if (selectedRarity === 'all') return gifts;
    return gifts.filter(gift => gift.rarity === selectedRarity);
  }, [gifts, selectedRarity]);

  const renderPriceDifference = (prices: GiftItem['prices']) => {
    const { min, max } = getMinMaxPrices(prices);
    const difference = calculateDifference(min, max);
    const numDiff = parseFloat(difference);
    
    if (numDiff > 5) {
      return (
        <div className="flex items-center text-red-600">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span className="font-semibold">{difference}%</span>
        </div>
      );
    } else if (numDiff < -5) {
      return (
        <div className="flex items-center text-green-600">
          <TrendingDown className="w-4 h-4 mr-1" />
          <span className="font-semibold">{Math.abs(numDiff)}%</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-gray-500">
          <Minus className="w-4 h-4 mr-1" />
          <span>{difference}%</span>
        </div>
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Telegram Gifts Price Tracker
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Сравнивайте цены на подарки Telegram на разных платформах и находите лучшие предложения
        </p>
      </div>

      {/* Filter */}
      <div className="flex justify-center">
        <Select value={selectedRarity} onValueChange={setSelectedRarity}>
          <SelectTrigger className="w-48">
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
      </div>

      {/* Price Comparison Table */}
      {loading ? (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Загрузка данных...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
              <span className="ml-2 text-lg text-muted-foreground">Получаем актуальные цены...</span>
            </div>
          </CardContent>
        </Card>
      ) : (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Таблица сравнения цен</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredGifts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Подарки не найдены для выбранной категории
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Фото</TableHead>
                    <TableHead>Название</TableHead>
                    <TableHead>Редкость</TableHead>
                    <TableHead className="text-center">Tonnel</TableHead>
                    <TableHead className="text-center">Portals</TableHead>
                    <TableHead className="text-center">MRKT</TableHead>
                    <TableHead className="text-center">Лучшая цена</TableHead>
                    <TableHead className="text-center">Разница</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGifts.map((gift) => {
                    const cheapestPlatform = getCheapestPlatform(gift.prices);
                    const { min } = getMinMaxPrices(gift.prices);
                    
                    return (
                      <TableRow key={gift.id} className="hover:bg-muted/50">
                        <TableCell>
                          <img 
                            src={gift.imageUrl} 
                            alt={gift.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-semibold">{gift.name}</div>
                            <div className="text-sm text-muted-foreground">{gift.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={rarityColors[gift.rarity]}>
                            {rarityLabels[gift.rarity]}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={cheapestPlatform === 'tonnel' ? 'font-bold text-green-600' : ''}>
                            {formatPrice(gift.prices.tonnel)}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={cheapestPlatform === 'portals' ? 'font-bold text-green-600' : ''}>
                            {formatPrice(gift.prices.portals)}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={cheapestPlatform === 'mrkt' ? 'font-bold text-green-600' : ''}>
                            {formatPrice(gift.prices.mrkt)}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="font-bold text-green-600">
                            {formatPrice(min)}
                          </div>
                          <div className="text-xs text-muted-foreground uppercase">
                            {cheapestPlatform}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {renderPriceDifference(gift.prices)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      )}

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Всего подарков</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {loading ? (
                <Loader2 className="h-8 w-8 animate-spin mx-auto" />
              ) : (
                filteredGifts.length
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Средняя экономия</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {loading ? (
                <Loader2 className="h-8 w-8 animate-spin mx-auto" />
              ) : (
                `${stats.averageSavings}%`
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Лучшая платформа</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {loading ? (
                <Loader2 className="h-8 w-8 animate-spin mx-auto" />
              ) : (
                stats.bestPlatform
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}