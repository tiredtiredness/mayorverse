"use client";

import {TUser} from "@/types/auth.types";
import {Modal} from "@/components/ui/modal";
import {Input} from "../ui/input";
import {Textarea} from "../ui/textarea";
import {Button} from "../ui/button";
import {useForm} from "react-hook-form";
import Image from "next/image";
import {useUpdateUser} from "@/hooks/api/user/useUpdateUser";
import {useLoadAvatar} from "@/hooks/useLoadAvatar";

export function EditProfileModal({
                                   user,
                                   isOpen,
                                   setIsOpen,
                                 }: {
  user: TUser;
  isOpen: boolean;
  setIsOpen(value: boolean): void;
}) {
  const {register, handleSubmit, formState, setError} = useForm<TUser>();


  const {updateUser} = useUpdateUser({
    id: user?.id,
    onSuccess: () => setIsOpen(false),
    onError: (error) =>
      setError("username", {
        type: "validate",
        message: error.message,
      }),
  });

  const {
    preview,
    avatarUrl,
    loadAvatar
  } = useLoadAvatar(user?.avatarUrl, user?.avatarUrl)

  const onSubmit = (formData: TUser) => {
    updateUser({...formData, avatarUrl});
  };

  if (!user) return;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit Profile"
        size="md"
      >
        <form
          className="flex flex-col gap-3 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            label={"Username"}
            {...register("username", {value: user?.username})}
            error={formState.errors["username"]?.message as string}
          />
          <Input
            label={"First name"}
            {...register("firstName", {value: user?.firstName})}
          />
          <Input
            label={"Last name"}
            {...register("lastName", {value: user?.lastName})}
          />
          <Input
            label={"Email"}
            {...register("email", {value: user?.email})}
          />
          <Textarea
            label={"Bio"}
            {...register("bio", {value: user?.bio})}
          ></Textarea>
          <div className="space-y-3">
            <label
              htmlFor="coverImageUrl"
              className="block text-sm font-medium mb-1"
            >
              Image Preview
            </label>
            {preview ? (
              <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-gray-700">
                <Image
                  src={preview}
                  alt="City preview"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-video bg-gray-700 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center">
                <span className="text-gray-400">Preview will appear here</span>
              </div>
            )}

            <div>
              <label
                htmlFor="avatarImageUrl"
                className="block text-sm font-medium mb-1"
              >
                Image URL
              </label>
              <input
                type="file"
                id="avatarImageUrl"
                name="avatarImageUrl"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focusable focus:border-transparent"
                onChange={loadAvatar}
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="lg"
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
