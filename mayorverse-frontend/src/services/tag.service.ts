import {API_URL} from "@/constants";
import {getAccessToken} from "./auth-token.service";
import {createSearchParams} from "@/utils/createSearchParams";

class TagService {
  async getTags({
                  cityId,
                  postId,
                  popular,
                }: {
    cityId?: string;
    postId?: string;
    popular?: boolean;
  }) {
    const params = createSearchParams({cityId, postId, popular});
    const response = await fetch(`${API_URL}/tag?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return data;
  }

  async createTag({
                    cityId,
                    postId,
                    name,
                  }: {
    cityId?: string;
    postId?: string;
    name: string;
  }) {
    const accessToken = getAccessToken();

    if (!accessToken) {
      return null;
    }

    const response = await fetch(`${API_URL}/tag`, {
      method: "POST",
      body: JSON.stringify({cityId, postId, name}),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return await response.json();
  }

  async deleteTag(tagId: string) {
    const accessToken = getAccessToken();

    if (!accessToken) {
      return null;
    }

    const response = await fetch(`${API_URL}/tag/${tagId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return await response.json();
  }
}

export const tagService = new TagService();
