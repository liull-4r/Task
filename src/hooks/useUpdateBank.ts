import { useMutation } from "@tanstack/react-query";
import { client } from "../api/client";

interface UpdateBankPayload {
  code: string;
  name: string;
  sortNo: number;
}

const updateBank = async ({ code, name, sortNo }: UpdateBankPayload) => {
  const response = await client.put(`/banks/${code}`, {
    name,
    sortNo,
  });
  return response.data;
};

export const useUpdateBank = () => {
  return useMutation({
    mutationFn: updateBank,
  });
};
