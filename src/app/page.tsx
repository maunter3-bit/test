@@ .. @@
 'use client';
 
-import { useState, useMemo } from 'react';
+import { useState, useMemo, useEffect } from 'react';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Badge } from '@/components/ui/badge';
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
 import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
-import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
+import { TrendingUp, TrendingDown, Minus, Loader2 } from 'lucide-react';
 import type { GiftItem } from '../types/gift';
 import { calculateDifference, getMinMaxPrices, formatPrice } from '../utils/price';
-
-// Mock данные для Telegram-подарков
-const gifts: GiftItem[] = [
-  {
-    id: '1',
-    name: 'Delicious Cake',
-    description: 'Праздничный торт для особых случаев',
-    prices: {
-      tonnel: 2500,
-      portals: 2800,
-      mrkt: 2350
-    },
-    imageUrl: 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=100',
-    rarity: 'common',
-    inStock: true,
-    rating: 4.5
-  },
-  {
-    id: '2',
-    name: 'Green Star',
-    description: 'Редкая зеленая звезда с особым эффектом',
-    prices: {
-      tonnel: 15000,
-      portals: 18500,
-      mrkt: 14200
-    },
-    imageUrl: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=100',
-    rarity: 'rare',
-    inStock: true,
-    rating: 4.8
-  },
-  {
-    id: '3',
-    name: 'Blue Star',
-    description: 'Эпическая синяя звезда с анимацией',
-    prices: {
-      tonnel: 45000,
-      portals: 52000,
-      mrkt: 43500
-    },
-    imageUrl: 'https://images.pexels.com/photos/1205301/pexels-photo-1205301.jpeg?auto=compress&cs=tinysrgb&w=100',
-    rarity: 'epic',
-    inStock: true,
-    rating: 4.9
-  },
-  {
-    id: '4',
-    name: 'Red Star',
-    description: 'Легендарная красная звезда с уникальными эффектами',
-    prices: {
-      tonnel: 125000,
-      portals: 135000,
-      mrkt: 118000
-    },
-    imageUrl: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=100',
-    rarity: 'legendary',
-    inStock: true,
-    rating: 5.0
-  },
-  {
-    id: '5',
-    name: 'Crystal Heart',
-    description: 'Обычное кристальное сердце',
-    prices: {
-      tonnel: 3200,
-      portals: 3500,
-      mrkt: 2950
-    },
-    imageUrl: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=100',
-    rarity: 'common',
-    inStock: true,
-    rating: 4.2
-  }
-];
+import { fetchGifts, fetchGiftStats } from '../lib/mockApi';
 
 const rarityLabels = {
@@ .. @@
 
 export default function Home() {
+  const [gifts, setGifts] = useState<GiftItem[]>([]);
+  const [loading, setLoading] = useState(true);
+  const [stats, setStats] = useState({
+    totalGifts: 0,
+    averageSavings: 0,
+    bestPlatform: 'N/A'
+  });
   const [selectedRarity, setSelectedRarity] = useState<string>('all');
 
+  useEffect(() => {
+    const loadData = async () => {
+      try {
+        setLoading(true);
+        const [giftsData, statsData] = await Promise.all([
+          fetchGifts(),
+          fetchGiftStats()
+        ]);
+        setGifts(giftsData);
+        setStats(statsData);
+      } catch (error) {
+        console.error('Ошибка загрузки данных:', error);
+      } finally {
+        setLoading(false);
+      }
+    };
+    loadData();
+  }, []);
+
   const filteredGifts = useMemo(() => {
     if (selectedRarity === 'all') return gifts;
     return gifts.filter(gift => gift.rarity === selectedRarity);
-  }, [selectedRarity]);
+  }, [gifts, selectedRarity]);
 
   const renderPriceDifference = (prices: GiftItem['prices']) => {
@@ .. @@
       </div>
 
       {/* Price Comparison Table */}
+      {loading ? (
+        <Card className="w-full">
+          <CardHeader>
+            <CardTitle className="text-2xl">Загрузка данных...</CardTitle>
+          </CardHeader>
+          <CardContent>
+            <div className="flex items-center justify-center py-12">
+              <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
+              <span className="ml-2 text-lg text-muted-foreground">Получаем актуальные цены...</span>
+            </div>
+          </CardContent>
+        </Card>
+      ) : (
       <Card className="w-full">
         <CardHeader>
           <CardTitle className="text-2xl">Таблица сравнения цен</CardTitle>
@@ .. @@
           )}
         </CardContent>
       </Card>
+      )}
 
       {/* Statistics */}
       <div className="grid md:grid-cols-3 gap-6">
@@ .. @@
           </CardHeader>
           <CardContent>
-            <div className="text-3xl font-bold text-blue-600">{filteredGifts.length}</div>
+            <div className="text-3xl font-bold text-blue-600">
+              {loading ? (
+                <Loader2 className="h-8 w-8 animate-spin mx-auto" />
+              ) : (
+                filteredGifts.length
+              )}
+            </div>
           </CardContent>
         </Card>
         
@@ .. @@
           </CardHeader>
           <CardContent>
             <div className="text-3xl font-bold text-green-600">
-              {filteredGifts.length > 0 
-                ? (filteredGifts.reduce((acc, gift) => {
-                    const { min, max } = getMinMaxPrices(gift.prices);
-                    return acc + parseFloat(calculateDifference(min, max));
-                  }, 0) / filteredGifts.length).toFixed(1)
-                : '0.0'
-              }%
+              {loading ? (
+                <Loader2 className="h-8 w-8 animate-spin mx-auto" />
+              ) : (
+                `${stats.averageSavings}%`
+              )}
             </div>
           </CardContent>
         </Card>
@@ .. @@
           </CardHeader>
           <CardContent>
             <div className="text-3xl font-bold text-purple-600">
-              {filteredGifts.length > 0 
-                ? Object.entries(
-                    filteredGifts.reduce((acc, gift) => {
-                      const cheapest = getCheapestPlatform(gift.prices);
-                      acc[cheapest] = (acc[cheapest] || 0) + 1;
-                      return acc;
-                    }, {} as Record<string, number>)
-                  ).sort(([,a], [,b]) => b - a)[0]?.[0]?.toUpperCase() || 'N/A'
-                : 'N/A'
-              }
+              {loading ? (
+                <Loader2 className="h-8 w-8 animate-spin mx-auto" />
+              ) : (
+                stats.bestPlatform
+              )}
             </div>
           </CardContent>
         </Card>