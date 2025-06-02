import { ICity } from '@/types/city.types';
import { getAccessToken } from './auth-token.service';
import { API_URL } from '@/constants';
import { createSearchParams } from '@/utils/createSearchParams';

class CityService {
  async getCities({ name, tags }: { name: string; tags: string[] }) {
    const response = await fetch(
      `${API_URL}/city?${createSearchParams({ name, tags })}`
    );

    const data = await response.json();

    return data;
  }

  async getCity(cityId: string) {
    const accessToken = getAccessToken();
    
    const response = await fetch(`${API_URL}/city/${cityId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    return data;
  }

  async createCity(formData: ICity) {
    const accessToken = getAccessToken();

    const response = await fetch(`${API_URL}/city`, {
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

    const response = await fetch(`${API_URL}/city/${formData.id}`, {
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
