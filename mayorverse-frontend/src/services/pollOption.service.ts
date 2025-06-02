import { API_URL } from '@/constants';

class PollOptionService {
  async getOptions(pollId: string) {
    const response = await fetch(`${API_URL}/pollOption?pollId=${pollId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }

  async createOptions(options: string[], pollId: string) {
    const response = await Promise.allSettled(
      options.map((option, order) =>
        fetch(`${API_URL}/poll-option`, {
          method: 'POST',
          body: JSON.stringify({ pollId, name: option, order }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      )
    );
    return response;
  }
}

export const pollOptionService = new PollOptionService();
