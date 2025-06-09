"use client";

import {useForm} from "react-hook-form";
import {Input} from "../ui/input";
import {Textarea} from "../ui/textarea";
import {Button, Modal} from "../ui";
import {TPost} from "@/types";
import {useEditPost} from "@/hooks/api/post/useEditPost";
import {usePost} from "@/hooks/api/post/usePost";

interface IEditPostModal {
  isOpen: boolean;

  onClose(): void;

  cityId: string;
  userId: string;
  postId: string;
}

export function EditPostModal({
                                isOpen,
                                onClose,
                                cityId,
                                postId,
                                userId,
                              }: IEditPostModal) {
  const {post} = usePost({postId, userId});
  const {editPost} = useEditPost({postId, cityId, userId});

  const {register, handleSubmit, reset} = useForm<TPost>({
    defaultValues: post,
  });

  const onSubmit = (formData: TPost) => {
    editPost(formData);
    reset();
    onClose();
  };

  const onCancel = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      title="Edit Post"
      isOpen={isOpen}
      onClose={onCancel}
    >
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Title" {...register("name")}
          placeholder="Enter title"
        />
        {/*<TagInput cityId={cityId} />*/}
        <Textarea
          label="Text"
          placeholder="Hey residents! Just wanted to share..."
          {...register("content")}
        />
        <div className="flex gap-2 justify-end">
          <Button
            variant="secondary"
            size="md"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
}
