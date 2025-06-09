import {TComment} from "@/types/comment.types";

interface ParentCommentProps {
  comment: TComment;
}

export function ParentComment({comment}: ParentCommentProps) {
  return (
    <div className="pl-2 border-l-2 border-gray-500">
      <span className=" text-sm font-semibold">{comment?.user.username} </span>
      <span className="text-sm">{comment?.content}</span>
    </div>
  );
}
