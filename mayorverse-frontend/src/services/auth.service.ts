import { ILoginForm, IRegisterForm } from '@/types/auth.types';
import {
  getAccessToken,
  removeFromStorage,
  saveTokenStorage,
} from './auth-token.service';
import { API_URL } from '@/constants';

class AuthService {
  async register(formData: IRegisterForm) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      body: JSON.stringify(formData),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (data?.accessToken) saveTokenStorage(data?.accessToken);

    return data;
  }

  async login(formData: ILoginForm) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(formData),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (data?.accessToken) saveTokenStorage(data?.accessToken);
    return data;
  }

  async getProfile() {
    const accessToken = getAccessToken(); // Получаем токен из куки

    // Если токена нет, нет смысла отправлять запрос
    if (!accessToken) {
      return null;
    }

    const response = await fetch(`${API_URL}/user/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`, // Добавляем токен в заголовок Authorization
      },
    });

    // Обработка ошибок, особенно 401 (Unauthorized)
    if (!response.ok) {
      // Если сервер вернул 401, токен невалиден/истек, удаляем его
      if (response.status === 401) {
        removeFromStorage();
        // Здесь можно также вызвать редирект на страницу логина,
        // но часто это лучше делать глобально в настройках QueryClient или в хуке useQuery.
      }
      // Пробрасываем ошибку, чтобы React Query мог ее обработать
      const error = await response.json();
      throw new Error(
        error.message || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json(); // Приводим ответ к ожидаемому типу

    return data;
  }

  async logout() {
    await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    removeFromStorage();
  }
}

export const authService = new AuthService();
