import Link from 'next/link';
import { 
  Gift, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Facebook, 
  Twitter,
  Clock
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Gift className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Gift Hub
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Мы помогаем найти идеальные подарки для любых случаев. 
              Более 10,000 товаров с быстрой доставкой по всей России.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Быстрые ссылки</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/catalog" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  Каталог товаров
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  Категории
                </Link>
              </li>
              <li>
                <Link href="/new" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  Новинки
                </Link>
              </li>
              <li>
                <Link href="/sale" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  Распродажа
                </Link>
              </li>
              <li>
                <Link href="/gift-cards" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  Подарочные карты
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Помощь</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/delivery" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  Доставка и оплата
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  Возврат товара
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  Размерная сетка
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  Частые вопросы
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  Служба поддержки
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Контакты</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-purple-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white font-medium">+7 (495) 123-45-67</p>
                  <p className="text-xs text-gray-400">Бесплатно по России</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-purple-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white">info@gifthub.ru</p>
                  <p className="text-xs text-gray-400">Ответим в течение часа</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-white">г. Москва, ул. Примерная, 123</p>
                  <p className="text-xs text-gray-400">Офис и шоу-рум</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-purple-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white">Пн-Пт: 9:00-21:00</p>
                  <p className="text-xs text-gray-400">Сб-Вс: 10:00-20:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2024 Gift Hub. Все права защищены.
          </div>
          <div className="flex flex-wrap items-center space-x-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-purple-400 transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-purple-400 transition-colors">
              Условия использования
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-purple-400 transition-colors">
              Cookie
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}