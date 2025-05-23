import { API_URL } from '@/constants';
import { getAccessToken } from './auth-token.service';

class TagService {
  async getCityTags({
    cityId,
    popular,
  }: {
    cityId?: string;
    popular?: boolean;
  }) {
    const responce = await fetch(
      `${API_URL}/tag?cityId=${cityId}&popular=${popular}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await responce.json();

    return data;
  }

  async createCityTag(cityId: string, name: string) {
    const accessToken = getAccessToken();
    console.log(11111, cityId, name);
    const responce = await fetch(`${API_URL}/tag?cityId=${cityId}`, {
      method: 'POST',
      body: JSON.stringify({ cityId, name }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return await responce.json();
  }

  async deleteCityTag(tagId: string) {
    const responce = await fetch(`${API_URL}/tag/${tagId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await responce.json();
  }
}

export const tagService = new TagService();
