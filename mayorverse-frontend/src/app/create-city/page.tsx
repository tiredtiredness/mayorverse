"use client";

import Image from "next/image";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {TCreateCity} from "@/types/city.types";
import {useRouter} from "next/navigation";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {useCreateCity} from "@/hooks/api/city/useCreateCity";
import {useLoadAvatar} from "@/hooks/useLoadAvatar";
import {PeopleNearby, TextField, TextItalic} from "@solar-icons/react";

export default function CreateCity() {
  const {back} = useRouter();
  const {register, handleSubmit, reset, formState} = useForm<TCreateCity>();
  const {loadAvatar, preview, avatarUrl} = useLoadAvatar();
  const {createCity, isLoading} = useCreateCity({onSuccess: reset});

  const onSubmit = (formData: TCreateCity) => {
    createCity({...formData, avatarUrl});
  };
  console.log(formState.errors);
  return (
    <div className="min-h-[calc(100dvh_-_48px_-_66px)] p-4 text-white">
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-2">Create New City</h1>
        <p className="text-gray-400">
          Build your perfect city and share it with the community
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

            <div className="space-y-4">
              <Input
                type="text"
                label={"City Name"}
                icon={<TextItalic />}
                error={formState.errors.name?.message}
                {...register("name", {
                  required: "City name is required",
                  minLength: {
                    value: 2,
                    message: "City name have to be at 2 letters"
                  },
                  validate: (value) => {
                    const trimmed = value.trim();
                    if (trimmed.length < 2) return "City name must be at least 2 characters long";
                    if (!/^[A-Za-zА-Яа-я\s-]+$/.test(trimmed)) return "Only letters, spaces and hyphens are allowed";
                    return true;
                  }
                })}
              />
              <Textarea label={"Description"} {...register("description")} />
              <Input
                type="number"
                label="Population"
                defaultValue={0}
                icon={<PeopleNearby />}
                error={formState.errors.population?.message}
                {...register("population", {
                  valueAsNumber: true,
                  min: {value: 0, message: "Population can't be less than 0"}
                })}
              />
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">City Cover Image</h2>

            <div className="space-y-4">
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
                  <span className="text-gray-400">
                    Preview will appear here
                  </span>
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
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Actions</h2>

            <div className="flex flex-col gap-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create City"}
              </Button>

              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="w-full"
                onClick={() => back()}
              >
                Cancel
              </Button>

              <div className="pt-4 border-t border-gray-700">
                <h3 className="text-sm font-medium mb-2">Creation Tips</h3>
                <ul className="text-xs text-gray-400 space-y-2 list-disc list-inside">
                  <li>Choose a unique city name</li>
                  <li>Describe your city&apos;s special features</li>
                  <li>High-quality images work best</li>
                  <li>You can edit details later</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
