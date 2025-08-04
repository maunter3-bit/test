'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  ShoppingCart, 
  User, 
  Search, 
  Menu, 
  X,
  Gift
} from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Gift className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Gift Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/catalog" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Каталог
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Категории
            </Link>
            <Link href="/gifts" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Подарочные наборы
            </Link>
            <Link href="/delivery" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Доставка
            </Link>
            <Link href="/contacts" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Контакты
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Найти подарок..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Heart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                2
              </span>
            </Button>
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-5 w-5" />
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
              Войти
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Найти подарок..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-2">
                <Link href="/catalog" className="text-gray-700 hover:text-purple-600 transition-colors font-medium py-2">
                  Каталог
                </Link>
                <Link href="/categories" className="text-gray-700 hover:text-purple-600 transition-colors font-medium py-2">
                  Категории
                </Link>
                <Link href="/gifts" className="text-gray-700 hover:text-purple-600 transition-colors font-medium py-2">
                  Подарочные наборы
                </Link>
                <Link href="/delivery" className="text-gray-700 hover:text-purple-600 transition-colors font-medium py-2">
                  Доставка
                </Link>
                <Link href="/contacts" className="text-gray-700 hover:text-purple-600 transition-colors font-medium py-2">
                  Контакты
                </Link>
              </nav>

              {/* Mobile Actions */}
              <div className="flex items-center space-x-4 pt-4 border-t">
                <Button variant="ghost" size="sm" className="relative">
                  <Heart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    2
                  </span>
                </Button>
                <Button variant="ghost" size="sm">
                  <User className="h-5 w-5" />
                </Button>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex-1">
                  Войти
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}