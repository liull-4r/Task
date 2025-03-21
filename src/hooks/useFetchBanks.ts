import { useQuery } from "@tanstack/react-query";
import { client } from "../api/client";
import { Bank } from "../types/bank.types";

const fetchBanks = async (): Promise<Bank[]> => {
  const response = await client.get("/banks");


  return response.data.data;
};

export const useFetchBanks = () => {
  return useQuery({
    queryKey: ["banks"],
    queryFn: () => fetchBanks(),
  });
};
