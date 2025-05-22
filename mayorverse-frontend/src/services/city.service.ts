import { ICity } from '@/types/city.types';
import { getAccessToken } from './auth-token.service';
import { BASE_URL } from '@/constants';

class CityService {
  async getCities({ name, tags }: { name: string; tags: string[] }) {
    const response = await fetch(
      `${BASE_URL}/city?name=${name}&tags=${tags.join(',')}`
    );
    const data = await response.json();

    return data;
  }

  async getCity(cityId: string) {
    const accessToken = getAccessToken();
    const response = await fetch(`${BASE_URL}/city/${cityId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`, // Добавляем токен в заголовок Authorization
      },
    });
    const data = await response.json();

    return data;
  }

  async createCity(formData: ICity) {
    const accessToken = getAccessToken();

    const response = await fetch(`${BASE_URL}/city`, {
      method: 'POST',
      body: JSON.stringify(formData),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    return data;
  }

  async updateCity(formData: ICity) {
    console.log(formData.id);
    const accessToken = getAccessToken();

    const response = await fetch(`${BASE_URL}/city/${formData.id}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    return data;
  }
}

export const cityService = new CityService();
