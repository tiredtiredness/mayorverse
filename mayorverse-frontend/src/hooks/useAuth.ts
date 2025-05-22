'use client';

import { useQuery } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { IUser } from '@/types/auth.types';

interface UseAuthResult {
  user: IUser | null | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  isError: boolean;
}

export function useAuth(): UseAuthResult {
  // Используем useQuery для получения профиля
  const {
    data: user,
    isLoading,
    isError,
    // error, // Можно получить информацию об ошибке, если нужно
  } = useQuery({
    queryKey: ['profile'], // Уникальный ключ для этого запроса
    queryFn: () => authService.getProfile(), // Функция, выполняющая запрос
    // staleTime: 1000 * 60 * 5, // Данные считаются "свежими" 5 минут (можно настроить)
    // gcTime: 1000 * 60 * 60, // Неиспользуемые данные будут удалены из кэша через 1 час
    // retry: 1, // Повторить попытку запроса 1 раз в случае ошибки
    // ВАЖНО: По умолчанию useQuery повторяет запросы при ошибках, включая 401.
    // authService.getProfile() уже удаляет токен при 401.
    // retry: (failureCount, error) => {
    //   // Отключаем повтор при 401 ошибке
    //   if ((error as any).status === 401) return false;
    //   return failureCount < 1; // Повторить 1 раз для других ошибок
    // },
  });

  const isAuthenticated = !!user;

  return { user, isAuthenticated, isLoading, isError };
}
