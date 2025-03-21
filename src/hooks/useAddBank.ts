import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../api/client";
import { BankFormData } from "../types/bank.schema";

export const useAddBank = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BankFormData) => client.post("/banks", data),
    onSuccess: () => {
      // ✅ Refetch bank list after successful addition
      queryClient.invalidateQueries({ queryKey: ["banks"] });
    },
  });
};
