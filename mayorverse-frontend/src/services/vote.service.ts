import { API_URL } from '@/constants';

class VoteService {
  async vote({
    userId,
    pollId,
    pollOptionIdList,
  }: {
    userId: string;
    pollId: string;
    pollOptionIdList: string[];
  }) {
    const response = await Promise.allSettled(
      pollOptionIdList.map(pollOptionId =>
        fetch(`${API_URL}/vote`, {
          method: 'POST',
          body: JSON.stringify({ userId, pollId, pollOptionId }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      )
    );
    console.log(response.map(item => item?.value));
    return response;
  }
}

export const voteService = new VoteService();
