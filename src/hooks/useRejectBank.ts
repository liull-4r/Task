

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../api/client";
import { AxiosResponse } from "axios";

export const useRejectBank = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, Error, string>({
    mutationFn: (workflowId: string) =>
      client.post(`/reject/bank/${workflowId}`),
    onSuccess: () => {
      // Invalidate or refetch the "pending" query to update the data
      queryClient.invalidateQueries({ queryKey: ["pending"] });
    },
  });
};
