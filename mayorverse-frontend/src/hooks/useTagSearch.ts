import {MouseEvent, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useQueryClient} from "@tanstack/react-query";

export function useTagSearch() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isAltPressed, setIsAltPressed] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Alt") {
        setIsAltPressed(true);
      }
    };
    const handleKeyUp = async (e: KeyboardEvent) => {
      if (e.key === "Alt") {
        if (!selectedTags?.length) return;
        const uniqueTags = Array.from(new Set(selectedTags));
        router.push(`/cities?tags=${uniqueTags.join(",")}`);
        await queryClient.invalidateQueries({queryKey: ["cities"]});
        setIsAltPressed(false);
        setSelectedTags([]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [selectedTags, router, queryClient]);

  const handleTagClick = async (e: MouseEvent, tagName: string) => {
    e.stopPropagation();
    e.preventDefault();
    if (isAltPressed) {
      setSelectedTags((prev) => [...prev, tagName]);
    } else {
      await queryClient.invalidateQueries({queryKey: ["cities"]});
      router.push(`/cities?tags=${tagName}`);
    }
  };

  return {
    isAltPressed,
    setIsAltPressed,
    selectedTags,
    setSelectedTags,
    handleTagClick
  };
}