"use client";

import {useParams} from "next/navigation";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {FormEvent, useState} from "react";
import {ArrowLeft, ChatDots, Heart, MenuDots, User} from "@solar-icons/react";
import {useAuth} from "@/hooks/useAuth";
import {Textarea} from "@/components/ui";
import {usePost} from "@/hooks/api/post/usePost";
import {useToggleLike} from "@/hooks/api/like/useToggleLike";
import Image from "next/image";
import {useCreateComment} from "@/hooks/api/comment/useCreateComment";
import {useComment} from "@/hooks/api/comment/useComments";
import {Comment} from "@/components/comment/comment";
import {EditPostModal} from "@/components/post/edit-post-modal";
import {createPortal} from "react-dom";
import {TComment} from "@/types/comment.types";

export default function PostPage() {
  const {cityId, postId} = useParams<{ cityId: string, postId: string }>()
  const {user} = useAuth();
  const [comment, setComment] = useState("");
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const {toggleLike} = useToggleLike(postId);

  const {post} = usePost({postId, userId: user?.id});
  const {comments} = useComment(post?.id);
  console.log(comments);
  const {createComment} = useCreateComment();

  const handleAddComment = (e: FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    if (user && post) {
      createComment({userId: user?.id, postId: post?.id, content: comment});
    }
  };

  const modal = (user && cityId && post &&
    <EditPostModal
      isOpen={isOpenEditModal}
      onClose={() => setIsOpenEditModal(false)}
      userId={user.id}
      cityId={cityId}
      postId={post.id}
    />
  );

  if (!post) return null;

  return (
    <>
      {isOpenEditModal !== undefined &&
        createPortal(modal, globalThis.document.body)}
      <div>
        <div className="flex  justify-between items-center mb-6">
          <Link
            href={`/cities/${cityId}/posts`}
            className="inline-flex items-center text-sm text-gray-400 hover:text-teal-500  transition-colors"
          >
            <ArrowLeft /> Back to all posts
          </Link>
          <button
            className="cursor-pointer text-gray-400 hover:text-teal-600 transition-colors"
            onClick={() => setIsOpenEditModal(true)}
          >
            <MenuDots />
          </button>
        </div>

        <article className="mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-600 flex-shrink-0">
              {post?.user?.avatarUrl ? (
                <Image
                  src={post?.user?.avatarUrl}
                  alt={post.user.username}
                  fill
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold">{post.user.username}</h2>
                {post.user.username && (
                  <span className="text-xs bg-teal-900/50 text-teal-400 px-2 py-1 rounded">
                    Founder
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-400">
                {new Date(post.createdAt).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-4">{post?.name}</h1>

          <div className="prose prose-invert max-w-none mb-6">
            <p className="whitespace-pre-line">{post?.content}</p>
          </div>

          <div className="flex items-center gap-4 border-t border-b border-gray-700 py-3 mb-6">
            <button
              onClick={() => {
                if (user) {
                  toggleLike({
                    postId: post.id,
                    userId: user.id,
                    likeType: "POST",
                  })
                }
              }}
              className={`flex items-center gap-1 cursor-pointer ${
                post?.isLiked ? "text-red-400" : "text-gray-400"
              } hover:text-red-400 transition-colors`}
            >
              <span className="text-lg">
                {post?.isLiked ? <Heart weight="Bold" /> : <Heart />}
              </span>
              <span>{post?.likes?.length}</span>
            </button>

            <button className="flex items-center gap-1 text-gray-400 hover:text-teal-400 transition-colors">
              <span className="text-lg">
                <ChatDots />
              </span>
              <span>{comments?.length}</span>
            </button>
          </div>

          {/* Форма комментария */}
          <form
            onSubmit={handleAddComment}
            className="mb-8"
          >
            <div className="flex gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-600 flex-shrink-0">
                {user?.avatarUrl ? (
                  <Image
                    src={user?.avatarUrl}
                    alt={user.username}
                    fill
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                )}
              </div>
              <div className="flex-1">
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment..."
                  rows={2}
                />
                <div className="flex justify-end mt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!comment.trim()}
                    className="px-4 py-2"
                  >
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </form>

          {/* Комментарии */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">
              Comments ({comments?.length || 0})
            </h3>

            {comments && comments.length > 0 ? (
              <ul className="space-y-6">
                {comments.map((comment: TComment) => (
                  <li key={comment.id}>
                    <Comment
                      comment={comment}
                      parentComment={comment.parent}
                      onLike={(commentId: string) => {
                        if (user) {
                          toggleLike({
                            commentId,
                            userId: user.id,
                            likeType: "COMMENT",
                          })
                        }
                      }
                      }
                      isFounder={comment.userId === post.userId}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-center py-4">No comments yet</p>
            )}
          </div>
        </article>
      </div>
    </>
  );
}
