import {API_URL} from "@/constants";
import {getAccessToken} from "@/services/auth-token.service";

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
    const accessToken = getAccessToken();

    if (!accessToken) {
      return null;
    }

    const response = await Promise.allSettled(
      pollOptionIdList.map((pollOptionId) =>
        fetch(`${API_URL}/vote`, {
          method: "POST",
          body: JSON.stringify({userId, pollId, pollOptionId}),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      ),
    );

    return response;
  }
}

export const voteService = new VoteService();
