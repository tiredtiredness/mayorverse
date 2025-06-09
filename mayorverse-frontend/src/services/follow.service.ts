import {API_URL} from "@/constants";
import {TCreateFollow, TFollow} from "@/types";
import {getAccessToken} from "@/services/auth-token.service";

class FollowService {
  async follow(follow: TCreateFollow) {
    const accessToken = getAccessToken();

    if (!accessToken) {
      return null;
    }

    const response = await fetch(`${API_URL}/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(follow),
    });
    const data: TFollow = await response.json();

    return data;
  }

  async unfollow(followId: string) {
    const accessToken = getAccessToken();

    if (!accessToken) {
      return null;
    }

    const response = await fetch(`${API_URL}/follow/${followId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data: boolean = await response.json();

    return data;
  }
}

export const followService = new FollowService();
