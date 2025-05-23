import { API_URL } from '@/constants';
import { IFollow } from '@/types';

class FollowService {
  async follow(follow: Partial<IFollow>) {
    const response = await fetch(`${API_URL}/follow`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(follow),
    });
    const data = await response.json();

    return data;
  }

  async unfollow(followId: string) {
    const response = await fetch(`${API_URL}/follow/${followId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();

    return data;
  }
}

export const followService = new FollowService();
