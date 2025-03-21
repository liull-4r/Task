import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../api/client";

export const useDeleteBank = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (code: string) => client.delete(`/banks/${code}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banks"] });
    },
  });
};
