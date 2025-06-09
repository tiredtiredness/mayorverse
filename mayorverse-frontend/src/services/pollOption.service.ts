import {API_URL} from "@/constants";
import {TPollOption} from "@/types";
import {getAccessToken} from "@/services/auth-token.service";

class PollOptionService {
  async getOptions(pollId: string) {
    const response = await fetch(`${API_URL}/pollOption?pollId=${pollId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const pollOptions: TPollOption[] = await response.json();
    return pollOptions;
  }

  async createOptions(pollOptions?: string[], pollId?: string) {
    const accessToken = getAccessToken();

    if (!accessToken) {
      return null;
    }

    if (!pollOptions?.length) {
      return;
    }

    const response = await Promise.allSettled(
      pollOptions.map(async (option, order) => {
          const response = await fetch(`${API_URL}/poll-option`, {
            method: "POST",
            body: JSON.stringify({pollId, name: option, order}),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const pollOption: TPollOption = await response.json();
          return pollOption;
        }
      ),
    );
    return response;
  }
}

export const pollOptionService = new PollOptionService();
