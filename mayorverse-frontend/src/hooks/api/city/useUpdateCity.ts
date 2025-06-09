import {cityService} from "@/services";
import {TCity} from "@/types";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export function useUpdateCity() {
  const queryClient = useQueryClient();
  const {mutate: updateCity} = useMutation({
    mutationFn: async (formData: TCity) =>
      await cityService.updateCity({...formData}),
    onSuccess: async (data) =>
      await queryClient.invalidateQueries({queryKey: ["city", data?.id]})
  });

  return {updateCity};
}
