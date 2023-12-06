import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export const getFormatDistanceToNow = (date: number) => {
  const toNow = formatDistanceToNow(date, { locale: es });
  return toNow;
}