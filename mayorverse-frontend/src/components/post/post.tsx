import {TPost} from "@/types";
import {motion} from "framer-motion";
import {Skeleton} from "../ui";
import Image from "next/image";
import {Calendar, ChatDots, Heart} from "@solar-icons/react";
import Link from "next/link";
import {useToggleLike} from "@/hooks/api/like/useToggleLike";
import {useAuth} from "@/hooks";

export function Post({
                       post,
                       isLoading,
                       index,
                     }: {
  post: TPost;
  isLoading: boolean;
  index: number;
}) {
  const {user} = useAuth();
  const {toggleLike} = useToggleLike(post.id);

  return (
    <motion.article
      key={post.id}
      initial={{opacity: 0, y: 20, scale: 1}}
      animate={{opacity: 1, y: 0}}
      transition={{delay: index * 0.1}}
      className="border border-gray-700 rounded-xl shadow-lg "
    >
      {post?.imageUrl && (
        <div className="relative h-48 w-full ">
          <Image
            src={post?.imageUrl}
            alt={post?.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
        </div>
      )}

      <div className="p-5 space-y-4">
        {!!post.tags?.length && (
          <ul className="flex items-center gap-2 flex-wrap">
            {post.tags.map((tag) => (
              <li key={tag.id}>
                <span className="text-xs px-2 py-1 bg-gray-700 rounded-full text-gray-300">
                  {tag.name}
                </span>
              </li>
            ))}
          </ul>
        )}

        {isLoading ? (
          <Skeleton
            width={"100%"}
            height={20}
          />
        ) : (
          <h2 className="text-xl font-semibold text-white break-all">{post?.name}</h2>
        )}
        {isLoading ? (
          <Skeleton
            width={"100%"}
            height={20}
          />
        ) : (
          <p className="text-gray-300 break-all">{post?.content}</p>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-600">
              {post?.userId && (
                <Image
                  src={post?.user?.avatarUrl ?? ""}
                  alt={post?.user?.username}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div>
              <p className="text-sm font-medium">{post?.user?.username}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 border-gray-700 pt-3">
          <button
            className={`flex items-center gap-1 cursor-pointer ${
              post?.isLiked ? "text-red-400" : "text-gray-400"
            } hover:text-red-400 transition-colors`}
            onClick={() => {
              if (user) {
                toggleLike({
                  postId: post.id,
                  userId: user.id,
                  likeType: "POST"
                });
              }
            }
            }
          >
            <span className="text-lg">
              {post?.isLiked ? <Heart weight="Bold" /> : <Heart />}
            </span>
            <span>{post.likesCount}</span>
          </button>

          <Link
            href={`/cities/${post.cityId}/posts/${post.id}`}
            className="flex items-center gap-1 text-gray-400 hover:text-teal-400 transition-colors"
          >
            <span className="text-lg">
              <ChatDots />
            </span>
            <span>{post.commentsCount}</span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
