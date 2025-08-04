/**
 * Утилита для расчета разницы цен в процентах
 * @param min - минимальная цена
 * @param max - максимальная цена
 * @returns разница в процентах с двумя знаками после запятой
 */
export const calculateDifference = (min: number, max: number): string => {
  if (min === 0) return '0.00';
  return ((max - min) / min * 100).toFixed(2);
};

/**
 * Находит минимальную и максимальную цену из объекта цен
 * @param prices - объект с ценами на разных платформах
 * @returns объект с минимальной и максимальной ценой
 */
export const getMinMaxPrices = (prices: { tonnel: number; portals: number; mrkt: number }) => {
  const priceValues = Object.values(prices);
  return {
    min: Math.min(...priceValues),
    max: Math.max(...priceValues)
  };
};

/**
 * Форматирует цену для отображения
 * @param price - цена
 * @returns отформатированная строка цены
 */
export const formatPrice = (price: number): string => {
  return price.toLocaleString('ru-RU');
};