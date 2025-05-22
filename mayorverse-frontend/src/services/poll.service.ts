import { BASE_URL } from '@/constants';
import { IPoll } from '@/types';

class PollService {
  async create(poll: IPoll) {
    const response = await fetch(`${BASE_URL}/poll`, {
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
}

export const pollService = new PollService();
