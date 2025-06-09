import { IMAGE_API_URL, IMAGE_TOKEN } from "@/constants";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { ChangeEvent, useState } from "react";

type initialPreviewType = string | StaticImport | null;

export const useLoadAvatar = (
  initialPreview?: initialPreviewType,
  initialAvatarUrl?: string | null,
) => {
  const [preview, setPreview] = useState<initialPreviewType | undefined>(
    initialPreview,
  );
  const [avatarUrl, setAvatarUrl] = useState<string>(initialAvatarUrl ?? "");

  const loadAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = e?.target?.files?.[0];
    if (!file) return;

    reader.readAsDataURL(file);

    reader.onload = async (readerEvent) => {
      const result = readerEvent?.target?.result;
      if (typeof result === "string") setPreview(result);
      const formData = new FormData();
      formData.append("image", file);
      const response = await fetch(`${IMAGE_API_URL}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${IMAGE_TOKEN}`,
        },
        body: formData,
      });
      const data = await response.json();

      setAvatarUrl(data?.data?.link);
    };
  };
  return { loadAvatar, preview, avatarUrl };
};
