import {API_URL} from "@/constants";
import {TCreatePoll, TPoll} from "@/types";
import {getAccessToken} from "@/services/auth-token.service";

class PollService {
  async create(poll: TCreatePoll) {
    const accessToken = getAccessToken();

    if (!accessToken) {
      return null;
    }

    const response = await fetch(`${API_URL}/poll`, {
      method: "POST",
      body: JSON.stringify(poll),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data: TPoll = await response.json();
    return data;
  }

  async getCityPolls(cityId: string) {
    const response = await fetch(`${API_URL}/poll?cityId=${cityId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: TPoll[] = await response.json();
    return data;
  }
}

export const pollService = new PollService();
