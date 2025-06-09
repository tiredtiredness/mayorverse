import {API_URL} from "@/constants";
import {getAccessToken} from "./auth-token.service";
import {TPost} from "@/types";
import {createSearchParams} from "@/utils/createSearchParams";

class PostService {
  async get({postId, userId}: { postId: string; userId: string }) {
    const accessToken = getAccessToken();
    const params = createSearchParams({userId});

    const response = await fetch(`${API_URL}/post/${postId}?${params}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return await response.json();
  }

  async getAll({cityId, userId}: { cityId: string; userId: string }) {
    const accessToken = getAccessToken();

    const params = createSearchParams({cityId, userId});

    const response = await fetch(`${API_URL}/post?${params}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const posts: TPost[] = await response.json();
    return posts;
  }

  async create(post: TPost) {
    const accessToken = getAccessToken();

    if (!accessToken) {
      return null;
    }

    const response = await fetch(`${API_URL}/post`, {
      method: "POST",
      body: JSON.stringify(post),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return await response.json();
  }

  async edit(post: TPost) {
    const accessToken = getAccessToken();

    if (!accessToken) {
      return null;
    }

    const response = await fetch(`${API_URL}/post/${post.id}`, {
      method: "PUT",
      body: JSON.stringify(post),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return await response.json();
  }
}

export const postService = new PostService();
