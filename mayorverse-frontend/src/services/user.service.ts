import { API_URL } from '@/constants';
import { IUser } from '@/types/auth.types';
import { getAccessToken } from './auth-token.service';

class UserService {
  async getUser(id: string) {
    const accessToken = getAccessToken();
    const response = await fetch(`${API_URL}/user/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    return data;
  }

  async updateUser(formData: IUser) {
    const accessToken = getAccessToken();

    const response = await fetch(`${API_URL}/user/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      if (response.status === 409) {
        throw new Error('User already exists');
      }
    }
    const data = await response.json();

    return data;
  }
}

export const userService = new UserService();
