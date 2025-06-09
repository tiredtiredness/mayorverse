import {API_URL} from "@/constants";
import {TCreateLike, TLike} from "@/types";
import {getAccessToken} from "@/services/auth-token.service";

class LikeService {
  async create(data: TCreateLike) {
    const accessToken = getAccessToken();

    if (!accessToken) {
      return null;
    }

    const response = await fetch(`${API_URL}/like`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const like: TLike = await response.json();
    return like;
  }
}

export const likeService = new LikeService();
