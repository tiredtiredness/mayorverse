import { API_URL } from '@/constants';
import { getAccessToken } from './auth-token.service';
import { IPost } from '@/types';

class PostService {
  async create(post: IPost) {
    const accessToken = getAccessToken();

    const responce = await fetch(`${API_URL}/post`, {
      method: 'POST',
      body: JSON.stringify(post),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return await responce.json();
  }
}

export const postService = new PostService();
