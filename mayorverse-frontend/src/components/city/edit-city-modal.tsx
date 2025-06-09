"use client";

import {TCity} from "@/types/city.types";
import {Modal} from "../ui/modal";
import {Input} from "../ui/input";
import {useForm} from "react-hook-form";
import {Button} from "../ui/button";
import Image from "next/image";
import {Textarea} from "../ui/textarea";
import {useUpdateCity} from "@/hooks/api/city/useUpdateCity";
import {useLoadAvatar} from "@/hooks/useLoadAvatar";

export function EditCityModal({
                                city,
                                isOpen,
                                setIsOpen,
                              }: {
  city: TCity;
  isOpen: boolean;
  setIsOpen(value: boolean): void;
}) {
  const {register, handleSubmit} = useForm<TCity>();

  const {updateCity} = useUpdateCity();

  const {loadAvatar, avatarUrl, preview} = useLoadAvatar(
    city?.avatarUrl,
    city?.avatarUrl,
  );

  const onSubmit = (formData: TCity) =>
    updateCity({...formData, id: city.id, avatarUrl});

  return (
    <Modal
      size="md"
      title={`Edit ${city?.name} city`}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <form
        action=""
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input label="City name" {...register("name", {value: city?.name})} />
        {/*<TagInput cityId={city?.id} />*/}
        <Textarea
          label="Description"
          {...register("description", {value: city?.description})}
        />
        <Input label="Map" {...register("map", {value: city?.map})} />
        <Input
          label="Population"
          {...register("population", {
            value: city.population,
            valueAsNumber: true,
          })}
        />
        <div className="space-y-4">
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
              htmlFor="coverImageUrl"
              className="block text-sm font-medium mb-1"
            >
              Image URL
            </label>
            <input
              type="file"
              id="coverImageUrl"
              name="coverImageUrl"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              onChange={loadAvatar}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <Button
            variant="secondary"
            size="md"
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
