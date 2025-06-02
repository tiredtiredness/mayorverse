import { API_URL } from '@/constants';
import { IPoll } from '@/types';

class PollService {
  async create(poll: IPoll) {
    const response = await fetch(`${API_URL}/poll`, {
      method: 'POST',
      body: JSON.stringify(poll),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  }

  async getCityPolls(cityId: string) {
    console.log(cityId);
    const response = await fetch(`${API_URL}/poll?cityId=${cityId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  }
}

export const pollService = new PollService();
