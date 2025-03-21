import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../api/client";
import { AxiosResponse } from "axios";

export const useApproveBank = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, Error, string>({
    mutationFn: (workflowId: string) =>
      client.post(`/approve/bank/${workflowId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending"] });
    },
  });
};
