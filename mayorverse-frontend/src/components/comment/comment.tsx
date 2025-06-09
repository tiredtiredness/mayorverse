import {useAuth} from "@/hooks";
import {useCreateComment} from "@/hooks/api/comment/useCreateComment";
import {TComment} from "@/types/comment.types";
import {Heart, Plain, TrashBin2, User} from "@solar-icons/react";
import Image from "next/image";
import {Button} from "../ui/button";
import {Textarea} from "../ui/textarea";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {ParentComment} from "./parent-comment";

interface CommentProps {
  comment: TComment;
  parentComment?: TComment;
  onLike?: (commentId: string) => void;
  isFounder?: boolean;
}

export function Comment({
                          comment,
                          onLike,
                          isFounder,
                          parentComment,
                        }: CommentProps) {
  const {user} = useAuth();
  const {createComment} = useCreateComment();
  const [isReplying, setIsReplying] = useState(false);
  const {register, handleSubmit, reset} = useForm<TComment>();

  const handleReply = (formData: TComment) => {
    if (user) {
      createComment({
        userId: user.id,
        postId: comment.postId,
        content: formData.content,
        parentId: comment.id,
      });
    }
    handleReset();
  };

  const handleReset = () => {
    reset();
    setIsReplying(false);
  };

  return (
    <div className={`flex gap-3`}>
      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-600 flex-shrink-0">
        {comment.user.avatarUrl ? (
          <Image
            src={comment.user.avatarUrl}
            alt={comment.user.username}
            fill
            className="w-full h-full object-cover"
          />
        ) : (
          <User className="w-5 h-5 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        )}
      </div>
      <div className="flex-1 space-y-3">
        <div className="bg-gray-700 rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium">{comment?.user.username}</span>
            {isFounder && (
              <span className="text-xs bg-teal-900/50 text-teal-400 px-2 py-1 border rounded">
                Founder
              </span>
            )}
            <span className="text-xs text-gray-400">
              {new Date(comment.createdAt).toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "short",
                hour: "numeric",
                minute: "numeric",
              })}
            </span>
          </div>
          {parentComment && <ParentComment comment={parentComment} />}
          <p className="text-gray-200">{comment?.content}</p>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
            <button
              className={`flex items-center gap-1 cursor-pointer ${
                comment?.isLiked ? "text-red-400" : "text-gray-400"
              } hover:text-red-400 transition-colors`}
              onClick={() => onLike?.(comment.id)}
            >
              <span className="text-lg">
                {comment?.isLiked ? <Heart weight="Bold" /> : <Heart />}
              </span>
              <span>{comment?.likes?.length}</span>
            </button>

            {user?.id && (
              <button
                className="hover:text-teal-400 transition-colors"
                onClick={() => setIsReplying(true)}
              >
                Reply
              </button>
            )}
          </div>
        </div>
        {isReplying && (
          <form
            className="flex space-x-3 items-start"
            onSubmit={handleSubmit(handleReply)}
            onReset={handleReset}
          >
            <div className="grow">
              <Textarea
                placeholder="Your reply"
                rows={2}
                {...register("content")}
              />
            </div>

            <div className="flex flex-col justify-between gap-2">
              <Button
                className=" flex items-center justify-center"
                type="submit"
              >
                <Plain />
              </Button>
              <Button
                className="flex items-center justify-center"
                variant="danger"
                type="reset"
              >
                <TrashBin2 />
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
