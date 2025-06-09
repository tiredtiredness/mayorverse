import {API_URL} from "@/constants";
import {TComment, TCreateComment} from "@/types/comment.types";
import {getAccessToken} from "@/services/auth-token.service";

export class CommentService {
  async create(comment: TCreateComment) {
    const accessToken = getAccessToken();

    if (!accessToken) {
      return null;
    }

    const response = await fetch(`${API_URL}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(comment),
    });
    const data: TCreateComment = await response.json();

    return data;
  }

  async getAll({postId}: { postId: string }) {
    const response = await fetch(`${API_URL}/comment?postId=${postId}`, {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    });
    const comments: TComment[] = await response.json();

    return comments;
  }
}

export const commentService = new CommentService();
