import { cityService } from "@/services";
import { TCreateCity } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useCreateCity({ onSuccess }: { onSuccess: () => void }) {
  const { mutate: createCity, isPending: isLoading } = useMutation({
    mutationKey: ["city"],
    mutationFn: async (formData: TCreateCity) => await cityService.createCity(formData),
    onSuccess,
  });

  return { createCity, isLoading };
}
